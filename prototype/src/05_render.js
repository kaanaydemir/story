// ============================================================
// Çizim: 640×360 iç çözünürlük, kamera, ışık katmanı, gök, efektler
// ============================================================
const Gfx = {
  cv: null, g: null, dark: null, dg: null, vign: null, sky: null,
  cam: { x: 0, y: 0 },
  lights: [], glows: [],
  stars: [], dipper: [],
  particles: [],
  init() {
    this.cv = $('game');
    this.g = this.cv.getContext('2d', { alpha: false });
    this.g.imageSmoothingEnabled = false;
    this.dark = makeCanvas(VW, VH); this.dg = this.dark.getContext('2d'); this.dg.imageSmoothingEnabled = false;
    this.buildVignette();
    this.buildStars();
    for (let i = 0; i < 64; i++) this.lights.push({ x: 0, y: 0, r: 0, a: 0 });
    for (let i = 0; i < 16; i++) this.glows.push({ x: 0, y: 0, r: 0, a: 0, s: null });
    this.nl = 0; this.ng = 0;
  },
  buildVignette() {
    const c = makeCanvas(VW, VH), g = c.getContext('2d');
    const gr = g.createRadialGradient(VW / 2, VH / 2, VH * 0.25, VW / 2, VH / 2, VW * 0.62);
    gr.addColorStop(0, 'rgba(2,3,10,0)'); gr.addColorStop(1, 'rgba(2,3,10,0.85)');
    g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    this.vign = c;
  },
  buildStars() {
    const rr = makeRng(77);
    for (let i = 0; i < 260; i++) {
      const b = rr();
      this.stars.push({ x: rr() * 1400, y: rr() * 420, b: b < 0.75 ? 1 : b < 0.95 ? 2 : 3, ph: rr() * 6.28, sp: 0.6 + rr() * 2.2, warm: rr() < 0.2 });
    }
    // Yedi yıldızlık küme (Büyükayı) — sıradan bir küme; baba ad vermez
    const D = [[0, 0], [3, 21], [31, 29], [38, 9], [60, 13], [80, 17], [101, 31]];
    this.dipper = D.map(([x, y]) => ({ x: 860 + x * 1.3, y: 70 + y * 1.3 }));
  },
  // gök (paralaks): ox/oy = kameranın gökteki kayması
  drawSky(g, ox, oy, o) {
    o = o || {};
    const top = o.top == null ? '#05061a' : o.top, bot = o.bot == null ? '#1a2350' : o.bot;
    const h = o.h == null ? VH : o.h, y0 = o.y0 || 0;
    // degrade, renkler ve yükseklik değişmedikçe yeniden kurulmaz
    const C = this._skyG || (this._skyG = { top: null, bot: null, h: -1, y0: -1, gr: null });
    if (C.top !== top || C.bot !== bot || C.h !== h || C.y0 !== y0) {
      C.gr = g.createLinearGradient(0, y0, 0, y0 + h); C.gr.addColorStop(0, top); C.gr.addColorStop(1, bot);
      C.top = top; C.bot = bot; C.h = h; C.y0 = y0;
    }
    // fillH: yalnızca görünen gök şeridi doldurulur (altını harita örtüyorsa)
    const fh = o.fillH == null ? h : Math.max(0, Math.min(h, o.fillH));
    g.fillStyle = C.gr; g.fillRect(0, y0, VW, fh);
    const dim = o.dim == null ? 1 : o.dim, t = State.time;
    if (dim <= 0.01) return;
    for (const s of this.stars) {
      const x = Math.round(((s.x - ox * 0.12) % 1400 + 1400) % 1400 - 380), y = Math.round(s.y - oy * 0.12) + y0 - 30;
      if (x < -2 || x > VW + 2 || y < y0 - 2 || y > y0 + fh) continue;
      let a = dim * (s.b === 3 ? 1 : s.b === 2 ? 0.75 : 0.5);
      if (o.twinkle !== false && !REDUCED) a *= 0.7 + 0.3 * Math.sin(t * s.sp + s.ph);
      g.globalAlpha = clamp(a, 0, 1);
      g.fillStyle = s.warm ? '#ffe2a8' : '#dfe6ff';
      g.fillRect(x, y, 1, 1);
      if (s.b === 3) { g.globalAlpha *= 0.45; g.fillRect(x - 1, y, 3, 1); g.fillRect(x, y - 1, 1, 3); }
    }
    for (const s of this.dipper) {
      const x = Math.round(((s.x - ox * 0.12) % 1400 + 1400) % 1400 - 380), y = Math.round(s.y - oy * 0.12) + y0 - 30;
      if (x < -3 || x > VW + 3 || y < y0 - 3 || y > y0 + h) continue;
      g.globalAlpha = dim * (o.dipperGlow ? 1 : 0.95);
      g.fillStyle = '#f2f0ff'; g.fillRect(x, y, 1, 1);
      g.globalAlpha = dim * 0.5; g.fillRect(x - 1, y, 3, 1); g.fillRect(x, y - 1, 1, 3);
      if (o.dipperGlow) { g.globalAlpha = dim * 0.35 * o.dipperGlow; g.fillStyle = '#e8c66a'; g.fillRect(x - 2, y - 2, 5, 5); }
    }
    g.globalAlpha = 1;
  },
  // uzak sırt (Beytlehem) ve birkaç pencere; zeytin siluetleri
  // Sırt profili bir kez geniş bir şeride çizilir; her karede yalnızca kaydırılarak kopyalanır.
  ridgeStrip(col, off) {
    const W = 2048, H = 48;
    let S = this._ridge;
    if (!S || S.col !== col || off < S.base || off + VW > S.base + W) {
      const base = Math.floor(off) - 400;
      const c = (S && S.c) || makeCanvas(W, H), rg = c.getContext('2d');
      rg.clearRect(0, 0, W, H); rg.fillStyle = col;
      for (let x = 0; x < W; x += 2) {
        const wx = x + base;
        const h = 26 + Math.sin(wx * 0.011) * 10 + Math.sin(wx * 0.027 + 1.3) * 6 + Math.sin(wx * 0.063) * 2;
        rg.fillRect(x, Math.round(H - h), 2, Math.ceil(h));
      }
      S = this._ridge = { c, col, base };
    }
    return S;
  },
  drawRidge(g, ox, yBase, o) {
    o = o || {};
    const col = o.col || '#0e1230';
    const off = ox * 0.3;
    const S = this.ridgeStrip(col, off), sx = Math.floor(off) - S.base;
    g.drawImage(S.c, sx, 0, VW, 48, 0, Math.round(yBase) - 48, VW, 48);
    const maxY = o.maxY == null ? VH : o.maxY;
    g.fillStyle = col;
    if (maxY > yBase) g.fillRect(0, Math.round(yBase), VW, Math.ceil(maxY - yBase));
    if (o.windows !== false) {
      g.fillStyle = '#e09a48';
      [[180, 30], [196, 27], [214, 31], [233, 26], [520, 22]].forEach(([x, h], i) => {
        const sx = Math.round(((x - off) % 900 + 900) % 900 - 100);
        if (sx < 0 || sx > VW) return;
        g.globalAlpha = REDUCED ? 0.8 : 0.6 + 0.4 * Math.sin(State.time * 0.7 + i);
        g.fillRect(sx, Math.round(yBase - h + 6), 1, 1);
      });
      g.globalAlpha = 1;
    }
    if (o.olives) {
      const off2 = ox * 0.6;
      g.fillStyle = o.olCol || '#080a1e';
      for (let i = 0; i < 9; i++) {
        const sx = Math.round(((i * 97 + 20 - off2) % 900 + 900) % 900 - 120);
        if (sx < -40 || sx > VW + 40) continue;
        const yb = yBase + 6;
        g.fillRect(sx + 9, yb - 10, 3, 10);
        for (let k = 0; k < 5; k++) { const r = 6 + (k % 3) * 2; g.beginPath(); g.ellipse(sx + 4 + k * 3, yb - 14 - (k % 2) * 3, r, r * 0.7, 0, 0, 6.29); g.fill(); }
      }
    }
  },
  // ---------------- ışık ----------------
  resetLights() { this.nl = 0; this.ng = 0; },
  light(x, y, r, a) { if (this.nl < this.lights.length) { const L = this.lights[this.nl++]; L.x = x; L.y = y; L.r = r; L.a = a == null ? 1 : a; } },
  glow(x, y, r, a, s) { if (this.ng < this.glows.length) { const G = this.glows[this.ng++]; G.x = x; G.y = y; G.r = r; G.a = a; G.s = s || ART.glow.warm; } },
  lightSprite(r) { return r <= 36 ? ART.light.r32 : r <= 56 ? ART.light.r48 : r <= 86 ? ART.light.r80 : r <= 120 ? ART.light.r96 : ART.light.r160; },
  applyDark(color, alpha) {
    const g = this.g, d = this.dg;
    if (alpha <= 0.001) return;
    d.globalCompositeOperation = 'source-over';
    d.clearRect(0, 0, VW, VH);
    d.globalAlpha = alpha; d.fillStyle = color; d.fillRect(0, 0, VW, VH);
    d.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < this.nl; i++) {
      const L = this.lights[i];
      if (L.r < 1 || L.x + L.r < 0 || L.x - L.r > VW || L.y + L.r < 0 || L.y - L.r > VH) continue;
      d.globalAlpha = L.a;
      const r = Math.round(L.r);
      d.drawImage(this.lightSprite(r), Math.round(L.x - r), Math.round(L.y - r), r * 2, r * 2);
    }
    d.globalAlpha = 1; d.globalCompositeOperation = 'source-over';
    g.drawImage(this.dark, 0, 0);
    if (this.ng) {
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < this.ng; i++) {
        const G = this.glows[i]; g.globalAlpha = G.a;
        g.drawImage(G.s, Math.round(G.x - G.r), Math.round(G.y - G.r), G.r * 2, G.r * 2);
      }
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    }
  },
  // kesikli çember (piksel piksel; ışık halkasının kenarı, ıslık menzili)
  dashedCircle(cx, cy, r, color, dash, gap, alpha) {
    const g = this.g; g.fillStyle = color; g.globalAlpha = alpha == null ? 1 : alpha;
    const n = Math.max(24, Math.floor(r * 6.28)), per = dash + gap;
    const rot = REDUCED ? 0 : State.time * 6;
    for (let i = 0; i < n; i++) {
      if ((((i + rot) % per) + per) % per >= dash) continue;
      const a = (i / n) * 6.2832;
      g.fillRect(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.92), 1, 1);
    }
    g.globalAlpha = 1;
  },
  dashedLine(x0, y0, x1, y1, color, alpha) {
    const g = this.g; g.fillStyle = color; g.globalAlpha = alpha == null ? 1 : alpha;
    const L = Math.hypot(x1 - x0, y1 - y0), n = Math.floor(L);
    for (let i = 0; i < n; i++) { if (i % 5 > 2) continue; g.fillRect(Math.round(x0 + ((x1 - x0) * i) / L), Math.round(y0 + ((y1 - y0) * i) / L), 1, 1); }
    g.globalAlpha = 1;
  },
  cinema(a) {
    if (a <= 0) return;
    const h = Math.round(20 * a), g = this.g;
    g.fillStyle = '#000'; g.fillRect(0, 0, VW, h); g.fillRect(0, VH - h, VW, h);
  },
  vignette(a) { if (a <= 0) return; this.g.globalAlpha = a; this.g.drawImage(this.vign, 0, 0); this.g.globalAlpha = 1; },
  // ---------------- parçacıklar ----------------
  spawn(p) { if (REDUCED && Math.random() < 0.7) return; if (this.particles.length < 160) this.particles.push(p); },
  updateParticles(dt) {
    const ps = this.particles;
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i]; p.t += dt;
      if (p.t >= p.life) { ps[i] = ps[ps.length - 1]; ps.pop(); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += (p.g || 0) * dt;
    }
  },
  drawParticles(camx, camy, layer) {
    const g = this.g;
    for (const p of this.particles) {
      if ((p.layer || 0) !== layer) continue;
      const a = (1 - p.t / p.life) * (p.a == null ? 1 : p.a);
      g.globalAlpha = clamp(a, 0, 1); g.fillStyle = p.c;
      g.fillRect(Math.round(p.x - camx), Math.round(p.y - camy), p.s || 1, p.s || 1);
    }
    g.globalAlpha = 1;
  },
  clearParticles() { this.particles.length = 0; },
};

// parşömen dokusu (tablolar ve çerçeve için)
function makeParchment(w, h, seed) {
  const c = makeCanvas(w, h), g = c.getContext('2d'), rr = makeRng(seed || 5);
  const gr = g.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, w * 0.7);
  gr.addColorStop(0, '#d9c094'); gr.addColorStop(1, '#9c7c50');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  for (let i = 0; i < w * h * 0.06; i++) {
    const x = Math.floor(rr() * w), y = Math.floor(rr() * h);
    g.fillStyle = rr() < 0.5 ? 'rgba(90,60,30,0.10)' : 'rgba(255,240,200,0.10)';
    g.fillRect(x, y, 1 + Math.floor(rr() * 2), 1);
  }
  for (let i = 0; i < 18; i++) { g.fillStyle = 'rgba(80,50,20,0.06)'; g.beginPath(); g.ellipse(rr() * w, rr() * h, 10 + rr() * 40, 6 + rr() * 20, rr() * 3, 0, 6.3); g.fill(); }
  return c;
}
