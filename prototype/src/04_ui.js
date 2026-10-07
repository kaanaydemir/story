// ============================================================
// Arayüz katmanı (DOM): diyalog, kısa sözler, seçenekler, kartlar,
// Üç Işık, menüler, ölçekleme ve dokunmatik yerleşim
// ============================================================
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Dokunuş/tıklama: pointerdown hızlı tepki verir; "click" ise klavye odağı ve yardımcı
// teknolojiler (ekran okuyucu, anahtar erişimi) içindir. Aynı basış iki kez sayılmaz.
function onTap(el, fn) {
  el.addEventListener('pointerdown', (e) => { e.preventDefault(); el._tapT = performance.now(); fn(e); });
  el.addEventListener('click', (e) => { if (el._tapT && performance.now() - el._tapT < 800) return; fn(e); });
}

const UI = {
  scale: 1, portrait: false, stageRect: { x: 0, y: 0, w: 640, h: 360 },
  dlg: { active: false, lines: [], i: 0, shown: 0, full: '', t: 0, line: null },
  bk: { t: 0 },
  ch: { active: false, opts: [], sel: 0, result: -1 },
  cardActive: false, cardResolve: null, cardWait: 0,
  fadeA: 0, fadeTarget: 0, fadeSpeed: 1,
  menuOpen: false, menuKind: null,
  hint: { open: false, sel: 0 },
  pr: { scene: null, player: null, sig: null },
  touchMode: null,
  init() {
    $('dialog').addEventListener('pointerdown', (e) => { e.preventDefault(); this.advance(); });
    $('card').addEventListener('pointerdown', (e) => { if (e.target.closest && e.target.closest('button')) return; e.preventDefault(); this.cardTap(); });
    onTap($('btn-hint'), () => { Audio.init(); Bus.emit('hintRequest'); });
    onTap($('btn-menu'), () => { Audio.init(); if (!this.menuOpen && State.started) this.openPause(); });
    const re = () => this.layout();
    window.addEventListener('resize', re);
    window.addEventListener('orientationchange', () => setTimeout(re, 120));
    if (window.visualViewport) window.visualViewport.addEventListener('resize', re);
    Bus.on('touchdetected', re);
    this.layout();
  },
  // ---------------- ölçekleme ----------------
  safeArea() {
    let el = this._sa;
    if (!el) { el = this._sa = document.createElement('div'); el.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)'; document.body.appendChild(el); }
    const cs = getComputedStyle(el), n = (v) => parseFloat(v) || 0;
    return { t: n(cs.paddingTop), r: n(cs.paddingRight), b: n(cs.paddingBottom), l: n(cs.paddingLeft) };
  },
  layout() {
    const sa0 = this.safeArea();
    const vw = window.innerWidth - sa0.l - sa0.r, vh = window.innerHeight - sa0.t - sa0.b, dpr = window.devicePixelRatio || 1;
    const touch = Input.touchDevice;
    const portrait = vh > vw * 1.05;
    this.portrait = portrait;
    let ctrlH = 0;
    if (touch && portrait) ctrlH = Math.max(190, Math.min(vh * 0.34, 300));
    const availW = vw, availH = vh - ctrlH;
    const fitDev = Math.min((availW * dpr) / VW, (availH * dpr) / VH);
    let sDev = Math.floor(fitDev);
    // tam sayı ölçek tercih edilir; ekranın çok azını kullanacaksa kesirli ölçeğe düşülür
    if (sDev < 1 || sDev / fitDev < 0.88 || portrait) sDev = fitDev;
    const cssW = Math.floor((VW * sDev) / dpr), cssH = Math.floor((VH * sDev) / dpr);
    const x = Math.floor((availW - cssW) / 2) + sa0.l;
    const y = (portrait && touch ? Math.max(0, Math.floor((availH - cssH) / 3)) : Math.floor((availH - cssH) / 2)) + sa0.t;
    const st = $('stage');
    st.style.width = cssW + 'px'; st.style.height = cssH + 'px'; st.style.left = x + 'px'; st.style.top = y + 'px';
    this.scale = cssW / VW;
    this.stageRect = { x, y, w: cssW, h: cssH };
    // arayüz katmanı: yatayda oyun alanının üstünde; dikeyde oyun + kontrollere kadar olan alan
    const ui = $('ui');
    let uiH = cssH;
    if (portrait) uiH = Math.max(cssH, vh + sa0.t - ctrlH - y);
    ui.style.left = x + 'px'; ui.style.top = y + 'px'; ui.style.width = cssW + 'px'; ui.style.height = uiH + 'px';
    const fs = Math.max(touch ? 15 : 13, Math.min(22, cssW / 640 * 11.5));
    ui.style.setProperty('--fs', fs + 'px');
    document.documentElement.style.setProperty('--fs', fs + 'px');
    // dokunmatik kontroller
    const t = $('touch');
    t.classList.toggle('hidden', !touch);
    t.classList.toggle('portrait', touch && portrait);
    if (touch) {
      const joy = $('joy'), tb = $('tbuttons');
      const sa = 12;
      if (portrait) {
        t.style.top = (vh - ctrlH + sa0.t) + 'px'; t.style.height = (ctrlH + sa0.b) + 'px'; t.style.left = '0'; t.style.width = '100%';
        const js = Math.min(ctrlH * 0.72, vw * 0.4);
        joy.style.width = js + 'px'; joy.style.height = js + 'px'; joy.style.left = (sa + 10) + 'px'; joy.style.top = ((ctrlH - js) / 2) + 'px';
        this.placeButtons(tb, vw, ctrlH, Math.min(ctrlH * 0.3, 78, (vw - js - sa - 30) / 3.3), true);
      } else {
        t.style.top = '0'; t.style.height = '100%'; t.style.left = '0'; t.style.width = '100%';
        const js = Math.min(vh * 0.38, 170);
        joy.style.width = js + 'px'; joy.style.height = js + 'px';
        joy.style.left = (sa0.l + sa + 6) + 'px'; joy.style.top = (sa0.t + vh - js - 18) + 'px';
        this.placeButtons(tb, vw + sa0.l, vh + sa0.t, Math.min(vh * 0.16, 70), false);
      }
    }
    // yatay dokunmatikte diyalog ve seçenekler sağdaki Etkileşim düğmesinin altına girmesin
    let dr = 0;
    if (touch && !portrait) {
      const e = $('tb-etk'), el = parseFloat(e.style.left) || 0, et = parseFloat(e.style.top) || 0, ew = parseFloat(e.style.width) || 0;
      const stageBottom = y + cssH;
      if (el < x + cssW && et + ew > stageBottom - cssH * 0.3) dr = Math.max(0, x + cssW - el + 6);
    }
    ui.style.setProperty('--dr', dr ? dr + 'px' : '3%');
  },
  placeButtons(tb, vw, h, size, portrait) {
    tb.style.left = '0'; tb.style.top = '0'; tb.style.width = vw + 'px'; tb.style.height = h + 'px';
    const right = vw - 16, bottom = portrait ? h / 2 + size * 0.9 : h - 18;
    const place = (id, cx, cy, s) => { const el = $(id); el.style.width = s + 'px'; el.style.height = s + 'px'; el.style.left = (cx - s / 2) + 'px'; el.style.top = (cy - s / 2) + 'px'; el.style.right = 'auto'; el.style.fontSize = Math.max(9, Math.min(13, s * 0.18)) + 'px'; };
    place('tb-etk', right - size * 0.55, bottom - size * 1.55, size * 1.05);
    place('tb-gut', right - size * 1.75, bottom - size * 0.6, size * 1.05);
    place('tb-bakis', right - size * 2.75, bottom - size * 1.75, size * 0.95);
  },
  // ---------------- diyalog ----------------
  say(lines) {
    if (!Array.isArray(lines)) lines = [lines];
    const d = this.dlg;
    d.active = true; d.lines = lines; d.i = -1;
    this.nextLine();
    Input.lock();
    return { done: () => !d.active };
  },
  nextLine() {
    const d = this.dlg;
    d.i++;
    if (d.i >= d.lines.length) { d.active = false; $('dialog').classList.add('hidden'); Input.lock(); return; }
    let L = d.lines[d.i]; if (typeof L === 'string') L = { text: L };
    d.line = L; d.full = L.text; d.shown = 0; d.t = 0; d.autoT = 0;
    // kilitli (kendiliğinden akan) satırlar okunabilsin: bekleme metin uzunluğuna göre uzar
    d.autoHold = L.auto == null ? null : L.lock ? Math.max(L.auto, L.text.length / 18) : L.auto;
    const el = $('dialog');
    el.className = '';
    if (L.kind) el.classList.add(L.kind);
    el.classList.add('typing'); if (L.lock) el.classList.add('locked');
    if (!L.por || !ART.portraits[L.por]) el.classList.add('noportrait');
    else { const cv = el.querySelector('canvas'), g = cv.getContext('2d'); g.clearRect(0, 0, 24, 24); g.drawImage(ART.portraits[L.por], 0, 0); }
    el.querySelector('.speaker').textContent = L.who || '';
    el.querySelector('.speaker').style.display = L.who ? '' : 'none';
    el.querySelector('.text').textContent = '';
    el.querySelector('.verse').textContent = L.ref || '';
    el.querySelector('.verse').style.display = L.ref ? '' : 'none';
    if (L.sfx) L.sfx();
  },
  advance(force) {
    const d = this.dlg;
    if (!d.active) return;
    if (d.line && d.line.lock && !force) return;
    if (d.shown < d.full.length) { d.shown = d.full.length; $('dialog').querySelector('.text').textContent = d.full; $('dialog').classList.remove('typing'); return; }
    Audio.ui();
    this.nextLine();
  },
  // ---------------- kısa söz (akışı durdurmaz) ----------------
  bark(text, who, dur, think) {
    const el = $('bark');
    el.classList.remove('hidden'); el.classList.toggle('think', !!think);
    el.querySelector('.who').textContent = who ? who + ':' : '';
    el.querySelector('.txt').textContent = text;
    this.bk.t = dur || Math.max(2.6, text.length * 0.065);
    this.bk.text = text;
  },
  clearBark() { $('bark').classList.add('hidden'); this.bk.t = 0; },
  // ---------------- istem ----------------
  // İki yuva: sahnenin kendi istemi (öğretim, Bakış daveti…) ve oyuncunun odaktaki etkileşimi.
  // Oyuncu yuvası doluysa o görünür; boşalınca sahne istemi geri gelir. Diyalog/menü sırasında gizlenir.
  prompt(action, text) { this.pr.scene = text ? { action, text } : null; this.renderPrompt(); },
  playerPrompt(action, text) {
    const cur = this.pr.player;
    if (!text) { if (!cur) return; this.pr.player = null; }
    else { if (cur && cur.action === action && cur.text === text) return; this.pr.player = { action, text }; }
    this.renderPrompt();
  },
  clearPrompts() { this.pr.scene = null; this.pr.player = null; this.renderPrompt(); },
  renderPrompt() {
    const el = $('prompt');
    const P = this.blocking() ? null : this.pr.player || this.pr.scene;
    if (!P) { if (this.pr.sig !== null) { el.classList.add('hidden'); $('tb-etk').classList.remove('ctx'); this.pr.sig = null; } return; }
    const key = Input.keyLabel(P.action);
    let text = P.text;
    // dokunmatikte düğme adı metnin başında yinelenmesin ("[Bakış] Bakış: …")
    if (text.indexOf(key + ':') === 0) text = text.slice(key.length + 1).trim();
    const sig = P.action + '|' + key + '|' + text;
    if (this.pr.sig !== sig) {
      el.innerHTML = `<span class="key">${esc(key)}</span>${esc(text)}`; this.pr.sig = sig;
      el.classList.remove('hidden');
      $('tb-etk').classList.toggle('ctx', P.action === 'interact');
    }
  },
  objective(text) { const el = $('objective'); if (!text) { el.classList.add('hidden'); return; } el.textContent = text; el.classList.remove('hidden'); },
  usta(n, show) {
    const el = $('usta');
    if (!show) { el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    let h = 'Usta işi: ';
    for (let i = 0; i < 2; i++) h += `<span class="w ${i < n ? 'used' : ''}">ıslık</span>`;
    if (n > 2) h += `<span class="w used">+${n - 2}</span>`;
    el.innerHTML = h;
  },
  // ---------------- seçenekler ----------------
  choose(opts, question) {
    const c = this.ch; c.active = true; c.opts = opts; c.sel = 0; c.result = -1;
    // diyalogu hızla geçen oyuncu seçeneği okumadan seçmesin: kısa bekleme + tuş bırakma şartı;
    // bekleme sırasında yeniden basılan onay tuşu süreyi baştan başlatır
    c.armT = 0.8; c.needRelease = true;
    const el = $('choices'); el.innerHTML = '';
    if (question) { const q = document.createElement('div'); q.className = 'q'; q.textContent = question; el.appendChild(q); }
    opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.innerHTML = `<span class="n">${i + 1}</span>${esc(o.text || o)}${o.tone ? `<span class="tone">${esc(o.tone)}</span>` : ''}`;
      onTap(b, () => this.pick(i));
      b.addEventListener('focus', () => { c.sel = i; this.markSel(); });
      el.appendChild(b);
    });
    el.classList.remove('hidden');
    this.markSel();
    Input.lock();
    return { done: () => !c.active, value: () => c.result };
  },
  markSel() { const bs = $('choices').querySelectorAll('button'); bs.forEach((b, i) => b.classList.toggle('sel', i === this.ch.sel)); },
  pick(i, force) { const c = this.ch; if (!c.active) return; if (!force && (c.armT > 0 || c.needRelease)) return; c.result = i; c.active = false; $('choices').classList.add('hidden'); Audio.ui(); Input.lock(); },
  // ---------------- kart ----------------
  card(html, opts) {
    opts = opts || {};
    const el = $('card');
    el.className = opts.clear ? 'clear' : '';
    el.innerHTML = html + (opts.noTap ? '' : `<div class="tap">${Input.lastDevice === 'touch' || Input.touchDevice ? 'Devam için dokun' : 'Devam: E / Boşluk / tıkla'}</div>`);
    this.cardActive = true; this.cardWait = opts.minTime == null ? 0.6 : opts.minTime; this.cardNoTap = !!opts.noTap;
    Input.lock();
    return { done: () => !this.cardActive };
  },
  cardTap() { if (!this.cardActive || this.cardNoTap || this.cardWait > 0) return; this.closeCard(); },
  cardButton(sel, fn) { const b = $('card').querySelector(sel); if (b) onTap(b, () => { if (this.cardWait <= 0) fn(); }); return b; },
  closeCard() { this.cardActive = false; $('card').classList.add('hidden'); $('card').innerHTML = ''; Input.lock(); },
  // ---------------- karartma ----------------
  fade(to, dur) {
    this.fadeTarget = to; this.fadeSpeed = dur > 0 ? Math.abs(to - this.fadeA) / dur : 999;
    return { done: () => Math.abs(this.fadeA - this.fadeTarget) < 0.001 };
  },
  // ---------------- Üç Işık ----------------
  showHint(level, text, opts) {
    opts = opts || {};
    const el = $('hintpanel');
    let h = '<div class="lamps">' + [1, 2, 3].map((i) => `<i class="${i <= level ? 'on' : ''}"></i>`).join('') + '</div>';
    h += `<div class="h ${opts.think ? 'think' : ''}">${opts.who ? `<b style="color:var(--gold)">${esc(opts.who)}:</b> ` : ''}${esc(text)}</div>`;
    h += '<div class="row">';
    if (level >= 3 && opts.onContinue) h += '<button data-a="cont">Hikâyeye devam</button>';
    h += '<button data-a="close">Kapat</button></div>';
    if (level >= 3 && opts.onContinue) {
      const k = Input.lastDevice === 'pad' ? 'Y' : Input.lastDevice === 'touch' ? '' : 'Enter';
      if (k) h += `<div class="keys">${esc(k)}: Hikâyeye devam · ${Input.lastDevice === 'pad' ? 'B' : 'Backspace'}: Kapat</div>`;
    }
    el.innerHTML = h;
    el.classList.remove('hidden');
    this.hint.open = true; this.hint.t = 14; this.hint.onContinue = opts.onContinue; this.hint.sel = 0;
    this.hint.buttons = [...el.querySelectorAll('button')];
    this.hint.buttons.forEach((b) => onTap(b, () => this.hintAction(b.dataset.a)));
    this.markHint();
  },
  markHint() { (this.hint.buttons || []).forEach((b, i) => b.classList.toggle('sel', i === this.hint.sel)); },
  hintAction(a) {
    if (!this.hint.open) return;
    if (a === 'cont' && this.hint.onContinue) { const f = this.hint.onContinue; this.closeHint(); Audio.ui(); f(); }
    else this.closeHint();
  },
  closeHint() { $('hintpanel').classList.add('hidden'); this.hint.open = false; this.hint.buttons = []; },
  // ---------------- menüler ----------------
  controlsHTML() {
    return `<table>
      <tr><td>Yürü</td><td>Oklar / WASD · dokunmatik: sol çubuk · gamepad: sol çubuk</td></tr>
      <tr><td>Seğirt</td><td>Ctrl basılı · çubuğu sonuna kadar it · LB</td></tr>
      <tr><td>Bakış</td><td>Shift ya da farenin sağ tuşu basılı · Bakış düğmesi · LT</td></tr>
      <tr><td>Başını kaldır</td><td>Bakış basılıyken ↑ · Bakış + çubuk yukarı · sağ çubuk yukarı</td></tr>
      <tr><td>Güt</td><td>Boşluk: kısa bas = değnek, basılı tut (0,35 sn) = ıslık · Güt düğmesi · X</td></tr>
      <tr><td>Islığı iptal</td><td>Basılıyken Esc / Backspace · parmağı düğmeden kaydır · B</td></tr>
      <tr><td>Etkileşim</td><td>E · Etkileşim düğmesi · A (durak taşında: “Baba, buraya!”)</td></tr>
      <tr><td>Diyalog</td><td>E / Boşluk / Enter ya da dokun · seçenek: 1–4, oklar, dokun</td></tr>
      <tr><td>Üç Işık</td><td>H · sağ üstteki kandil · View</td></tr>
      <tr><td>Menü</td><td>Esc · sağ üstteki ≡ · Menu</td></tr>
    </table>`;
  },
  openStart(sel) {
    this.menuOpen = true; this.menuKind = 'start';
    const el = $('menu'); el.className = 'start';
    el.innerHTML = `<div class="box"><h1>Kandil — Yıldızdan Şafağa</h1><h2>Bölüm 1: Yıldızın Altında</h2>
      <div class="col"><button data-a="start">Başla</button><button data-a="sound">${State.muted ? 'Ses: kapalı' : 'Ses: açık'}</button><button data-a="controls">Kontroller</button></div>
      <div class="small">Oynanabilir prototip · Luka 2:1–20 · yaklaşık 12–15 dakika</div></div>`;
    this.bindMenu(el, sel);
    $('topbtns').classList.add('off');
  },
  openPause(sel) {
    if (this.menuOpen) return;
    State.paused = true; this.menuOpen = true; this.menuKind = 'pause';
    const el = $('menu'); el.className = '';
    el.innerHTML = `<div class="box"><h1 style="font-size:calc(var(--fs)*1.4)">Duraklatıldı</h1><h2>${esc(Scenes.current ? Scenes.current.title : '')}</h2>
      <div class="col"><button data-a="resume">Devam</button><button data-a="controls">Kontroller</button><button data-a="sound">${State.muted ? 'Ses: kapalı' : 'Ses: açık'}</button><button data-a="restart">Bölümü yeniden başlat</button></div></div>`;
    this.bindMenu(el, sel);
  },
  openRestartConfirm() {
    const el = $('menu'); el.className = '';
    el.innerHTML = `<div class="box"><h1 style="font-size:calc(var(--fs)*1.3)">Bölümü yeniden başlat?</h1><h2>Bu bölümdeki seçimlerin ve ilerlemen silinir.</h2>
      <div class="col"><button data-a="backpause3">Hayır, devam et</button><button data-a="restartyes">Evet, baştan başla</button></div></div>`;
    this.bindMenu(el, 0);
  },
  openControls(back) {
    const el = $('menu');
    el.className = '';
    el.innerHTML = `<div class="box"><h1 style="font-size:calc(var(--fs)*1.3)">Kontroller</h1>${this.controlsHTML()}
      <div class="small">Bakış etkinken uzak sesler belirginleşir; ekran kenarındaki ince tek dalga kuzuyu, kalın çift dalga koyunları gösterir.</div>
      <div class="col" style="margin-top:.8em"><button data-a="${back}">Geri</button></div></div>`;
    this.bindMenu(el);
  },
  bindMenu(el, sel) {
    const bs = [...el.querySelectorAll('button')];
    this.menuButtons = bs; this.menuSel = clamp(sel || 0, 0, bs.length - 1);
    bs.forEach((b, i) => {
      onTap(b, () => { this.menuSel = i; this.menuAction(b.dataset.a); });
      b.addEventListener('focus', () => { if (this.menuSel !== i) { this.menuSel = i; this.markMenu(true); } });
    });
    this.markMenu(Input.lastDevice !== 'touch');
  },
  // klavye seçimi ile tarayıcı odağı aynı düğmede tutulur (Tab + Enter tutarlı çalışır)
  markMenu(focus) {
    const bs = this.menuButtons || [];
    bs.forEach((b, i) => b.classList.toggle('sel', i === this.menuSel));
    if (focus && bs[this.menuSel] && document.activeElement !== bs[this.menuSel]) { try { bs[this.menuSel].focus({ preventScroll: true }); } catch (e) {} }
  },
  menuAction(a) {
    Audio.init(); Audio.ui();
    if (a === 'start') { this.closeMenu(); Bus.emit('start'); }
    else if (a === 'sound') { const i = this.menuSel; Audio.setMuted(!State.muted); this.menuKind === 'start' ? this.openStartRefresh(i) : this.openPauseRefresh(i); }
    else if (a === 'controls') this.openControls(this.menuKind === 'start' ? 'backstart' : 'backpause');
    else if (a === 'backstart') this.openStartRefresh(2);
    else if (a === 'backpause') this.openPauseRefresh(1);
    else if (a === 'backpause3') this.openPauseRefresh(3);
    else if (a === 'resume') { this.closeMenu(); }
    else if (a === 'restart') this.openRestartConfirm();
    else if (a === 'restartyes') { this.closeMenu(); Bus.emit('restart'); }
  },
  openStartRefresh(sel) { this.menuOpen = false; this.openStart(sel); },
  openPauseRefresh(sel) { this.menuOpen = false; State.paused = false; this.openPause(sel); },
  closeMenu() {
    $('menu').classList.add('hidden'); $('menu').innerHTML = '';
    this.menuOpen = false; State.paused = false; $('topbtns').classList.remove('off'); this.menuButtons = [];
    Input.lock();
  },
  // ---------------- kare güncellemesi ----------------
  update(dt) {
    // karartma
    if (this.fadeA !== this.fadeTarget) {
      this.fadeA = approach(this.fadeA, this.fadeTarget, this.fadeSpeed * dt);
      $('fade').style.opacity = this.fadeA.toFixed(3);
    }
    this.updateTouchMode();
    if (this.menuOpen) {
      const bs = this.menuButtons || [];
      if (Input.pressed('down')) { this.menuSel = (this.menuSel + 1) % bs.length; this.markMenu(true); }
      if (Input.pressed('up')) { this.menuSel = (this.menuSel + bs.length - 1) % bs.length; this.markMenu(true); }
      if ((Input.pressed('confirm') || Input.pressed('interact')) && bs[this.menuSel]) this.menuAction(bs[this.menuSel].dataset.a);
      else if ((Input.pressed('menu') || Input.pressed('cancel')) && this.menuKind === 'pause') this.closeMenu();
      return;
    }
    if (this.cardActive) {
      this.cardWait -= dt;
      const bs = $('card').querySelectorAll('button');
      if (bs.length) {
        this.cardSel = this.cardSel || 0;
        if (Input.pressed('right') || Input.pressed('down')) this.cardSel = (this.cardSel + 1) % bs.length;
        if (Input.pressed('left') || Input.pressed('up')) this.cardSel = (this.cardSel + bs.length - 1) % bs.length;
        bs.forEach((b, i) => b.classList.toggle('sel', i === this.cardSel));
        if (Input.pressed('confirm') && this.cardWait <= 0) bs[this.cardSel].click();
      } else if (Input.pressed('confirm') && this.cardWait <= 0 && !this.cardNoTap) this.closeCard();
      return;
    }
    if (this.ch.active) {
      const c = this.ch, n = c.opts.length;
      if (Input.pressed('down')) { c.sel = (c.sel + 1) % n; this.markSel(); }
      if (Input.pressed('up')) { c.sel = (c.sel + n - 1) % n; this.markSel(); }
      let anyNum = false;
      for (let i = 0; i < Math.min(4, n); i++) if (Input.down('n' + (i + 1))) anyNum = true;
      if (c.needRelease && !Input.down('confirm') && !anyNum) c.needRelease = false;
      if (c.armT > 0) { c.armT -= dt; if (Input.pressed('confirm')) c.armT = 0.8; $('choices').classList.toggle('arming', c.armT > 0); return; }
      $('choices').classList.remove('arming');
      for (let i = 0; i < Math.min(4, n); i++) if (Input.pressed('n' + (i + 1))) { this.pick(i); return; }
      if (Input.pressed('confirm')) this.pick(c.sel);
      return;
    }
    if (this.dlg.active) {
      const d = this.dlg;
      if (d.shown < d.full.length) {
        d.t += dt;
        const n = Math.min(d.full.length, Math.floor(d.t * 48));
        if (n !== d.shown) { d.shown = n; $('dialog').querySelector('.text').textContent = d.full.slice(0, n); }
        if (d.shown >= d.full.length) $('dialog').classList.remove('typing');
      }
      if (d.autoHold != null && d.shown >= d.full.length) { d.autoT += dt; if (d.autoT >= d.autoHold) { this.nextLine(); return; } }
      if (Input.pressed('confirm')) this.advance();
    }
    if (this.bk.t > 0) { this.bk.t -= dt; if (this.bk.t <= 0) this.clearBark(); }
    if (this.hint.open) {
      this.hint.t -= dt; if (this.hint.t <= 0 && !this.hint.onContinue) this.closeHint();
      // klavye/gamepad: Enter ya da Y = "Hikâyeye devam" (varsa), Backspace ya da B = Kapat
      if (this.hint.open && !this.dlg.active) {
        if (Input.pressed('accept')) this.hintAction(this.hint.onContinue ? 'cont' : 'close');
        else if (Input.pressed('cancel') && !Player.charging) this.hintAction('close');
      }
    }
    this.renderPrompt();
  },
  // dokunmatik denetimlerin görünürlüğü: menü/kartta hiçbiri; diyalogda yalnızca Etkileşim (devam);
  // sahne denetimi kısıtlıyorsa (dokunmama, kesit) sahnenin söylediği kadarı
  updateTouchMode() {
    if (!Input.touchDevice) return;
    let m;
    if (this.menuOpen || this.cardActive) m = 'none';
    else if (this.dlg.active || this.ch.active) m = 'etk';
    else { const sc = Scenes.current; m = sc && sc.touchMode ? sc.touchMode() : (Player.enabled ? 'full' : 'etk'); }
    if (m === this.touchMode) return;
    this.touchMode = m;
    $('touch').dataset.m = m;
    if (m === 'none' || m === 'etk') Input.releaseTouch({ joy: true });
    if (m === 'none' || m === 'joy') Input.releaseTouch({ buttons: ['bakis', 'gut', 'interact'] });
    else if (m !== 'full') Input.releaseTouch({ buttons: ['bakis', 'gut'] });
  },
  blocking() { return this.dlg.active || this.ch.active || this.cardActive || this.menuOpen; },
};
