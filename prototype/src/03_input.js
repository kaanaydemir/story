// ============================================================
// Girdi: klavye, fare, dokunmatik (sanal çubuk + düğmeler), gamepad
// ve test için benzetim (KANDIL.debug.simulate)
// ============================================================
const KEYMAP = {
  ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  ShiftLeft: 'bakis', ShiftRight: 'bakis', Space: 'gut', KeyE: 'interact', Enter: 'confirm', NumpadEnter: 'confirm',
  KeyH: 'hint', Escape: 'menu', KeyP: 'menu', ControlLeft: 'sprint', ControlRight: 'sprint', Backspace: 'cancel',
  Digit1: 'n1', Digit2: 'n2', Digit3: 'n3', Digit4: 'n4', Numpad1: 'n1', Numpad2: 'n2', Numpad3: 'n3', Numpad4: 'n4',
};
const BUTTONS = ['up', 'down', 'left', 'right', 'bakis', 'gut', 'interact', 'confirm', 'hint', 'menu', 'sprint', 'cancel', 'lookup', 'n1', 'n2', 'n3', 'n4'];
const Input = {
  keys: {}, mouseR: false, virt: {}, sim: {}, cur: {}, prev: {}, held: {},
  joy: { x: 0, y: 0, active: false, id: null }, pad: null, padCur: {},
  axisX: 0, axisY: 0, analog: 0,
  touchDevice: false, lastDevice: 'kb',
  frozen: false,
  init() {
    window.addEventListener('keydown', (e) => {
      const n = KEYMAP[e.code];
      if (n) {
        this.keys[n] = true; this.lastDevice = 'kb';
        if (['up', 'down', 'left', 'right', 'gut', 'confirm', 'cancel'].includes(n) || e.code === 'Space') e.preventDefault();
        if (n === 'interact') this.keys.confirm2 = true;
        if (n === 'gut') this.keys.confirm3 = true;
      }
      Audio.init();
    }, { passive: false });
    window.addEventListener('keyup', (e) => {
      const n = KEYMAP[e.code];
      if (n) { this.keys[n] = false; if (n === 'interact') this.keys.confirm2 = false; if (n === 'gut') this.keys.confirm3 = false; }
    });
    window.addEventListener('blur', () => { this.keys = {}; this.mouseR = false; this.virt = {}; this.joy.active = false; this.joy.x = this.joy.y = 0; });
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('mousedown', (e) => { if (e.button === 2) { this.mouseR = true; this.lastDevice = 'kb'; } Audio.init(); });
    window.addEventListener('mouseup', (e) => { if (e.button === 2) this.mouseR = false; });
    window.addEventListener('touchstart', () => { if (!this.touchDevice) { this.touchDevice = true; Bus.emit('touchdetected'); } this.lastDevice = 'touch'; Audio.init(); }, { passive: true });
    try { this.touchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0 && matchMedia('(pointer: coarse)').matches); } catch (e) {}
    this.initTouch();
  },
  initTouch() {
    const joy = document.getElementById('joy'), knob = document.getElementById('joy-knob');
    const setKnob = () => { knob.style.transform = `translate(${this.joy.x * 70}%, ${this.joy.y * 70}%)`; };
    const move = (e) => {
      const r = joy.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, rad = r.width / 2;
      let dx = (e.clientX - cx) / rad, dy = (e.clientY - cy) / rad;
      const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; }
      this.joy.x = dx; this.joy.y = dy; setKnob();
    };
    joy.addEventListener('pointerdown', (e) => { e.preventDefault(); this.joy.active = true; this.joy.id = e.pointerId; try { joy.setPointerCapture(e.pointerId); } catch (er) {} move(e); this.lastDevice = 'touch'; Audio.init(); });
    joy.addEventListener('pointermove', (e) => { if (this.joy.active && e.pointerId === this.joy.id) move(e); });
    const end = (e) => { if (e.pointerId === this.joy.id) { this.joy.active = false; this.joy.x = this.joy.y = 0; setKnob(); } };
    joy.addEventListener('pointerup', end); joy.addEventListener('pointercancel', end);
    const bind = (id, name) => {
      const el = document.getElementById(id);
      el.addEventListener('pointerdown', (e) => { e.preventDefault(); this.virt[name] = true; el.classList.add('on'); try { el.setPointerCapture(e.pointerId); } catch (er) {} this.lastDevice = 'touch'; Audio.init(); });
      const up = (e) => { this.virt[name] = false; el.classList.remove('on'); };
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
      // parmak düğmeden kayarsa: Güt'te ıslığı iptal eder
      el.addEventListener('pointerleave', (e) => { if (name === 'gut' && this.virt.gut && e.pointerType === 'touch') { this.virt.cancelGut = true; } });
    };
    bind('tb-bakis', 'bakis'); bind('tb-gut', 'gut'); bind('tb-etk', 'interact');
  },
  pollPad() {
    this.padCur = {};
    let pads = null;
    try { pads = navigator.getGamepads ? navigator.getGamepads() : null; } catch (e) { pads = null; }
    if (!pads) return;
    for (const p of pads) {
      if (!p || !p.connected) continue;
      const b = (i) => p.buttons[i] && (p.buttons[i].pressed || p.buttons[i].value > 0.4);
      const ax = p.axes[0] || 0, ay = p.axes[1] || 0, ry = p.axes[3] || 0;
      const P = this.padCur;
      P.ax = Math.abs(ax) > 0.2 ? ax : 0; P.ay = Math.abs(ay) > 0.2 ? ay : 0;
      P.up = b(12); P.down = b(13); P.left = b(14); P.right = b(15);
      P.interact = b(0); P.confirm = b(0); P.cancel = b(1); P.gut = b(2); P.sprint = b(4); P.bakis = b(6); P.hint = b(8); P.menu = b(9);
      P.lookup = ry < -0.5;
      if (Object.keys(P).some((k) => P[k] === true) || P.ax || P.ay) this.lastDevice = 'pad';
      break;
    }
  },
  update(dt) {
    this.pollPad();
    const now = performance.now();
    const P = this.padCur, K = this.keys, V = this.virt;
    this.prev = this.cur; const c = {};
    const simOn = (n) => this.sim[n] && this.sim[n] > now;
    for (const n of BUTTONS) c[n] = !!(K[n] || P[n] || V[n] || simOn(n));
    if (this.mouseR) c.bakis = true;
    // dokunmatik/klavye: Etkileşim ve Boşluk diyalogda "devam" da sayılır
    c.confirm = c.confirm || !!K.confirm2 || !!K.confirm3 || !!V.interact || simOn('interact');
    // eksen
    let ax = (c.right ? 1 : 0) - (c.left ? 1 : 0), ay = (c.down ? 1 : 0) - (c.up ? 1 : 0);
    let analog = Math.hypot(ax, ay) > 0 ? 1 : 0;
    if (this.joy.active) {
      const m = Math.hypot(this.joy.x, this.joy.y);
      if (m > 0.18) { ax = this.joy.x; ay = this.joy.y; analog = Math.min(1, m); if (m > 0.93) c.sprint = true; }
      if (this.joy.y < -0.55) c.up = true; if (this.joy.y > 0.55) c.down = true;
      if (this.joy.x < -0.55) c.left = true; if (this.joy.x > 0.55) c.right = true;
    }
    if (P.ax || P.ay) { ax = P.ax; ay = P.ay; analog = Math.min(1, Math.hypot(ax, ay)); if (ay < -0.55) c.up = true; if (ay > 0.55) c.down = true; }
    const m = Math.hypot(ax, ay); if (m > 1) { ax /= m; ay /= m; }
    this.axisX = ax; this.axisY = ay; this.analog = analog;
    if (V.cancelGut) { c.cancel = true; V.cancelGut = false; }
    // diyalogdan çıkarken basılı kalan tuş oyuna sızmasın
    for (const n in this.locks) { if (c[n]) c[n] = false; else delete this.locks[n]; }
    this.cur = c;
    for (const n of BUTTONS) this.held[n] = c[n] ? (this.held[n] || 0) + dt : 0;
  },
  down(n) { return !!this.cur[n]; },
  pressed(n) { return !!this.cur[n] && !this.prev[n]; },
  released(n) { return !this.cur[n] && !!this.prev[n]; },
  consume(n) { this.prev[n] = true; },
  locks: {},
  lock(names) { (names || ['gut', 'interact', 'confirm', 'bakis', 'hint']).forEach((n) => { this.locks[n] = true; this.cur[n] = false; }); },
  simulate(name, ms) { this.sim[name] = performance.now() + (ms || 100); },
  keyLabel(action) {
    const t = this.lastDevice === 'touch' || (this.touchDevice && this.lastDevice !== 'kb' && this.lastDevice !== 'pad');
    if (this.lastDevice === 'pad') return { interact: 'A', gut: 'X', bakis: 'LT', hint: 'View', look: 'LT+↑' }[action] || action;
    if (t) return { interact: 'Etkileşim', gut: 'Güt', bakis: 'Bakış', hint: 'Işık', look: 'Bakış+↑' }[action] || action;
    return { interact: 'E', gut: 'Boşluk', bakis: 'Shift', hint: 'H', look: 'Shift+↑' }[action] || action;
  },
};
