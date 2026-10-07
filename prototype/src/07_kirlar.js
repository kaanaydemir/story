// ============================================================
// Sahne yöneticisi + Kırlar dünyası ve sahneleri (2–5, 7)
// ============================================================
const Scenes = {
  defs: {}, order: [], current: null, busy: false,
  define(id, def) { def.id = id; this.defs[id] = def; this.order.push(id); },
  goto(id, opts) {
    opts = opts || {};
    const def = this.defs[id];
    if (!def) { console.warn('sahne yok: ' + id); return; }
    const doSwitch = () => {
      if (this.current && this.current.exit) { try { this.current.exit(); } catch (e) { console.error(e); } }
      Scripts.killExcept('transition'); UI.closeHint(); UI.clearBark(); UI.prompt(null); UI.objective(null); UI.usta(0, false);
      if (UI.dlg.active) { UI.dlg.active = false; $('dialog').classList.add('hidden'); }
      if (UI.ch.active) { UI.ch.active = false; $('choices').classList.add('hidden'); }
      if (UI.cardActive) UI.closeCard();
      Gfx.clearParticles(); Ripples.clear();
      Audio.setTone(false); Audio.cluster(false);
      this.current = def; State.sceneId = id; Hints.reset();
      Player.enabled = true; Player.allowGut = true; Player.allowLook = true; Player.collide = null; Player.bounds = null; Player.onWhistle = null; Player.onStaff = null;
      Cam.look = 0; Cam.lookTarget = 0; Cam.minY = null;
      try { def.enter(opts.arg); } catch (e) { console.error(e); }
      Bus.emit('scene', id);
    };
    if (opts.instant) { Scripts.kill('transition'); this.busy = false; doSwitch(); UI.fade(0, 0.5); return; }
    if (this.busy) return;
    this.busy = true;
    const self = this;
    Scripts.run(function* () {
      yield UI.fade(1, opts.fadeOut == null ? 0.8 : opts.fadeOut);
      self.busy = false;
      doSwitch();
      yield 0.15;
      yield UI.fade(0, opts.fadeIn == null ? 0.9 : opts.fadeIn);
    }, 'transition');
  },
};

// ------------------------------------------------------------
// Üç Işık: duruma göre ipucu, 3 kademe; hiçbir zaman engellemez
// ------------------------------------------------------------
const Hints = {
  level: 0, ctx: null, flash: 0,
  reset() { this.level = 0; this.ctx = null; this.flash = 0; },
  request() {
    const sc = Scenes.current;
    if (!sc || !sc.hint || UI.blocking()) { UI.bark('Şimdi bir ışığa gerek yok.', null, 2, true); return; }
    const h = sc.hint();
    if (!h) { UI.bark('Şimdi bir ışığa gerek yok.', null, 2, true); return; }
    if (h.ctx !== this.ctx) { this.ctx = h.ctx; this.level = 0; }
    this.level = Math.min(3, this.level + 1);
    State.stats.ipucu++;
    const L = h.levels[this.level - 1];
    if (L.fx) L.fx();
    this.flash = this.level === 2 ? 30 : this.flash;
    UI.showHint(this.level, L.text, { think: L.think, who: L.who, onContinue: this.level >= 3 ? h.onContinue : null });
  },
  auto(level) { // kural gereği kendiliğinden gelen ışık (ör. ikinci yanlış kapı)
    const sc = Scenes.current; if (!sc || !sc.hint) return;
    const h = sc.hint(); if (!h) return;
    this.ctx = h.ctx; this.level = level - 1; this.request();
  },
};
Bus.on('hintRequest', () => Hints.request());

// ------------------------------------------------------------
// Kırlar dünyası
// ------------------------------------------------------------
const NIGHT_LAYOUT = {
  K1: [[8, 3], [9, 2], [9, 4], [10, 3]],
  K2: [[24, 3], [25, 2], [25, 3], [25, 4], [26, 3]],
  K3: [[28, 8], [29, 9]],
};
const TEACH_LAYOUT = {
  K1: [[2.8, 4.3], [3.6, 3.6], [3.4, 5.2], [4.2, 4.5]],
  K2: [[23.5, 3], [24.5, 2.2], [25, 3.4], [24.6, 4.4], [26, 3]],
  K3: [[17.6, 9.0], [28.5, 7.5]],
};
const KW = {
  built: false, map: null, objs: [], tamar: null, father: null, nahum: null, yoas: null, extras: [], sheep: [], lamb: null,
  stage: null, darkA: 0.3, darkTarget: 0.3, darkCol: '#1a1236', fireLit: false, skyLook: false, dipperGlow: 0,
  showRingFX: 0, showStonesFX: 0, showGapsFX: 0, showZoneFX: 0, rimBushFX: 0, indicators: null, lambIndicatorBig: false,
  lambBleatT: 3, motherAnswerT: -1, tamarEye: true, dawn: 0,
  build() {
    if (this.built) return;
    const k = buildKirlar(); this.map = k.map; this.objs = k.objs; this.built = true;
    this.tamar = new Actor({ kind: 'tamar', x: 10, y: 6, speed: 2.5 });
    this.father = new Actor({ kind: 'adult', skin: 'baba', x: 12.7, y: 5.2, speed: 2.5, name: 'Baba' });
    this.nahum = new Actor({ kind: 'adult', skin: 'nahum', x: 12, y: 32.5, speed: 1.6, name: 'Nahum' });
    this.yoas = new Actor({ kind: 'adult', skin: 'yoas', x: 31, y: 4, speed: 2.4, name: 'Yoaş', dir: 'left' });
  },
  makeSheep(layout) {
    SHEEP_ID = 0;
    const list = [];
    Object.keys(layout).forEach((g) => layout[g].forEach(([x, y], i) => { const s = new Sheep(x, y, g); if (g === 'K2' && i === 2) s.mother = true; list.push(s); }));
    this.sheep = list;
    Flock.reset(this.map, list); Flock.tamar = this.tamar;
    return list;
  },
  mother() { return this.sheep.find((s) => s.mother); },
  // sahne başlangıç durumları (debug.goto ile doğrudan atlamayı da destekler)
  ensure(stage) {
    this.build();
    const t = this.tamar, f = this.father;
    t.pose = null; t.carry = null; t.lamp = null; t.visible = true; t.path = null; t.alpha = 1;
    f.pose = null; f.path = null; f.visible = true; f.carry = null;
    this.nahum.visible = true; this.yoas.visible = true; this.nahum.pose = null; this.yoas.pose = null; this.nahum.path = null; this.yoas.path = null;
    this.extras = []; this.skyLook = false; this.dipperGlow = 0; this.indicators = null; this.fireLit = false;
    this.showRingFX = this.showStonesFX = this.showGapsFX = this.showZoneFX = this.rimBushFX = 0; this.lambIndicatorBig = false; this.dawn = 0;
    Cam.bounds = { x0: -8, y0: -7.5, x1: 40, y1: 38 };
    Cam.minY = -0.5;
    this.lamb = { x: 18.5, y: -1.9, mode: 'stuck', visible: true, faceR: false, animT: 0 };
    if (stage === 'ogretim') {
      this.makeSheep(TEACH_LAYOUT); Flock.night = false;
      t.x = 7; t.y = 6.5; t.dir = 'right'; f.x = 5; f.y = 6.4; f.dir = 'left'; f.lamp = null; f.stone = null;
      this.darkA = this.darkTarget = 0.4; this.darkCol = '#2a1640';
      this.nahum.x = 12; this.nahum.y = 32.5; this.yoas.x = 31; this.yoas.y = 4;
    } else if (stage === 'kuzu' || stage === 'suru') {
      this.makeSheep(NIGHT_LAYOUT); Flock.night = true;
      t.x = 12.6; t.y = 6.6; t.dir = 'up';
      f.x = STONES.T2.x + 0.7; f.y = STONES.T2.y; f.pose = null; f.dir = 'down'; f.stone = 'T2'; f.standing = false; f.lamp = { ground: true, raised: false };
      f.sitting = true;
      this.darkA = this.darkTarget = 0.8; this.darkCol = '#03040f';
      this.nahum.x = 12; this.nahum.y = 32.5; this.yoas.x = 31; this.yoas.y = 4; this.yoas.dir = 'left';
      if (stage === 'suru') { this.lamb.mode = 'carried'; this.lamb.visible = false; f.carry = 'lamb'; t.x = 12.2; t.y = 7; }
    } else if (stage === 'agil' || stage === 'haydi') {
      this.makeSheep(NIGHT_LAYOUT); Flock.night = true;
      this.darkA = this.darkTarget = 0.8; this.darkCol = '#03040f';
      Cam.minY = null;
      this.lamb.mode = 'carried'; this.lamb.visible = false;
      this.yoas.x = 6.5; this.yoas.y = 31.6; this.yoas.dir = 'down';
      this.nahum.x = 12.2; this.nahum.y = 31.4;
      if (stage === 'agil') {
        // sürü kapının önünde toplanmış
        this.sheep.forEach((s, i) => { const a = (i / 11) * 6.28; s.x = 5 + Math.cos(a) * 2; s.y = 32.4 + Math.sin(a) * 1.0; s.gathered = true; s.gatherAt = { x: 5, y: 33 }; s.mode = 'arrive'; });
        t.x = 8.5; t.y = 31.8; t.dir = 'left';
        f.x = 5.7; f.y = 33; f.carry = 'lamb'; f.lamp = { raised: true }; f.stone = 'T8';
      } else {
        this.fireLit = true;
        this.sheep.forEach((s, i) => { s.inFold = true; s.x = 2 + (i % 4) * 0.9; s.y = 35.1 + Math.floor(i / 4) * 0.55; s.mode = 'idle'; });
        t.x = 9; t.y = 32.7; t.dir = 'up';
        f.x = 10.8; f.y = 31.6; f.dir = 'left'; f.lamp = { raised: false }; f.carry = null;
        this.lamb.mode = 'limp'; this.lamb.visible = true; this.lamb.x = 8.2; this.lamb.y = 33.2;
        this.nahum.x = 11.6; this.nahum.y = 32.9; this.yoas.x = 9.2; this.yoas.y = 31.4;
      }
    } else if (stage === 'yanki') {
      this.makeSheep(NIGHT_LAYOUT); Flock.night = false;
      this.sheep.forEach((s, i) => { s.inFold = true; s.x = 2 + (i % 5) * 1.4; s.y = 35.1 + Math.floor(i / 5) * 0.7; s.mode = 'idle'; });
      this.darkA = this.darkTarget = 0.42; this.darkCol = '#2a3048'; this.dawn = 1;
      Cam.minY = null;
      this.lamb.visible = false;
      t.x = 33.5; t.y = 33.5; t.dir = 'left'; f.x = 34.5; f.y = 33.2; f.lamp = null; f.carry = null; f.dir = 'left';
      this.nahum.visible = false; this.yoas.visible = false;
    }
    this.stage = stage;
    Player.init(t, this.map);
    Cam.follow(t.x, t.y, 0, true);
  },
  update(dt) {
    this.darkA = approach(this.darkA, this.darkTarget, dt * 0.12);
    this.father.update(dt); this.nahum.update(dt); this.yoas.update(dt);
    this.extras.forEach((e) => e.update(dt));
    Flock.update(dt);
    this.updateLamb(dt);
    Ripples.update(dt);
    Gfx.updateParticles(dt);
    if (this.fireLit && Math.random() < dt * 14) Gfx.spawn({ x: FIRE.x * TILE + (Math.random() - 0.5) * 6, y: FIRE.y * TILE - 2, vx: (Math.random() - 0.5) * 6, vy: -14 - Math.random() * 12, t: 0, life: 0.8 + Math.random() * 0.8, c: Math.random() < 0.5 ? '#ffb35c' : '#ffe08a', s: 1 });
    const t = this.tamar;
    Audio.listenerX = t.x;
    // ışıkta süzülen toz ve gece böcekleri (ince parçacıklar)
    const lampA = this.father.lamp && !this.father.lamp.ground ? this.father : this.tamar.lamp ? this.tamar : null;
    if (lampA && Math.random() < dt * 2.2) {
      const p = lampA.lampWorld();
      Gfx.spawn({ x: p.x * TILE + (Math.random() - 0.5) * 60, y: p.y * TILE + (Math.random() - 0.5) * 40, vx: (Math.random() - 0.5) * 5, vy: -2 - Math.random() * 3, t: 0, life: 2.5 + Math.random() * 2, c: '#ffe2a0', a: 0.55, layer: 1 });
    }
    // kamera: baş kaldırma 6 karo kuzeye; gök bakışı tam gök
    if (this.skyLook) Cam.lookTarget = -22 * TILE - Cam.y;
    else Cam.lookTarget = Player.lookUp && Player.allowLook ? -6 * TILE : 0;
    Cam.follow(this.camFocus ? this.camFocus.x : t.x, this.camFocus ? this.camFocus.y : t.y - 0.6, dt);
    if (this.showRingFX > 0) this.showRingFX -= dt;
    if (this.showStonesFX > 0) this.showStonesFX -= dt;
    if (this.showGapsFX > 0) this.showGapsFX -= dt;
    if (this.showZoneFX > 0) this.showZoneFX -= dt;
    if (this.rimBushFX > 0) this.rimBushFX -= dt;
  },
  updateLamb(dt) {
    const L = this.lamb; if (!L) return;
    L.animT += dt;
    if (L.mode === 'limp' || L.mode === 'follow' || L.mode === 'script') {
      if (L.goal) {
        const d = dist(L.x, L.y, L.goal.x, L.goal.y), sp = (L.speed || 0.9) * dt * (0.65 + 0.35 * Math.abs(Math.sin(L.animT * 5)));
        if (d > 0.1) { L.x += ((L.goal.x - L.x) / d) * Math.min(sp, d); L.y += ((L.goal.y - L.y) / d) * Math.min(sp, d); L.faceR = L.goal.x > L.x; L.moving = true; }
        else { L.moving = false; L.goal = null; if (L.onArrive) { const f = L.onArrive; L.onArrive = null; f(); } }
      } else L.moving = false;
    }
  },
  lambBleat(vol) {
    const L = this.lamb, t = this.tamar;
    const d = dist(L.x, L.y, t.x, t.y);
    Audio.bleat('kuzu', L.x, vol == null ? clamp(0.5 - d * 0.018, 0.12, 0.5) : vol);
    Ripples.add(L.x, L.y - 0.4, 'thin');
  },
  // ---------------- çizim ----------------
  draw(g) {
    const cx = Cam.px(), cy = Cam.py(), map = this.map;
    const mapTop = (map.y0 + 1.5) * TILE - cy; // SKY satırlarının altı
    // gök
    if (mapTop > 0) {
      const dawn = this.dawn;
      Gfx.drawSky(g, cx, cy, { dim: dawn ? 0.3 : clamp((this.darkA - 0.15) * 1.6, 0.25, 1), top: dawn ? '#2a2c4a' : this.darkA < 0.5 ? '#1a1236' : '#04051a', bot: dawn ? '#9a8090' : this.darkA < 0.5 ? '#6a4a6a' : '#18204a', dipperGlow: this.dipperGlow });
      Gfx.drawRidge(g, cx, mapTop + 10, { olives: true, col: dawn ? '#3a3a52' : '#0c1030' });
    } else { g.fillStyle = '#05060f'; g.fillRect(0, 0, VW, VH); }
    // harita
    const ix = (map.x0 - 0.5) * TILE, iy = (map.y0 - 0.5) * TILE;
    blitMap(g, map.img, cx - ix, cy - iy);
    // y sıralı çizim
    const list = this.drawList || (this.drawList = []);
    list.length = 0;
    for (const o of this.objs) if (Math.abs(o.x * TILE - cx - VW / 2) < VW / 2 + 48 && Math.abs(o.y * TILE - cy - VH / 2) < VH / 2 + 64) list.push(o);
    const t = this.tamar, night = Flock.night && this.darkA > 0.5;
    for (const s of this.sheep) {
      if (!s.visible) continue;
      if (night && !s.inFold && !Flock.inLight(s) && dist(s.x, s.y, t.x, t.y) > 6 && !this.fireLit) continue; // karanlıkta görünmez (Kural 4)
      list.push(s);
    }
    if (this.lamb && this.lamb.visible && this.lamb.mode !== 'carried') list.push(this.lamb);
    [this.father, this.nahum, this.yoas, this.tamar].concat(this.extras).forEach((a) => a.visible && list.push(a));
    list.sort((a, b) => a.y - b.y);
    for (const o of list) {
      if (o instanceof Actor) o.draw(g, cx, cy);
      else if (o instanceof Sheep) drawSheep(g, o, cx, cy);
      else if (o === this.lamb) drawLamb(g, o, cx, cy);
      else drawObj(g, o, cx, cy, this);
    }
    Gfx.drawParticles(cx, cy, 0);
    // ışık
    Gfx.resetLights();
    const f = this.father;
    const lampOf = (a, raisedR) => {
      if (!a.lamp) return;
      const p = a.lampWorld(), sx = p.x * TILE - cx, sy = p.y * TILE - cy;
      const r = a.kind === 'tamar' ? 80 : a.lamp.raised ? 160 : 32;
      const flick = 1 + Math.sin(State.time * 13) * 0.015 + Math.sin(State.time * 7.3) * 0.02;
      Gfx.light(sx, sy, r * flick, 1);
      Gfx.glow(sx, sy, Math.min(64, r * 0.5), a.lamp.raised || a.kind === 'tamar' ? 0.5 : 0.35);
    };
    lampOf(f); lampOf(t);
    if (this.fireLit) { const fx = FIRE.x * TILE - cx, fy = FIRE.y * TILE - cy, fl = 1 + Math.sin(State.time * 11) * 0.04 + Math.sin(State.time * 17) * 0.03; Gfx.light(fx, fy - 4, 96 * fl, 1); Gfx.glow(fx, fy - 4, 56, 0.55); }
    if (this.tamarEye && night) Gfx.light(t.x * TILE - cx, t.y * TILE - cy - 8, 96, 0.4);
    if (this.extraLights) this.extraLights(cx, cy);
    Gfx.applyDark(this.darkCol, this.darkA);
    // ışık sonrası katman: halka kenarı, menzil, koni, Bakış kenar ışıkları
    if (f.lamp && f.lamp.raised && night) { const p = f.lampWorld(); Gfx.dashedCircle(p.x * TILE - cx, p.y * TILE - cy + 12, 160, '#ffcf7a', 3, 5, this.showRingFX > 0 ? 0.8 : 0.28); }
    if (t.lamp && night) { const p = t.lampWorld(); Gfx.dashedCircle(p.x * TILE - cx, p.y * TILE - cy + 6, 80, '#ffcf7a', 2, 5, 0.3); }
    if (Player.charging) Gfx.dashedCircle(t.x * TILE - cx, t.y * TILE - cy, WHISTLE_R * TILE, '#cfe0ff', 2, 6, 0.55);
    if (t.staffT > 0) drawCone(g, t, cx, cy);
    if (this.showZoneFX > 0) {
      g.globalAlpha = 0.5 + 0.3 * Math.sin(State.time * 5); g.strokeStyle = '#cfe0ff';
      for (let y = 5; y <= 9; y++) g.strokeRect(Math.round((21 - 0.5) * TILE - cx) + 0.5, Math.round((y - 0.5) * TILE - cy) + 0.5, 15, 15);
      g.globalAlpha = 1;
    }
    if (this.overlay) this.overlay(g, cx, cy);
    if (Player.bakis || this.showStonesFX > 0 || this.showGapsFX > 0) drawRims(g, this, cx, cy);
    drawRipples(g, this, cx, cy);
    Gfx.drawParticles(cx, cy, 1);
    if (Player.bakis) Gfx.vignette(0.65);
  },
};
function blitMap(g, img, sx, sy) {
  sx = Math.round(sx); sy = Math.round(sy);
  let dx = 0, dy = 0, w = VW, h = VH;
  if (sx < 0) { dx = -sx; w += sx; sx = 0; }
  if (sy < 0) { dy = -sy; h += sy; sy = 0; }
  if (sx + w > img.width) w = img.width - sx;
  if (sy + h > img.height) h = img.height - sy;
  if (w > 0 && h > 0) g.drawImage(img, sx, sy, w, h, dx, dy, w, h);
}
function drawSheep(g, s, cx, cy) {
  const sx = Math.round(s.x * TILE - cx), sy = Math.round(s.y * TILE - cy) + 4;
  const set = s.faceR ? ART.sheep : ART.sheepL;
  let spr;
  if (s.moving) spr = Math.floor(s.animT) % 2 ? set.b : set.a;
  else if (s.earsT > 0 || (Flock.night && Flock.inLight(s))) spr = set.ears;
  else spr = (Math.sin(s.grazeT * 1.3 + s.id) > 0.2 && !Flock.night) || (s.mode === 'idle' && Math.sin(State.time * 0.5 + s.id) > 0.3) ? set.graze : set.a;
  let jx = 0;
  if (s.startleT > 0 && !REDUCED) jx = Math.round(Math.sin(State.time * 40 + s.id) * 1);
  g.fillStyle = 'rgba(0,0,10,0.35)'; g.fillRect(sx - 6, sy - 1, 12, 2);
  g.drawImage(spr, sx - 8 + jx, sy - spr.height);
  if (s.stuck && Flock.night && (State.time * 2 + s.id) % 3 < 1.2) { g.fillStyle = '#e8c66a'; g.fillRect(sx - 1, sy - 17, 2, 4); g.fillRect(sx - 1, sy - 12, 2, 1); }
}
function drawLamb(g, L, cx, cy) {
  const sx = Math.round(L.x * TILE - cx), sy = Math.round(L.y * TILE - cy) + 4;
  const set = L.faceR ? ART.lamb : ART.lambL;
  const spr = L.moving && Math.floor(L.animT * 6) % 2 ? set.b : set.a;
  g.fillStyle = 'rgba(0,0,10,0.3)'; g.fillRect(sx - 4, sy - 1, 8, 2);
  let jx = L.mode === 'stuck' && !REDUCED ? Math.round(Math.sin(State.time * 9) * 0.6) : 0;
  g.drawImage(spr, sx - 6 + jx, sy - spr.height);
}
function drawObj(g, o, cx, cy, w) {
  const sx = Math.round(o.x * TILE - cx), sy = Math.round(o.y * TILE - cy) + 4;
  switch (o.kind) {
    case 'tree': case 'rock': case 'bush': case 'stone': case 'lambbush': case 'gatebush':
      g.drawImage(o.spr, sx - (o.spr.width >> 1), sy - o.spr.height);
      if (o.kind === 'stone') { g.fillStyle = 'rgba(30,26,20,0.7)'; g.fillRect(sx - 1, sy - 8, 2, 1); }
      break;
    case 'fire': {
      g.fillStyle = '#0a0b1a'; g.fillRect(sx - 7, sy - 4, 14, 5);
      g.fillStyle = '#6e675a'; [[-7, -3], [-4, -1], [2, -1], [5, -3], [-1, -4]].forEach(([a, b]) => g.fillRect(sx + a, sy + b, 3, 2));
      g.fillStyle = '#4a3020'; g.fillRect(sx - 4, sy - 3, 8, 2);
      if (w.fireLit) {
        const t = State.time;
        for (let i = 0; i < 9; i++) {
          const h = 3 + ((Math.sin(t * 9 + i * 1.7) + 1) * 3.5) | 0, x = sx - 4 + i;
          g.fillStyle = '#e06a2a'; g.fillRect(x, sy - 3 - h, 1, h);
          if (i > 1 && i < 7) { g.fillStyle = '#ffb35c'; g.fillRect(x, sy - 3 - Math.max(1, h - 3), 1, Math.max(1, h - 3)); }
          if (i > 2 && i < 6) { g.fillStyle = '#fff0b0'; g.fillRect(x, sy - 4, 1, 2); }
        }
      }
      break;
    }
    case 'house': {
      const wpx = o.w * TILE, x0 = sx - wpx / 2, y0 = sy - 34;
      g.fillStyle = '#0a0b1a'; g.fillRect(x0 - 1, y0 - 1, wpx + 2, 36);
      g.fillStyle = '#8a7a62'; g.fillRect(x0, y0 + 6, wpx, 28);
      g.fillStyle = '#a8987a'; for (let k = 0; k < wpx; k += 6) g.fillRect(x0 + k, y0 + 10 + ((k / 6) % 2) * 6, 4, 2);
      g.fillStyle = '#5a4a36'; g.fillRect(x0 - 1, y0, wpx + 2, 6); g.fillStyle = '#7a6a50'; g.fillRect(x0, y0 + 1, wpx, 2);
      g.fillStyle = '#16120e'; g.fillRect(x0 + wpx / 2 - 4, y0 + 19, 8, 15);
      break;
    }
    case 'foldgate': {
      g.fillStyle = '#4a3020'; g.fillRect(sx - 9, sy - 18, 2, 16); g.fillRect(sx + 7, sy - 18, 2, 16);
      if (w.gateClosed) { g.fillStyle = '#6a4a2a'; for (let k = 0; k < 3; k++) g.fillRect(sx - 7, sy - 15 + k * 5, 14, 2); }
      break;
    }
  }
}
function drawCone(g, t, cx, cy) {
  const ox = t.x * TILE - cx, oy = t.y * TILE - cy, a0 = Math.atan2(t.faceDY, t.faceDX), R = 4 * TILE;
  const al = clamp(t.staffT / 0.25, 0, 1) * 0.6;
  Gfx.dashedLine(ox, oy, ox + Math.cos(a0 - 0.52) * R, oy + Math.sin(a0 - 0.52) * R, '#e8dcb8', al);
  Gfx.dashedLine(ox, oy, ox + Math.cos(a0 + 0.52) * R, oy + Math.sin(a0 + 0.52) * R, '#e8dcb8', al);
  g.fillStyle = '#e8dcb8'; g.globalAlpha = al;
  for (let a = -0.52; a <= 0.52; a += 0.06) g.fillRect(Math.round(ox + Math.cos(a0 + a) * R), Math.round(oy + Math.sin(a0 + a) * R), 1, 1);
  g.globalAlpha = 1;
}
// Bakış: etkileşimli nesnelerde ince kenar ışığı
function drawRims(g, w, cx, cy) {
  const pulse = 0.6 + 0.4 * Math.sin(State.time * 4);
  const herding = Scenes.current && (Scenes.current.id === 'isigin_ardindan' || Scenes.current.id === 'yamac_ogretim');
  if (herding || w.showStonesFX > 0) {
    for (const o of w.objs) if (o.kind === 'stone') { g.globalAlpha = (w.showStonesFX > 0 ? 1 : 0.7) * pulse; g.drawImage(ART.stoneRim, Math.round(o.x * TILE - cx) - 6, Math.round(o.y * TILE - cy) + 4 - ART.stone.height - 1); }
    const k = STONES.T8; g.globalAlpha = pulse * 0.8; g.strokeStyle = '#ffe9a8';
    g.strokeRect(Math.round((k.x - 0.6) * TILE - cx) + 0.5, Math.round((k.y + 0.2) * TILE - cy) + 0.5, 19, 15);
    g.globalAlpha = 1;
  }
  if (w.showGapsFX > 0) {
    g.globalAlpha = pulse; g.strokeStyle = '#ffe9a8';
    [[2, 3, 10], [16, 17, 21], [4, 5, 30]].forEach(([a, b, y]) => g.strokeRect(Math.round((a - 0.5) * TILE - cx) + 0.5, Math.round((y - 0.5) * TILE - cy) + 0.5, (b - a + 1) * TILE - 1, TILE - 1));
    g.globalAlpha = 1;
  }
  if (w.rimTargets) w.rimTargets(g, cx, cy, pulse);
}
// ses dalgaları: ekranda halka, ekran dışında kenar göstergesi (ince tek / kalın çift)
function drawRipples(g, w, cx, cy) {
  if (!Player.bakis && !w.forceIndicators) return;
  const t = w.tamar;
  for (const r of Ripples.list) {
    if (w.indicators === 'lamb' && r.kind !== 'thin' && r.kind !== 'thick') continue;
    const sx = r.x * TILE - cx, sy = r.y * TILE - cy;
    const thin = r.kind === 'thin';
    const k = r.t / 1.6, a = (1 - k) * 0.9;
    const big = thin && w.lambIndicatorBig ? 2 : 1;
    // duvar dibinde kuzunun yönü kaybolur: ses duvarın içinden geliyormuş gibi titrer
    if (thin && w.lambWallConfuse && w.lambWallConfuse()) {
      const jx = (Math.sin(State.time * 23) + Math.sin(State.time * 31)) * 10;
      const px = t.x * TILE - cx + jx, py = 0 * TILE - cy;
      g.globalAlpha = a; g.strokeStyle = '#e8eeff'; g.lineWidth = 1;
      g.beginPath(); g.arc(px, py + 4, 6 + k * 14, 0.2, Math.PI - 0.2); g.stroke();
      g.globalAlpha = 1;
      continue;
    }
    if (sx > 6 && sx < VW - 6 && sy > 6 && sy < VH - 6) {
      g.strokeStyle = thin ? '#eef2ff' : '#ffe2b0'; g.globalAlpha = a;
      if (thin) { g.lineWidth = big; g.beginPath(); g.arc(sx, sy, 3 + k * 22 * big, 0, 6.283); g.stroke(); }
      else { g.lineWidth = 2; g.beginPath(); g.arc(sx, sy, 3 + k * 18, 0, 6.283); g.stroke(); g.beginPath(); g.arc(sx, sy, 8 + k * 18, 0, 6.283); g.stroke(); }
      g.globalAlpha = 1; g.lineWidth = 1;
    } else {
      const ccx = VW / 2, ccy = VH / 2, dx = sx - ccx, dy = sy - ccy;
      const s = Math.min((VW / 2 - 16) / Math.abs(dx || 1e-6), (VH / 2 - 16) / Math.abs(dy || 1e-6));
      const ex = ccx + dx * s, ey = ccy + dy * s, ang = Math.atan2(dy, dx);
      g.strokeStyle = thin ? '#eef2ff' : '#ffe2b0'; g.globalAlpha = a;
      const rr = (thin ? 7 : 6) * big + k * 4;
      if (thin) { g.lineWidth = big; g.beginPath(); g.arc(ex - Math.cos(ang) * 6, ey - Math.sin(ang) * 6, rr, ang - 0.9, ang + 0.9); g.stroke(); }
      else { g.lineWidth = 2.5; g.beginPath(); g.arc(ex - Math.cos(ang) * 8, ey - Math.sin(ang) * 8, rr, ang - 0.8, ang + 0.8); g.stroke(); g.beginPath(); g.arc(ex - Math.cos(ang) * 8, ey - Math.sin(ang) * 8, rr + 5, ang - 0.8, ang + 0.8); g.stroke(); }
      g.globalAlpha = 1; g.lineWidth = 1;
    }
  }
}

// ------------------------------------------------------------
// Yardımcı betikler
// ------------------------------------------------------------
const NUM = ['bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on', 'on bir'];
const SAY = {
  baba: (text, o) => Object.assign({ who: 'Baba', por: 'baba', text }, o || {}),
  tamar: (text, o) => Object.assign({ who: 'Tamar', por: 'tamar', text }, o || {}),
  think: (text) => ({ who: 'Tamar', por: 'tamar', text, kind: 'think' }),
  yasli: (text) => ({ who: 'Yaşlı Tamar', por: 'yasli', text }),
  sara: (text) => ({ who: 'Sara', por: 'sara', text }),
  nahum: (text) => ({ who: 'Nahum', text }),
  yoas: (text) => ({ who: 'Yoaş', text }),
};
function nearStone(t) { for (const k in STONES) { const s = STONES[k]; if (dist(t.x, t.y, s.x, s.y) <= 1.5) return k; } return null; }

// ============================================================
// SAHNE 2 — Alacakaranlık: "Ustayı izle" (yazısız öğretim)
// ============================================================
Scenes.define('yamac_ogretim', {
  title: 'Alacakaranlık: günün işi',
  enter() {
    KW.ensure('ogretim');
    Audio.setAmbience({ wind: 0.1, crickets: true });
    Audio.setDrone(true, 110);
    const sc = this, t = KW.tamar, f = KW.father;
    sc.step = 0; sc.lastPushT = 0;
    KW.skyLook = true;
    Player.enabled = false;
    Player.onStaff = (second) => {
      const r = Flock.staff(t, t.faceDX, t.faceDY, second);
      if (r.pushed) Audio.bleat('koyun', t.x + t.faceDX * 2, 0.2);
    };
    Player.onWhistle = (W) => { Flock.whistle(W, sekiOf(t.y)); };
    Player.interactables = [
      { x: STONES.T2.x, y: STONES.T2.y, r: 1.5, label: 'Baba, buraya!', enabled: () => sc.step === 3 && !sc.called, action: () => {
        sc.called = true; UI.bark('Baba, buraya!', 'Tamar', 1.6);
        f.walkTo(KW.map, STONES.T2.x + 0.7, STONES.T2.y, () => { f.dir = 'down'; f.stone = 'T2'; sc.arrived = true; });
      } },
    ];
    Scripts.run(function* () {
      yield 0.6;
      UI.bark('Beytlehem kırları · alacakaranlık', null, 3.2);
      yield 2.4;
      KW.skyLook = false;
      yield until(() => Math.abs(Cam.look) < 4);
      Player.enabled = true;
      yield* sc.teach();
    }, 'scene');
  },
  *teach() {
    const sc = this, t = KW.tamar, f = KW.father;
    const K1 = KW.sheep.filter((s) => s.group === 'K1');
    const lone = KW.sheep.find((s) => s.group === 'K3' && s.x < 20);
    // Adım 1 — Değnek
    sc.step = 1;
    yield until(() => !f.path);
    f.walkTo(KW.map, 1.4, 4.4);
    yield until(() => !f.path);
    f.face(1, 0);
    yield 0.4;
    Flock.staff(f, 1, 0, false); Audio.staff(f.x); f.staffT = 0.25; yield 0.45;
    Flock.staff(f, 1, 0, true); Audio.staff(f.x); f.staffT = 0.25;
    yield 0.6;
    yield UI.say([SAY.baba('Değneği yere vur, koyuna değil. Gündüz seni gözleriyle izlerler.')]);
    UI.prompt('gut', 'Güt: kısa bas — değnek');
    sc.hintCtx = 'degnek';
    const ok1 = () => K1.every((s) => dist(s.x, s.y, STONES.T2.x, STONES.T2.y) <= 3);
    yield until(() => ok1() && K1.every((s) => s.mode === 'idle'));
    sc.hintCtx = null;
    Audio.chime();
    // Adım 2 — Islık
    sc.step = 2;
    f.walkTo(KW.map, 13.6, 7.2);
    yield until(() => !f.path);
    f.face(1, 0.4); f.pointT = 2;
    yield UI.say([SAY.baba('Görmediğini sesinle çağır.')]);
    sc.hintCtx = 'islik';
    yield until(() => dist(lone.x, lone.y, t.x, t.y) <= 3);
    sc.hintCtx = null;
    Audio.chime();
    // Adım 3 — Çağrı
    sc.step = 3;
    f.walkTo(KW.map, STONES.T1.x + 0.7, STONES.T1.y);
    yield until(() => !f.path);
    f.dir = 'right';
    yield UI.say([SAY.baba('Beni Orta taşa çağır.')]);
    sc.hintCtx = 'cagri';
    yield until(() => sc.arrived);
    sc.hintCtx = null;
    Audio.chime();
    // Adım 4 — Baş kaldırma
    sc.step = 4;
    yield 0.5;
    f.dir = 'up';
    yield UI.say([SAY.baba('Şu yedi yıldız gece boyu döner ama hep kuzeyde kalır. Döndükleri yerin ortası kuzeydir.')]);
    sc.hintCtx = 'bas';
    UI.prompt('look', 'Başını kaldır');
    let held = 0;
    yield (dt) => { if (Player.lookUp) held += dt; if (held > 0.25) { KW.skyLook = true; KW.dipperGlow = Math.min(1, KW.dipperGlow + dt); } return held >= 2.2; };
    UI.prompt(null);
    sc.hintCtx = null;
    yield 1.4;
    KW.skyLook = false; KW.dipperGlow = 0;
    yield until(() => Math.abs(Cam.look) < 6);
    // sürü toplanır, akşam duası
    Player.enabled = false;
    KW.sheep.forEach((s, i) => { const a = (i / 11) * 6.283; s.mode = 'script'; s.goal = { x: STONES.T2.x + Math.cos(a) * 2.2, y: STONES.T2.y + 0.4 + Math.sin(a) * 1.7 }; s.speed = 1.1; });
    yield UI.say([SAY.baba('Dinle, ey İsrail! Tanrımız RAB tek RAB\'dir.', { kind: 'verse', ref: 'Yasa\'nın Tekrarı 6:4 · [yakın aktarım] · mırıldanarak' })]);
    yield until(() => KW.sheep.every((s) => !s.goal));
    f.dir = 'down';
    yield 0.8;
    yield UI.say([SAY.baba('On bir... Kuzu nerede?'), SAY.baba('Bırak otlasınlar; önce kuzuyu bul.')]);
    // gece konumlarına dağılır, ışık kararır
    const night = [].concat(NIGHT_LAYOUT.K1, NIGHT_LAYOUT.K2, NIGHT_LAYOUT.K3);
    const order = ['K1', 'K1', 'K1', 'K1', 'K2', 'K2', 'K2', 'K2', 'K2', 'K3', 'K3'];
    const used = {};
    KW.sheep.forEach((s) => { const g = s.group; used[g] = used[g] || 0; const pos = NIGHT_LAYOUT[g][used[g]++]; s.goal = { x: pos[0], y: pos[1] }; s.speed = 1.0; s.mode = 'script'; });
    void night; void order;
    KW.darkTarget = 0.8; KW.darkCol = '#03040f';
    yield 2.5;
    f.lamp = { ground: true, raised: false };
    yield until(() => KW.sheep.every((s) => !s.goal));
    KW.sheep.forEach((s) => { s.mode = 'idle'; s.home = { x: s.x, y: s.y }; });
    Player.enabled = true;
    Scenes.goto('meleyen_ses', { fadeOut: 0.6, fadeIn: 0.6 });
  },
  update(dt) {
    KW.update(dt);
    Player.update(dt);
    if (this.step === 1 && !this.hintShown && State.time > 0) { /* yazısız: yalnızca tuş göstergesi */ }
  },
  draw(g) { KW.draw(g); },
  skip() { Scripts.kill('scene'); KW.darkTarget = 0.8; Scenes.goto('meleyen_ses', { fadeOut: 0.3, fadeIn: 0.4 }); },
  hint() {
    const c = this.hintCtx;
    if (c === 'degnek') return { ctx: c, levels: [{ text: 'Babam koyunların arkasına geçip vurmuştu. Ben de onların arkasına geçmeliyim.', think: true }, { text: 'Koyunların batısına geç, yüzünü Orta taşa çevir ve iki kez ritimle vur.', fx: () => (KW.showStonesFX = 6) }, { text: 'Arkalarından vur kızım; koyun değnekten uzaklaşır.', who: 'Baba', onContinue: () => { KW.sheep.filter((s) => s.group === 'K1').forEach((s, i) => { s.mode = 'push'; s.goal = { x: 11 + (i % 2), y: 4 + Math.floor(i / 2) }; s.speed = 1.2; }); } }] };
    if (c === 'islik') return { ctx: c, levels: [{ text: 'Kayanın arkasındakini göremiyorum... ama sesimi duyar.', think: true }, { text: 'Güt\'ü basılı tut: ıslığın menzili yerde belirir. Kayaya 8 karodan yakın ol.' }, { text: 'Kayanın yanına git, Güt\'ü basılı tutup bırak.', who: 'Baba', onContinue: () => { const s = KW.sheep.find((q) => q.group === 'K3' && q.x < 20); Flock.sendWhistle(s, { x: KW.tamar.x, y: KW.tamar.y }); } }] };
    if (c === 'cagri') return { ctx: c, levels: [{ text: 'Babam taşın başında durur. Orta taşa gidip onu çağırmalıyım.', think: true }, { text: 'Orta taş parlıyor.', fx: () => (KW.showStonesFX = 8) }, { text: 'Orta taşın yanına gel ve beni çağır.', who: 'Baba', onContinue: () => { const f = KW.father; f.walkTo(KW.map, STONES.T2.x + 0.7, STONES.T2.y, () => { f.stone = 'T2'; this.arrived = true; }); this.called = true; } }] };
    if (c === 'bas') return { ctx: c, levels: [{ text: 'Babam göğü gösteriyor. Başımı kaldırmalıyım.', think: true }, { text: 'Bakış basılıyken yukarı: ' + Input.keyLabel('look') }, { text: 'Yukarı bak, Tamar.', who: 'Baba', onContinue: () => { KW.skyLook = true; KW.dipperGlow = 1; Input.simulate('bakis', 2600); Input.simulate('up', 2600); } }] };
    return null;
  },
});

// ============================================================
// SAHNE 3 — "Meleyen Ses" (bulmaca 1)
// ============================================================
Scenes.define('meleyen_ses', {
  title: 'Meleyen Ses',
  enter() {
    KW.ensure('kuzu');
    Audio.setAmbience({ wind: 0.14, crickets: true });
    Audio.setDrone(true, 98);
    const sc = this, t = KW.tamar, f = KW.father, L = KW.lamb;
    sc.lookedUp = false; sc.climbed = false; sc.done = false; sc.motherSaid = 0; sc.cycle = 2.5; sc.answer = -1;
    UI.objective('Kuzuyu bulmalıyım.');
    UI.bark('Kuzu ince meler, anası kalın...', 'Tamar', 3, true);
    sc.bakisPromptT = 9;
    KW.indicators = 'lamb';
    KW.lambWallConfuse = () => !sc.climbed && t.y <= 2.2 && t.y > 0;
    Player.onStaff = () => Flock.staff(t, t.faceDX, t.faceDY, false);
    Player.onWhistle = () => {};
    KW.rimTargets = (g, cx, cy, pulse) => {
      const show = (Player.bakis && Player.lookUp) || KW.rimBushFX > 0 || (sc.climbed && Player.bakis);
      if (!show) return;
      g.globalAlpha = pulse; g.strokeStyle = '#ffe9a8';
      g.strokeRect(Math.round(19.5 * TILE - cx) + 0.5, Math.round(-0.5 * TILE - cy) + 0.5, 15, 15);
      g.strokeRect(Math.round(17.5 * TILE - cx) + 0.5, Math.round(-2.6 * TILE - cy) + 0.5, 31, 15);
      g.globalAlpha = 1;
    };
    Player.interactables = [
      { x: 20, y: 1, r: 1.6, label: 'Basamak taşlarından tırman', enabled: () => !sc.climbed && !sc.busy, action: () => sc.climb() },
      { x: 18.5, y: -1.2, r: 1.8, label: 'Dikenleri değnekle arala', enabled: () => sc.climbed && !sc.done && !sc.busy, action: () => sc.rescue() },
    ];
  },
  climb() {
    const sc = this, t = KW.tamar;
    sc.busy = true; Player.enabled = false;
    Scripts.run(function* () {
      t.goStraight(20, 1.2); yield until(() => !t.path);
      t.dir = 'up';
      Audio.rustle(20);
      for (let i = 0; i < 3; i++) { t.y -= 0.6; t.setMoving(true, 0.2); Audio.step(20); yield 0.28; }
      t.x = 20; t.y = -1.1; t.setMoving(false, 0);
      Cam.minY = -7.5;
      sc.climbed = true; sc.busy = false; Player.enabled = true;
    }, 'scene');
  },
  rescue() {
    const sc = this, t = KW.tamar, f = KW.father, L = KW.lamb;
    sc.busy = true; Player.enabled = false; sc.done = true;
    Scripts.run(function* () {
      t.goStraight(19.6, -1.3); yield until(() => !t.path);
      t.dir = 'left'; t.staffT = 0.3;
      Audio.rustle(18.5); yield 0.9; Audio.staff(18.5); yield 0.6; Audio.rustle(18.5);
      KW.lambBleat(0.35); yield 0.9;
      L.visible = false; L.mode = 'carried'; t.carry = 'lamb';
      State.flags.kol_b01_kuzu_yunu = true;
      UI.bark('Dikende bir tutam yün kalmış... Alıp kuşağıma soktum.', 'Tamar', 3, true);
      yield 1.6;
      // iniş
      t.goStraight(20, -0.9); yield until(() => !t.path);
      t.dir = 'down';
      for (let i = 0; i < 3; i++) { t.y += 0.7; Audio.step(20); yield 0.25; }
      t.y = 1.2; Cam.minY = -0.5;
      yield 0.3;
      // kuzu topallayarak babaya gider
      t.carry = null; L.visible = true; L.mode = 'limp'; L.x = 20.4; L.y = 1.8; L.speed = 0.8;
      L.goal = { x: STONES.T2.x + 1.4, y: STONES.T2.y + 0.5 };
      UI.objective(null);
      KW.camFocus = { x: 16, y: 5 };
      yield until(() => !L.goal);
      f.sitting = false; f.dir = 'right';
      yield 0.4;
      L.visible = false; L.mode = 'carried'; f.carry = 'lamb';
      KW.lambBleat(0.25);
      yield 1.2;
      KW.camFocus = null;
      Player.enabled = true;
      Scenes.goto('isigin_ardindan', { fadeOut: 0.6, fadeIn: 0.6, arg: { keep: true } });
    }, 'scene');
  },
  update(dt) {
    const sc = this, t = KW.tamar;
    KW.update(dt); Player.update(dt);
    // meleme döngüsü: kuzu 5 sn'de bir, anası 1 sn sonra
    if (!sc.done) {
      sc.cycle -= dt;
      if (sc.cycle <= 0) { sc.cycle = 5; KW.lambBleat(); sc.answer = 1; }
      if (sc.answer > 0) { sc.answer -= dt; if (sc.answer <= 0) { const m = KW.mother(); Audio.bleat('ana', m.x, clamp(0.45 - dist(m.x, m.y, t.x, t.y) * 0.015, 0.1, 0.45)); Ripples.add(m.x, m.y - 0.5, 'thick'); } }
    }
    if (sc.bakisPromptT > 0) { sc.bakisPromptT -= dt; if (!Player.focus) UI.prompt('bakis', 'Bakış: basılı tut — sesler belirginleşir'); if (Player.bakis) sc.bakisPromptT = 0; if (sc.bakisPromptT <= 0) UI.prompt(null); }
    if (Player.lookUp && t.y < 3.5) sc.lookedUp = true;
    // yanlış deneme: anaya varmak
    const m = KW.mother();
    if (m && dist(m.x, m.y, t.x, t.y) < 1.4 && State.time - sc.motherSaid > 8) {
      sc.motherSaid = State.time; m.faceR = t.x > m.x; m.earsT = 1;
      UI.bark('Bu anası. Kuzu başka yerde.', 'Tamar', 2.6, true);
    }
  },
  draw(g) { KW.draw(g); },
  exit() { KW.indicators = null; KW.lambWallConfuse = null; KW.rimTargets = null; KW.camFocus = null; },
  skip() { if (this.done) return; KW.tamar.x = 19.6; KW.tamar.y = -1.3; this.climbed = true; Cam.minY = -7.5; this.rescue(); },
  hint() {
    const t = KW.tamar, sc = this;
    if (sc.done) return null;
    const auto = () => { // Hikâye kipi: baba yukarıyı gösterir, sahne kendiliğinden ilerler; yün yine verilir
      KW.father.dir = 'up'; UI.bark('Yukarıda, çalının içinde!', 'Baba', 2.4);
      Player.enabled = false; sc.busy = true;
      Scripts.run(function* () {
        t.walkTo(KW.map, 20, 1.3); yield until(() => !t.path);
        sc.busy = false; sc.climb(); yield until(() => sc.climbed);
        sc.rescue();
      }, 'scene');
    };
    if (sc.climbed || t.y <= 2.2) return { ctx: 'duvar', onContinue: auto, levels: [
      { text: 'Kuzu duvarın içine giremez ki... Ses nereden geliyor?', think: true },
      { text: 'Basamak taşları ve çalı belli belirsiz parlıyor.', fx: () => { KW.rimBushFX = 12; } },
      { text: 'Başını kaldır, Tamar. Ses yukarıdan geliyor.', who: 'Baba' }] };
    return { ctx: 'once', onContinue: auto, levels: [
      { text: 'Babam "Kuzu ince meler, anası kalın" derdi. İnce olanın peşine düşmeliyim.', think: true },
      { text: 'İnce dalganın göstergesi büyüdü. (Bakış basılıyken izle.)', fx: () => { KW.lambIndicatorBig = true; } },
      { text: 'İnce sesi izle, kızım. Kalın olan anası.', who: 'Baba' }] };
  },
});

// ============================================================
// SAHNE 4 — "Işığın Ardından" (imza bulmaca)
// ============================================================
Scenes.define('isigin_ardindan', {
  title: 'Işığın Ardından',
  enter(arg) {
    if (!(arg && arg.keep && KW.stage === 'kuzu')) KW.ensure('suru');
    KW.stage = 'suru';
    const sc = this, t = KW.tamar, f = KW.father;
    Flock.night = true;
    KW.sheep.forEach((s) => { s.mode = 'idle'; s.gathered = false; s.evalId = -1; s.inFold = false; });
    f.carry = 'lamb'; f.stone = 'T2'; f.sitting = true; f.standing = false; f.lamp = { ground: true, raised: false };
    f.x = STONES.T2.x + 0.7; f.y = STONES.T2.y; f.dir = 'down';
    Flock.lamp = null; Flock.lampId++;
    Audio.setAmbience({ wind: 0.14, crickets: true });
    sc.t = 0; sc.taps = 0; sc.whistles = 0; sc.saidStaff = false; sc.done = false; sc.auto = false; sc.checkT = -1;
    State.stats.gece_islik = 0;
    UI.usta(0, true);
    UI.objective('Sürüyü ağıla indirmeliyiz.');
    KW.indicators = 'flock';
    Player.onStaff = (second) => {
      const r = Flock.staff(t, t.faceDX, t.faceDY, second);
      sc.taps++;
      if (r.dark > 0 && !sc.saidStaff) { sc.saidStaff = true; UI.bark('Beni görmüyorlar ki... Peki neyi görüyorlar?', 'Tamar', 3.4, true); }
      if (sc.taps >= 2 && !f.standing && !f.path) sc.standUp();
    };
    Player.onWhistle = (W) => {
      sc.whistles++; State.stats.gece_islik = sc.whistles; UI.usta(sc.whistles, true);
      Flock.whistle(W, sekiOf(t.y));
    };
    Player.interactables = Object.keys(STONES).map((id) => ({ x: STONES[id].x, y: STONES[id].y, r: 1.5, label: () => 'Baba, buraya! (' + STONES[id].ad + ')', enabled: () => !sc.done && !sc.auto, action: () => sc.call(id) }));
    sc.startDelay = 0.8;
  },
  standUp() {
    const f = KW.father;
    if (f.standing) return;
    f.standing = true; f.sitting = false;
    Scripts.run(function* () {
      yield 0.5;
      f.lamp = { raised: true };
      Flock.lampRaised(STONES[f.stone]);
    }, 'scene');
  },
  call(id) {
    const sc = this, f = KW.father;
    if (f.path) { UI.bark('Yoldayım, kızım.', 'Baba', 1.6); return; }
    if (Flock.units.length) { UI.bark('Bekle kızım, önce gelsinler.', 'Baba', 2); return; }
    if (id === f.stone) {
      if (!f.standing) { UI.bark('Baba, buraya!', 'Tamar', 1.4); sc.standUp(); return; }
      UI.bark('Buradayım, kızım.', 'Baba', 1.8); return;
    }
    const can = fatherCanGo(f, id);
    UI.bark('Baba, buraya!', 'Tamar', 1.2);
    State.stats.cagri++;
    if (!can.ok) {
      // sürü daha yürüyorsa ayrı, kısa bir bekleme cümlesi
      const moving = Flock.sheep.some((s) => s.mode === 'unit' || s.mode === 'seek');
      Scripts.run(function* () { yield 0.9; UI.bark(moving && can.line === 'a' ? 'Bekle kızım, önce gelsinler.' : FATHER_LINES[can.line], 'Baba', 3.4); }, 'bark');
      return;
    }
    f.standing = true; f.sitting = false;
    Flock.lampLowered();
    f.lamp = { raised: false };
    const S = STONES[id];
    f.speed = 2.5;
    f.walkTo(KW.map, S.x + 0.7, S.y, () => {
      f.stone = id; f.dir = 'down';
      Scripts.run(function* () {
        yield 0.4;
        f.lamp = { raised: true };
        Flock.lampRaised(S);
        sc.checkT = 3;
      }, 'scene');
    });
  },
  update(dt) {
    const sc = this, f = KW.father, t = KW.tamar;
    KW.update(dt); Player.update(dt);
    if (sc.done) return;
    sc.t += dt;
    if (!f.standing && !f.path && sc.t > 40) sc.standUp();
    if (sc.startDelay > 0) { sc.startDelay -= dt; if (sc.startDelay <= 0) UI.prompt('bakis', 'Bakış: karanlıktaki koyunların sesleri'); }
    // 3 sn içinde hiçbir koyun yürümezse
    if (sc.checkT > 0) {
      sc.checkT -= dt;
      if (sc.checkT <= 0) {
        const S = STONES[f.stone];
        const all = Flock.sheep.every((s) => s.gathered && s.gatherAt && dist(s.gatherAt.x, s.gatherAt.y, S.x, S.y) < 0.01);
        if (!Flock.movedSinceRaise && !all) UI.bark(FATHER_LINES.ulasmiyor, 'Baba', 3);
      }
    }
    // bitiş: sürü birimi Kapı'da (T8)
    const K = STONES.T8;
    if (f.stone === 'T8' && !f.path && Flock.sheep.every((s) => s.gathered && !s.stuck && s.gatherAt && dist(s.gatherAt.x, s.gatherAt.y, K.x, K.y) < 0.01 && dist(s.x, s.y, K.x, K.y) < 3.4)) {
      sc.done = true;
      State.flags.usta_b01_iki_islik = !sc.auto && sc.whistles <= 2;
      UI.prompt(null); UI.objective(null);
      Audio.chime();
      Scripts.run(function* () { yield 1.2; Scenes.goto('agil_basinda', { arg: { keep: true } }); }, 'scene');
    }
  },
  draw(g) { KW.draw(g); },
  exit() { KW.indicators = null; },
  skip() { // test kısayolu: sürü kapıda toplanmış sayılır
    const f = KW.father, K = STONES.T8;
    Scripts.kill('scene'); Flock.units = [];
    f.path = null; f.x = K.x + 0.7; f.y = K.y; f.stone = 'T8'; f.standing = true; f.lamp = { raised: true };
    Flock.lampRaised(K);
    Flock.sheep.forEach((s, i) => { const a = (i / 11) * 6.28; s.x = K.x + Math.cos(a) * 1.8; s.y = K.y - 0.3 + Math.sin(a) * 1.1; s.gathered = true; s.stuck = false; s.gatherAt = { x: K.x, y: K.y }; s.mode = 'arrive'; s.goal = null; });
    KW.tamar.x = 8; KW.tamar.y = 31.5;
  },
  // "Babam halleder": baba zinciri kendisi yürür (Hikâye kipi)
  autoSolve() {
    const sc = this, t = KW.tamar, f = KW.father;
    sc.auto = true; Player.enabled = false;
    const gatheredAt = (id) => { const S = STONES[id]; return Flock.sheep.every((s) => s.gathered && !s.stuck && s.gatherAt && dist(s.gatherAt.x, s.gatherAt.y, S.x, S.y) < 0.01); };
    const go = function* (id) {
      if (f.stone !== id) {
        Flock.lampLowered(); f.lamp = { raised: false }; const S = STONES[id];
        f.walkTo(KW.map, S.x + 0.7, S.y, () => { f.stone = id; });
        yield until(() => !f.path && f.stone === id);
        yield 0.3; f.lamp = { raised: true }; Flock.lampRaised(S);
      }
      t.walkTo(KW.map, STONES[id].x - 1.2, STONES[id].y + 1.2);
      yield until(() => gatheredAt(id) && !Flock.units.length);
      yield 0.4;
    };
    Scripts.run(function* () {
      UI.bark('Babam halleder.', 'Tamar', 2, true);
      // sürü bir taşta toplanmamışsa önce babanın taşında topla
      if (!f.standing) { sc.standUp(); yield 1; }
      Flock.units = [];
      const loose = Flock.sheep.filter((s) => !(s.gathered && !s.stuck));
      if (loose.length) {
        // takılmış ya da karanlıkta kalan koyunlar kendi sekilerinin geçide bakan taşına
        const seki = sekiOf(loose[0].y);
        const face = seki <= 1 ? 'T2' : seki === 2 ? 'T5' : seki === 3 ? 'T7' : 'T8';
        if (seki <= 1) {
          if (f.stone !== 'T2' || !(f.lamp && f.lamp.raised)) yield* go('T2');
          if (Flock.sheep.some((s) => sekiOf(s.y) === 1 && !Flock.inLight(s))) {
            t.walkTo(KW.map, 21, 7); yield until(() => !t.path);
            Audio.whistle(t.x); Flock.whistle({ x: t.x, y: t.y }, 1);
          }
          yield until(() => gatheredAt('T2'));
        } else {
          Flock.sheep.forEach((s) => { if (!(s.gathered && !s.stuck)) { s.gathered = false; s.stuck = false; s.mode = 'idle'; s.evalId = -1; } });
          yield* go(face);
        }
      }
      const chain = ['T2', 'T1', 'T3', 'T5', 'T6', 'T7', 'T8'];
      const cur = chain.indexOf(f.stone);
      for (let i = Math.max(1, cur + 1); i < chain.length; i++) yield* go(chain[i]);
    }, 'scene');
  },
  hint() {
    const f = KW.father, sc = this;
    if (sc.done) return null;
    const cont = () => sc.autoSolve();
    const s1dark = Flock.sheep.some((s) => sekiOf(s.y) <= 1 && !s.gathered && !Flock.inLight(s));
    const stuck = Flock.sheep.some((s) => s.stuck) || (f.lamp && f.lamp.raised && Flock.sheep.some((s) => s.gathered && s.gatherAt && dist(s.gatherAt.x, s.gatherAt.y, STONES[f.stone].x, STONES[f.stone].y) > 0.01 && dist(s.x, s.y, STONES[f.stone].x, STONES[f.stone].y) > RING));
    if (!f.standing) return { ctx: 'isik', onContinue: cont, levels: [
      { text: 'Karanlıkta değneğimi görmüyorlar. Peki neye bakıyorlar?', think: true },
      { text: 'Kandil halkası ve durak taşları parlıyor.', fx: () => { KW.showRingFX = 10; KW.showStonesFX = 10; } },
      { text: 'Ben ışığı taşırım, sen yerini seç. Hangi taşın başında durayım?', who: 'Baba' }] };
    if (s1dark) return { ctx: 'k2k3', onContinue: cont, levels: [
      { text: 'Işık onlara uzak. Sesim ışıktan daha uzağa gider.', think: true },
      { text: 'Islık menzili ve tek ıslıklık bölgenin çekirdeği (x = 21, y 5–9) yerde belirdi.', fx: () => { KW.showZoneFX = 14; KW.showRingFX = 14; } },
      { text: 'İkisinin arasına geç ama babamın ışığından çıkma; oradan ıslık çal.', who: 'Yoaş' }] };
    // sürünün durumu: takıldı / karanlıkta / ilerliyor — geçide bakan taş ya da karşı taş
    const g0 = Flock.sheep.find((s) => s.gathered && s.gatherAt);
    const C = g0 ? g0.gatherAt : STONES[f.stone];
    const seki = sekiOf(C.y);
    const facing = { 1: 'T1', 2: 'T5', 3: 'T7' }[seki] || 'T8';
    const across = { T1: 'T3', T5: 'T6', T7: 'T8' }[facing];
    const atFacing = dist(C.x, C.y, STONES[facing].x, STONES[facing].y) < 0.05;
    const target = atFacing ? across : facing;
    return { ctx: stuck ? 'duvar' : 'ilerle', onContinue: cont, levels: [
      { text: 'Işığı görüyorlar ama duvarı aşamıyorlar. Işık geçidin tam karşısında olmalı.', think: true },
      { text: 'Geçitler ve sürünün sekisindeki geçide bakan taş parlıyor.', fx: () => { KW.showGapsFX = 12; KW.showStonesFX = 12; } },
      { text: target ? (STONES[target].ad + '\'na çağır beni, kızım.').replace("Kapı'na", 'Kapıya').replace("taşı'na", 'taşına') : 'Kapıya çağır beni.', who: 'Baba' }] };
  },
});

// ============================================================
// SAHNE 5 — Ağıl başında: değneğin altından sayım, ateş, sapan, "Otur"
// ============================================================
Scenes.define('agil_basinda', {
  title: 'Ağıl başında',
  enter(arg) {
    if (!(arg && arg.keep && KW.stage === 'suru')) KW.ensure('agil');
    KW.stage = 'agil';
    const sc = this, t = KW.tamar, f = KW.father;
    Cam.minY = null;
    sc.counted = false; sc.ready = false; sc.sat = false;
    Player.enabled = false; Player.allowGut = false;
    Audio.setAmbience({ wind: 0.1, crickets: true });
    Player.interactables = [
      { x: 6.6, y: 33.2, r: 1.4, label: 'Çalı demetine bak', enabled: () => sc.ready && !State.flags.kol_b01_sapan, action: () => { State.flags.kol_b01_sapan = true; Audio.rustle(6.6); UI.bark('Sapanım! Akşam burada bırakmışım. Belime taktım.', 'Tamar', 3, true); } },
      { x: FIRE.x - 0.9, y: FIRE.y + 0.6, r: 1.5, label: 'Otur', enabled: () => sc.ready && !sc.sat, action: () => sc.sit() },
    ];
    Scripts.run(function* () {
      yield 0.6;
      // baba kapıya geçer, sürü "değneğin altından" girer
      Flock.lampLowered(); f.lamp = { raised: true };
      t.walkTo(KW.map, 8.4, 32.2);
      f.walkTo(KW.map, 5.9, 33.7); yield until(() => !f.path);
      f.dir = 'left';
      KW.camFocus = { x: 6, y: 32.5 };
      const order = Flock.sheep.slice().sort((a, b) => dist(a.x, a.y, 5, 34) - dist(b.x, b.y, 5, 34));
      for (let i = 0; i < order.length; i++) {
        const s = order[i];
        s.mode = 'tofold'; s.speed = 1.6; s.gathered = false;
        s.goal = { x: 5, y: 33.4 };
        yield until(() => !s.goal);
        f.staffT = 0.2;
        s.goal = { x: 5, y: 35 }; s.onArrive = (q) => { q.inFold = true; q.mode = 'tofold'; q.goal = { x: 1.6 + (q.id % 4) * 1.9 + Math.random() * 0.6, y: 35.1 + (Math.floor(q.id / 4) % 2) * 0.8 + Math.random() * 0.3 }; q.speed = 0.8; q.onArrive = (qq) => { qq.mode = 'idle'; }; };
        UI.bark(NUM[i][0].toUpperCase() + NUM[i].slice(1) + (i === 10 ? '.' : '...'), 'Baba', 1.4);
        Audio.step(5, true);
        yield 0.55;
      }
      yield 1.2;
      KW.gateClosed = true;
      KW.camFocus = { x: 9, y: 32 };
      // Nahum ateşi yakar
      KW.nahum.walkTo(KW.map, FIRE.x + 1.1, FIRE.y + 0.3); yield until(() => !KW.nahum.path);
      KW.nahum.dir = 'left'; yield 0.8;
      KW.fireLit = true; Audio.setAmbience({ wind: 0.1, crickets: true, fire: true });
      KW.yoas.walkTo(KW.map, FIRE.x - 0.4, FIRE.y - 1.0);
      // baba kuzunun bacağını sarar
      f.walkTo(KW.map, FIRE.x + 0.7, FIRE.y - 0.9); yield until(() => !f.path);
      f.lamp = null; f.dir = 'down';
      yield 0.6;
      yield UI.say([SAY.baba('RAB çobanımdır, eksiğim olmaz.', { kind: 'verse', ref: 'Mezmur 23:1 · [yakın aktarım] · mırıldanarak, kuzunun bacağını sararken' })]);
      Audio.kaval();
      KW.camFocus = null;
      sc.ready = true; Player.enabled = true;
      UI.objective('Ateşin başına oturmalıyım.');
    }, 'scene');
  },
  sit() {
    const sc = this, t = KW.tamar;
    sc.sat = true; Player.enabled = false; UI.objective(null);
    Scripts.run(function* () {
      t.goStraight(FIRE.x - 0.9, FIRE.y + 0.7); yield until(() => !t.path);
      t.dir = 'up'; yield 0.6;
      Scenes.goto('mujde', { fadeOut: 1.4, fadeIn: 0.1 });
    }, 'scene');
  },
  update(dt) { KW.update(dt); Player.update(dt); },
  draw(g) { KW.draw(g); },
  exit() { KW.camFocus = null; Player.allowGut = true; },
  skip() { if (!this.ready) { Scripts.kill('scene'); this.ready = true; KW.fireLit = true; Flock.sheep.forEach((s) => { s.inFold = true; s.mode = 'idle'; s.goal = null; s.x = 2 + (s.id % 5) * 1.4; s.y = 35.2 + Math.floor(s.id / 5) * 0.6; }); KW.gateClosed = true; KW.father.lamp = null; KW.father.x = FIRE.x + 0.7; KW.father.y = FIRE.y - 0.9; Player.enabled = true; } this.sit(); },
  hint() { if (!this.ready) return null; return { ctx: 'otur', levels: [{ text: 'Ateş yandı. Babamın yanına oturmalıyım.', think: true }, { text: 'Ateşin başı parlıyor.', fx: () => {} }, { text: 'Gel otur, kızım.', who: 'Baba', onContinue: () => this.sit() }] }; },
});

// ============================================================
// SAHNE 7 — Haydi Beytlehem'e; kandil Tamar'a geçer; kuzu (ifade)
// ============================================================
Scenes.define('haydi_beytlehem', {
  title: 'Haydi Beytlehem\'e',
  enter() {
    KW.ensure('haydi');
    const sc = this, t = KW.tamar, f = KW.father, L = KW.lamb;
    KW.gateClosed = false;
    Audio.setAmbience({ wind: 0.08, crickets: true, fire: true });
    Audio.setDrone(false);
    sc.phase = 0; sc.idle = 0; sc.result = null;
    Player.enabled = false; Player.allowGut = true;
    f.dir = 'left'; KW.nahum.dir = 'left'; KW.yoas.dir = 'down';
    Player.onWhistle = (W) => { if (sc.phase === 1 && L.mode !== 'carried' && dist(L.x, L.y, W.x, W.y) < 8) { L.goal = { x: W.x + 0.8, y: W.y + 0.5 }; L.speed = 0.9; sc.herded = true; } };
    Player.onStaff = () => { if (sc.phase === 1 && L.mode !== 'carried' && dist(L.x, L.y, t.x, t.y) < 4) { const d = dist(L.x, L.y, t.x, t.y) || 1; L.goal = { x: L.x + ((L.x - t.x) / d) * 2.5, y: L.y + ((L.y - t.y) / d) * 2.5 }; if (KW.map.solidAt(L.goal.x, L.goal.y)) L.goal = null; sc.herded = true; } };
    Player.interactables = [
      { get x() { return L.x; }, get y() { return L.y; }, r: 1.4, label: 'Kuzuyu kucağına al', enabled: () => sc.phase === 1 && L.mode !== 'carried' && !L.inFold, action: () => { L.mode = 'carried'; L.visible = false; t.carry = 'lamb'; L.goal = null; KW.lambBleat(0.2); } },
    ];
    Scripts.run(function* () {
      yield 1.2;
      yield UI.say([{ who: 'Çobanlar', text: 'Haydi, Beytlehem\'e kadar gidelim de Rab\'bin bize bildirdiği bu olayı görelim.', kind: 'verse', ref: 'Luka 2:15 · [yakın aktarım; kanonik replik] · baba başlatır, Nahum ile Yoaş birlikte tamamlar' }]);
      yield 2.2; // kısa bir sessizlik
      f.walkTo(KW.map, t.x + 0.9, t.y - 0.3); yield until(() => !f.path);
      f.dir = 'left'; t.dir = 'right';
      yield 0.5;
      f.lamp = null; t.lamp = { child: true };
      yield UI.say([SAY.baba('Önden sen git. Yolu sen aydınlat.')]);
      yield 0.6;
      KW.lambBleat(0.3);
      sc.phase = 1; Player.enabled = true; sc.idle = 0;
      UI.objective('Kuzuyu ağıla koymalıyım.');
    }, 'scene');
  },
  finish(val) {
    const sc = this, t = KW.tamar, L = KW.lamb;
    if (sc.phase !== 1) return;
    sc.phase = 2; Player.enabled = false;
    if (val) State.flags.b01_ifade_kuzu = val;
    UI.objective(null);
    Scripts.run(function* () {
      if (val === 'kucakta') { UI.bark('Kuzu başını Tamar\'ın omzuna koydu.', null, 2.4); yield 1.2; t.carry = null; L.visible = true; L.mode = 'script'; L.x = 5; L.y = 35.2; L.goal = { x: 3.4, y: 35.6 }; yield 1.4; }
      else if (val === 'guderek') { L.faceR = true; KW.lambBleat(0.3); UI.bark('Kuzu ağıl kapısında durup Tamar\'a meledi.', null, 2.6); yield 2; L.goal = { x: 3.4, y: 35.6 }; yield 1; }
      KW.gateClosed = true; Audio.step(5);
      yield 1;
      Scenes.goto('patika');
    }, 'scene');
  },
  update(dt) {
    const sc = this, t = KW.tamar, L = KW.lamb, f = KW.father;
    KW.update(dt); Player.update(dt);
    if (sc.phase !== 1) return;
    const anyInput = Math.abs(Input.axisX) + Math.abs(Input.axisY) > 0.05 || Input.down('gut') || Input.down('interact') || Input.down('bakis');
    sc.idle = anyInput ? 0 : sc.idle + dt;
    // kucakta: ağıla girince bırakır
    if (t.carry === 'lamb' && t.y > 34.4 && Math.abs(t.x - 5) < 4) { sc.finish('kucakta'); return; }
    // ışığı izleyen kuzu: kandilin 5 karoluk halkasında Tamar'a yürür
    if (L.mode !== 'carried') {
      L.mode = 'follow';
      const d = dist(L.x, L.y, t.x, t.y);
      if (d <= 5 && d > 1.3 && !sc.herdT) { L.goal = { x: t.x + (L.x > t.x ? 0.9 : -0.9), y: t.y + 0.4 }; L.speed = 0.85; }
      if (d <= 1.3 && L.goal && !sc.herded) L.goal = null;
      if (sc.herded && L.goal && dist(L.x, L.y, L.goal.x, L.goal.y) < 0.15) sc.herded = false;
      if (L.y > 34.5) { L.inFold = true; sc.finish('guderek'); return; }
    }
    // 20 sn girdi yoksa baba kuzuyu ağıla koyar, değer yazılmaz
    if (sc.idle > 20) {
      sc.phase = 2; Player.enabled = false; UI.objective(null);
      Scripts.run(function* () {
        f.walkTo(KW.map, L.x + 0.6, L.y); yield until(() => !f.path);
        L.visible = false; f.carry = 'lamb';
        f.walkTo(KW.map, 5, 34.8); yield until(() => !f.path);
        f.carry = null; L.visible = true; L.mode = 'script'; L.x = 4.4; L.y = 35.5; L.goal = null;
        KW.gateClosed = true; yield 1;
        Scenes.goto('patika');
      }, 'scene');
    }
  },
  draw(g) { KW.draw(g); },
  exit() { Player.allowGut = true; },
  skip() { if (this.phase === 1) this.finish('kucakta'); else { Scripts.kill('scene'); this.phase = 1; KW.tamar.lamp = { child: true }; KW.father.lamp = null; this.finish('kucakta'); } },
  hint() {
    if (this.phase !== 1) return null;
    return { ctx: 'kuzu', levels: [{ text: 'Kuzu topallıyor. Onu ağıla koymalıyım: kucağıma alabilirim ya da ışığımla götürebilirim.', think: true }, { text: 'Kuzunun yanında Etkileşim: kucağına al. Ağıl kapısı (aşağıda, batıda) açık.' }, { text: 'Kuzuyu ağıla koy, kızım; sonra yola düşeriz.', who: 'Baba', onContinue: () => this.finish(null) }] };
  },
});
