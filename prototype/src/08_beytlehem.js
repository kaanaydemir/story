// ============================================================
// Sahne 8 (Patika), 9 (Hangi Kapı?), 11 (Avluda), 12 (Yankı)
// ============================================================

// ---------- ortak: izleyiciler (çobanlar Tamar'ın izinden yürür) ----------
class TrailPath {
  constructor() { this.pts = []; this.o = { x: 0, y: 0 }; }
  reset(x, y) { this.pts = [{ x, y }]; }
  push(x, y) { const l = this.pts[this.pts.length - 1]; if (dist(l.x, l.y, x, y) > 0.15) { this.pts.push({ x, y }); if (this.pts.length > 400) this.pts.shift(); } }
  at(back) { // izden "back" karo geride kalan nokta (dönen nesne geçicidir)
    let acc = 0; const o = this.o;
    for (let i = this.pts.length - 1; i > 0; i--) {
      const a = this.pts[i], b = this.pts[i - 1], d = dist(a.x, a.y, b.x, b.y);
      if (acc + d >= back) { const k = (back - acc) / d; o.x = lerp(a.x, b.x, k); o.y = lerp(a.y, b.y, k); return o; }
      acc += d;
    }
    o.x = this.pts[0].x; o.y = this.pts[0].y; return o;
  }
}
const Trail = new TrailPath();
function updateFollowers(list, dt, gaps, trail) {
  trail = trail || Trail;
  list.forEach((a, i) => {
    const p = trail.at(gaps[i]);
    const d = dist(a.x, a.y, p.x, p.y);
    if (d > 0.12) { const sp = Math.min(d * 2.2, 3.2) * dt; a.x += ((p.x - a.x) / d) * Math.min(sp, d); a.y += ((p.y - a.y) / d) * Math.min(sp, d); a.face(p.x - a.x, p.y - a.y); a.speed = 2.2; a.setMoving(true, dt); }
    else a.setMoving(false, dt);
  });
}

// ---------- Patika haritası ----------
const PATIKA_PTS = [[2, 18], [14, 17.5], [18, 13.5], [30, 12.5], [34, 8.5], [46, 7.5], [50, 4.5], [62, 4.5]];
function buildPatika() {
  const m = new TileMap(64, 22, 0, 0);
  m.fill(0, 0, 63, 21, T.ROUGH); m.fill(0, 0, 63, 1, T.SKY);
  const stamp = (x, y) => {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const X = Math.round(x + dx), Y = Math.round(y + dy); if (Y < 2 || Y > 20 || X < 0 || X > 63) continue;
      const cur = m.get(X, Y);
      if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) m.set(X, Y, T.PATH); else if (cur === T.ROUGH) m.set(X, Y, T.GRASS);
    }
  };
  for (let i = 0; i < PATIKA_PTS.length - 1; i++) {
    const [ax, ay] = PATIKA_PTS[i], [bx, by] = PATIKA_PTS[i + 1], n = Math.ceil(dist(ax, ay, bx, by) * 3);
    for (let k = 0; k <= n; k++) stamp(lerp(ax, bx, k / n), lerp(ay, by, k / n));
  }
  // basamaklar (eğimli kesimler)
  for (let i = 0; i < PATIKA_PTS.length - 1; i++) {
    const [ax, ay] = PATIKA_PTS[i], [bx, by] = PATIKA_PTS[i + 1];
    if (Math.abs(by - ay) < 2) continue;
    const n = Math.ceil(dist(ax, ay, bx, by) * 2);
    for (let k = 1; k < n; k++) { const X = Math.round(lerp(ax, bx, k / n)), Y = Math.round(lerp(ay, by, k / n)); if (m.get(X, Y) === T.PATH) m.set(X, Y, T.STAIR); }
  }
  paintMap(m, (g, v, x, y, px, py, rr) => {
    if (v === T.STAIR) { paintDirt(g, px, py, rr); g.fillStyle = '#0a0b1a'; g.fillRect(px, py + 5, 16, 2); g.fillRect(px, py + 12, 16, 2); g.fillStyle = '#a49a86'; g.fillRect(px, py + 4, 16, 1); g.fillRect(px, py + 11, 16, 1); return; }
    if (v === T.GRASS) { paintGrass(g, px, py, rr, true); return; }
    paintKirlar(g, v, x, y, px, py, rr);
  });
  const objs = [];
  const rr = makeRng(91);
  for (let i = 0; i < 46; i++) {
    const x = Math.floor(rr() * 64), y = 3 + Math.floor(rr() * 18);
    if (m.get(x, y) !== T.ROUGH) continue;
    const k = rr();
    objs.push({ kind: k < 0.3 ? 'tree' : k < 0.6 ? 'rock' : 'bush', x, y: y + 0.4, spr: k < 0.3 ? (rr() < 0.5 ? ART.trees.olive : ART.trees.olive2) : k < 0.6 ? ART.rocks[Math.floor(rr() * 3)] : ART.bush2 });
  }
  return { map: m, objs };
}

Scenes.define('patika', {
  title: 'Kandille yol açmak',
  enter() {
    if (!this.P) this.P = buildPatika();
    const P = this.P, sc = this;
    sc.map = P.map;
    sc.t = new Actor({ kind: 'tamar', x: 2.5, y: 18, dir: 'right', lamp: { child: true } });
    sc.f = new Actor({ kind: 'adult', skin: 'baba', x: 0.5, y: 18 });
    sc.n = new Actor({ kind: 'adult', skin: 'nahum', x: -0.5, y: 18 });
    sc.y = new Actor({ kind: 'adult', skin: 'yoas', x: -1.5, y: 18 });
    Player.init(sc.t, P.map); Player.allowGut = false;
    Trail.reset(sc.t.x, sc.t.y);
    Cam.bounds = { x0: -0.5, y0: 0.5, x1: 63.5, y1: 21.5 }; Cam.minY = null;
    Cam.follow(sc.t.x, sc.t.y, 0, true);
    sc.said = 0; sc.idle = 0; sc.ahead = false; sc.end = false; sc.called = false; sc.thoughtT = 0;
    sc.ft = new TrailPath();
    Audio.setAmbience({ wind: 0.16, crickets: true });
    Audio.setDrone(true, 92);
    UI.bark('Tamar önde, kandil elinde. Çobanlar arkasından geliyor.', null, 3.2);
  },
  update(dt) {
    const sc = this, t = sc.t;
    Player.update(dt);
    if (sc.ahead) {
      // baba öne geçti: o yolu yürür, Tamar kandille hemen arkasından gelir
      sc.f.update(dt); sc.ft.push(sc.f.x, sc.f.y);
      const p = sc.ft.at(1.8), d = dist(t.x, t.y, p.x, p.y);
      if (p.x > t.x - 0.05 && d > 0.12) { const st = Math.min(d, 2.4 * dt); t.x += ((p.x - t.x) / d) * st; t.y += ((p.y - t.y) / d) * st; t.face(p.x - t.x, p.y - t.y); t.setMoving(true, dt); }
      else t.setMoving(false, dt);
    }
    Trail.push(t.x, t.y);
    if (sc.ahead) updateFollowers([sc.n, sc.y], dt, [3, 4.3]);
    else updateFollowers([sc.f, sc.n, sc.y], dt, [3, 4.3, 5.6]);
    Cam.follow(t.x, t.y - 1, dt);
    Audio.listenerX = t.x;
    Gfx.updateParticles(dt);
    const moving = t.moving;
    sc.idle = moving ? 0 : sc.idle + dt;
    if (sc.idle > 30 && !sc.called) { sc.called = true; UI.bark('Haydi kızım.', 'Baba', 2); }
    if (sc.idle > 60 && !sc.ahead) {
      // baba öne geçer (bölüm §7.3): yolu o yürür, Tamar ve ötekiler izler
      sc.ahead = true; Player.enabled = false;
      const f = sc.f, rest = PATIKA_PTS.filter(([x]) => x > t.x + 0.5).map(([x, y]) => ({ x, y }));
      f.path = [{ x: t.x + 0.8, y: t.y - 0.5 }].concat(rest); f.speed = 2.2; f.onArrive = null;
      sc.ft.reset(f.x, f.y);
      UI.bark('Ben önden gideyim, sen ışığı tut.', 'Baba', 2.6);
    }
    // yolda üç söz (otomatik konuşma)
    const lines = [
      [15, 'Baba', 'Melek "yemlikte" dedi. Yemlik hayvan bölmesinde olur.'],
      [30, 'Nahum', 'Sayım yüzünden her ev konukla dolu. Konuk odası boş olan kimseyi hayvanların yanına yatırmaz.'],
      [44, 'Yoaş', 'Bu gece doğduysa, o evde bu gece bir telaş olmuştur.'],
    ];
    if (sc.said < 3 && t.x > lines[sc.said][0]) { const L = lines[sc.said]; UI.bark(L[2], L[1], 5.5); sc.said++; if (sc.said === 3) sc.thoughtT = 6; }
    if (sc.thoughtT > 0) { sc.thoughtT -= dt; if (sc.thoughtT <= 0) { UI.objective('Hayvan bölmesi olan, konuk odası dolu, bu gece telaş görmüş bir ev.'); UI.bark('Hayvan bölmesi olan, konuk odası dolu, bu gece telaş görmüş bir ev.', 'Tamar', 4, true); } }
    if (!sc.end && (t.x > 60.5 || (sc.ahead && !sc.f.path))) { sc.end = true; Player.enabled = false; UI.objective('Hayvan bölmesi olan, konuk odası dolu, bu gece telaş görmüş bir ev.'); Scenes.goto('hangi_kapi'); }
  },
  draw(g) {
    const sc = this, cx = Cam.px(), cy = Cam.py(), map = sc.map;
    const mapTop = (map.y0 + 1.5) * TILE - cy; // gök satırlarının altı; bunun altını harita örter
    if (mapTop > 0) { Gfx.drawSky(g, cx, cy, { dim: 1, fillH: mapTop + 2 }); Gfx.drawRidge(g, cx, mapTop + 14, { olives: true, maxY: Math.min(VH, mapTop + 2) }); }
    blitMap(g, map.img, cx + 8, cy + 8);
    const list = sc.list || (sc.list = []);
    list.length = 0;
    for (const o of sc.P.objs) if (Math.abs(o.x * TILE - cx - VW / 2) < VW / 2 + 40) list.push(o);
    list.push(sc.t, sc.f, sc.n, sc.y);
    list.sort(BY_Y);
    for (const o of list) { if (o instanceof Actor) o.draw(g, cx, cy); else drawObj(g, o, cx, cy, {}); }
    Gfx.resetLights();
    const p = sc.t.lampWorld();
    Gfx.light(p.x * TILE - cx, p.y * TILE - cy, 80 * (1 + Math.sin(State.time * 12) * 0.02), 1);
    Gfx.glow(p.x * TILE - cx, p.y * TILE - cy, 40, 0.5);
    Gfx.light(sc.t.x * TILE - cx, sc.t.y * TILE - cy, 120, 0.25);
    Gfx.applyDark('#03040f', 0.82);
    Gfx.dashedCircle(p.x * TILE - cx, p.y * TILE - cy + 6, 80, '#ffcf7a', 2, 5, 0.25);
    if (Player.bakis) Gfx.vignette(0.6);
  },
  exit() { Player.allowGut = true; Player.enabled = true; },
  skip() { this.end = true; Scenes.goto('hangi_kapi', { fadeOut: 0.3 }); },
  hint() { return { ctx: 'yol', levels: [{ text: 'Beytlehem sırtın üstünde. Patikayı izlemeliyim.', think: true }, { text: 'Patika doğuya, yukarı doğru tırmanıyor.' }, { text: 'Yürü kızım, biz arkandayız.', who: 'Baba', onContinue: () => { this.idle = 61; } }] }; },
});

// ---------- Beytlehem haritası ----------
const HOUSES = [
  { id: 1, x0: 2, x1: 7, row: 'up', door: 4, ad: 'Çömlekçinin evi', who: 'Çömlekçi', skin: 'koylu1', reply: 'Bizim altımızda hayvan değil çark var, evladım.', miss: 'A' },
  { id: 2, x0: 15, x1: 20, row: 'up', door: 17, ad: 'Dul Şelomit\'in evi', who: 'Dul Şelomit', skin: 'kadin2', reply: 'Bu saatte bebek mi? Konuk odam bomboş, evladım; burada kimse yemlikte yatmaz. İsterseniz siz kalın.', miss: 'B' },
  { id: 3, x0: 28, x1: 33, row: 'up', door: 30, ad: 'Kalabalık ev', who: 'Kalabalık evin babası', skin: 'koylu2', reply: 'Hayvanlarım içeride, saman da dünkü. Bu gece kandil yakan olmadı.', miss: 'C2' },
  { id: 4, x0: 8, x1: 13, row: 'down', door: 10, ad: 'Dördüncü ev', who: 'Ev sahibi', skin: 'koylu1', reply: '', miss: null },
  { id: 5, x0: 21, x1: 26, row: 'down', door: 23, ad: 'Fırıncının evi', who: 'Fırıncı', skin: 'koylu2', reply: 'Benim altımda hayvan yok, fırın var.', miss: 'A' },
  { id: 6, x0: 34, x1: 39, row: 'down', door: 36, ad: 'Kervan konuğunun evi', who: 'Kervan konuğu', skin: 'koylu1', reply: 'Eşekler konuklarımın, hepsi içeride. Bu gece kimse uyanmadı, kandil bile yakmadık.', miss: 'C3' },
];
HOUSES.forEach((h) => { h.fy0 = h.row === 'up' ? 6 : 14; h.fy1 = h.row === 'up' ? 8 : 16; h.doorY = h.fy1; h.lit = false; });
// ipucu hücreleri: A hayvan bölmesi, B konuk odası, C1 kapı aralığından ışık, C2 saman, C3 hayvanlar dışarıda
const CLUES = [
  { h: 1, c: 'A', icon: 'cark', x: 4, y: 8.7, txt: 'Kapı atölyeye açılıyor: çark, kurumaya bırakılmış testiler.' },
  { h: 1, c: 'B', icon: 'konuk', x: 7.7, y: 7.4, txt: 'Dam merdiveninde sandaletler, heybeler: konuk odası dolu.' },
  { h: 1, c: 'C3', icon: 'hayvan', x: 0.8, y: 10.6, txt: 'Hayvanlar dışarıda, ama her zamanki çitlerinde.' },
  { h: 2, c: 'A', icon: 'hayvan', x: 17, y: 8.7, txt: 'İçeriden hayvan kıpırtısı geliyor.' },
  { h: 2, c: 'B', icon: 'bos', x: 16.3, y: 6.6, txt: 'Damdaki oda karanlık ve sessiz: boş.' },
  { h: 3, c: 'A', icon: 'hayvan', x: 30, y: 8.7, txt: 'İçeriden hayvan sesi.' },
  { h: 3, c: 'B', icon: 'konuk', x: 33.7, y: 7.4, txt: 'Merdivende sandaletler: konuk odası dolu.' },
  { h: 3, c: 'C2', icon: 'saman_eski', x: 30.9, y: 9.5, txt: 'Kapının önünde eski, ezik saman.' },
  { h: 4, c: 'A', icon: 'hayvan', x: 10, y: 16.7, txt: 'Kapı hayvan bölmesine açılıyor.' },
  { h: 4, c: 'B', icon: 'konuk', x: 13.7, y: 15.4, txt: 'Dam merdiveninde heybeler: konuk odası dolu.' },
  { h: 4, c: 'C1', icon: 'isik', x: 10.7, y: 16.4, txt: 'Kapı aralığından ışık sızıyor.' },
  { h: 4, c: 'C2', icon: 'saman_taze', x: 15.5, y: 13.6, txt: 'Harmandan kapıya kabarık, taze saman.' },
  { h: 4, c: 'C3', icon: 'bagli', x: 12.4, y: 17.6, txt: 'Eşek ve iki keçi duvar halkasına bağlı; yemleri yere dökülmüş.' },
  { h: 5, c: 'A', icon: 'firin', x: 23, y: 16.7, txt: 'Alt düzey fırın odası: un tozu, hamur sesi.' },
  { h: 5, c: 'B', icon: 'konuk', x: 26.7, y: 15.4, txt: 'Merdivende sandaletler: konuk odası dolu.' },
  { h: 5, c: 'C1', icon: 'isik', x: 23.7, y: 16.4, txt: 'Kapıdan tandır ışığı vuruyor.' },
  { h: 6, c: 'A', icon: 'hayvan', x: 36, y: 16.7, txt: 'Konukların eşekleri içeride.' },
  { h: 6, c: 'B', icon: 'konuk', x: 39.7, y: 15.4, txt: 'Merdivende heybeler: konuk odası dolu.' },
  { h: 6, c: 'C2', icon: 'saman_taze', x: 36.6, y: 17.6, txt: 'Kapıda taze saman.' },
  // Ev 6'nın eksik ipucu: hayvanlar içeride, dışarı bağlanan yok (C3 değil); yanlış kapıda bu işaretlenir
  { h: 6, c: 'C3', icon: 'hayvan_ic', x: 38.4, y: 17.6, txt: 'Hayvanlar içeride; dışarı bağlanan yok.' },
];
function buildVillage() {
  const m = new TileMap(48, 25, 0, 0);
  m.fill(0, 0, 47, 24, T.ROUGH); m.fill(0, 0, 47, 1, T.SKY);
  m.fill(1, 3, 46, 5, T.GRASS);
  // harman (iki üst ev arasındaki aralığın kuzeyinde)
  for (let y = 2; y <= 5; y++) for (let x = 8; x <= 15; x++) if (dist(x, y * 1.4, 11.5, 3.6 * 1.4) < 3.6) m.set(x, y, T.YARD);
  m.fill(8, 6, 14, 8, T.YARD); m.fill(21, 6, 27, 8, T.YARD); m.fill(34, 6, 46, 8, T.GRASS); m.fill(0, 6, 1, 8, T.GRASS);
  m.fill(0, 9, 47, 10, T.STREET); m.fill(0, 11, 47, 13, T.YARD); m.fill(0, 17, 47, 18, T.STREET);
  m.fill(14, 14, 20, 16, T.YARD); m.fill(27, 14, 33, 16, T.YARD); m.fill(40, 14, 47, 16, T.YARD); m.fill(0, 14, 7, 16, T.GRASS);
  m.fill(38, 19, 46, 24, T.STREET); m.fill(30, 19, 37, 20, T.GRASS);
  HOUSES.forEach((h) => m.fill(h.x0, h.fy0, h.x1, h.fy1, T.HOUSE));
  m.set(43, 21, T.WELL);
  m.extraSolid.add('13,3'); // saman yığını
  m.extraSolid.add('0,10');
  paintMap(m, (g, v, x, y, px, py, rr) => {
    if (v === T.STREET) { speckle(g, px, py, rr, '#5e5040', ['#6e5e4a', '#4e4236', '#7a6a52', '#8a7a60'], 50); if (rr() < 0.25) { g.fillStyle = '#8e8472'; g.fillRect(px + Math.floor(rr() * 12), py + Math.floor(rr() * 12), 3, 2); } return; }
    if (v === T.YARD) { speckle(g, px, py, rr, '#6a5a44', ['#7a6a50', '#5a4c3a', '#86745a'], 44); return; }
    if (v === T.HOUSE) { speckle(g, px, py, rr, '#5a4e40', ['#4a4036', '#6a5c4a'], 20); return; }
    if (v === T.GRASS) { paintGrass(g, px, py, rr, true); return; }
    paintKirlar(g, v, x, y, px, py, rr);
  });
  return m;
}
// ev sprite'ı (3/4): alt düzey (kapı), dam ve konuk odası, dış merdiven
function buildHouseSprite(h) {
  const w = (h.x1 - h.x0 + 1) * TILE + 18, H = 92, c = makeCanvas(w, H), g = c.getContext('2d'), rr = makeRng(h.id * 77);
  const bw = (h.x1 - h.x0 + 1) * TILE, bx = 0, by = H - 56;
  // gövde
  g.fillStyle = PAL.k; g.fillRect(bx, by - 1, bw, 57);
  g.fillStyle = '#8c7c62'; g.fillRect(bx + 1, by, bw - 2, 55);
  for (let yy = by + 2; yy < by + 54; yy += 5) { let xx = bx + 1 + ((yy / 5) % 2) * 3; while (xx < bx + bw - 2) { const ww = 4 + Math.floor(rr() * 5); g.fillStyle = ['#9a8a6e', '#7e7058', '#a69678', '#857660'][Math.floor(rr() * 4)]; g.fillRect(xx, yy, Math.min(ww - 1, bx + bw - 2 - xx), 4); xx += ww; } }
  // dam kenarı
  g.fillStyle = '#5a4a36'; g.fillRect(bx, by - 4, bw, 5); g.fillStyle = '#7a6a50'; g.fillRect(bx, by - 4, bw, 1);
  // damdaki konuk odası (sol yarı)
  const rw = Math.floor(bw * 0.55), rx = bx + 4, ry = by - 30;
  g.fillStyle = PAL.k; g.fillRect(rx - 1, ry - 1, rw + 2, 27);
  g.fillStyle = '#9a8a6e'; g.fillRect(rx, ry, rw, 26);
  for (let yy = ry + 2; yy < ry + 24; yy += 5) for (let xx = rx + ((yy / 5) % 2) * 3; xx < rx + rw - 2; xx += 6) { g.fillStyle = '#86775e'; g.fillRect(xx, yy, 4, 3); }
  g.fillStyle = '#5a4a36'; g.fillRect(rx - 2, ry - 4, rw + 4, 4);
  // konuk odası penceresi ve kapısı
  g.fillStyle = '#0a0a12'; g.fillRect(rx + 6, ry + 8, 6, 6); g.fillRect(rx + rw - 14, ry + 9, 9, 17);
  // dış merdiven (sağda)
  g.fillStyle = PAL.k;
  for (let k = 0; k < 7; k++) { const sx = bx + bw - 2 + Math.floor(k * 2.4), sy = by + 50 - k * 8; g.fillRect(sx - 1, sy - 1, 14, 6); }
  for (let k = 0; k < 7; k++) { const sx = bx + bw - 2 + Math.floor(k * 2.4), sy = by + 50 - k * 8; g.fillStyle = '#a49a86'; g.fillRect(sx, sy, 12, 4); g.fillStyle = '#c2b8a2'; g.fillRect(sx, sy, 12, 1); }
  // alt kapı
  const dx = (h.door - h.x0) * TILE + 2, dW = 13, dH = 22;
  g.fillStyle = PAL.k; g.fillRect(dx - 1, H - dH - 1, dW + 2, dH + 1);
  g.fillStyle = '#4a3020'; g.fillRect(dx, H - dH, dW, dH);
  g.fillStyle = '#5e3e28'; for (let k = 1; k < dW; k += 4) g.fillRect(dx + k, H - dH + 1, 2, dH - 2);
  h.doorPx = dx; h.spriteW = w;
  return c;
}
function drawHouseDetails(g, h, sx, sy) {
  // sx,sy: evin sol alt köşesi (ekran)
  const dX = sx + h.doorPx, dY = sy - 22;
  const t = State.time;
  if (h.id === 1) { // açık kapı: çark ve testiler
    g.fillStyle = '#1a120c'; g.fillRect(dX, dY, 13, 22);
    g.fillStyle = '#6a5a44'; g.fillRect(dX + 2, dY + 12, 9, 2); g.fillStyle = '#8a7a5a'; g.fillRect(dX + 4, dY + 10, 5, 2);
    g.fillStyle = '#a2603a'; [[-10, 0], [-6, 1], [15, 0], [19, 1]].forEach(([ox, k]) => { g.fillRect(dX + ox, sy - 7 + k, 4, 6); g.fillRect(dX + ox + 1, sy - 9 + k, 2, 2); });
  }
  if (h.id === 4) { g.fillStyle = '#1a120c'; g.fillRect(dX + 9, dY + 1, 3, 21); g.fillStyle = '#ffcf7a'; g.globalAlpha = 0.85 + 0.15 * Math.sin(t * 9); g.fillRect(dX + 10, dY + 3, 1, 18); g.globalAlpha = 1; }
  if (h.id === 5) { g.fillStyle = '#2a140a'; g.fillRect(dX + 3, dY + 2, 7, 20); g.fillStyle = '#e07a3a'; g.globalAlpha = 0.6 + 0.2 * Math.sin(t * 5); g.fillRect(dX + 4, dY + 14, 5, 7); g.globalAlpha = 1; g.fillStyle = '#e8e2d0'; g.globalAlpha = 0.25; g.fillRect(dX - 3, sy - 3, 19, 3); g.globalAlpha = 1; }
  if (h.id === 6 || h.id === 2 || h.id === 3) { g.fillStyle = '#1a120c'; g.fillRect(dX + 4, dY + 4, 5, 6); }
  if (h.id === 6) { g.fillStyle = '#6a6058'; g.fillRect(dX + 4, dY + 6, 5, 3); }
  if (h.lit) { // uyanan evin penceresi
    const rx = sx + 10, ry = sy - 44; // aile tabanının penceresi (alt kat)
    g.fillStyle = PAL.k; g.fillRect(rx - 1, ry - 1, 8, 7); g.fillStyle = '#ffcf7a'; g.fillRect(rx, ry, 6, 5);
  }
}
function drawVillageProps(g, cx, cy, V) {
  const P = (x, y) => [Math.round(x * TILE - cx), Math.round(y * TILE - cy)];
  // saman yığını (harman)
  let [x, y] = P(12.8, 3.4);
  g.fillStyle = PAL.k; g.beginPath(); g.ellipse(x, y, 17, 11, 0, 0, 6.3); g.fill();
  g.fillStyle = '#b89a5a'; g.beginPath(); g.ellipse(x, y - 1, 16, 10, 0, 0, 6.3); g.fill();
  g.fillStyle = '#d8bc78'; for (let i = 0; i < 26; i++) g.fillRect(x - 13 + ((i * 7) % 26), y - 8 + ((i * 5) % 14), 2, 1);
  // taze saman izi: harmandan Ev 4'e (kabarık)
  const trail = [[11, 5.4], [11, 6.6], [11.2, 7.8], [11.6, 9.2], [12.6, 10.3], [13.6, 11.2], [14.6, 12], [15.4, 12.9], [15.6, 14], [15.6, 15.1], [15.3, 16.2], [14.6, 17.1], [13.6, 17.3], [12, 17.4], [10.8, 17.2]];
  g.fillStyle = '#d8bc78';
  trail.forEach(([tx, ty], i) => { const [a, b] = P(tx, ty); for (let k = 0; k < 7; k++) { const ox = ((k * 37 + i * 11) % 9) - 4, oy = ((k * 17 + i * 5) % 7) - 3; g.fillRect(a + ox, b + oy, 2, 1); g.fillRect(a + ox + 1, b + oy - 1, 1, 1); } });
  // eski ezik saman (Ev 3)
  [x, y] = P(30.9, 9.5); g.fillStyle = '#7a6a48'; for (let k = 0; k < 9; k++) g.fillRect(x - 8 + k * 2, y + (k % 2), 3, 1);
  // taze saman (Ev 6)
  [x, y] = P(36.6, 17.6); g.fillStyle = '#d8bc78'; for (let k = 0; k < 10; k++) { g.fillRect(x - 7 + ((k * 5) % 14), y - 2 + ((k * 3) % 5), 2, 1); g.fillRect(x - 6 + ((k * 5) % 14), y - 3 + ((k * 3) % 5), 1, 1); }
  // dökülmüş yem (Ev 4)
  [x, y] = P(12.6, 17.9); g.fillStyle = '#9a8a50'; for (let k = 0; k < 8; k++) g.fillRect(x - 6 + k * 2, y + ((k * 3) % 3), 2, 1);
  // Ev 1'in çiti
  [x, y] = P(0.8, 10.6); g.fillStyle = '#4a3020'; g.fillRect(x - 10, y - 10, 2, 10); g.fillRect(x + 8, y - 10, 2, 10); g.fillRect(x - 10, y - 8, 20, 1); g.fillRect(x - 10, y - 4, 20, 1);
  // sarnıç (köy girişi)
}
// eşek ve keçi (prosedürel küçük sprite'lar)
const DONKEY = ['......kk......', '.....kxxk.....', 'kkkkkkxxxk....', 'kttttttttxk...', 'ktttttttttxk..', 'ktTTTTTTtttk..', '.kttttttttk...', '.kuk.kuk.kuk..', '.kuk.kuk.kuk..', '.kk..kk..kk...'];
const GOAT = ['.k.....', 'kxk.kk.', '.kxxxxk', '.kxwxxk', '..kxxk.', '..kkkk.'];

// Ev nesneleri için kalıcı çizim vekilleri (kare başına nesne ayrılmaz)
const HOUSE_PROXIES = HOUSES.map((h) => ({ house: h, y: h.fy1 + 0.49 }));
const VILLAGE_PROPS = [{ animals: true, y: 17.8 }, { pen: true, y: 10.7 }, { cistern: true, y: 21.4 }];
function villageSky(g, cx, cy, map, o, ro) {
  const mapTop = (map.y0 + 1.5) * TILE - cy;
  if (mapTop <= 0) return;
  const h = Math.min(VH, mapTop + 2);
  o.fillH = h; ro.maxY = h;
  Gfx.drawSky(g, cx, cy, o);
  Gfx.drawRidge(g, cx, mapTop + 10, ro);
}
const SKY_V = { dim: 1, fillH: VH }, RIDGE_V = { olives: false, col: '#0c1030', maxY: VH };
const SKY_A = { dim: 0.5, top: '#141a36', bot: '#4a4a6a', fillH: VH }, RIDGE_A = { olives: false, col: '#1a1e3a', windows: false, maxY: VH };

Scenes.define('hangi_kapi', {
  title: 'Hangi Kapı?',
  enter() {
    const sc = this;
    if (!sc.map) {
      sc.map = buildVillage();
      HOUSES.forEach((h) => { h.spr = buildHouseSprite(h); });
      sc.donkey = spriteFrom(DONKEY, { x: '#4a4038', t: '#7a6e64', T: '#9a8e82', u: '#3a322c' });
      sc.goat = spriteFrom(GOAT, { x: '#5a4636', w: '#d8cdb4' });
    }
    HOUSES.forEach((h) => (h.lit = false));
    sc.seen = {}; sc.marked = {}; sc.wrong = 0; sc.solved = false; sc.busy = false; sc.ahaSaid = false; sc.knocked = {}; sc.saidWake = false;
    sc.t = new Actor({ kind: 'tamar', x: 44, y: 22.6, dir: 'up', lamp: { child: true } });
    sc.f = new Actor({ kind: 'adult', skin: 'baba', x: 44.5, y: 24 });
    sc.n = new Actor({ kind: 'adult', skin: 'nahum', x: 43.5, y: 24.4 });
    sc.y = new Actor({ kind: 'adult', skin: 'yoas', x: 45, y: 24.8 });
    sc.villagers = [];
    Player.init(sc.t, sc.map); Player.allowGut = false;
    Trail.reset(sc.t.x, sc.t.y + 1.5); Trail.push(sc.t.x, sc.t.y);
    Cam.bounds = { x0: -0.5, y0: -2, x1: 47.5, y1: 24.5 }; Cam.minY = null;
    Cam.follow(sc.t.x, sc.t.y, 0, true);
    Audio.setAmbience({ wind: 0.08, crickets: true });
    Audio.setDrone(true, 87);
    UI.objective('Hayvan bölmesi olan, konuk odası dolu, bu gece telaş görmüş bir ev.');
    sc.bakisPrompt = 8;
    Player.interactables = HOUSES.map((h) => ({ x: h.door, y: h.doorY + 1, r: 1.4, label: 'Burası mı? (kapıyı çal)', enabled: () => !sc.busy && !sc.solved, action: () => sc.knock(h, false) }));
    Player.interactables.push({ x: 14.7, y: 17.1, r: 1.1, label: 'Dam merdiveninden çık, konuk odasını çal', enabled: () => !sc.busy && !sc.solved, action: () => sc.knock(HOUSES[3], true) });
    Player.interactables.push({ x: 11, y: 5.7, r: 1.3, label: 'Saman çöpünü al', enabled: () => !State.flags.kol_b01_saman_copu && !sc.busy, action: () => { State.flags.kol_b01_saman_copu = true; Audio.rustle(8); UI.bark('Taze bir saman çöpü. Yol buradan başlıyor.', 'Tamar', 3, true); } });
    UI.bark('Beytlehem · sayım konuklarıyla dolu köy, gece yarısı', null, 3.5);
  },
  seenCount(h) { return Object.keys(this.seen[h.id] || {}).length; },
  knock(h, roof) {
    const sc = this, t = sc.t, f = sc.f;
    if (sc.seenCount(h) < 2) { UI.bark('Önce bakmalıyım: altında hayvan var mı, konuk odası dolu mu?', 'Tamar', 3.6, true); return; }
    sc.busy = true; Player.enabled = false;
    Scripts.run(function* () {
      UI.bark('Burası mı?', 'Tamar', 1.6);
      const tx = roof ? 15.2 : h.door + 0.9, ty = roof ? 17.2 : h.doorY + 1.1;
      f.walkTo(sc.map, tx, ty); yield until(() => !f.path); f.dir = 'up';
      yield 0.3; Audio.knock(); yield 1.2;
      if (h.id === 4) {
        sc.solved = true;
        if (roof) yield UI.say([{ who: 'Ev sahibi', text: 'Aşağıda, hayvanların yanında.' }]);
        if (sc.seen[4] && sc.seen[4].C3 && !sc.ahaSaid) { sc.ahaSaid = true; yield UI.say([SAY.think('Hayvanlarını dışarı bağlamışlar... İçeride birine yer açmışlar!')]); }
        yield 0.5;
        Scenes.goto('yemlik', { fadeOut: 1.2 });
        return;
      }
      // yanlış kapı: nazik yanıt, eksik ipucu adıyla; pencere yanar
      const v = new Actor({ kind: 'adult', skin: h.skin, x: h.door, y: h.doorY + 0.55, dir: 'down', alpha: 0 });
      sc.villagers.push(v);
      for (let k = 0; k <= 10; k++) { v.alpha = k / 10; yield 0.03; }
      yield UI.say([{ who: h.who, text: h.reply }]);
      h.lit = true;
      if (!sc.knocked[h.id]) { sc.knocked[h.id] = true; State.flags.b01_uyanan_ev = Math.min(5, State.flags.b01_uyanan_ev + 1); State.stats.yanlis_kapi.push(h.id); sc.wrong++; }
      sc.marked[h.id] = h.miss;
      yield 0.6;
      for (let k = 10; k >= 0; k--) { v.alpha = k / 10; yield 0.03; }
      sc.villagers = sc.villagers.filter((q) => q !== v);
      sc.busy = false; Player.enabled = true;
      if (sc.wrong === 2 && !sc.saidWake) { sc.saidWake = true; UI.bark('Gece yarısı herkesi uyandırmayalım, kızım.', 'Baba', 3.5); yield 1.2; Hints.auto(1); }
    }, 'scene');
  },
  update(dt) {
    const sc = this, t = sc.t;
    Player.update(dt);
    Trail.push(t.x, t.y);
    updateFollowers([sc.f, sc.n, sc.y].filter((a) => !a.path), dt, [2.2, 3.4, 4.6]);
    if (sc.f.path) sc.f.update(dt);
    sc.villagers.forEach((v) => v.update(dt));
    Cam.follow(t.x, t.y - 1.2, dt);
    Audio.listenerX = t.x;
    if (sc.bakisPrompt > 0) { sc.bakisPrompt -= dt; UI.prompt('bakis', 'Bakış: çevreyi oku — ipuçları kenar ışığı alır'); if (Player.bakis) sc.bakisPrompt = 0; if (sc.bakisPrompt <= 0) UI.prompt(null); }
    // Bakış ile ipucu görme
    if (Player.bakis) {
      for (const c of CLUES) {
        if (dist(c.x, c.y, t.x, t.y) > 6.5) continue;
        const s = (sc.seen[c.h] = sc.seen[c.h] || {});
        if (!s[c.c]) { s[c.c] = true; if (c.h === 4 && c.c === 'C3' && !sc.ahaSaid) { sc.ahaSaid = true; UI.bark('Hayvanlarını dışarı bağlamışlar... İçeride birine yer açmışlar!', 'Tamar', 4.2, true); } }
      }
    }
  },
  draw(g) {
    const sc = this, cx = Cam.px(), cy = Cam.py(), map = sc.map;
    villageSky(g, cx, cy, map, SKY_V, RIDGE_V);
    blitMap(g, map.img, cx + 8, cy + 8);
    drawVillageProps(g, cx, cy, sc);
    const list = sc.list || (sc.list = []);
    list.length = 0;
    list.push(sc.t, sc.f, sc.n, sc.y);
    for (let i = 0; i < sc.villagers.length; i++) list.push(sc.villagers[i]);
    for (let i = 0; i < HOUSE_PROXIES.length; i++) list.push(HOUSE_PROXIES[i]);
    for (let i = 0; i < VILLAGE_PROPS.length; i++) list.push(VILLAGE_PROPS[i]);
    list.sort(BY_Y);
    for (const o of list) {
      if (o instanceof Actor) o.draw(g, cx, cy);
      else if (o.house) { const h = o.house, sx = Math.round((h.x0 - 0.5) * TILE - cx), sy = Math.round((h.fy1 + 0.5) * TILE - cy); g.drawImage(h.spr, sx, sy - h.spr.height); drawHouseDetails(g, h, sx, sy); }
      else if (o.animals) { const [x, y] = [Math.round(12.2 * TILE - cx), Math.round(17.6 * TILE - cy)]; g.drawImage(sc.donkey, x - 7, y - 10); g.drawImage(sc.goat, x + 9, y - 6); g.drawImage(sc.goat, x - 14, y - 5); g.fillStyle = '#6e675a'; g.fillRect(x - 1, y - 22, 3, 2); g.fillStyle = '#5a4030'; g.fillRect(x, y - 20, 1, 9); }
      else if (o.pen) { const [x, y] = [Math.round(0.8 * TILE - cx), Math.round(10.4 * TILE - cy)]; g.drawImage(sc.goat, x - 3, y - 6); }
      else if (o.cistern) { const [x, y] = [Math.round(43 * TILE - cx), Math.round(21 * TILE - cy)]; g.fillStyle = PAL.k; g.fillRect(x - 9, y - 6, 18, 12); g.fillStyle = '#9a9080'; g.fillRect(x - 8, y - 5, 16, 10); g.fillStyle = '#05060c'; g.fillRect(x - 5, y - 3, 10, 6); }
    }
    // ışık
    Gfx.resetLights();
    const p = sc.t.lampWorld();
    Gfx.light(p.x * TILE - cx, p.y * TILE - cy, 80 * (1 + Math.sin(State.time * 12) * 0.02), 1);
    Gfx.glow(p.x * TILE - cx, p.y * TILE - cy, 40, 0.45);
    Gfx.light(sc.t.x * TILE - cx, sc.t.y * TILE - cy, 120, 0.25);
    let lights = 1;
    HOUSES.forEach((h) => { if (h.lit && lights < 8) { lights++; const x = (h.x0 - 0.5) * TILE + 13 - cx, y = (h.fy1 + 0.5) * TILE - 41 - cy; Gfx.light(x, y, 48, 0.9); Gfx.glow(x, y, 22, 0.6); } });
    Gfx.light((10.7) * TILE - cx, (16.1) * TILE - cy, 20, 0.55);
    Gfx.light((23.4) * TILE - cx, (16.4) * TILE - cy, 26, 0.6);
    Gfx.applyDark('#03040f', 0.8);
    Gfx.dashedCircle(p.x * TILE - cx, p.y * TILE - cy + 6, 80, '#ffcf7a', 2, 5, 0.22);
    // Bakış: ipucu simgeleri (biçimle ayrışır)
    const pulse = REDUCED ? 0.85 : 0.65 + 0.35 * Math.sin(State.time * 4);
    const hintGlow = Hints.ctx === 'kapi' && Hints.level >= 2;
    for (const c of CLUES) {
      const seen = sc.seen[c.h] && sc.seen[c.h][c.c];
      const marked = sc.marked[c.h] === c.c;
      const distinct = hintGlow && c.h === 4 && (c.c === 'C3' || c.c === 'C1');
      const near = dist(c.x, c.y, sc.t.x, sc.t.y) <= 6.5;
      if (!((Player.bakis && near) || marked || distinct)) continue;
      const x = Math.round(c.x * TILE - cx), y = Math.round(c.y * TILE - cy) - 14;
      g.globalAlpha = marked || distinct ? 1 : pulse;
      g.fillStyle = 'rgba(8,10,24,0.85)'; g.fillRect(x - 6, y - 6, 13, 13);
      g.strokeStyle = marked ? '#f0a040' : distinct ? '#fff4cc' : '#ffe9a8'; g.strokeRect(x - 6.5, y - 6.5, 14, 14);
      g.drawImage(ART.icons[c.icon], x - 4, y - 4);
      if (marked) { g.strokeStyle = '#f0a040'; g.beginPath(); g.arc(x + 0.5, y + 0.5, 10, 0, 6.3); g.stroke(); }
      g.globalAlpha = 1;
    }
    if (Player.bakis) Gfx.vignette(0.55);
  },
  exit() { Player.allowGut = true; },
  skip() { if (this.solved) return; this.solved = true; Scenes.goto('yemlik', { fadeOut: 0.4 }); },
  hint() {
    if (this.solved) return null;
    return { ctx: 'kapi', onContinue: () => { this.solved = true; UI.bark('Nahum dördüncü evin kapısını gösteriyor.', null, 2.4); Scripts.run(function* () { yield 1.6; Scenes.goto('yemlik', { fadeOut: 1 }); }, 'scene'); }, levels: [
      { text: 'Babam der ki: ağılda bir şey değiştiyse önce hayvanlara bak.', think: true },
      { text: 'Yalnızca ayırt edici ipuçları parlıyor: bağlı hayvanlar ve yere dökülmüş yem, kapı aralığından sızan ışık. Çaldığın yanlış kapılarda eksik ipucu işaretli kalır.' },
      { text: 'Şu eve bak, kızım: gece yarısı hayvanları dışarıda bağlı, kapısının aralığından ışık sızıyor.', who: 'Nahum' }] };
  },
});

// ============================================================
// SAHNE 11 — Avluda (Luka 2:17–18) ve şafak grisinde dönüş (2:20)
// ============================================================
Scenes.define('avlu', {
  title: 'Avluda',
  enter() {
    const V = Scenes.defs.hangi_kapi;
    if (!V.map) { V.enter(); Scripts.kill(); }
    const sc = this;
    sc.map = V.map; sc.V = V;
    HOUSES.forEach((h) => { if (h.id !== 4) h.lit = h.lit || false; });
    sc.t = new Actor({ kind: 'tamar', x: 9.2, y: 18.3, dir: 'up' });
    sc.f = new Actor({ kind: 'adult', skin: 'baba', x: 10.6, y: 17.9, dir: 'up' });
    sc.n = new Actor({ kind: 'adult', skin: 'nahum', x: 11.8, y: 18.4, dir: 'up' });
    sc.y = new Actor({ kind: 'adult', skin: 'yoas', x: 8.2, y: 18.6, dir: 'up' });
    // dinleyenler: Ev 4'ün halkı ve uyanan komşular (her yolda vardır) + uyanan evler yüz ekler
    sc.listeners = [
      new Actor({ kind: 'adult', skin: 'koylu1', x: 9.3, y: 17.1, dir: 'down' }),
      new Actor({ kind: 'adult', skin: 'kadin', x: 11.6, y: 17.1, dir: 'down' }),
      new Actor({ kind: 'adult', skin: 'kadin2', x: 13.6, y: 18.4, dir: 'left' }),
      new Actor({ kind: 'adult', skin: 'koylu2', x: 14.4, y: 17.7, dir: 'left' }),
      new Actor({ kind: 'adult', skin: 'koylu1', x: 7.0, y: 17.8, dir: 'right' }),
    ];
    const extra = Math.min(5, State.flags.b01_uyanan_ev);
    for (let i = 0; i < extra; i++) sc.listeners.push(new Actor({ kind: 'adult', skin: ['kadin', 'koylu2', 'kadin2', 'koylu1', 'kadin'][i], x: 15.4 + i * 0.9, y: 18.4 + (i % 2) * 0.4, dir: 'left' }));
    Player.init(sc.t, sc.map); Player.allowGut = false;
    Player.enabled = false;
    Cam.bounds = { x0: -0.5, y0: -2, x1: 47.5, y1: 24.5 }; Cam.minY = null;
    Cam.follow(10.5, 16, 0, true);
    sc.stage = 0; sc.leaving = false;
    Audio.setAmbience({ wind: 0.06, crickets: false });
    Audio.setTone(false); Audio.setDrone(true, 98);
    Scripts.run(function* () {
      yield 0.8;
      yield UI.say([{ text: 'Bebeği görünce, onunla ilgili olarak kendilerine bildirileni anlattılar. Bunu duyanların hepsi, çobanların anlattıklarına şaştı.', kind: 'narr', ref: 'Luka 2:17–18 · [yakın aktarım]' }]);
      sc.stage = 1; Player.enabled = true;
      UI.objective('Şafak yaklaşıyor. Köy girişinden obaya dönülecek.');
      UI.prompt('bakis', 'Bakış: çevrene bak');
      Scripts.run(function* () { let w = 0; yield (dt) => { w += dt; return w > 7 || (Player.bakis && w > 1.5); }; UI.prompt(null); }, 'p');
    }, 'scene');
  },
  update(dt) {
    const sc = this, t = sc.t, F = State.flags;
    Player.update(dt);
    [sc.f, sc.n, sc.y].forEach((a) => a.update(dt));
    sc.listeners.forEach((a) => a.update(dt));
    Cam.follow(t.x, t.y - 1.2, dt);
    // talking: çobanlar dinleyenlere döner, hafif jest
    if (sc.stage === 1) {
      if (Player.bakis) {
        if (sc.listeners.some((l) => dist(l.x, l.y, t.x, t.y) < 5)) F.tan_b01_duyanlar_sasti = true;
        if (dist(10, 16.2, t.x, t.y) < 4.5) F.tan_b01_yureginde_sakladi = true;
      }
      if (!sc.leaving && t.y > 19.2 && t.x > 37) {
        sc.leaving = true; Player.enabled = false; UI.objective(null);
        Scripts.run(function* () {
          sc.stage = 2;
          [sc.f, sc.n, sc.y].forEach((a, i) => a.walkTo(sc.map, 44 + i * 0.6, 23.4 - i * 0.3));
          t.walkTo(sc.map, 42.8, 23.8);
          UI.prompt('bakis', 'Bakış: dönen çobanlar');
          let held = 0;
          yield (dt) => { if (Input.down('bakis')) { held += dt; } return !t.path && !sc.f.path; };
          if (held > 0.2) F.tan_b01_overek_dondu = true;
          yield 0.4;
          UI.prompt(null);
          yield UI.say([{ text: 'Çobanlar, duyup gördükleri her şey için Tanrı\'yı yücelterek, överek döndüler. Her şey kendilerine bildirildiği gibiydi.', kind: 'narr', ref: 'Luka 2:20 · [yakın aktarım]' }]);
          Scenes.goto('yanki', { fadeOut: 1.2 });
        }, 'scene');
      }
    }
  },
  draw(g) {
    const sc = this, cx = Cam.px(), cy = Cam.py(), map = sc.map, V = sc.V;
    villageSky(g, cx, cy, map, SKY_A, RIDGE_A);
    blitMap(g, map.img, cx + 8, cy + 8);
    drawVillageProps(g, cx, cy, V);
    const list = sc.list || (sc.list = []);
    list.length = 0;
    list.push(sc.t, sc.f, sc.n, sc.y);
    for (let i = 0; i < sc.listeners.length; i++) list.push(sc.listeners[i]);
    for (let i = 0; i < HOUSE_PROXIES.length; i++) list.push(HOUSE_PROXIES[i]);
    list.push(VILLAGE_PROPS[0]);
    list.sort(BY_Y);
    for (const o of list) {
      if (o instanceof Actor) o.draw(g, cx, cy);
      else if (o.house) { const h = o.house, sx = Math.round((h.x0 - 0.5) * TILE - cx), sy = Math.round((h.fy1 + 0.5) * TILE - cy); g.drawImage(h.spr, sx, sy - h.spr.height); drawHouseDetails(g, h, sx, sy); if (h.id === 4) drawLowDoorSilhouette(g, sx + h.doorPx, sy - 22); }
      else if (o.animals) { const [x, y] = [Math.round(12.2 * TILE - cx), Math.round(17.6 * TILE - cy)]; g.drawImage(V.donkey, x - 7, y - 10); g.drawImage(V.goat, x + 9, y - 6); g.drawImage(V.goat, x - 14, y - 5); }
    }
    Gfx.resetLights();
    Gfx.light(10.6 * TILE - cx, 16 * TILE - cy, 40, 0.8);
    Gfx.applyDark('#1c2240', 0.55);
    if (Player.bakis) {
      const pulse = REDUCED ? 0.85 : 0.6 + 0.4 * Math.sin(State.time * 4);
      g.globalAlpha = pulse; g.strokeStyle = '#ffe9a8';
      const dx = Math.round((HOUSES[3].x0 - 0.5) * TILE - cx) + HOUSES[3].doorPx, dy = Math.round((HOUSES[3].fy1 + 0.5) * TILE - cy) - 22;
      g.strokeRect(dx - 1.5, dy - 1.5, 16, 24);
      g.globalAlpha = 1;
      Gfx.vignette(0.5);
    }
  },
  exit() { Player.allowGut = true; },
  skip() { Scripts.kill('scene'); Scenes.goto('yanki', { fadeOut: 0.4 }); },
  hint() { return { ctx: 'avlu', levels: [{ text: 'Babam anlatıyor, herkes dinliyor. Sonra şafak sökmeden obaya döneriz.', think: true }, { text: 'Köy girişi güneydoğuda, sarnıcın yanında.' }, { text: 'Haydi kızım, eve dönelim.', who: 'Baba', onContinue: () => { this.t.x = 38; this.t.y = 19.6; } }] }; },
});
function drawLowDoorSilhouette(g, x, y) {
  // alçak kapının aralığından: yemliğe eğik, kıpırtısız bir silüet (yüzsüz)
  g.fillStyle = '#ffcf7a'; g.globalAlpha = 0.5; g.fillRect(x + 2, y + 6, 9, 15); g.globalAlpha = 1;
  g.fillStyle = '#120c08'; g.fillRect(x + 4, y + 10, 4, 3); g.fillRect(x + 3, y + 13, 6, 7); g.fillRect(x + 7, y + 11, 2, 2);
}

// ============================================================
// SAHNE 12 — Yankı: obada şafak; ilk seçim (§8.1)
// ============================================================
Scenes.define('yanki', {
  title: 'Yankı: obada şafak',
  enter() {
    KW.ensure('yanki');
    const sc = this, t = KW.tamar, f = KW.father;
    if (!ART.kids) ART.kids = [buildCharacter(TAMAR_TOP, TAMAR_LEGS, { y: '#6a5236', Y: '#4a3826', m: '#4a5a7a', M: '#34405a', h: '#3a2418' }), buildCharacter(TAMAR_TOP, TAMAR_LEGS, { y: '#c8b890', Y: '#9a8a68', m: '#6a7a4a', M: '#4a5632' })];
    const woman = new Actor({ kind: 'adult', skin: 'kadin2', x: 27.8, y: 34.6, dir: 'right', name: 'Obadaki kadın' });
    const k1 = new Actor({ kind: 'tamar', x: 26.6, y: 35.3, dir: 'right' }); k1.sprites = () => ART.kids[0];
    const k2 = new Actor({ kind: 'tamar', x: 28.6, y: 35.6, dir: 'up' }); k2.sprites = () => ART.kids[1];
    const hulda = new Actor({ kind: 'adult', skin: 'hulda', x: 23.8, y: 36.6, dir: 'right', carry: 'natan', name: 'Hulda' });
    KW.extras = [woman, k1, k2, hulda];
    sc.woman = woman; sc.hulda = hulda; sc.kids = [k1, k2];
    Player.enabled = false;
    Audio.setAmbience({ wind: 0.1, crickets: false });
    Audio.setDrone(true, 110);
    KW.camFocus = { x: 28, y: 33.5 };
    Scripts.run(function* () {
      yield 0.6;
      t.walkTo(KW.map, 30, 34.2); f.walkTo(KW.map, 31.2, 33.6);
      yield until(() => !t.path);
      t.dir = 'left';
      yield UI.card('<div class="t">Seçimlerin İncil\'deki olayları değiştirmez.</div><div class="t" style="margin-top:.6em;font-size:.9em;color:#d8cdb4">Değiştirdiğin şey Tamar\'ın iç dünyası, ilişkileri, neye nasıl tanıklık ettiği ve hikâyeyi Sara\'ya nasıl anlattığıdır.</div>', { minTime: 1 });
      yield UI.say([{ who: 'Obadaki kadın', text: 'Bütün gece neredeydin, kızım?' }]);
      const r = yield UI.choose([{ text: 'Koşup anlat', tone: 'sevinç' }, { text: 'Babama fısılda', tone: 'yakınlık' }, { text: 'Sessiz kal', tone: '' }]);
      const F = State.flags;
      if (r === 0) {
        F.b01_haber = 'koye'; F.eks_soz += 1;
        t.speed = 3.4; t.walkTo(KW.map, 28.8, 34.9); yield until(() => !t.path); t.speed = 2.5; t.dir = 'left';
        yield UI.say([SAY.tamar('Melek dedi ki: "Korkmayın!" Davut\'un kentinde bir Kurtarıcı doğmuş; melek ona Rab Mesih dedi. Biz de gittik. Yemlikte bir bebek gördük, kundağa sarılmış!')]);
        woman.dir = 'down'; k1.dir = 'right'; k2.dir = 'up';
        UI.bark('Kadın ve çocuklar şaşkınlıkla birbirlerine baktılar.', null, 3);
        yield 2.4;
      } else if (r === 1) {
        F.b01_haber = 'babaya';
        t.walkTo(KW.map, f.x - 0.6, f.y + 0.2); yield until(() => !t.path); t.dir = 'right'; f.dir = 'left';
        t.holding = true;
        yield UI.say([SAY.tamar('(fısıltıyla) Baba... annesi hiç konuşmadı. Hep baktı.'), { who: 'Baba', por: 'baba', text: '(bir süre susar) Sen benden iyi bakmışsın.' }, SAY.tamar('Ben korktum. Sonra korkmadım.'), SAY.baba('Ben de, kızım.')]);
      } else {
        F.b01_haber = 'kalbinde'; F.eks_soz -= 1;
      }
      // her yol: Hulda'nın kucağındaki Natan'a bakan Tamar
      t.walkTo(KW.map, hulda.x + 1.1, hulda.y - 0.2); yield until(() => !t.path);
      t.dir = 'left'; hulda.dir = 'right';
      KW.camFocus = { x: 24.6, y: 35.4 };
      yield 3.2;
      Scenes.goto('tablo1', { fadeOut: 1.6 });
    }, 'scene');
  },
  update(dt) { KW.update(dt); Player.update(dt); },
  touchMode() { return 'etk'; },
  draw(g) {
    KW.extraLights = null;
    KW.draw(g);
    // Natan: Hulda'nın kucağında kundak (fizyonomi çizilmez)
    const h = this.hulda, cx = Cam.px(), cy = Cam.py();
    if (h) { const x = Math.round(h.x * TILE - cx) + (h.dir === 'left' ? -6 : 1), y = Math.round(h.y * TILE - cy) - 15; g.fillStyle = PAL.k; g.fillRect(x - 1, y - 1, 8, 6); g.fillStyle = '#e8e0cc'; g.fillRect(x, y, 6, 4); g.fillStyle = '#b8ae96'; g.fillRect(x + 1, y + 1, 4, 1); g.fillStyle = '#d8b090'; g.fillRect(x + 4, y, 2, 2); }
  },
  exit() { KW.extras = []; KW.camFocus = null; },
  skip() { if (!State.flags.b01_haber) { State.flags.b01_haber = 'kalbinde'; State.flags.eks_soz -= 1; } Scenes.goto('tablo1', { fadeOut: 0.4 }); },
  hint() { return null; },
});
