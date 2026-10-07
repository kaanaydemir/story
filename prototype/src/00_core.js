// ============================================================
// KANDİL — Bölüm 1 prototipi · çekirdek yardımcılar
// ============================================================
const TILE = 16, VW = 640, VH = 360;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
const sign = (v) => (v > 0 ? 1 : v < 0 ? -1 : 0);
const approach = (v, t, d) => (v < t ? Math.min(t, v + d) : Math.max(t, v - d));
const smooth = (t) => t * t * (3 - 2 * t);
function makeRng(seed) {
  let s = (seed >>> 0) || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}
const R = makeRng(20261007);
let REDUCED = false;
try { REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) {}

// Depolama: iframe/sandbox içinde localStorage yasak olabilir, her erişim korunur.
const Store = {
  mem: {},
  get(k, d) {
    try { const v = window.localStorage.getItem('kandil_b1_' + k); if (v != null) return JSON.parse(v); } catch (e) {}
    return k in this.mem ? this.mem[k] : d;
  },
  set(k, v) {
    this.mem[k] = v;
    try { window.localStorage.setItem('kandil_b1_' + k, JSON.stringify(v)); } catch (e) {}
  },
};

// ------------------------------------------------------------
// Oyun durumu ve bayraklar (GDD §8.3 adlandırma kuralı)
// ------------------------------------------------------------
const State = {
  sceneId: null,
  time: 0,
  paused: false,
  muted: false,
  started: false,
  flags: {},
  stats: {},
  hintsUsed: 0,
};
function defaultFlags() {
  return {
    b01_haber: null,              // koye | babaya | kalbinde
    b01_ifade_kuzu: null,         // kucakta | guderek | (boş)
    eks_soz: 0,
    usta_b01_iki_islik: false,
    kol_b01_sapan: false,
    kol_b01_kuzu_yunu: false,
    kol_b01_saman_copu: false,
    kol_b01_cingirak: false,
    tan_b01_yureginde_sakladi: false,
    tan_b01_duyanlar_sasti: false,
    tan_b01_overek_dondu: false,
    b01_uyanan_ev: 0,             // yerel sayaç 0–5
  };
}
function resetGame() {
  State.flags = defaultFlags();
  State.stats = { gece_islik: 0, cagri: 0, yanlis_kapi: [], ipucu: 0 };
}
resetGame();

// ------------------------------------------------------------
// Betik (eşyordam) yürütücüsü: function* ile sahne akışı
// yield <sayı> → saniye bekle · yield fn → fn() true olana dek bekle
// yield {done(dt), value()} → bekleyici nesne
// ------------------------------------------------------------
const Scripts = {
  list: [],
  run(genFn, tag) {
    const h = { gen: genFn(), wait: null, done: false, tag: tag || '' };
    this.list.push(h);
    this.step(h, 0, true);
    return h;
  },
  norm(v) {
    if (v == null) return { done: () => true };
    if (typeof v === 'number') { let t = 0; return { done: (dt) => (t += dt) >= v }; }
    if (typeof v === 'function') return { done: v };
    return v;
  },
  step(h, dt, first) {
    let guard = 0;
    while (!h.done && guard++ < 50) {
      if (h.wait && !h.wait.done(first ? 0 : dt)) return;
      const val = h.wait && h.wait.value ? h.wait.value() : undefined;
      h.wait = null;
      let r;
      try { r = h.gen.next(val); } catch (e) { console.error(e); h.done = true; return; }
      if (r.done) { h.done = true; return; }
      h.wait = this.norm(r.value);
      first = true; dt = 0;
    }
  },
  update(dt) {
    for (let i = 0; i < this.list.length; i++) this.step(this.list[i], dt, false);
    if (this.list.some((h) => h.done)) this.list = this.list.filter((h) => !h.done);
  },
  kill(tag) { this.list.forEach((h) => { if (!tag || h.tag === tag) h.done = true; }); this.list = this.list.filter((h) => !h.done); },
  killExcept(tag) { this.list.forEach((h) => { if (h.tag !== tag) h.done = true; }); this.list = this.list.filter((h) => !h.done); },
  running(tag) { return this.list.some((h) => h.tag === tag && !h.done); },
};
const wait = (s) => s;
const until = (fn) => fn;

// Küçük olay yolu
const Bus = {
  m: {},
  on(e, f) { (this.m[e] = this.m[e] || []).push(f); },
  emit(e, a) { (this.m[e] || []).forEach((f) => { try { f(a); } catch (er) { console.error(er); } }); },
};
