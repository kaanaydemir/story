// ============================================================
// Ses: tamamı WebAudio ile sentezlenir; ilk kullanıcı dokunuşundan
// sonra başlar. Oyun sessizken de baştan sona oynanabilir.
// ============================================================
const Audio = {
  ctx: null, master: null, sfx: null, amb: null, mus: null,
  noiseBuf: null, ok: false,
  windGain: null, windFilt: null, cricketOn: false, cricketT: 0,
  drone: null, tone: null, fireOn: false, fireT: 0,
  listenerX: 0,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {}); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      const c = this.ctx;
      this.master = c.createGain(); this.master.gain.value = State.muted ? 0 : 0.8; this.master.connect(c.destination);
      this.sfx = c.createGain(); this.sfx.gain.value = 0.9; this.sfx.connect(this.master);
      this.amb = c.createGain(); this.amb.gain.value = 0.5; this.amb.connect(this.master);
      this.mus = c.createGain(); this.mus.gain.value = 0.5; this.mus.connect(this.master);
      const len = c.sampleRate * 2, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.noiseBuf = b;
      this.startWind();
      this.ok = true;
    } catch (e) { this.ok = false; }
  },
  setMuted(m) {
    State.muted = m; Store.set('muted', m);
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 0.8, this.ctx.currentTime, 0.05);
  },
  now() { return this.ctx ? this.ctx.currentTime : 0; },
  panFor(x) { return clamp((x - this.listenerX) / 14, -1, 1); },
  out(pan, gain) {
    const c = this.ctx, g = c.createGain(); g.gain.value = gain == null ? 1 : gain;
    if (c.createStereoPanner && pan) { const p = c.createStereoPanner(); p.pan.value = pan; g.connect(p); p.connect(this.sfx); }
    else g.connect(this.sfx);
    return g;
  },
  noise(dur) { const s = this.ctx.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true; s.loopStart = Math.random(); return s; },
  env(g, t, a, d, peak) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  },
  // -------- ortam --------
  startWind() {
    const c = this.ctx, n = this.noise();
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 420; f.Q.value = 0.6;
    const g = c.createGain(); g.gain.value = 0.0;
    n.connect(f); f.connect(g); g.connect(this.amb); n.start();
    const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = 0.07; lg.gain.value = 180;
    lfo.connect(lg); lg.connect(f.frequency); lfo.start();
    this.windGain = g; this.windFilt = f;
  },
  setAmbience(o) {
    if (!this.ok) { this._pendingAmb = o; return; }
    const t = this.now();
    this.windGain.gain.setTargetAtTime(o.wind == null ? 0.12 : o.wind, t, 1.2);
    this.cricketOn = !!o.crickets;
    this.fireOn = !!o.fire;
  },
  update(dt) {
    if (!this.ok) return;
    if (this._pendingAmb) { const o = this._pendingAmb; this._pendingAmb = null; this.setAmbience(o); }
    if (this.cricketOn) {
      this.cricketT -= dt;
      if (this.cricketT <= 0) { this.cricketT = 0.6 + Math.random() * 1.8; this.cricket(); }
    }
    if (this.fireOn) {
      this.fireT -= dt;
      if (this.fireT <= 0) { this.fireT = 0.05 + Math.random() * 0.25; this.crackle(); }
    }
  },
  cricket() {
    const c = this.ctx, t = this.now(), pan = (Math.random() - 0.5) * 1.6;
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = 4200 + Math.random() * 600;
    const g = this.out(pan, 0.025);
    const eg = c.createGain(); eg.gain.value = 0; o.connect(eg); eg.connect(g);
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) { const s = t + i * 0.07; eg.gain.setValueAtTime(0, s); eg.gain.linearRampToValueAtTime(1, s + 0.01); eg.gain.linearRampToValueAtTime(0, s + 0.045); }
    o.start(t); o.stop(t + n * 0.07 + 0.05);
  },
  crackle() {
    const c = this.ctx, t = this.now(), n = this.noise();
    const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 1500 + Math.random() * 2000;
    const g = this.out((Math.random() - 0.5) * 0.4, 0.05 + Math.random() * 0.06);
    n.connect(f); f.connect(g); this.env(g, t, 0.002, 0.03 + Math.random() * 0.04, 1);
    n.start(t); n.stop(t + 0.1);
  },
  // -------- efektler --------
  bleat(kind, x, vol) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now(), pan = x == null ? 0 : this.panFor(x);
    const base = kind === 'kuzu' ? 760 : kind === 'ana' ? 250 : 330 + Math.random() * 80;
    const dur = kind === 'kuzu' ? 0.55 : kind === 'ana' ? 0.8 : 0.6;
    const parts = kind === 'ana' ? [0, 0.42] : [0];
    parts.forEach((off) => {
      const o = c.createOscillator(); o.type = 'sawtooth';
      const vib = c.createOscillator(), vg = c.createGain(); vib.frequency.value = kind === 'kuzu' ? 28 : 18; vg.gain.value = base * 0.06;
      vib.connect(vg); vg.connect(o.frequency);
      o.frequency.setValueAtTime(base * 1.05, t + off); o.frequency.linearRampToValueAtTime(base * 0.92, t + off + dur);
      const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = kind === 'kuzu' ? 1700 : 950; f.Q.value = 2.2;
      const peak = Math.max(0.001, (vol == null ? 0.35 : vol) * (kind === 'kuzu' ? 0.7 : 1));
      const g = this.out(pan, 0.0001);
      o.connect(f); f.connect(g);
      const d = off ? dur * 0.6 : dur;
      g.gain.setValueAtTime(0.0001, t + off); g.gain.exponentialRampToValueAtTime(peak, t + off + 0.05);
      g.gain.setValueAtTime(peak, t + off + d * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + off + d);
      o.start(t + off); vib.start(t + off); o.stop(t + off + d + 0.05); vib.stop(t + off + d + 0.05);
    });
  },
  whistle(x) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now(), o = c.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(1500, t); o.frequency.exponentialRampToValueAtTime(2300, t + 0.18);
    o.frequency.setValueAtTime(2300, t + 0.35); o.frequency.exponentialRampToValueAtTime(1900, t + 0.6);
    const vib = c.createOscillator(), vg = c.createGain(); vib.frequency.value = 7; vg.gain.value = 25; vib.connect(vg); vg.connect(o.frequency);
    const g = this.out(x == null ? 0 : this.panFor(x), 0.18); o.connect(g);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.04); g.gain.setValueAtTime(0.18, t + 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.68);
    o.start(t); vib.start(t); o.stop(t + 0.7); vib.stop(t + 0.7);
  },
  staff(x) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now(), pan = x == null ? 0 : this.panFor(x);
    const n = this.noise(), f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 1.5;
    const g = this.out(pan, 0.4); n.connect(f); f.connect(g); this.env(g, t, 0.002, 0.07, 1); n.start(t); n.stop(t + 0.1);
    const o = c.createOscillator(); o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(70, t + 0.12);
    const g2 = this.out(pan, 0.5); o.connect(g2); this.env(g2, t, 0.003, 0.12, 1); o.start(t); o.stop(t + 0.15);
  },
  step(x, soft) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now(), n = this.noise(), f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 700 + Math.random() * 300;
    const g = this.out(x == null ? 0 : this.panFor(x), soft ? 0.05 : 0.09); n.connect(f); f.connect(g); this.env(g, t, 0.004, 0.05, 1); n.start(t); n.stop(t + 0.08);
  },
  rustle(x) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now(), n = this.noise(), f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 2500;
    const g = this.out(x == null ? 0 : this.panFor(x), 0.12); n.connect(f); f.connect(g);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    n.start(t); n.stop(t + 0.75);
  },
  knock() {
    if (!this.ok) return;
    const c = this.ctx, t0 = this.now();
    [0, 0.22, 0.44].forEach((d) => {
      const t = t0 + d, o = c.createOscillator(); o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(90, t + 0.08);
      const g = this.out(0, 0.4); o.connect(g); this.env(g, t, 0.002, 0.1, 1); o.start(t); o.stop(t + 0.12);
      const n = this.noise(), f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900;
      const g2 = this.out(0, 0.2); n.connect(f); f.connect(g2); this.env(g2, t, 0.001, 0.04, 1); n.start(t); n.stop(t + 0.06);
    });
  },
  chime() { // yumuşak onay (hatıra nesnesi değil; yalnızca bulmaca adımları)
    if (!this.ok) return;
    const c = this.ctx, t = this.now();
    [523.25, 659.25, 783.99].forEach((fq, i) => {
      const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = fq;
      const g = this.out(0, 0.07); o.connect(g); this.env(g, t + i * 0.09, 0.01, 0.9, 1); o.start(t + i * 0.09); o.stop(t + i * 0.09 + 1);
    });
  },
  ui() {
    if (!this.ok) return;
    const c = this.ctx, t = this.now(), o = c.createOscillator(); o.type = 'square'; o.frequency.value = 880;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1800;
    const g = this.out(0, 0.03); o.connect(f); f.connect(g); this.env(g, t, 0.002, 0.05, 1); o.start(t); o.stop(t + 0.07);
  },
  // -------- müzik katmanları (ezgisiz) --------
  setDrone(on, root) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now();
    if (on && !this.drone) {
      const g = c.createGain(); g.gain.value = 0.0001; g.connect(this.mus);
      const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 700; f.connect(g);
      const r = root || 110;
      const os = [r, r * 1.5, r * 2.003].map((fq, i) => { const o = c.createOscillator(); o.type = i ? 'sine' : 'triangle'; o.frequency.value = fq; o.connect(f); o.start(); return o; });
      g.gain.exponentialRampToValueAtTime(0.09, t + 4);
      this.drone = { g, os };
    } else if (!on && this.drone) {
      const d = this.drone; this.drone = null;
      d.g.gain.setTargetAtTime(0.0001, t, 1.2);
      setTimeout(() => { d.os.forEach((o) => { try { o.stop(); } catch (e) {} }); }, 6000);
    }
  },
  // İsa'nın sahnesinde ve müjdede: müzik çekilir, tek uzun ton kalır (GDD §2.2-A)
  setTone(on, freq, gain) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now();
    if (on && !this.tone) {
      const g = c.createGain(); g.gain.value = 0.0001; g.connect(this.mus);
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = freq || 220; o.connect(g); o.start();
      const o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.value = (freq || 220) * 2.0; const g2 = c.createGain(); g2.gain.value = 0.15; o2.connect(g2); g2.connect(g); o2.start();
      g.gain.exponentialRampToValueAtTime(gain || 0.07, t + 3);
      this.tone = { g, os: [o, o2] };
    } else if (!on && this.tone) {
      const d = this.tone; this.tone = null;
      d.g.gain.setTargetAtTime(0.0001, t, 0.8);
      setTimeout(() => { d.os.forEach((o) => { try { o.stop(); } catch (e) {} }); }, 5000);
    }
  },
  // Müjde: geniş, parlak, sözsüz ton kümesi (nevel armonikleri); gök ordusu: ezgisiz yükseliş
  cluster(on) {
    if (!this.ok) return;
    const c = this.ctx, t = this.now();
    if (on && !this._cluster) {
      const g = c.createGain(); g.gain.value = 0.0001; g.connect(this.mus);
      const os = [196, 293.66, 392, 587.33, 783.99].map((fq, i) => {
        const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = fq * (1 + (i - 2) * 0.0015);
        const gg = c.createGain(); gg.gain.value = 0.25 / (i + 1); o.connect(gg); gg.connect(g); o.start(); return o;
      });
      g.gain.exponentialRampToValueAtTime(0.12, t + 2.5);
      this._cluster = { g, os };
    } else if (!on && this._cluster) {
      const d = this._cluster; this._cluster = null;
      d.g.gain.setTargetAtTime(0.0001, t, 0.25);
      setTimeout(() => { d.os.forEach((o) => { try { o.stop(); } catch (e) {} }); }, 3000);
    }
  },
  rise() {
    if (!this.ok || !this._cluster) return;
    const t = this.now();
    this._cluster.os.forEach((o, i) => o.frequency.linearRampToValueAtTime(o.frequency.value * 1.5, t + 9 + i));
  },
  // Kaval: Mezmur 23 temasının yalın, kısa bir sunumu (ateş başında)
  kaval() {
    if (!this.ok) return;
    const c = this.ctx, t0 = this.now() + 0.1;
    const notes = [[293.66, 0.6], [329.63, 0.4], [349.23, 0.8], [329.63, 0.4], [293.66, 0.6], [261.63, 0.5], [293.66, 1.4]];
    let t = t0;
    notes.forEach(([fq, d]) => {
      const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = fq;
      const vib = c.createOscillator(), vg = c.createGain(); vib.frequency.value = 5; vg.gain.value = 3; vib.connect(vg); vg.connect(o.frequency);
      const n = this.noise(), nf = c.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = fq * 2; nf.Q.value = 8;
      const g = c.createGain(); g.connect(this.mus); const ng = c.createGain(); ng.gain.value = 0.15; n.connect(nf); nf.connect(ng); ng.connect(g);
      o.connect(g);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.08); g.gain.setValueAtTime(0.06, t + d * 0.75); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.start(t); vib.start(t); n.start(t); o.stop(t + d + 0.02); vib.stop(t + d + 0.02); n.stop(t + d + 0.02);
      t += d;
    });
  },
  // Tablo 2: uzakta tek bir ağıt sesi (çığlık yok) ve nötr, boğuk adım sesi
  lament() {
    if (!this.ok) return;
    const c = this.ctx, t = this.now() + 0.2;
    const o = c.createOscillator(); o.type = 'sawtooth';
    o.frequency.setValueAtTime(330, t); o.frequency.linearRampToValueAtTime(311, t + 1.5); o.frequency.linearRampToValueAtTime(294, t + 3); o.frequency.linearRampToValueAtTime(262, t + 4.5);
    const vib = c.createOscillator(), vg = c.createGain(); vib.frequency.value = 5.5; vg.gain.value = 6; vib.connect(vg); vg.connect(o.frequency);
    const f1 = c.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 800; f1.Q.value = 6;
    const f2 = c.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = 1400;
    const g = c.createGain(); g.gain.value = 0.0001; o.connect(f1); f1.connect(f2); f2.connect(g); g.connect(this.mus);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.8); g.gain.setValueAtTime(0.05, t + 3.6); g.gain.exponentialRampToValueAtTime(0.0001, t + 5);
    o.start(t); vib.start(t); o.stop(t + 5.1); vib.stop(t + 5.1);
  },
  march() {
    if (!this.ok) return;
    const c = this.ctx, t0 = this.now();
    for (let i = 0; i < 10; i++) {
      const t = t0 + i * 0.55, n = this.noise(), f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 220;
      const g = this.out(-0.3, 0.06 * (1 - Math.abs(i - 5) / 6)); n.connect(f); f.connect(g); this.env(g, t, 0.01, 0.12, 1); n.start(t); n.stop(t + 0.15);
    }
  },
};
