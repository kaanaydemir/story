// ============================================================
// Dünya: karo haritası, aktörler, sürü kuralları (§6.2), baba, oyuncu
// Koordinatlar karo cinsindendir; karo (i,j) merkezi (i,j)'dir.
// Kırlar haritası bulmaca koordinatlarını doğrudan kullanır (harita ofseti (8,6)).
// ============================================================
const T = { VOID: 0, GRASS: 1, DIRT: 2, WALL: 3, GAP: 4, ROUGH: 5, THORN: 6, CISTERN: 7, STEPS: 8, FOLDWALL: 9, FOLD: 10, CAVE: 11, RUBBLE: 12, HOUSE: 13, WELL: 14, PATH: 15, EDGE: 16, ROCK: 17, TRUNK: 18, SKY: 19, FLOOR: 20, STRAW: 21, STREET: 22, STAIR: 23, WALLV: 24, YARD: 25 };
const SOLID = new Set([T.VOID, T.WALL, T.ROUGH, T.THORN, T.CISTERN, T.STEPS, T.FOLDWALL, T.CAVE, T.HOUSE, T.WELL, T.EDGE, T.ROCK, T.TRUNK, T.SKY, T.WALLV]);

class TileMap {
  constructor(w, h, x0, y0) { this.w = w; this.h = h; this.x0 = x0; this.y0 = y0; this.t = new Uint8Array(w * h); this.img = null; this.extraSolid = new Set(); }
  inb(x, y) { const i = x - this.x0, j = y - this.y0; return i >= 0 && j >= 0 && i < this.w && j < this.h; }
  get(x, y) { const i = x - this.x0, j = y - this.y0; if (i < 0 || j < 0 || i >= this.w || j >= this.h) return T.VOID; return this.t[j * this.w + i]; }
  set(x, y, v) { const i = x - this.x0, j = y - this.y0; if (i < 0 || j < 0 || i >= this.w || j >= this.h) return; this.t[j * this.w + i] = v; }
  fill(x0, y0, x1, y1, v) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.set(x, y, v); }
  solidAt(fx, fy) { const x = Math.round(fx), y = Math.round(fy); if (this.extraSolid.size && this.extraSolid.has(x + ',' + y)) return true; return SOLID.has(this.get(x, y)); }
  boxFree(x, y, rx, ry) {
    return !(this.solidAt(x - rx, y - ry) || this.solidAt(x + rx, y - ry) || this.solidAt(x - rx, y + ry) || this.solidAt(x + rx, y + ry));
  }
  // BFS yol bulma (insanlar için)
  findPath(sx, sy, tx, ty) {
    const W = this.w, H = this.h, start = (Math.round(sy) - this.y0) * W + (Math.round(sx) - this.x0), goal = (Math.round(ty) - this.y0) * W + (Math.round(tx) - this.x0);
    if (start === goal) return [{ x: tx, y: ty }];
    const prev = new Int32Array(W * H).fill(-1); prev[start] = start;
    const q = [start]; let head = 0;
    const ok = (i) => { const x = (i % W) + this.x0, y = Math.floor(i / W) + this.y0; return i === goal || !this.solidAt(x, y); };
    while (head < q.length) {
      const c = q[head++]; if (c === goal) break;
      const cx = c % W, cy = Math.floor(c / W);
      const nb = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
      for (const [dx, dy] of nb) {
        const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const n = ny * W + nx; if (prev[n] !== -1 || !ok(n)) continue;
        if (dx && dy && (!ok(cy * W + nx) || !ok(ny * W + cx))) continue;
        prev[n] = c; q.push(n);
      }
    }
    if (prev[goal] === -1) return null;
    const pts = []; let c = goal;
    while (c !== start) { pts.push({ x: (c % W) + this.x0, y: Math.floor(c / W) + this.y0 }); c = prev[c]; }
    pts.reverse(); pts[pts.length - 1] = { x: tx, y: ty };
    // görünür köşe azaltma
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      if (i > 0 && i < pts.length - 1) { const a = pts[i - 1], b = pts[i], c2 = pts[i + 1]; if (b.x - a.x === c2.x - b.x && b.y - a.y === c2.y - b.y) continue; }
      out.push(pts[i]);
    }
    return out;
  }
}

// ------------------------------------------------------------
// Karo boyama (prosedürel, gece paletinde okunur)
// ------------------------------------------------------------
function paintMap(map, painter) {
  const c = makeCanvas(map.w * TILE, map.h * TILE), g = c.getContext('2d');
  for (let j = 0; j < map.h; j++)
    for (let i = 0; i < map.w; i++) {
      const x = i + map.x0, y = j + map.y0, v = map.t[j * map.w + i];
      painter(g, v, x, y, i * TILE, j * TILE, makeRng((i * 73856093) ^ (j * 19349663) ^ 0x5bd1e995));
    }
  map.img = c;
  return c;
}
function speckle(g, px, py, rr, base, cols, n) {
  g.fillStyle = base; g.fillRect(px, py, TILE, TILE);
  for (let k = 0; k < n; k++) { g.fillStyle = cols[Math.floor(rr() * cols.length)]; g.fillRect(px + Math.floor(rr() * 16), py + Math.floor(rr() * 16), 1, 1); }
}
const GRASS_COLS = ['#3b5340', '#4a6448', '#2e4434', '#58704e', '#6b7c52'];
function paintGrass(g, px, py, rr, dry) {
  speckle(g, px, py, rr, dry ? '#4c5638' : '#3e5640', dry ? ['#5e6640', '#3e4630', '#6e7448'] : GRASS_COLS, 46);
  for (let k = 0; k < 3; k++) { if (rr() < 0.5) continue; const x = px + 2 + Math.floor(rr() * 12), y = py + 2 + Math.floor(rr() * 12); g.fillStyle = '#6f8a5c'; g.fillRect(x, y, 1, 2); g.fillRect(x + 1, y - 1, 1, 2); }
  if (rr() < 0.12) { g.fillStyle = '#8a8270'; g.fillRect(px + Math.floor(rr() * 13), py + Math.floor(rr() * 13), 2, 1); }
}
function paintDirt(g, px, py, rr) { speckle(g, px, py, rr, '#6a5640', ['#7c664a', '#5a4836', '#86704e', '#4e3e2e'], 40); }
function paintStoneFace(g, px, py, rr, top) {
  g.fillStyle = '#3a362f'; g.fillRect(px, py, TILE, TILE);
  // üst taşlar (kapak)
  let x = 0;
  while (x < 16) { const w = 3 + Math.floor(rr() * 4); g.fillStyle = rr() < 0.5 ? '#a49a86' : '#8e8472'; g.fillRect(px + x, py, Math.min(w, 16 - x) - 1, 4); g.fillStyle = '#c2b8a2'; g.fillRect(px + x, py, Math.min(w, 16 - x) - 1, 1); x += w; }
  // yüz
  for (let row = 0; row < 3; row++) {
    let xx = (row % 2) * 2 - 2;
    const yy = 5 + row * 4;
    while (xx < 16) {
      const w = 3 + Math.floor(rr() * 4);
      const a = Math.max(0, xx), b = Math.min(16, xx + w - 1);
      if (b > a) { g.fillStyle = ['#6e675a', '#7a7262', '#5e584c', '#857c6a'][Math.floor(rr() * 4)]; g.fillRect(px + a, py + yy, b - a, 3); g.fillStyle = '#958c78'; g.fillRect(px + a, py + yy, b - a, 1); }
      xx += w;
    }
  }
  g.fillStyle = 'rgba(10,10,20,0.35)'; g.fillRect(px, py + 13, TILE, 3);
}
function paintKirlar(g, v, x, y, px, py, rr) {
  switch (v) {
    case T.SKY: case T.VOID: g.clearRect(px, py, TILE, TILE); break;
    case T.GRASS: paintGrass(g, px, py, rr, y > 30); break;
    case T.RUBBLE: paintGrass(g, px, py, rr, true); if (rr() < 0.4) { g.fillStyle = '#7a7262'; g.fillRect(px + Math.floor(rr() * 12), py + Math.floor(rr() * 12), 3, 2); g.fillStyle = '#a49a86'; g.fillRect(px + 1 + Math.floor(rr() * 10), py + 2 + Math.floor(rr() * 10), 2, 1); } break;
    case T.DIRT: case T.PATH: paintDirt(g, px, py, rr); break;
    case T.GAP: paintDirt(g, px, py, rr); g.fillStyle = 'rgba(30,22,16,0.45)'; g.fillRect(px, py + 4, TILE, 1); g.fillRect(px, py + 9, TILE, 1); g.fillStyle = 'rgba(160,140,110,0.35)'; g.fillRect(px, py + 5, TILE, 1); g.fillRect(px, py + 10, TILE, 1); break;
    case T.WALL: paintStoneFace(g, px, py, rr); break;
    case T.STEPS: paintStoneFace(g, px, py, rr);
      g.fillStyle = '#0a0b1a'; [[2, 3], [7, 7], [3, 11]].forEach(([sx, sy]) => g.fillRect(px + sx - 1, py + sy - 1, 7, 4));
      g.fillStyle = '#c8bea8'; [[2, 3], [7, 7], [3, 11]].forEach(([sx, sy]) => { g.fillRect(px + sx, py + sy, 5, 2); });
      g.fillStyle = '#ece2c8'; [[2, 3], [7, 7], [3, 11]].forEach(([sx, sy]) => g.fillRect(px + sx, py + sy, 5, 1));
      break;
    case T.THORN: paintGrass(g, px, py, rr); g.drawImage(ART.thorn, px, py + 2); break;
    case T.CISTERN: {
      paintDirt(g, px, py, rr);
      const left = map_get_cistern_side(x, y);
      g.fillStyle = '#8e8472'; g.fillRect(px, py, TILE, TILE);
      g.fillStyle = '#070812';
      g.fillRect(px + (left.l ? 3 : 0), py + (left.t ? 3 : 0), TILE - (left.l ? 3 : 0) - (left.r ? 3 : 0), TILE - (left.t ? 3 : 0) - (left.b ? 3 : 0));
      g.fillStyle = '#1a1c30'; if (left.t) g.fillRect(px + (left.l ? 3 : 0), py + 3, TILE - (left.l ? 3 : 0) - (left.r ? 3 : 0), 2);
      break;
    }
    case T.ROUGH: {
      speckle(g, px, py, rr, '#34342f', ['#44423b', '#2a2a26', '#4e4a42', '#3a4434'], 70);
      const n = (Math.sin(x * 1.7 + y * 3.1) + Math.sin(x * 0.6 - y * 1.3)) * 0.5;
      if (n > 0.55 && rr() < 0.7) g.drawImage(ART.rocks[2], px + Math.floor(rr() * 4), py + 2 + Math.floor(rr() * 4));
      else if (n < -0.6 && rr() < 0.6) g.drawImage(ART.bush2, px + Math.floor(rr() * 3) - 1, py + 3);
      else if (rr() < 0.15) { g.fillStyle = '#5a564c'; g.fillRect(px + Math.floor(rr() * 12), py + Math.floor(rr() * 12), 3, 2); g.fillStyle = '#6e6a5e'; g.fillRect(px + Math.floor(rr() * 12), py + Math.floor(rr() * 12), 2, 1); }
      break;
    }
    case T.EDGE: speckle(g, px, py, rr, '#34322e', ['#4a4840', '#26262a', '#5a564c'], 50); g.fillStyle = '#5a564c'; g.fillRect(px, py + 12, TILE, 4); g.fillStyle = '#7a7262'; g.fillRect(px, py + 12, TILE, 1); break;
    case T.ROCK: paintGrass(g, px, py, rr); break;
    case T.TRUNK: paintGrass(g, px, py, rr); break;
    case T.FOLDWALL: paintStoneFace(g, px, py, rr); break;
    case T.FOLD: speckle(g, px, py, rr, '#5a4a38', ['#6a5840', '#4a3c2e', '#c8b080', '#7a6448'], 50); break;
    case T.CAVE: g.fillStyle = '#0c0b12'; g.fillRect(px, py, TILE, TILE); g.fillStyle = '#2a2622'; if (y === 36) g.fillRect(px, py, TILE, 3); break;
    case T.HOUSE: speckle(g, px, py, rr, '#8a7a62', ['#9a8a70', '#7a6a54', '#a89878'], 40); break;
    case T.WELL: paintDirt(g, px, py, rr); g.fillStyle = '#0a0b1a'; g.fillRect(px + 2, py + 3, 12, 11); g.fillStyle = '#9a9080'; g.fillRect(px + 3, py + 4, 10, 9); g.fillStyle = '#080914'; g.fillRect(px + 5, py + 6, 6, 5); break;
    default: paintGrass(g, px, py, rr);
  }
}
let CISTERN_RECT = { x0: 13, y0: 11, x1: 14, y1: 12 };
function map_get_cistern_side(x, y) { const c = CISTERN_RECT; return { l: x === c.x0, r: x === c.x1, t: y === c.y0, b: y === c.y1 }; }

// ------------------------------------------------------------
// Kırlar haritası (bulmaca koordinatları; 48×45 karo)
// ------------------------------------------------------------
const STONES = {
  T1: { x: 3, y: 7, ad: 'Batı taşı' }, T2: { x: 12, y: 5, ad: 'Orta taş' }, T3: { x: 3, y: 14, ad: 'Geçit taşı' }, T4: { x: 10, y: 13, ad: 'Sarnıç taşı' },
  T5: { x: 11, y: 17, ad: 'Zeytin taşı' }, T6: { x: 16, y: 24, ad: 'Harnup taşı' }, T7: { x: 8, y: 26, ad: 'Ağıl taşı' }, T8: { x: 5, y: 33, ad: 'Kapı' },
};
const WALLS = { 0: { y: 0, gaps: [] }, 1: { y: 10, gaps: [[2, 3]] }, 2: { y: 21, gaps: [[16, 17]] }, 3: { y: 30, gaps: [[4, 5]] } };
const sekiOf = (y) => (y < 0 ? 0 : y < 10 ? 1 : y < 21 ? 2 : y < 30 ? 3 : 4);
const CISTERN = { x0: 12.5, y0: 10.5, x1: 14.5, y1: 12.5 };
const FIRE = { x: 10, y: 32 };

function buildKirlar() {
  const m = new TileMap(48, 45, -8, -7);
  m.fill(-8, -7, 39, 37, T.ROUGH);
  m.fill(-8, -7, 39, -6, T.SKY);
  m.fill(-8, -5, 39, -5, T.EDGE);
  m.fill(4, -4, 30, -1, T.RUBBLE);           // Seki 0 (yıkık)
  m.fill(0, 1, 31, 9, T.GRASS);              // Seki 1
  m.fill(0, 11, 31, 20, T.GRASS);            // Seki 2
  m.fill(0, 22, 31, 29, T.GRASS);            // Seki 3
  m.fill(-2, 31, 33, 34, T.GRASS);           // ağıl önü
  m.fill(0, 0, 31, 0, T.WALL); m.set(20, 0, T.STEPS);   // W0 ve basamak taşları
  m.fill(0, 10, 31, 10, T.WALL); m.set(2, 10, T.GAP); m.set(3, 10, T.GAP); m.set(26, 10, T.THORN); m.set(27, 10, T.THORN);
  m.fill(0, 21, 31, 21, T.WALL); m.set(16, 21, T.GAP); m.set(17, 21, T.GAP);
  m.fill(0, 30, 31, 30, T.WALL); m.set(4, 30, T.GAP); m.set(5, 30, T.GAP);
  m.fill(13, 11, 14, 12, T.CISTERN);
  // ağıl (taş duvar, arkası sığ mağara), kapı (5,34)
  m.fill(0, 34, 10, 34, T.FOLDWALL); m.set(5, 34, T.FOLD);
  m.fill(0, 35, 0, 37, T.FOLDWALL); m.fill(10, 35, 10, 37, T.FOLDWALL);
  m.fill(1, 35, 9, 36, T.FOLD); m.fill(1, 37, 9, 37, T.CAVE);
  // oba (güneydoğu) ve kuyu
  m.fill(12, 35, 33, 37, T.GRASS);
  m.fill(23, 34, 25, 35, T.HOUSE); m.fill(27, 32, 29, 33, T.HOUSE); m.fill(30, 35, 32, 36, T.HOUSE);
  m.set(26, 36, T.WELL);
  // patika başı (doğu)
  m.fill(32, 3, 36, 5, T.PATH); m.set(32, 4, T.PATH);
  // seki 0 uçları
  m.fill(4, -4, 5, -4, T.ROUGH); m.fill(28, -4, 30, -4, T.ROUGH);
  // kayalar ve ağaç gövdeleri (katı)
  [[15, 8], [16, 8], [-1, 6], [24, 16], [6, 23], [22, 27], [29, 19], [1, 27]].forEach(([x, y]) => m.set(x, y, T.ROCK));
  const trees = [{ x: 1, y: 2, k: 'olive' }, { x: 29, y: 1, k: 'olive2' }, { x: 9, y: 19, k: 'olive' }, { x: 27, y: 14, k: 'olive2' }, { x: 2, y: 18, k: 'olive2' }, { x: 19, y: 26, k: 'carob' }, { x: 26, y: 24, k: 'olive' }, { x: 13, y: 33, k: 'olive2' }, { x: 33, y: 33, k: 'olive' }, { x: 7, y: -3, k: 'olive2' }, { x: 25, y: -3, k: 'olive' }];
  trees.forEach((t) => m.set(t.x, t.y, T.TRUNK));
  CISTERN_RECT = { x0: 13, y0: 11, x1: 14, y1: 12 };
  paintMap(m, paintKirlar);
  // nesneler
  const objs = [];
  trees.forEach((t) => objs.push({ kind: 'tree', x: t.x, y: t.y + 0.4, spr: ART.trees[t.k] }));
  [[15.5, 8, 1], [-1, 6, 0], [24, 16, 0], [6, 23, 2], [22, 27, 0], [29, 19, 2], [1, 27, 0]].forEach(([x, y, k]) => objs.push({ kind: 'rock', x, y: y + 0.45, spr: ART.rocks[k] }));
  [[18, -2], [19, -2]].forEach(([x, y]) => objs.push({ kind: 'lambbush', x, y: y + 0.4, spr: ART.thorn, id: 'cali' }));
  [[6, 5], [22, 2], [30, 6], [5, 15], [21, 13], [30, 25], [12, 28], [-1, 32], [31, 31], [17, 35], [3, -2], [12, -3], [27, -2]].forEach(([x, y], i) => objs.push({ kind: 'bush', x, y: y + 0.4, spr: i % 2 ? ART.bush : ART.bush2 }));
  Object.keys(STONES).forEach((k) => { if (k !== 'T8') objs.push({ kind: 'stone', x: STONES[k].x - 0.3, y: STONES[k].y + 0.3, spr: ART.stone, id: k }); });
  objs.push({ kind: 'fire', x: FIRE.x, y: FIRE.y + 0.2, lit: false });
  objs.push({ kind: 'gatebush', x: 6.6, y: 33.7, spr: ART.thorn, id: 'sapan' });
  objs.push({ kind: 'house', x: 24, y: 35.4, w: 3, h: 2 }, { kind: 'house', x: 28, y: 33.4, w: 3, h: 2 }, { kind: 'house', x: 31, y: 36.4, w: 3, h: 2 });
  objs.push({ kind: 'foldgate', x: 5, y: 34.45 });
  return { map: m, objs };
}

// ------------------------------------------------------------
// Aktör (Tamar, baba, çobanlar, köylüler)
// ------------------------------------------------------------
class Actor {
  constructor(o) {
    Object.assign(this, { x: 0, y: 0, dir: 'down', frame: 0, animT: 0, moving: false, speed: 2.5, path: null, visible: true, pose: null, carry: null, lamp: null, alpha: 1, bob: 0, kind: 'tamar', skin: 'baba', name: '', faceDX: 0, faceDY: 1, onArrive: null, solid: false }, o);
  }
  sprites() { return this.kind === 'tamar' ? ART.tamar : ART.people[this.skin]; }
  walkTo(map, x, y, cb) {
    const p = map.findPath(this.x, this.y, x, y);
    this.path = p || [{ x, y }]; this.onArrive = cb || null;
  }
  goStraight(x, y, cb) { this.path = [{ x, y }]; this.onArrive = cb || null; }
  face(dx, dy) {
    if (Math.abs(dx) < 1e-4 && Math.abs(dy) < 1e-4) return;
    this.faceDX = dx; this.faceDY = dy;
    if (Math.abs(dx) > Math.abs(dy) * 1.1) this.dir = dx > 0 ? 'right' : 'left'; else this.dir = dy > 0 ? 'down' : 'up';
  }
  update(dt) {
    let moved = false;
    if (this.path && this.path.length) {
      const p = this.path[0], dx = p.x - this.x, dy = p.y - this.y, d = Math.hypot(dx, dy), st = this.speed * dt;
      if (d <= st) { this.x = p.x; this.y = p.y; this.path.shift(); if (!this.path.length) { this.path = null; const cb = this.onArrive; this.onArrive = null; if (cb) cb(); } }
      else { this.x += (dx / d) * st; this.y += (dy / d) * st; this.face(dx, dy); }
      moved = true;
    }
    this.setMoving(moved, dt);
  }
  setMoving(m, dt) {
    this.moving = m;
    if (m) { this.animT += dt * this.speed * 1.6; this.frame = 1 + (Math.floor(this.animT) % 2); }
    else { this.frame = 0; this.animT = 0; }
  }
  draw(g, cx, cy) {
    if (!this.visible) return;
    const sx = Math.round(this.x * TILE - cx), sy = Math.round(this.y * TILE - cy) + 4;
    g.globalAlpha = this.alpha;
    let spr;
    if (this.pose === 'crouch') spr = ART.tamarCrouch;
    else if (this.pose === 'sitback') spr = ART.sitBack[this.skin];
    else { const set = this.sprites(); spr = set[this.dir][this.frame]; }
    const bob = this.moving && this.frame === 1 ? -1 : 0;
    // gölge
    g.fillStyle = 'rgba(0,0,10,0.35)'; g.fillRect(sx - 5, sy - 1, 10, 2);
    const lampBehind = this.lamp && this.dir === 'up';
    if (lampBehind) this.drawLamp(g, sx, sy + bob);
    g.drawImage(spr, sx - (spr.width >> 1), sy - spr.height + bob);
    if (this.carry === 'lamb') {
      const ls = ART.lamb.a, flip = this.dir === 'left';
      const lx = sx - 6 + (this.dir === 'right' ? 1 : this.dir === 'left' ? -2 : 0), ly = sy - (this.kind === 'tamar' ? 15 : 20) + bob;
      if (this.dir !== 'up') g.drawImage(flip ? ART.lambL.a : ls, lx, ly);
    }
    if (this.lamp && !lampBehind) this.drawLamp(g, sx, sy + bob);
    g.globalAlpha = 1;
  }
  lampScreenPos(sx, sy) {
    const L = this.lamp; const child = this.kind === 'tamar';
    let ox = this.dir === 'right' ? 5 : this.dir === 'left' ? -5 : this.dir === 'up' ? 4 : 3, oy;
    if (L.ground) { ox = this.dir === 'left' ? -9 : 9; oy = -1; }
    else if (child) oy = -11;
    else oy = L.raised ? -31 : -16;
    if (!L.ground && !child && L.raised) ox = this.dir === 'left' ? -6 : 6;
    const o = this._lsp || (this._lsp = { x: 0, y: 0 });
    o.x = sx + ox; o.y = sy + oy;
    return o;
  }
  drawLamp(g, sx, sy) {
    const p = this.lampScreenPos(sx, sy);
    g.drawImage(ART.lamp, p.x - 3, p.y - 1);
    const f = ART.flame[Math.floor(State.time * 8) % 3];
    g.drawImage(f, p.x - 1, p.y - 4);
  }
  // dönen nesne aktöre ait geçici bir kaptır (kare başına ayırma yapılmaz); hemen kullanılmalıdır
  lampWorld() { const p = this.lampScreenPos(this.x * TILE, this.y * TILE + 4), o = this._lw || (this._lw = { x: 0, y: 0 }); o.x = p.x / TILE; o.y = p.y / TILE; return o; }
}

// ------------------------------------------------------------
// Ses dalgaları (Bakış göstergeleri)
// ------------------------------------------------------------
const Ripples = {
  list: [],
  add(x, y, kind) { this.list.push({ x, y, kind, t: 0 }); if (this.list.length > 24) this.list.shift(); },
  update(dt) { const L = this.list; let j = 0; for (let i = 0; i < L.length; i++) { const r = L[i]; r.t += dt; if (r.t < 1.6) L[j++] = r; } L.length = j; },
  clear() { this.list.length = 0; },
};

// ------------------------------------------------------------
// Koyun
// ------------------------------------------------------------
let SHEEP_ID = 0;
class Sheep {
  constructor(x, y, group, o) {
    Object.assign(this, { id: SHEEP_ID++, x, y, vx: 0, vy: 0, group, mother: false, mode: 'idle', goal: null, pts: null, speed: 0, stopR: 0, gathered: false, gatherAt: null, stuck: false,
      bleatT: 2 + Math.random() * 5, startleT: 0, earsT: 0, faceR: Math.random() < 0.5, animT: Math.random() * 3, grazeT: Math.random() * 4, evalId: -1, home: { x, y }, visible: true, inFold: false, slot: null }, o || {});
  }
}

// ------------------------------------------------------------
// Sürü kuralları (§6.0 gündüz, §6.2 gece)
// ------------------------------------------------------------
const RING = 10, WHISTLE_R = 8, CHAIN_R = 2, GATHER_R = 3, SLIDE_MAX = 4, LIGHT_SPEED = 1.6, DARK_WHISTLE_SPEED = 0.8, DAY_SPEED = 1.2;
function segRectHit(x0, y0, x1, y1, R) {
  // ışın-dikdörtgen kesişimi (Liang–Barsky); giriş noktasını döndürür
  let t0 = 0, t1 = 1; const dx = x1 - x0, dy = y1 - y0;
  const p = [-dx, dx, -dy, dy], q = [x0 - R.x0, R.x1 - x0, y0 - R.y0, R.y1 - y0];
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) { if (q[i] < 0) return null; }
    else { const r = q[i] / p[i]; if (p[i] < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; } }
  }
  if (t0 <= 0) return null;
  return { x: x0 + dx * t0, y: y0 + dy * t0, t: t0 };
}
// Işığa yürüyüş rotası: aynı seki → düz; bitişik seki → geçit ya da en çok 4 karo kayma; yoksa takılır
function planPath(cx, cy, px, py) {
  const sc = sekiOf(cy), sp = sekiOf(py);
  if (sc === sp) {
    if (sc === 2) {
      const hit = segRectHit(cx, cy, px, py, CISTERN);
      if (hit) { const d = Math.hypot(px - cx, py - cy); return { pts: [{ x: hit.x - ((px - cx) / d) * 0.5, y: hit.y - ((py - cy) / d) * 0.5 }], stuck: true, why: 'sarnic' }; }
    }
    return { pts: [{ x: px, y: py }], stuck: false };
  }
  if (Math.abs(sc - sp) !== 1) return null;
  const upper = Math.min(sc, sp), wall = WALLS[upper];
  if (!wall) return null;
  const w = wall.y, dir = sign(py - cy), ya = w - dir * 0.5, yb = w + dir * 0.5;
  const cross = cx + (px - cx) * ((w - cy) / (py - cy));
  for (const [a, b] of wall.gaps) {
    if (cross >= a - 0.5 && cross <= b + 0.5) { const gx = clamp(cross, a, b); return { pts: [{ x: gx, y: ya }, { x: gx, y: yb }, { x: px, y: py }], stuck: false, slide: 0 }; }
  }
  const s = sign(px - cross), room = Math.abs(px - cross);
  let best = null;
  for (const [a, b] of wall.gaps) {
    if (s > 0 && a - 0.5 >= cross) { const d = a - 0.5 - cross; if (d <= SLIDE_MAX && d <= room && (!best || d < best.d)) best = { d, gx: a }; }
    if (s < 0 && b + 0.5 <= cross) { const d = cross - (b + 0.5); if (d <= SLIDE_MAX && d <= room && (!best || d < best.d)) best = { d, gx: b }; }
  }
  if (best) return { pts: [{ x: cross, y: ya }, { x: best.gx, y: ya }, { x: best.gx, y: yb }, { x: px, y: py }], stuck: false, slide: best.d };
  const stopX = cross + s * Math.min(SLIDE_MAX, room);
  return { pts: [{ x: cross, y: ya }, { x: stopX, y: ya }], stuck: true, why: 'duvar' };
}

const Flock = {
  sheep: [], map: null, night: false, lamp: null, lampId: 0, unit: null, slotsFor: null, slots: [], tamar: null, quiet: false,
  onMove: null, movedSinceRaise: false, raiseT: -1, raiseHandled: true,
  units: [],
  reset(map, list) { this.map = map; this.sheep = list; this.units = []; this.lamp = null; this.lampId++; this.slots = []; this.slotsFor = null; this.quiet = false; },
  inLight(s) { const L = this.lamp; return !!(L && L.raised && dist(s.x, s.y, L.x, L.y) <= RING + 1e-6); },
  // halkadaki yuvalar (kandile 1,5–2,6 karo)
  makeSlots(P) {
    const k = P.x + ',' + P.y;
    if (this.slotsFor === k) return;
    this.slotsFor = k; this.slots = [];
    for (let i = 0; i < 6; i++) { const a = (i / 6) * 6.283; this.slots.push({ x: P.x + Math.cos(a) * 1.6, y: P.y + Math.sin(a) * 1.25, s: null }); }
    for (let i = 0; i < 8; i++) { const a = ((i + 0.5) / 8) * 6.283; this.slots.push({ x: P.x + Math.cos(a) * 2.55, y: P.y + Math.sin(a) * 2.1, s: null }); }
    for (let i = 0; i < 10; i++) { const a = (i / 10) * 6.283 + 0.2; this.slots.push({ x: P.x + Math.cos(a) * 3.15, y: P.y + Math.sin(a) * 2.5, s: null }); }
    // duvarın içine ya da ardına düşen yuvaları ele
    this.slots = this.slots.filter((sl) => this.map.boxFree(sl.x, sl.y, 0.3, 0.2) && sekiOf(sl.y) === sekiOf(P.y) && this.lineFree(P, sl));
  },
  takeSlot(s, P) {
    this.makeSlots(P);
    if (s.slot && this.slots.includes(s.slot)) return s.slot;
    let best = null, bd = 1e9;
    for (const sl of this.slots) { if (sl.s && sl.s !== s) continue; const d = dist(sl.x, sl.y, s.x, s.y); if (d < bd) { bd = d; best = sl; } }
    if (!best) best = { x: P.x + (Math.random() - 0.5) * 1.2, y: P.y + (Math.random() - 0.5) * 0.8, s: null };
    if (s.slot) s.slot.s = null;
    best.s = s; s.slot = best;
    return best;
  },
  freeSlot(s) { if (s.slot) { s.slot.s = null; s.slot = null; } },
  lineFree(a, b) {
    const n = Math.ceil(dist(a.x, a.y, b.x, b.y) * 4);
    for (let i = 1; i <= n; i++) { const x = lerp(a.x, b.x, i / n), y = lerp(a.y, b.y, i / n); if (this.map.solidAt(x, y)) return false; }
    return true;
  },
  // -------- olaylar --------
  lampRaised(P) {
    this.lampId++;
    this.lamp = { x: P.x, y: P.y, raised: true };
    this.movedSinceRaise = false; this.raiseT = 0; this.raiseHandled = false;
    // toplanmış birimler: merkez = toplandığı taş (ya da takıldığı nokta) — Kural 7
    const gathered = this.sheep.filter((s) => s.gathered && !s.inFold && s.mode !== 'unit' && s.gatherAt);
    const groups = [];
    for (const s of gathered) {
      let g = groups.find((gr) => dist(gr.C.x, gr.C.y, s.gatherAt.x, s.gatherAt.y) < 1.0);
      if (!g) { g = { C: s.gatherAt, members: [] }; groups.push(g); }
      g.members.push(s);
    }
    for (const g of groups) {
      const d = dist(g.C.x, g.C.y, P.x, P.y);
      if (d < 0.05) { g.members.forEach((s) => (s.evalId = this.lampId)); continue; }
      if (d > RING + 1e-6) { g.members.forEach((s) => (s.evalId = this.lampId)); continue; }
      const plan = planPath(g.C.x, g.C.y, P.x, P.y);
      if (plan) this.startUnit(g.members, g.C, plan, P);
      else g.members.forEach((s) => (s.evalId = this.lampId));
    }
  },
  lampLowered() { if (this.lamp) this.lamp.raised = false; },
  startUnit(members, C, plan, P) {
    // birim üyeleri öndekinden arkadakine sıralanır (yola en yakın önde)
    const first = plan.pts[0];
    members.sort((a, b) => dist(a.x, a.y, first.x, first.y) - dist(b.x, b.y, first.x, first.y));
    const U = { members, pts: plan.pts.slice(), x: C.x, y: C.y, stuck: plan.stuck, P: { x: P.x, y: P.y }, trail: [{ x: C.x, y: C.y }], done: false };
    members.forEach((s, i) => { s.gathered = false; s.mode = 'unit'; s.rank = i; s.evalId = this.lampId; this.freeSlot(s); s.stuck = false; s.unit = U; s.ti = 0; s.goal = null; });
    this.units.push(U);
    this.movedSinceRaise = true;
  },
  whistle(W, tamarSeki) {
    const night = this.night;
    let n = 0;
    for (const s of this.sheep) {
      if (s.inFold) continue;
      if (sekiOf(s.y) !== tamarSeki) continue;
      if (dist(s.x, s.y, W.x, W.y) > WHISTLE_R + 1e-6) { continue; }
      if (night && (this.inLight(s) || s.mode === 'unit')) { s.earsT = 1.4; continue; }
      this.sendWhistle(s, W); n++;
    }
    // zincir (aynı seki, 2 karo)
    this.chain();
    return n;
  },
  sendWhistle(s, W) {
    s.gathered = false; this.freeSlot(s); s.stuck = false;
    s.mode = 'whistle'; s.goal = { x: W.x, y: W.y }; s.stopR = 1.5; s.speed = this.night ? DARK_WHISTLE_SPEED : DAY_SPEED; s.whistleAt = { x: W.x, y: W.y };
    s.evalId = -1;
  },
  staff(T0, fx, fy, second) {
    const out = { dark: 0, light: 0, pushed: 0 };
    const fl = Math.hypot(fx, fy) || 1; fx /= fl; fy /= fl;
    for (const s of this.sheep) {
      if (s.inFold) continue;
      const dx = s.x - T0.x, dy = s.y - T0.y, d = Math.hypot(dx, dy);
      if (d > 4 || d < 0.01) continue;
      const cos = (dx * fx + dy * fy) / d;
      if (cos < Math.cos(Math.PI / 6)) continue;
      if (this.night) {
        if (this.inLight(s) || s.mode === 'unit') { s.earsT = 1.2; out.light++; }
        else { s.startleT = 2; s.mode = s.mode === 'whistle' ? 'whistle' : 'idle'; out.dark++; if (Math.random() < 0.7) Audio.bleat('koyun', s.x, 0.25); }
      } else {
        const len = second && s.mode === 'push' && s.pushN === 1 ? 2 : 3;
        // koninin ekseni boyunca, Tamar'dan uzaklaşan yönde (sürü dağılmasın diye eksen ağırlıklı)
        let ux = fx * 0.75 + (dx / d) * 0.25, uy = fy * 0.75 + (dy / d) * 0.25; const ul = Math.hypot(ux, uy) || 1; ux /= ul; uy /= ul;
        const base = s.mode === 'push' && s.goal ? s.goal : { x: s.x, y: s.y };
        s.mode = 'push'; s.pushN = (second && s.pushN === 1) ? 2 : 1; s.speed = DAY_SPEED; s.stopR = 0.05;
        s.goal = this.clampGoal(s, { x: base.x + ux * len, y: base.y + uy * len });
        s.gathered = false; this.freeSlot(s);
        out.pushed++;
      }
    }
    if (!this.night) this.chain();
    return out;
  },
  clampGoal(s, g) {
    // hedef duvarın öbür yanına düşmesin (gündüz itme)
    const steps = 12; let last = { x: s.x, y: s.y };
    for (let i = 1; i <= steps; i++) {
      const p = { x: lerp(s.x, g.x, i / steps), y: lerp(s.y, g.y, i / steps) };
      if (this.map.solidAt(p.x, p.y) || sekiOf(p.y) !== sekiOf(s.y)) break;
      last = p;
    }
    return last;
  },
  chain() {
    let changed = true, guard = 0;
    while (changed && guard++ < 12) {
      changed = false;
      for (const a of this.sheep) {
        if (a.inFold || !(a.mode === 'whistle' || a.mode === 'seek' || a.mode === 'push')) continue;
        for (const b of this.sheep) {
          if (b === a || b.inFold || b.mode !== 'idle' || b.gathered || b.startleT > 0) continue;
          if (sekiOf(a.y) !== sekiOf(b.y) || dist(a.x, a.y, b.x, b.y) > CHAIN_R + 1e-6) continue;
          if (a.mode === 'whistle') this.sendWhistle(b, a.whistleAt);
          else if (a.mode === 'push') { b.mode = 'push'; b.pushN = a.pushN; b.speed = DAY_SPEED; b.stopR = 0.05; b.goal = this.clampGoal(b, { x: b.x + (a.goal.x - a.x), y: b.y + (a.goal.y - a.y) }); }
          else if (a.mode === 'seek' && this.lamp && this.lamp.raised) this.seekLamp(b, true);
          changed = true;
        }
      }
    }
  },
  seekLamp(s, viaChain) {
    const L = this.lamp; if (!L || !L.raised) return false;
    const plan = planPath(s.x, s.y, L.x, L.y);
    s.evalId = this.lampId;
    if (!plan) { s.mode = 'idle'; return false; }
    s.gathered = false; s.stuck = false; s.seekP = { x: L.x, y: L.y }; s.goal = null;
    if (plan.stuck) {
      s.mode = 'seek'; s.pts = plan.pts.slice(); s.speed = LIGHT_SPEED; s.stopR = 0.1; s.willStick = true;
    } else {
      const sl = this.takeSlot(s, L);
      const pts = plan.pts.slice(); pts[pts.length - 1] = { x: sl.x, y: sl.y };
      s.mode = 'seek'; s.pts = pts; s.speed = LIGHT_SPEED; s.stopR = 0.08; s.willStick = false;
    }
    this.movedSinceRaise = true;
    return true;
  },
  // -------- kare güncellemesi --------
  update(dt) {
    const L = this.lamp, map = this.map;
    if (this.raiseT >= 0) this.raiseT += dt;
    // birim hareketi: merkez rotayı izler; üyeler merkezin bıraktığı izi (ekmek kırıntısı) sırayla izler
    for (let ui = this.units.length - 1; ui >= 0; ui--) {
      const U = this.units[ui];
      if (!U.done) {
        let st = LIGHT_SPEED * dt;
        while (st > 0 && U.pts.length) {
          const p = U.pts[0], d = dist(U.x, U.y, p.x, p.y);
          if (d <= st) { U.x = p.x; U.y = p.y; U.pts.shift(); st -= d; }
          else { U.x += ((p.x - U.x) / d) * st; U.y += ((p.y - U.y) / d) * st; st = 0; }
        }
        const last = U.trail[U.trail.length - 1];
        if (dist(last.x, last.y, U.x, U.y) > 0.12 || !U.pts.length) U.trail.push({ x: U.x, y: U.y });
        if (!U.pts.length) {
          U.done = true;
          const end = { x: U.x, y: U.y };
          U.members.forEach((s) => { s.gathered = true; s.stuck = !!U.stuck; s.gatherAt = U.stuck ? end : { x: U.P.x, y: U.P.y }; });
          U.end = end;
        }
      }
      let alive = 0;
      const n = U.trail.length;
      for (const s of U.members) {
        if (s.unit !== U || s.mode !== 'unit') continue;
        alive++;
        const maxIdx = U.done ? n - 1 : Math.max(0, n - 1 - (3 + s.rank * 4));
        let tp = U.trail[Math.min(s.ti, n - 1)];
        while (s.ti < maxIdx && dist(s.x, s.y, tp.x, tp.y) < 0.6) { s.ti++; tp = U.trail[s.ti]; }
        if (U.done && s.ti >= n - 1 && dist(s.x, s.y, tp.x, tp.y) < 0.75) {
          s.unit = null;
          if (U.stuck) {
            const i = s.rank, dirY = sign(U.P.y - U.end.y) || 1;
            let g = { x: U.end.x + ((i % 6) - 2.5) * 0.72, y: U.end.y - dirY * (0.35 + Math.floor(i / 6) * 0.8) };
            if (this.map.solidAt(g.x, g.y) || !this.lineFree(U.end, g)) g = { x: U.end.x + (Math.random() - 0.5) * 0.4, y: U.end.y - dirY * 0.4 };
            s.mode = 'stuckunit'; s.goal = g; s.speed = 1.2; s.bleatT = 0.4 + i * 0.35;
          } else {
            const sl = this.takeSlot(s, U.P);
            s.mode = 'arrive'; s.goal = { x: sl.x, y: sl.y }; s.speed = 1.5;
          }
        } else {
          s.goal = { x: tp.x, y: tp.y };
          s.speed = LIGHT_SPEED + Math.min(1.4, dist(s.x, s.y, tp.x, tp.y) * 0.5);
        }
      }
      if (U.done && !alive) this.units.splice(ui, 1);
    }
    for (const s of this.sheep) {
      if (s.inFold && s.mode !== 'tofold') { this.moveSheep(s, dt, null, 0); continue; }
      if (s.startleT > 0) s.startleT -= dt;
      if (s.earsT > 0) s.earsT -= dt;
      // ışık kuralı (gece): halkadaki serbest koyun kandile yürür
      if (this.night && L && L.raised && s.evalId !== this.lampId && (s.mode === 'idle' || s.mode === 'whistle') && !s.gathered && s.startleT <= 0) {
        if (dist(s.x, s.y, L.x, L.y) <= RING + 1e-6) this.seekLamp(s);
      }
      let goal = null, speed = 0;
      switch (s.mode) {
        case 'seek': {
          if (s.pts && s.pts.length) {
            const p = s.pts[0];
            if (dist(s.x, s.y, p.x, p.y) < (s.pts.length > 1 ? 0.35 : 0.25)) s.pts.shift();
          }
          if (s.pts && s.pts.length) { goal = s.pts[0]; speed = s.speed; }
          else {
            s.mode = s.willStick ? 'stuck' : 'arrive'; s.goal = null;
            s.gathered = true; s.stuck = !!s.willStick;
            if (s.willStick) {
              const near = this.sheep.find((o) => o !== s && o.stuck && o.gatherAt && dist(o.gatherAt.x, o.gatherAt.y, s.x, s.y) < 2.2);
              s.gatherAt = near ? near.gatherAt : { x: s.x, y: s.y };
            } else s.gatherAt = s.seekP ? { x: s.seekP.x, y: s.seekP.y } : { x: s.x, y: s.y };
          }
          break;
        }
        case 'whistle': {
          const d = dist(s.x, s.y, s.goal.x, s.goal.y);
          if (d <= s.stopR) {
            s.mode = 'idle'; s.goal = null; if (!this.night) { s.home = { x: s.x, y: s.y }; }
            // ıslık noktası halkanın içindeyse, varan koyun 2. kurala geçer (Kural 6)
            if (this.night && L && L.raised && s.whistleAt && dist(s.whistleAt.x, s.whistleAt.y, L.x, L.y) <= RING + 1e-6) this.seekLamp(s);
          }
          else { goal = s.goal; speed = s.speed; }
          break;
        }
        case 'push': {
          const d = dist(s.x, s.y, s.goal.x, s.goal.y);
          if (d <= 0.12) { s.mode = 'idle'; s.home = { x: s.x, y: s.y }; s.goal = null; }
          else { goal = s.goal; speed = s.speed; }
          break;
        }
        case 'unit': goal = s.goal; speed = s.speed; break;
        case 'arrive': case 'stuckunit': case 'stuck':
          if (s.goal) { goal = s.goal; speed = s.speed || 1.4; if (dist(s.x, s.y, goal.x, goal.y) < 0.1) { s.goal = null; } }
          break;
        case 'tofold': case 'script': goal = s.goal; speed = s.speed; if (goal && dist(s.x, s.y, goal.x, goal.y) < 0.15) { s.goal = null; if (s.onArrive) { const f = s.onArrive; s.onArrive = null; f(s); } } break;
        case 'idle': default:
          if (!this.night && !s.goal) {
            s.grazeT -= dt;
            if (s.grazeT <= 0) { s.grazeT = 3 + Math.random() * 5; s.wander = { x: s.home.x + (Math.random() - 0.5) * 1.2, y: s.home.y + (Math.random() - 0.5) * 0.8 }; }
            if (s.wander && dist(s.x, s.y, s.wander.x, s.wander.y) > 0.1 && !map.solidAt(s.wander.x, s.wander.y)) { goal = s.wander; speed = 0.35; }
          }
      }
      if (s.startleT > 0) { goal = null; }
      this.moveSheep(s, dt, goal, speed);
      // meleme
      s.bleatT -= dt;
      if (s.bleatT <= 0) {
        s.bleatT = (s.stuck ? 3 : 5 + Math.random() * 6);
        if (!s.inFold && s.visible) this.bleat(s);
      }
    }
    if (this.night) this.chain();
    // yürüyüş algısı (babanın "ışığım ulaşmıyor" sözü)
    if (!this.movedSinceRaise && this.units.length) this.movedSinceRaise = true;
    if (!this.movedSinceRaise) for (const s of this.sheep) if (s.mode === 'seek' || s.mode === 'unit') { this.movedSinceRaise = true; break; }
  },
  bleat(s) {
    const kind = s.mother ? 'ana' : 'koyun';
    if (this.night && s.mode !== 'idle' && !s.stuck && Math.random() < 0.5) return;
    const vis = this.tamar ? dist(s.x, s.y, this.tamar.x, this.tamar.y) : 0;
    // Meleyen Ses'te yalnızca kuzu ve anasının karşılıklı sesi gösterge üretir; sürünün
    // rastgele melemeleri kısık sesle duyulur ama dalga bırakmaz (bölüm §6.1)
    Audio.bleat(kind, s.x, this.quiet ? clamp(0.16 - vis * 0.01, 0.03, 0.16) : clamp(0.4 - vis * 0.015, 0.05, 0.4));
    if (!this.quiet) Ripples.add(s.x, s.y - 0.5, 'thick');
  },
  moveSheep(s, dt, goal, speed) {
    let dx = 0, dy = 0;
    if (goal && speed > 0) {
      const gx = goal.x - s.x, gy = goal.y - s.y, d = Math.hypot(gx, gy);
      if (d > 0.02) { const sp = Math.min(speed, d * 3 + 0.25); dx = (gx / d) * sp; dy = (gy / d) * sp; }
    }
    // ayrışma (boids-lite)
    let sx = 0, sy = 0;
    for (const o of this.sheep) {
      if (o === s || o.inFold !== s.inFold) continue;
      const ox = s.x - o.x, oy = s.y - o.y, d2 = ox * ox + oy * oy;
      if (d2 < 0.72 && d2 > 1e-6) { const d = Math.sqrt(d2), f = (0.85 - d) * 2.2; sx += (ox / d) * f; sy += (oy / d) * f; }
    }
    if (s.mode === 'unit' || s.mode === 'tofold' || s.mode === 'script') { sx *= 0.45; sy *= 0.45; }
    const tx = dx + sx, ty = dy + sy;
    const k = Math.min(1, dt * 6);
    s.vx += (tx - s.vx) * k; s.vy += (ty - s.vy) * k;
    const sp = Math.hypot(s.vx, s.vy), maxS = Math.max(speed, 0.6) * 1.15 + 0.4;
    if (sp > maxS) { s.vx *= maxS / sp; s.vy *= maxS / sp; }
    const nx = s.x + s.vx * dt, ny = s.y + s.vy * dt;
    if (this.map.boxFree(nx, s.y, 0.32, 0.22)) s.x = nx; else s.vx = 0;
    if (this.map.boxFree(s.x, ny, 0.32, 0.22)) s.y = ny; else s.vy = 0;
    if (Math.abs(s.vx) > 0.05) s.faceR = s.vx > 0;
    const moving = sp > 0.12;
    s.animT += dt * (moving ? 6 : 0);
    s.moving = moving;
  },
};

// ------------------------------------------------------------
// Baba: durak taşı çağrısı (§6.2 Kural 8) ve ret cümleleri
// ------------------------------------------------------------
const FATHER_LINES = {
  iki: 'Bir seferde tek seki, Tamar. Koyunlar duvardan atlayamaz.',
  a: 'Doğuda daha koyun var, duymuyor musun? Hepsi ışığa gelmeden inmem.',
  b: 'Yukarıda koyun kaldı. Önce onları alalım.',
  ulasmiyor: 'Işığım onlara ulaşmıyor, kızım.',
};
function fatherCanGo(father, targetId) {
  const T0 = STONES[father.stone] || { x: father.x, y: father.y }, Tt = STONES[targetId];
  const fs = sekiOf(T0.y), ts = sekiOf(Tt.y);
  if (Math.abs(ts - fs) >= 2) return { ok: false, line: 'iki' };
  if (ts === fs + 1) {
    const L = { x: T0.x, y: T0.y };
    const onMine = Flock.sheep.filter((s) => !s.inFold && sekiOf(s.y) === fs);
    const allGathered = onMine.every((s) => s.gathered && !s.stuck && s.gatherAt && dist(s.gatherAt.x, s.gatherAt.y, L.x, L.y) < 0.01 && dist(s.x, s.y, L.x, L.y) <= GATHER_R + 0.6);
    if (!allGathered) return { ok: false, line: 'a' };
    if (Flock.sheep.some((s) => !s.inFold && sekiOf(s.y) < fs)) return { ok: false, line: 'b' };
  }
  return { ok: true };
}

// ------------------------------------------------------------
// Oyuncu denetimi (Tamar)
// ------------------------------------------------------------
const Player = {
  a: null, map: null, gutT: -1, charging: false, cancelled: false, lastTapT: -10, tapCount: 0,
  bakis: false, lookUp: false, lookHeld: 0, interactables: [], focus: null, enabled: true, speedMul: 1, stepT: 0,
  allowGut: true, allowLook: true, onWhistle: null, onStaff: null, collide: null, bounds: null,
  init(actor, map) { this.a = actor; this.map = map; this.gutT = -1; this.charging = false; this.interactables = []; this.focus = null; this.enabled = true; this.lookHeld = 0; },
  update(dt) {
    const a = this.a; if (!a) return;
    const blocked = UI.blocking() || !this.enabled;
    this.bakis = !blocked && Input.down('bakis');
    this.lookUp = !blocked && this.allowLook && ((this.bakis && Input.down('up')) || Input.down('lookup'));
    this.lookHeld = this.lookUp ? this.lookHeld + dt : 0;
    // hareket
    let ax = blocked ? 0 : Input.axisX, ay = blocked ? 0 : Input.axisY;
    if (this.lookUp && ay < 0) ay = 0;
    if (this.charging) { ax *= 0.5; ay *= 0.5; }
    let moved = false;
    if (Math.abs(ax) + Math.abs(ay) > 0.01) {
      let sp = a.speed * this.speedMul * (Input.down('sprint') ? 1.35 : 1) * (this.bakis ? 0.5 : 1) * Math.max(0.35, Input.analog || 1);
      const nx = a.x + ax * sp * dt, ny = a.y + ay * sp * dt;
      if (this.free(nx, a.y)) a.x = nx;
      if (this.free(a.x, ny)) a.y = ny;
      a.face(ax, ay); moved = true;
      this.stepT -= dt * sp; if (this.stepT <= 0) { this.stepT = 0.85; Audio.step(a.x, true); }
    }
    if (!a.path) a.setMoving(moved, dt); else a.update(dt);
    if (this.bounds) { a.x = clamp(a.x, this.bounds.x0, this.bounds.x1); a.y = clamp(a.y, this.bounds.y0, this.bounds.y1); }
    // Güt: kısa basış değnek, uzun basış ıslık
    if (!blocked && this.allowGut) {
      if (Input.pressed('gut')) { this.gutT = 0; this.charging = false; this.cancelled = false; }
      if (this.gutT >= 0 && Input.down('gut')) {
        this.gutT += dt;
        if (this.gutT >= 0.35 && !this.cancelled) this.charging = true;
        if (this.charging && (Input.pressed('cancel') || Input.pressed('menu'))) { this.cancelled = true; this.charging = false; Input.consume('menu'); UI.bark('Islık iptal edildi.', null, 1.2, true); }
      }
      if (this.gutT >= 0 && !Input.down('gut')) {
        if (this.charging && !this.cancelled) { Audio.whistle(a.x); if (this.onWhistle) this.onWhistle({ x: a.x, y: a.y }); }
        else if (!this.cancelled && this.gutT < 0.35) {
          const second = State.time - this.lastTapT <= 1.0; this.lastTapT = State.time;
          Audio.staff(a.x);
          Gfx.spawn({ x: (a.x + a.faceDX * 0.6) * TILE, y: (a.y + a.faceDY * 0.4) * TILE + 3, vx: 0, vy: -8, t: 0, life: 0.4, c: '#c8b890', s: 1 });
          a.staffT = 0.25;
          if (this.onStaff) this.onStaff(second);
        }
        this.gutT = -1; this.charging = false;
      }
    } else { this.gutT = -1; this.charging = false; }
    if (a.staffT > 0) a.staffT -= dt;
    // etkileşim
    this.focus = null;
    if (!blocked) {
      let best = null, bd = 1e9;
      for (const it of this.interactables) {
        if (it.enabled && !it.enabled()) continue;
        const d = dist(a.x, a.y, it.x, it.y);
        if (d <= (it.r || 1.5) && d < bd) { bd = d; best = it; }
      }
      this.focus = best;
      if (best) UI.playerPrompt('interact', typeof best.label === 'function' ? best.label() : best.label); else UI.playerPrompt(null);
      if (best && Input.pressed('interact')) best.action();
    } else UI.playerPrompt(null);
  },
  free(x, y) { return this.map.boxFree(x, y, 0.3, 0.2) && (!this.collide || this.collide(x, y)); },
  isMoving() { return this.a && this.a.moving; },
};

// Kamera: hedefi izler, harita sınırına ve kilit çizgisine sıkıştırılır
const Cam = {
  x: 0, y: 0, look: 0, lookTarget: 0, minY: null, bounds: null,
  follow(tx, ty, dt, snap) {
    const b = this.bounds;
    let cx = tx * TILE - VW / 2, cy = ty * TILE - VH / 2;
    if (b) { cx = clamp(cx, b.x0 * TILE, b.x1 * TILE - VW); cy = clamp(cy, b.y0 * TILE, Math.max(b.y0 * TILE, b.y1 * TILE - VH)); }
    if (this.minY != null) cy = Math.max(cy, this.minY * TILE);
    if (snap) { this.x = cx; this.y = cy; }
    else { const k = Math.min(1, dt * 5); this.x += (cx - this.x) * k; this.y += (cy - this.y) * k; }
    this.look = approach(this.look, this.lookTarget, dt * (REDUCED ? 600 : 260));
  },
  px() { return Math.round(this.x); },
  py() { return Math.round(this.y + this.look); },
};
