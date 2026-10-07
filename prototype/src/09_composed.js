// ============================================================
// Sabit kompozisyonlu sahneler: başlık, açılış notları, çerçeve,
// Müjde ve Yemlik (dokunmama), tablolar, dokuma bandı, son kart
// ============================================================

// kenarları keskinleştirilmiş katman (yumuşatma pikselleri temizlenir)
function crispLayer(w, h, fn) {
  const c = makeCanvas(w, h), g = c.getContext('2d');
  fn(g);
  const im = g.getImageData(0, 0, w, h), d = im.data;
  for (let i = 3; i < d.length; i += 4) d[i] = d[i] > 110 ? 255 : 0;
  g.putImageData(im, 0, 0);
  return c;
}
function ell(g, x, y, rx, ry, col) { g.fillStyle = col; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 6.2832); g.fill(); }
function poly(g, pts, col) { g.fillStyle = col; g.beginPath(); g.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]); g.closePath(); g.fill(); }
// Dokunmama anları: ipucu düğmesi gerçekten kaybolur (görünmez ama dokunulabilir değil);
// menü düğmesi soluk kalır ki oyuncu bilerek duraklatabilsin
function sacredUI(on) {
  $('topbtns').classList.toggle('sacred', !!on);
  $('touch').classList.toggle('sacred', !!on);
}

// ------------------------------------------------------------
// Başlık ekranı
// ------------------------------------------------------------
Scenes.define('baslik', {
  title: 'Başlık',
  enter() {
    this.hills = crispLayer(VW, VH, (g) => {
      poly(g, [0, 250, 80, 228, 170, 238, 260, 218, 360, 230, 470, 210, 560, 226, 640, 214, 640, 360, 0, 360], '#0b0e26');
      poly(g, [0, 292, 120, 272, 240, 286, 330, 266, 450, 280, 560, 262, 640, 276, 640, 360, 0, 360], '#080a1c');
      for (let k = 0; k < 4; k++) { g.fillStyle = '#12163a'; g.fillRect(0, 300 + k * 14, 640, 2); }
      poly(g, [0, 326, 640, 318, 640, 360, 0, 360], '#05060f');
    });
    UI.openStart();
    Audio.setAmbience({ wind: 0.1, crickets: true });
  },
  touchMode() { return 'none'; },
  update(dt) { Gfx.updateParticles(dt); if (Math.random() < dt * 3) Gfx.spawn({ x: 318 + Math.random() * 6, y: 306, vx: (Math.random() - 0.5) * 4, vy: -10, t: 0, life: 1.2, c: '#ffcf7a' }); },
  draw(g) {
    Gfx.drawSky(g, State.time * 6, 0, { dim: 1 });
    Gfx.drawRidge(g, State.time * 6, 236, { olives: true, col: '#0e1232' });
    g.drawImage(this.hills, 0, 0);
    // tepede kandil tutan küçük bir figür
    const spr = ART.tamar.right[0];
    g.drawImage(spr, 306, 318 - spr.height);
    g.drawImage(ART.lamp, 316, 306); g.drawImage(ART.flame[Math.floor(State.time * 8) % 3], 318, 302);
    Gfx.resetLights(); Gfx.light(320, 304, 80, 1); Gfx.glow(320, 304, 40, 0.5);
    Gfx.applyDark('#03040f', 0.55);
    Gfx.drawParticles(0, 0, 0);
  },
});

// ------------------------------------------------------------
// Sahne 0 — Açılış notu ve içerik notu (iki ayrı ekran)
// ------------------------------------------------------------
Scenes.define('acilis', {
  title: 'Açılış notu',
  enter() {
    Scripts.run(function* () {
      yield 0.4;
      yield UI.card('<div class="t">Bu oyun İncillerdeki anlatıyı izler; farklı inanç gelenekleri bu olayları farklı yorumlar.</div>', { minTime: 1 });
      yield 0.3;
      yield UI.card('<div class="t" style="font-size:.95em">Bu bölüm, Matta 2:16–18\'de anlatılan Beytlehem\'deki çocukların öldürülmesine bir tablo, bir yas cümlesi, bir ağıt sesi ve ayet metniyle değinir; şiddet gösterilmez.</div><div class="ref">İçerik notu</div>', { minTime: 1 });
      Scenes.goto('cerceve_giris', { fadeOut: 0.6 });
    }, 'scene');
  },
  update() {},
  touchMode() { return 'etk'; },
  draw(g) { g.fillStyle = '#05060f'; g.fillRect(0, 0, VW, VH); },
  skip() { Scripts.kill('scene'); UI.closeCard(); Scenes.goto('cerceve_giris', { instant: true }); },
});

// ------------------------------------------------------------
// Çerçeve: Mecdel, tezgâh başı (giriş ve kapanış ortak çizim)
// ------------------------------------------------------------
const Frame = {
  bg: null, fig: null,
  build() {
    if (this.bg) return;
    this.bg = crispLayer(VW, VH, (g) => {
      g.fillStyle = '#1e1712'; g.fillRect(0, 0, VW, VH);
      // taş duvar
      const rr = makeRng(4);
      for (let y = 0; y < 300; y += 9) for (let x = (y / 9) % 2 ? -10 : 0; x < VW; x += 22) { g.fillStyle = ['#2a2018', '#251c15', '#30251b'][Math.floor(rr() * 3)]; g.fillRect(x + 1, y + 1, 20, 7); }
      // pencere (gök)
      g.fillStyle = '#0d0a08'; g.fillRect(452, 52, 112, 88);
      g.clearRect(458, 58, 100, 76);
      // raf ve kandil yeri
      g.fillStyle = '#3a2a1c'; g.fillRect(70, 132, 70, 6); g.fillStyle = '#4a3624'; g.fillRect(70, 132, 70, 2);
      // zemin
      g.fillStyle = '#2c2218'; g.fillRect(0, 300, VW, 60); g.fillStyle = '#3a2c1e'; for (let x = 0; x < VW; x += 13) g.fillRect(x, 300 + ((x * 7) % 11), 6, 1);
      // dikey dokuma tezgâhı (ağırlıklı)
      g.fillStyle = '#4a3420'; g.fillRect(250, 70, 8, 232); g.fillRect(420, 70, 8, 232); g.fillRect(244, 64, 190, 10);
      g.fillStyle = '#5e4428'; g.fillRect(250, 70, 2, 232); g.fillRect(244, 64, 190, 2);
      // dokunmuş kumaş (önceki bantlar)
      g.fillStyle = '#3c2e48'; g.fillRect(262, 76, 154, 70);
      for (let y = 80; y < 144; y += 12) { g.fillStyle = y % 24 ? '#5a4a6a' : '#6a3a2e'; g.fillRect(262, y, 154, 3); }
      // çözgü iplikleri ve ağırlıklar
      for (let x = 264; x < 416; x += 4) { g.fillStyle = '#b8a98a'; g.fillRect(x, 146, 1, 120); }
      for (let x = 266; x < 414; x += 12) { ell(g, x, 272, 4, 5, '#6a5a48'); ell(g, x, 271, 3, 3, '#7e6c56'); }
    });
    this.figs = crispLayer(VW, VH, (g) => {
      // yaşlı Tamar (yan profil, tezgâhın solunda ayakta)
      poly(g, [212, 300, 206, 220, 214, 178, 230, 170, 242, 180, 246, 224, 244, 300], '#2e3a6a');
      poly(g, [214, 180, 222, 160, 238, 158, 246, 172, 244, 196, 230, 190], '#cfc3a6');
      ell(g, 236, 176, 7, 8, '#b48c6c');
      poly(g, [224, 166, 232, 154, 246, 160, 246, 176, 238, 168], '#d9ceb4');
      poly(g, [240, 196, 262, 200, 266, 206, 244, 208], '#2e3a6a');
      g.fillStyle = '#b48c6c'; g.fillRect(262, 200, 6, 5);
      // Sara (yerde oturan çocuk)
      poly(g, [130, 300, 132, 262, 146, 252, 160, 262, 166, 300], '#6a5236');
      ell(g, 148, 244, 9, 10, '#2e1c14');
      ell(g, 150, 247, 6, 7, '#d8b090');
      poly(g, [160, 276, 186, 286, 186, 292, 160, 288], '#6a5236');
    });
  },
  draw(g, o) {
    this.build();
    o = o || {};
    // pencereden gök
    g.fillStyle = '#05061a'; g.fillRect(0, 0, VW, VH);
    g.save(); g.beginPath(); g.rect(458, 58, 100, 76); g.clip();
    Gfx.drawSky(g, 0, -40, { dim: 1, dipperGlow: o.dipper || 0 });
    g.restore();
    g.drawImage(this.bg, 0, 0);
    if (o.band) o.band(g);
    g.drawImage(this.figs, 0, 0);
    // raf kandili
    g.drawImage(ART.lamp, 100, 128); g.drawImage(ART.flame[Math.floor(State.time * 8) % 3], 102, 124);
    Gfx.resetLights();
    Gfx.light(104, 126, 160, 1); Gfx.glow(104, 126, 64, 0.45);
    Gfx.light(508, 96, 60, 0.6);
    Gfx.applyDark('#05040a', 0.62);
  },
};

Scenes.define('cerceve_giris', {
  title: 'Çerçeve: tezgâh başı',
  enter() {
    const sc = this; sc.pan = 0; sc.wipe = 0; sc.dipper = 0;
    Audio.setAmbience({ wind: 0.05, crickets: true });
    Audio.setDrone(true, 110);
    Scripts.run(function* () {
      UI.bark('Mecdel · Roma ordusu yaklaşırken, kaçıştan önceki son gece', null, 3.6);
      yield 2.2;
      yield UI.say([SAY.sara('Nine, kaçarken korkarsam ne yapayım?'), SAY.yasli('Korkunca mı? Dokuz yaşındaydım. Babam bana önce rüzgâra bakmayı, sonra başımı kaldırmayı öğretti.')]);
      // yaşlı Tamar başını kaldırır, yıldızlara bakar
      yield (dt) => { sc.dipper = Math.min(1, sc.dipper + dt * 0.6); return sc.dipper >= 1; };
      yield 1;
      yield (dt) => { sc.wipe = Math.min(1, sc.wipe + dt * 0.8); return sc.wipe >= 1; };
      Scenes.goto('yamac_ogretim', { fadeOut: 0.01, fadeIn: 1.2 });
    }, 'scene');
  },
  update() {},
  touchMode() { return 'etk'; },
  draw(g) {
    Frame.draw(g, { dipper: this.dipper });
    if (this.wipe > 0) { g.fillStyle = '#000'; g.fillRect(0, 0, Math.round(VW * smooth(this.wipe)), VH); }
  },
  skip() { Scripts.kill('scene'); Scenes.goto('yamac_ogretim', { instant: true }); },
});

// ------------------------------------------------------------
// SAHNE 6 — Müjde (dokunmama)
// Melek: kanatsız, halesiz, yüzsüz dikey ışık biçimi; gök ordusu yıldızlardan ayrı,
// titreşmeyen, yavaş hareket eden beyaz-altın ışıklar; 2:15'te tamamen söner.
// ------------------------------------------------------------
Scenes.define('mujde', {
  title: 'Müjde',
  sacred: true,
  touchMode() { return this.lookPrompt ? 'joy' : 'none'; },
  enter() {
    const sc = this;
    sc.camY = 280; sc.camTarget = 280; sc.flood = 0; sc.floodT = 0; sc.angel = 0; sc.host = []; sc.hostA = 0; sc.stars = 1; sc.dark = 0.8; sc.cine = 0;
    sc.lookPrompt = false; sc.looked = false; sc.huddle = 0; sc.bury = false;
    sacredUI(true);
    Audio.setDrone(false); Audio.setAmbience({ wind: 0.04, crickets: false, fire: true });
    if (!sc.ground) sc.buildArt();
    const rr = makeRng(9);
    for (let i = 0; i < 46; i++) sc.host.push({ x: 40 + rr() * 560, y: 110 + rr() * 260, tx: 320 + (rr() - 0.5) * 300, ty: 330 + (rr() - 0.5) * 150, s: rr() < 0.25 ? 2 : 1, ph: rr() * 6.28 });
    // sürü ağılda bir köşeye sıkışır
    sc.sheep = []; for (let i = 0; i < 11; i++) sc.sheep.push({ x: 70 + (i % 6) * 15 + (i > 5 ? 7 : 0), y: 552 + Math.floor(i / 6) * 8, tx: 52 + (i % 4) * 10, ty: 548 + Math.floor(i / 4) * 6 });
    Scripts.run(function* () {
      yield 1.2;
      // ışık: beyaza yakın altın, tek ve güçlü; yumuşayarak oturur (yanıp sönme yok)
      sc.cine = 0;
      yield (dt) => { sc.cine = Math.min(1, sc.cine + dt); return sc.cine >= 1; };
      Audio.setTone(true, 196, 0.06); Audio.cluster(true);
      yield (dt) => { sc.floodT += dt; sc.flood = smooth(Math.min(1, sc.floodT / 1.6)) * 0.72; sc.dark = Math.max(0.12, 0.8 - sc.floodT * 0.6); sc.stars = Math.max(0.25, 1 - sc.floodT * 0.6); sc.angel = Math.min(1, sc.floodT / 1.6); return sc.floodT >= 1.6; };
      sc.bury = true;
      yield (dt) => { sc.flood = Math.max(0.3, sc.flood - dt * 0.25); sc.huddle = Math.min(1, sc.huddle + dt * 0.6); return sc.flood <= 0.3; };
      yield 0.6;
      yield UI.say([{ who: 'Rab\'bin meleği', text: 'Korkmayın! İşte size bütün halkı çok sevindirecek bir müjde getiriyorum. Bugün Davut\'un kentinde sizin için bir Kurtarıcı doğdu. O, Rab Mesih\'tir. Size şu işaret olacak: Kundağa sarılmış, yemlikte yatan bir bebek bulacaksınız.', kind: 'verse', ref: 'Luka 2:10–12 · [yakın aktarım; kanonik replik]', auto: 7, lock: true }]);
      // 2:13 — gök ordusu belirir (ışıklar ayet satırıyla birlikte yavaşça gelir)
      Audio.rise();
      Scripts.run(function* () { yield (dt) => { sc.hostA = Math.min(1, sc.hostA + dt * 0.35); return sc.hostA >= 1; }; }, 'scene');
      yield UI.say([{ text: 'Birden meleğin yanında Tanrı\'yı öven büyük bir gök ordusu belirdi.', kind: 'narr', ref: 'Luka 2:13 · [yakın aktarım]', auto: 2.5, lock: true }]);
      yield until(() => sc.hostA >= 1);
      // tek girdi: başını kaldırmak — dokunmama anında Bakış gerekmez, yalnızca yukarı (GDD §5.1a)
      sc.lookPrompt = true; UI.prompt('up', 'başını kaldır');
      let waited = 0;
      yield (dt) => { waited += dt; const up = Input.down('up') || Input.down('lookup') || (Input.down('bakis') && Input.down('up')); if (up) sc.looked = true; return sc.looked || waited >= 8; };
      sc.lookPrompt = false; UI.prompt(null);
      if (sc.looked) sc.camTarget = 40;
      yield 1.8;
      yield UI.say([{ who: 'Gök ordusu', text: 'En yücelerde Tanrı\'ya yücelik olsun! Yeryüzünde O\'nun hoşnut kaldığı insanlara esenlik olsun!', kind: 'verse', ref: 'Luka 2:14 · [yakın aktarım; kanonik replik]', auto: 6, lock: true }]);
      // 2:15'in başı: bütün ışıklar tamamen söner, gerçek yıldızlar kalır
      Audio.cluster(false); Audio.setTone(false);
      yield (dt) => { sc.hostA = Math.max(0, sc.hostA - dt * 0.9); sc.angel = Math.max(0, sc.angel - dt * 0.9); sc.flood = Math.max(0, sc.flood - dt * 0.6); sc.dark = Math.min(0.8, sc.dark + dt * 0.7); sc.stars = Math.min(1, sc.stars + dt * 0.7); return sc.hostA <= 0 && sc.angel <= 0 && sc.dark >= 0.8; };
      yield UI.say([{ text: 'Melekler onların yanından göğe dönünce...', kind: 'narr', ref: 'Luka 2:15 · [yakın aktarım]', auto: 2.5, lock: true }]);
      sc.camTarget = 280;
      yield 1.4;
      Scenes.goto('haydi_beytlehem', { fadeOut: 1.2 });
    }, 'scene');
  },
  buildArt() {
    const sc = this;
    sc.ground = crispLayer(VW, 640, (g) => {
      poly(g, [0, 440, 90, 422, 190, 432, 300, 414, 420, 428, 520, 410, 640, 424, 640, 640, 0, 640], '#0c1028');
      poly(g, [0, 470, 140, 456, 260, 466, 380, 452, 520, 464, 640, 452, 640, 640, 0, 640], '#121a2a');
      for (let k = 0; k < 3; k++) { g.fillStyle = '#1e2634'; g.fillRect(0, 486 + k * 22, 640, 3); g.fillStyle = '#2a3240'; g.fillRect(0, 486 + k * 22, 640, 1); }
      poly(g, [0, 540, 640, 530, 640, 640, 0, 640], '#26302a');
      // ağıl duvarı (solda)
      g.fillStyle = '#4a463e'; g.fillRect(30, 560, 150, 8); g.fillRect(30, 540, 8, 28); g.fillRect(172, 540, 8, 28);
      g.fillStyle = '#6a6458'; for (let x = 30; x < 180; x += 7) g.fillRect(x, 560, 5, 2);
      g.fillStyle = '#0a0a10'; g.fillRect(38, 532, 134, 10);
    });
  },
  update(dt) {
    const sc = this;
    sc.camY = approach(sc.camY, sc.camTarget, dt * (REDUCED ? 400 : 120));
    for (const s of sc.sheep) { s.x = lerp(s.x, s.tx, Math.min(1, dt * sc.huddle * 1.2)); s.y = lerp(s.y, s.ty, Math.min(1, dt * sc.huddle * 1.2)); }
    for (const h of sc.host) { h.x += (h.tx - h.x) * dt * 0.05; h.y += (h.ty - h.y) * dt * 0.05; }
    Gfx.updateParticles(dt);
    if (Math.random() < dt * 10) Gfx.spawn({ x: 320 + (Math.random() - 0.5) * 6, y: 598, vx: (Math.random() - 0.5) * 5, vy: -12, t: 0, life: 0.9, c: '#ffcf7a' });
  },
  draw(g) {
    const sc = this, cy = Math.round(sc.camY);
    Gfx.drawSky(g, 0, cy - 280, { dim: sc.stars, h: VH, top: '#04051a', bot: '#1a2350' });
    g.drawImage(sc.ground, 0, -cy);
    // ağıldaki koyunlar
    for (const s of sc.sheep) g.drawImage(ART.sheep.a, Math.round(s.x) - 8, Math.round(s.y - cy) - 12);
    // ateş
    const fx = 320, fy = 600 - cy;
    g.fillStyle = '#4a3020'; g.fillRect(fx - 5, fy - 2, 10, 3);
    for (let i = 0; i < 7; i++) { const h = 3 + ((Math.sin(State.time * 9 + i * 1.7) + 1) * 3) | 0; g.fillStyle = '#e06a2a'; g.fillRect(fx - 3 + i, fy - 2 - h, 1, h); g.fillStyle = '#ffd27a'; g.fillRect(fx - 2 + (i % 5), fy - 3, 1, 1); }
    // çobanlar sırttan (kompozisyon çobanların sırtından kurulur)
    const base = 612 - cy;
    const sb = ART.sitBack;
    g.drawImage(sb.yoas, 262 - 8, base - 30);
    g.drawImage(sb.baba, 296 - 8, base - 30);
    g.drawImage(sb.nahum, 352 - 8, base - 30);
    if (sc.bury) g.drawImage(ART.tamarCrouch, 285 - 8, base - 22 + 2); // Tamar yüzünü babasının abasına gömer
    else g.drawImage(ART.tamar.up[0], 280 - 8, base - 22);
    // melek: dikey ışık biçimi (insan boyunu biraz aşar: yetişkin sprite'ı ~29 px, melek ~35 px)
    const ax = 320, ay = 560 - cy, AH = 35;
    if (sc.angel > 0) {
      const a = sc.angel;
      for (let y = 0; y < AH; y++) {
        const t = y / AH, w = Math.round(3 + Math.sin(t * Math.PI) * 5 + (t > 0.85 ? -2 : 0));
        g.globalAlpha = a * (0.55 + 0.45 * Math.sin(t * Math.PI));
        g.fillStyle = '#fff4cc'; g.fillRect(ax - w, ay - AH + y, w * 2, 1);
        g.globalAlpha = a; g.fillStyle = '#ffffff'; g.fillRect(ax - Math.max(1, w - 4), ay - AH + y, Math.max(2, (w - 4) * 2), 1);
      }
      g.globalAlpha = 1;
    }
    // gök ordusu: titreşmeyen, yavaş hareket eden beyaz-altın ışıklar (yıldızlardan ayrı)
    if (sc.hostA > 0) {
      for (const h of sc.host) {
        const x = Math.round(h.x), y = Math.round(h.y - cy);
        if (y < -4 || y > VH + 4) continue;
        g.globalAlpha = sc.hostA; g.fillStyle = '#fff4cc'; g.fillRect(x, y - 1, 1, 3 + h.s); g.fillRect(x - 1, y, 3, 1 + h.s);
        g.globalAlpha = sc.hostA * 0.35; g.fillRect(x - 1, y - 2, 3, 5 + h.s);
      }
      g.globalAlpha = 1;
    }
    Gfx.drawParticles(0, cy, 0);
    // ışık katmanı
    Gfx.resetLights();
    Gfx.light(fx, fy - 4, 90, 0.9); Gfx.glow(fx, fy - 4, 40, 0.4);
    if (sc.angel > 0) { Gfx.light(ax, ay - 18, 160, sc.angel); Gfx.glow(ax, ay - 18, 56, 0.8 * sc.angel, ART.glow.gold); }
    Gfx.applyDark('#03040f', sc.dark);
    if (sc.flood > 0) { g.globalCompositeOperation = 'lighter'; const f = Math.min(1, sc.flood * 1.25); g.fillStyle = `rgb(${Math.round(255 * f)},${Math.round(226 * f)},${Math.round(150 * f)})`; g.fillRect(0, 0, VW, VH); g.globalCompositeOperation = 'source-over'; }
    Gfx.cinema(sc.cine);
  },
  exit() { sacredUI(false); Audio.cluster(false); Audio.setTone(false); },
  skip() { Scripts.kill('scene'); UI.dlg.active = false; $('dialog').classList.add('hidden'); Scenes.goto('haydi_beytlehem', { fadeOut: 0.3 }); },
});

// ------------------------------------------------------------
// SAHNE 10 — Yemlik (dokunmama): yalnızca yaklaşmak ve çömelmek
// Meryem: portresiz, sözsüz, yemliğe eğik silüet; bebek kundaklı, yüz pikseli yok,
// hale ya da parıltı yok; tek ışık evin kendi kandili (GDD §11.6)
// ------------------------------------------------------------
Scenes.define('yemlik', {
  title: 'Yemlik',
  sacred: true,
  touchMode() { return this.phase === 1 && !this.crouched ? 'joyetk' : 'none'; },
  enter() {
    const sc = this;
    if (!sc.bg) sc.buildArt();
    sc.tx = 186; sc.crouched = false; sc.quiet = 0; sc.idle = 0; sc.phase = 0; sc.walkT = 0; sc.dir = 'up'; sc.ending = false; sc.autoT = false;
    sacredUI(true);
    Audio.setDrone(false); Audio.setAmbience({ wind: 0.03, crickets: false });
    Audio.setTone(true, 220, 0.06);
    sc.donkeyT = 4;
    Scripts.run(function* () {
      yield 0.8;
      yield UI.say([{ text: 'Hemen gidip Meryem\'le Yusuf\'u ve yemlikte yatan bebeği buldular.', kind: 'narr', ref: 'Luka 2:16 · [yakın aktarım]', auto: 4.5, lock: true }]);
      sc.phase = 1;
    }, 'scene');
  },
  buildArt() {
    const sc = this;
    sc.bg = crispLayer(VW, VH, (g) => {
      // avlu zemini ve evin ön duvarı
      g.fillStyle = '#1a1612'; g.fillRect(0, 0, VW, VH);
      const rr = makeRng(12);
      for (let y = 20; y < 300; y += 10) for (let x = (y / 10) % 2 ? -12 : 0; x < VW; x += 24) { g.fillStyle = ['#3a3228', '#342c24', '#40372c'][Math.floor(rr() * 3)]; g.fillRect(x + 1, y + 1, 22, 8); }
      g.fillStyle = '#2a241c'; g.fillRect(0, 296, VW, 64);
      for (let x = 0; x < VW; x += 9) { g.fillStyle = '#342c22'; g.fillRect(x, 300 + ((x * 5) % 13), 5, 1); }
      // alçak kapı (iç görünüm için boşluk)
      g.fillStyle = '#0c0907'; g.fillRect(244, 120, 152, 176);
      g.clearRect(250, 126, 140, 168);
      g.fillStyle = '#4a4238'; g.fillRect(244, 294, 152, 5); g.fillStyle = '#5e5446'; g.fillRect(244, 294, 152, 1); // eşik taşı
      // lento taşı
      g.fillStyle = '#5a5044'; g.fillRect(238, 112, 164, 12); g.fillStyle = '#6e6456'; g.fillRect(238, 112, 164, 2);
    });
    sc.inside = crispLayer(140, 172, (g) => {
      // iç: arka duvar kayaya yaslanır, sığ oyuk; aile tabanı birkaç basamak yukarıda; tabana oyulmuş taş yemlik
      g.fillStyle = '#3a2c20'; g.fillRect(0, 0, 140, 172);
      ell(g, 70, 70, 60, 48, '#2a1e16'); // kaya oyuğu
      g.fillStyle = '#4a3a2a'; g.fillRect(0, 104, 140, 30); // aile tabanı (yüksek)
      g.fillStyle = '#5a4834'; g.fillRect(0, 104, 140, 2);
      g.fillStyle = '#3e3022'; g.fillRect(0, 134, 140, 6); g.fillRect(0, 146, 140, 4); // basamaklar
      g.fillStyle = '#6a5a3a'; for (let x = 2; x < 140; x += 5) g.fillRect(x, 156 + ((x * 3) % 9), 3, 1); // samanlı hayvan bölmesi
      g.fillStyle = '#2e241a'; g.fillRect(0, 150, 140, 22);
      g.fillStyle = '#8a7a50'; for (let k = 0; k < 40; k++) g.fillRect((k * 37) % 138, 152 + ((k * 13) % 18), 2, 1);
      // duvar oyuğundaki kandil yeri
      g.fillStyle = '#1a120c'; g.fillRect(104, 58, 14, 10);
      // taş yemlik (aile tabanının kenarına oyulmuş)
      g.fillStyle = '#0a0b1a'; g.fillRect(34, 116, 34, 14);
      g.fillStyle = '#7a7262'; g.fillRect(35, 117, 32, 12); g.fillStyle = '#958c78'; g.fillRect(35, 117, 32, 2);
      g.fillStyle = '#2a241c'; g.fillRect(38, 119, 26, 5);
      // bebek: kundak biçimi (bantlı), yüz pikseli yok — baş kundak gölgesinde
      // (kundak odadaki en parlak nesne olmasın diye koyu keten tonunda)
      g.fillStyle = '#b8ac90'; g.fillRect(42, 117, 18, 5); g.fillStyle = '#9a8e74'; g.fillRect(46, 117, 1, 5); g.fillRect(51, 117, 1, 5); g.fillRect(56, 117, 1, 5);
      g.fillStyle = '#8e8268'; g.fillRect(57, 117, 4, 5);
      // İsa'nın annesi Meryem: oturan, yemliğe eğik silüet; örtü gölgesi, yüz yok
      poly(g, [70, 132, 72, 112, 78, 102, 86, 96, 94, 100, 96, 114, 98, 132], '#1c1a2c');
      ell(g, 82, 98, 7, 7, '#1c1a2c'); poly(g, [74, 96, 82, 89, 90, 92, 92, 104, 84, 108, 76, 104], '#24223a');
      poly(g, [74, 108, 64, 116, 66, 119, 78, 112], '#1c1a2c');
      // Yusuf: ayakta silüet
      poly(g, [112, 132, 113, 96, 118, 86, 126, 86, 130, 96, 131, 132], '#1a1610');
      ell(g, 122, 80, 6, 7, '#1a1610'); g.fillStyle = '#2a2016'; g.fillRect(132, 70, 2, 62);
    });
  },
  update(dt) {
    const sc = this;
    Gfx.updateParticles(dt);
    sc.donkeyT -= dt; if (sc.donkeyT <= 0) { sc.donkeyT = 6 + Math.random() * 6; Audio.step(14, true); }
    if (sc.phase === 1) {
      // yalnızca yaklaşma (sol/sağ) ve çömelme
      const ax = Input.axisX;
      if (Math.abs(ax) > 0.2 && !sc.crouched) { sc.tx = clamp(sc.tx + ax * 30 * dt, 150, 304); sc.walkT += dt; sc.idle = 0; sc.dir = ax > 0 ? 'right' : 'left'; }
      else { sc.walkT = 0; sc.idle += dt; if (!sc.crouched) sc.dir = 'up'; }
      const near = sc.tx > 286;
      if (!sc.crouched) UI.prompt(near ? 'interact' : null, near ? 'Çömel' : null); else UI.prompt(null);
      if (near && Input.pressed('interact') && !sc.crouched) sc.crouch();
      if (sc.idle > 14 && !sc.crouched) { sc.autoT = true; sc.tx = approach(sc.tx, 300, dt * 24); sc.walkT += dt; if (sc.tx >= 299) sc.crouch(); }
    }
    if (sc.phase === 2) {
      sc.quiet += dt;
      if (sc.quiet > 26 && !sc.ending) {
        sc.ending = true;
        Scripts.run(function* () {
          yield UI.fade(1, 2.2);
          Audio.setTone(false);
          yield UI.say([SAY.yasli('Bir bebek gördüm, Sara. Kundağa sarılmış, yemlikte. Melek ne dediyse oydu.')]);
          Scenes.goto('avlu', { fadeOut: 0.01, fadeIn: 1.4 });
        }, 'scene');
      }
    }
  },
  crouch() { this.crouched = true; this.phase = 2; this.quiet = 0; UI.prompt(null); },
  draw(g) {
    const sc = this;
    g.drawImage(sc.inside, 250, 126);
    g.drawImage(sc.bg, 0, 0);
    // avludaki eşek (kıpırtı)
    const D = Scenes.defs.hangi_kapi.donkey;
    if (D) g.drawImage(D, 520 + Math.round(Math.sin(State.time * 0.7)), 286);
    // çobanlar ayakta, başları hafifçe eğik (sırttan)
    const P = ART.people;
    g.drawImage(P.baba.up[0], 316 - 8, 330 - 29);
    g.drawImage(P.nahum.up[0], 356 - 8, 334 - 29);
    g.drawImage(P.yoas.up[0], 392 - 8, 328 - 29);
    // Tamar
    const t = sc.crouched ? ART.tamarCrouch : ART.tamar[sc.dir][sc.walkT > 0 ? 1 + (Math.floor(sc.walkT * 4) % 2) : 0];
    g.drawImage(t, Math.round(sc.tx) - 8, 338 - 22);
    // evin kandili: tek ışık
    const lx = 250 + 111, ly = 126 + 60;
    g.drawImage(ART.lamp, lx - 3, ly); g.drawImage(ART.flame[Math.floor(State.time * 6) % 3], lx - 1, ly - 3);
    // tek ışık evin kandilidir: bütün ışık düşüşü kandilden başlar; çocuğa odaklı ışık yok (GDD §11.6).
    // Avludaki hafif ışık yalnızca çobanların durduğu yeri gösterir ve içeriye ulaşmaz.
    Gfx.resetLights();
    Gfx.light(lx, ly, 96, 1); Gfx.light(lx, ly, 160, 0.5); Gfx.light(230, 352, 118, 0.32);
    Gfx.glow(lx, ly, 34, 0.35);
    Gfx.applyDark('#020208', 0.86);
    Gfx.cinema(1);
  },
  exit() { sacredUI(false); Audio.setTone(false); UI.prompt(null); },
  skip() { Scripts.kill('scene'); UI.dlg.active = false; $('dialog').classList.add('hidden'); Scenes.goto('avlu', { fadeOut: 0.3 }); },
});

// ------------------------------------------------------------
// SAHNE 13–14 — Tablolar (Anlatılan Sahne: parşömen üzerinde silüet)
// ------------------------------------------------------------
const INK = '#2a1a10';
Scenes.define('tablo1', {
  title: 'Tablo 1: Yıldızbilimciler ve yıldız',
  enter() {
    const sc = this;
    if (!sc.art) {
      const par = makeParchment(VW, VH, 21);
      // kompozisyon diyalog kutusunun üstünde kalır (yer çizgisi y = 262): eğilen figürler ve armağan kapları görünür
      const G = 262;
      sc.art = crispLayer(VW, VH, (g) => {
        // ev ve açık kapı (kapının açısı yüzünden içerisi görünmez)
        poly(g, [360, G, 360, G - 150, 560, G - 170, 580, G], INK);
        g.fillStyle = '#e8b060'; g.fillRect(410, G - 90, 34, 90);
        poly(g, [410, G - 90, 444, G - 90, 462, G - 80, 462, G, 444, G], '#c88a40');
        // eşikte, sayısı okunmayan bir grup yıldızbilimci: üst üste biner, en arkadakiler çerçeve dışına taşar
        const fig = (x, h, bow) => {
          if (bow) { poly(g, [x - 18, G, x - 14, G - 12, x + 2, G - 18, x + 14, G - 14, x + 18, G], INK); ell(g, x + 16, G - 12, 5, 5, INK); }
          else { poly(g, [x - 9, G, x - 7, G - h * 0.7, x - 3, G - h * 0.9, x + 4, G - h * 0.9, x + 8, G - h * 0.7, x + 10, G], INK); ell(g, x, G - h, 5.5, 6.5, INK); }
        };
        fig(244, 64); fig(260, 72); fig(276, 66); fig(294, 70); fig(310, 62); fig(330, 0, true); fig(348, 0, true); fig(366, 0, true);
        // armağan kapları, eşiğin önünde
        [[384, G - 6], [397, G - 6]].forEach(([x, y]) => { poly(g, [x - 5, y + 6, x - 6, y - 2, x - 3, y - 6, x + 3, y - 6, x + 6, y - 2, x + 5, y + 6], INK); });
        // yer
        g.fillStyle = INK; g.fillRect(0, G, VW, 4);
      });
      sc.par = par;
    }
    Audio.setDrone(true, 98); Audio.setAmbience({ wind: 0.04 });
    UI.objective('Yıldızbilimciler ve yıldız · Matta 2:1–12');
    Scripts.run(function* () {
      yield 1.0;
      yield UI.say([SAY.yasli('Bunu ben görmedim. Aylar sonra anlattılar.')]);
      yield 1.4;
      Scenes.goto('tablo2', { fadeOut: 1 });
    }, 'scene');
  },
  update() {},
  touchMode() { return 'etk'; },
  draw(g) {
    g.drawImage(this.par, 0, 0);
    g.drawImage(this.art, 0, 0);
    // yıldız: tablodaki tek gök ışığı, yıldız altını
    const x = 470, y = 54, a = REDUCED ? 1 : 0.85 + 0.15 * Math.sin(State.time * 2);
    g.globalAlpha = a; g.fillStyle = '#e8c66a'; g.fillRect(x - 1, y - 6, 3, 13); g.fillRect(x - 6, y - 1, 13, 3); g.fillStyle = '#fff4cc'; g.fillRect(x - 1, y - 1, 3, 3); g.globalAlpha = 1;
  },
  skip() { Scripts.kill('scene'); Scenes.goto('tablo2', { fadeOut: 0.3 }); },
});
Scenes.define('tablo2', {
  title: 'Tablo 2: Gece yola çıkan aile ve Rama\'daki ağıt',
  enter() {
    const sc = this;
    if (!sc.art) {
      sc.par = makeParchment(1280, VH, 33);
      sc.art = crispLayer(1280, VH, (g) => {
        g.fillStyle = INK; g.fillRect(0, 300, 1280, 3);
        // tepeler
        poly(g, [0, 300, 160, 268, 340, 286, 520, 262, 700, 284, 900, 258, 1100, 280, 1280, 266, 1280, 304, 0, 304], 'rgba(42,26,16,0.25)');
        // sol: gece yolunda eşek ve iki yetişkin; kucakta yüzsüz çocuk silüeti (Matta 2:14)
        // eşek: gövde, bacaklar, boyun, baş ve kulaklar
        ell(g, 150, 276, 26, 10, INK);
        [[130, 0], [138, 2], [160, 1], [168, 0]].forEach(([x, o]) => g.fillRect(x, 282 + o, 4, 18 - o));
        poly(g, [170, 272, 178, 256, 184, 254, 188, 260, 182, 276], INK);
        ell(g, 188, 258, 7, 4.5, INK); poly(g, [182, 254, 180, 244, 184, 252], INK); poly(g, [186, 254, 188, 244, 190, 252], INK);
        poly(g, [124, 272, 118, 288, 121, 289, 127, 276], INK); // kuyruk
        // eşekteki anne ve kucağındaki yüzsüz çocuk silüeti
        poly(g, [138, 270, 140, 250, 148, 240, 158, 248, 162, 270], INK); ell(g, 150, 236, 6, 7, INK);
        ell(g, 158, 254, 5, 4, INK);
        poly(g, [86, 300, 88, 254, 96, 244, 106, 254, 108, 300], INK); ell(g, 97, 238, 6, 7, INK); g.fillRect(110, 236, 2, 64); // Yusuf ve değnek
        // orta: uzakta yas tutan kadınlar (asker ve şiddet yok)
        const w = (x, h, bend) => { poly(g, [x - 7, 300, x - 5, 300 - h * 0.75 + bend, x, 300 - h * 0.9 + bend, x + 6, 300 - h * 0.75 + bend, x + 8, 300], 'rgba(42,26,16,0.7)'); ell(g, x + bend * 0.3, 300 - h + bend, 4.5, 5.5, 'rgba(42,26,16,0.7)'); };
        w(560, 44, 6); w(582, 46, 2); w(600, 42, 8); w(622, 45, 4); w(648, 43, 7); w(668, 40, 3);
        // sağ: kuzeye kaçan Tamar'ın ailesi; babanın sırtında postun içinde Natan, Tamar'ın elinde kandil
        poly(g, [1010, 300, 1012, 252, 1022, 240, 1034, 250, 1036, 300], INK); ell(g, 1024, 234, 6.5, 7.5, INK);
        ell(g, 1010, 256, 9, 11, INK); // sırttaki post
        poly(g, [1050, 300, 1052, 258, 1060, 248, 1070, 258, 1072, 300], INK); ell(g, 1061, 242, 6, 7, INK); // anne
        poly(g, [1086, 300, 1087, 276, 1092, 268, 1100, 276, 1101, 300], INK); ell(g, 1094, 263, 5, 6, INK); // çocuk Tamar
      });
    }
    sc.x = 0; sc.verse = false;
    UI.objective('Gece yola çıkan aile · Matta 2:13–18');
    Audio.setDrone(false); Audio.setAmbience({ wind: 0.12 });
    Scripts.run(function* () {
      yield 1.0;
      Audio.march();
      yield (dt) => { sc.x = Math.min(320, sc.x + dt * 40); return sc.x >= 320; };
      Audio.lament();
      yield UI.say([{ text: 'Rama\'da bir ses duyuldu, ağlayış ve acı feryat. Rahel çocukları için ağlıyor, avutulmak istemiyor; çünkü onlar artık yok.', kind: 'verse', ref: 'Matta 2:18 (Yeremya 31:15) · [yakın aktarım]' }]);
      yield (dt) => { sc.x = Math.min(640, sc.x + dt * 40); return sc.x >= 640; };
      yield 0.8;
      yield UI.say([SAY.yasli('Melekler Tanrı\'yı övdü, sonra askerler geldi.')]);
      yield 1.2;
      Scenes.goto('cerceve_kapanis', { fadeOut: 1.2 });
    }, 'scene');
  },
  update() {},
  touchMode() { return 'etk'; },
  draw(g) {
    const x = Math.round(this.x);
    g.drawImage(this.par, x, 0, VW, VH, 0, 0, VW, VH);
    g.drawImage(this.art, x, 0, VW, VH, 0, 0, VW, VH);
    // Tamar'ın elindeki kandil (tek sıcak nokta)
    const lx = 1104 - x, ly = 282;
    if (lx > -10 && lx < VW + 10) { g.fillStyle = '#f0a040'; g.fillRect(lx, ly, 3, 2); g.fillStyle = '#fff0b0'; g.fillRect(lx + 1, ly - 2, 1, 2); }
  },
  skip() { Scripts.kill('scene'); Scenes.goto('cerceve_kapanis', { fadeOut: 0.3 }); },
});

// ------------------------------------------------------------
// SAHNE 15 — Çerçeve kapanışı: dokuma bandı
// Renk: bölümün teması (çivit, yıldız altını, kandil turuncusu)
// Desen: koye → dalgalı · babaya → ortası düzleşen dalga · kalbinde → düz (GDD §8.7; bölüm §8.1)
// ------------------------------------------------------------
function drawBand(g, x0, y0, w, h, rows, haber) {
  const total = h;
  for (let y = 0; y < Math.min(rows, total); y++) {
    for (let x = 0; x < w; x++) {
      let col = '#26305e';
      if (y === 0 || y === total - 1) col = '#f0a040';
      else if (y === 2 || y === total - 3) col = '#9a5a32';
      const mid = (total - 1) / 2;
      let amp = 0;
      if (haber === 'koye') amp = 5;
      else if (haber === 'babaya') amp = 5 * Math.min(1, Math.abs(x - w / 2) / (w * 0.32));
      const wy = mid + Math.sin(x * 0.19) * amp;
      if (Math.abs(y - wy) < 1.1) col = '#e8c66a';
      if (haber === 'kalbinde' && (Math.abs(y - mid) < 0.6 || Math.abs(y - (mid - 4)) < 0.6 || Math.abs(y - (mid + 4)) < 0.6)) col = Math.abs(y - mid) < 0.6 ? '#e8c66a' : '#5a6aa0';
      if ((x + y) % 2 === 0 && col === '#26305e') col = '#2c376a';
      g.fillStyle = col; g.fillRect(x0 + x, y0 + y, 1, 1);
    }
  }
  // bant ucunda kuzu yününden bir düğüm
  if (rows >= total && State.flags.kol_b01_kuzu_yunu) { g.fillStyle = '#0a0b1a'; g.fillRect(x0 + w + 1, y0 + total / 2 - 3, 6, 6); g.fillStyle = '#ece6d4'; g.fillRect(x0 + w + 2, y0 + total / 2 - 2, 4, 4); }
}
Scenes.define('cerceve_kapanis', {
  title: 'Çerçeve kapanışı',
  enter() {
    const sc = this; sc.rows = 0; sc.weave = false;
    const F = State.flags;
    if (!F.b01_haber) F.b01_haber = 'kalbinde';
    Audio.setDrone(true, 110); Audio.setAmbience({ wind: 0.05, crickets: true });
    Scripts.run(function* () {
      yield 1;
      const L = [];
      if (F.b01_haber === 'koye') L.push(SAY.yasli('Şaştılar. Sonra herkes unuttu; ben unutmadım.'));
      if (F.b01_haber === 'kalbinde') L.push(SAY.yasli('Kimseye bir şey demedim. O bebeğin annesi gibi, ben de sakladım. Belki doğrusu buydu, belki değil.'));
      if (F.kol_b01_kuzu_yunu) L.push(SAY.yasli('Dikende bir tutam yün kalmıştı. Annem onu eğirip bileğime bağladı.'));
      if (F.kol_b01_sapan) L.push(SAY.yasli('Sapanımla tek bir kurt bile vurmadım. Ama belimdeyken karanlıktan korkmazdım.'));
      if (F.kol_b01_saman_copu) L.push(SAY.yasli('Bir saman çöpü. Gülme, Sara; o gece hiçbir şey sıradan değildi.'));
      yield UI.say(L);
      sc.weave = true;
      yield until(() => sc.rows >= 24);
      yield 1.6;
      Scenes.goto('son', { fadeOut: 1 });
    }, 'scene');
  },
  update(dt) { if (this.weave) this.rows = Math.min(24, this.rows + dt * 6); },
  touchMode() { return 'etk'; },
  draw(g) {
    const sc = this;
    Frame.draw(g, { band: (gg) => drawBand(gg, 268, 148, 142, 24, Math.floor(sc.rows), State.flags.b01_haber) });
    if (sc.weave) {
      // bandın yakın görünümü (önceden çizilmiş, ölçeklenmeden: büyük sürüm ayrıca dokunur)
      g.fillStyle = 'rgba(5,6,15,0.82)'; g.fillRect(140, 256, 360, 72);
      g.strokeStyle = '#6b5a3a'; g.strokeRect(140.5, 256.5, 359, 71);
      drawBandLarge(g, 152, 268, 336, 48, sc.rows / 24, State.flags.b01_haber);
    }
  },
  skip() { Scripts.kill('scene'); Scenes.goto('son', { fadeOut: 0.3 }); },
});
function drawBandLarge(g, x0, y0, w, h, k, haber) {
  // 2 px'lik iplik ızgarası: piksel yoğunluğu korunur (2×2 hücre = tek iplik)
  const cols = Math.floor(w / 2), rows = Math.floor(h / 2), show = Math.floor(rows * k);
  for (let y = 0; y < show; y++) for (let x = 0; x < cols; x++) {
    let col = '#26305e';
    if (y === 0 || y === rows - 1) col = '#f0a040'; else if (y === 2 || y === rows - 3) col = '#9a5a32';
    const mid = (rows - 1) / 2;
    let amp = haber === 'koye' ? 6 : haber === 'babaya' ? 6 * Math.min(1, Math.abs(x - cols / 2) / (cols * 0.32)) : 0;
    const wy = mid + Math.sin(x * 0.16) * amp;
    if (Math.abs(y - wy) < 1.1) col = '#e8c66a';
    if (haber === 'kalbinde') { if (Math.abs(y - mid) < 0.6) col = '#e8c66a'; else if (Math.abs(y - mid) > 4.4 && Math.abs(y - mid) < 5.6) col = '#5a6aa0'; }
    if ((x + y) % 2 === 0 && col === '#26305e') col = '#2c376a';
    g.fillStyle = col; g.fillRect(x0 + x * 2, y0 + y * 2, 2, 2);
  }
}

// ------------------------------------------------------------
// Son kart
// ------------------------------------------------------------
Scenes.define('son', {
  title: 'Bölüm sonu',
  enter() {
    const F = State.flags, S = State.stats;
    const li = [];
    li.push(F.b01_ifade_kuzu === 'kucakta' ? 'Topal kuzuyu kucağında ağıla taşıdın.' : F.b01_ifade_kuzu === 'guderek' ? 'Topal kuzu kandilinin ışığını izleyerek ağıla girdi.' : 'Topal kuzuyu ağıla baban koydu.');
    const n = S.gece_islik || 0;
    li.push(S.suru_auto ? 'Sürü, babanın kandilinin ardından ağıla indi.' : n === 0 ? 'Sürü gece ıslık çalmadan ağıla indi.' : n === 1 ? 'Sürü gece tek ıslıkla ağıla indi.' : `Sürü gece ${n} ıslıkla ağıla indi.`);
    li.push(F.b01_uyanan_ev === 0 ? 'Beytlehem\'de doğru kapıyı başka kimseyi uyandırmadan buldun.' : `Beytlehem'de ${F.b01_uyanan_ev} ev uyandı; kapılar nazikçe açıldı.`);
    li.push(F.b01_haber === 'koye' ? 'Şafakta gördüğünü obadakilere anlattın — çobanların anlatışının yankısı (Luka 2:17–18).' : F.b01_haber === 'babaya' ? 'Şafakta babana fısıldadın: “Annesi hiç konuşmadı. Hep baktı.”' : 'Şafakta gördüğünü kalbinde sakladın — “yüreğinde saklamak”ın yankısı (Luka 2:19).');
    const mem = [];
    if (F.kol_b01_kuzu_yunu) mem.push('Dikende kalan bir tutam yün');
    if (F.kol_b01_sapan) mem.push('ağıl kapısındaki sapan');
    if (F.kol_b01_saman_copu) mem.push('harmandan bir saman çöpü');
    const tan = [];
    if (F.tan_b01_duyanlar_sasti) tan.push('“Babam anlattıkça kapı eşiklerindeki yüzler açıldı; kimse gülmedi.”');
    if (F.tan_b01_yureginde_sakladi) tan.push('“Herkes konuşuyordu. Annesi yalnızca bakıyordu; sanki her şeyi bir yere yerleştiriyordu.”');
    if (F.tan_b01_overek_dondu) tan.push('“Babam yol boyunca Tanrı\'yı övdü. Her şey bize söylendiği gibiydi.”');
    let html = `<h1>Bölüm 1 — Yıldızın Altında</h1><h2>Luka 2:1–20</h2><ul class="summary">${li.map((x) => `<li>${esc(x)}</li>`).join('')}`;
    if (mem.length) html += `<li>Hatıralar: ${esc(mem.join(', '))}.</li>`;
    tan.forEach((x) => (html += `<li><i>${esc(x)}</i></li>`));
    html += `</ul><div class="t" style="font-size:.8em;color:#b9b2a0;margin-bottom:1em">Seçimlerin İncil'deki olayları değiştirmez.</div><div class="btns"><button data-a="again">Yeniden oyna</button></div>`;
    Scripts.run(function* () {
      yield 0.6;
      UI.card(html, { noTap: true });
      UI.cardButton('button[data-a="again"]', () => { UI.closeCard(); Bus.emit('restart'); });
    }, 'scene');
    Audio.setDrone(false);
  },
  update() {},
  touchMode() { return 'none'; },
  draw(g) { Frame.draw(g, { band: (gg) => drawBand(gg, 268, 148, 142, 24, 24, State.flags.b01_haber) }); },
});
