// ============================================================
// Ana döngü, açılış ve test arayüzü (window.KANDIL)
// ============================================================
let lastTs = 0, fpsAcc = 0, fpsN = 0;
function frame(ts) {
  const dt = Math.min(0.05, Math.max(0, (ts - (lastTs || ts)) / 1000));
  lastTs = ts;
  fpsAcc += dt; fpsN++;
  if (fpsAcc >= 1) { State.fps = Math.round(fpsN / fpsAcc); fpsAcc = 0; fpsN = 0; }
  try {
    Input.update(dt);
    if (State.started && !UI.menuOpen && !UI.cardActive && Input.pressed('menu') && !Player.charging) { UI.openPause(); Input.consume('menu'); }
    if (State.started && !UI.menuOpen && Input.pressed('hint') && !UI.blocking()) Hints.request();
    UI.update(dt);
    if (!State.paused) {
      State.time += dt;
      Scripts.update(dt);
      if (Scenes.current) Scenes.current.update(dt);
      Audio.update(dt);
    }
    if (Scenes.current) Scenes.current.draw(Gfx.g);
  } catch (e) {
    console.error(e);
  }
  requestAnimationFrame(frame);
}

function boot() {
  try { State.muted = !!Store.get('muted', false); } catch (e) {}
  buildArt();
  Gfx.init();
  Input.init();
  UI.init();
  Bus.on('start', () => {
    Audio.init();
    State.started = true;
    resetGame();
    Scenes.goto('acilis');
  });
  // Yeniden başlat: süren geçiş ve betikler zorla bitirilir, sahne anında değişir
  // (menü bir karartmanın ortasında açılmış olsa bile eski geçiş geri gelmez)
  Bus.on('restart', () => {
    Scripts.kill(); Scenes.busy = false;
    UI.closeHint(); UI.clearBark(); UI.fade(1, 0);
    resetGame();
    KW.built = false; KW.stage = null; KW.gateClosed = false;
    State.paused = false;
    Scenes.goto('acilis', { instant: true });
  });
  // sekme/uygulama arka plana geçince: ses susar ve oyun duraklar
  document.addEventListener('visibilitychange', () => {
    try {
      if (document.hidden) { if (Audio.ctx) Audio.ctx.suspend().catch(() => {}); if (State.started && !UI.menuOpen) UI.openPause(); }
      else if (Audio.ctx) Audio.ctx.resume().catch(() => {});
    } catch (e) {}
  });
  Scenes.goto('baslik', { instant: true });
  requestAnimationFrame(frame);
}

// ---------------- test ve hata ayıklama arayüzü ----------------
window.KANDIL = {
  state: State,
  debug: {
    goto(id) {
      if (!Scenes.defs[id]) throw new Error('bilinmeyen sahne: ' + id);
      if (UI.menuOpen) UI.closeMenu();
      State.started = true; Audio.init();
      Scenes.busy = false;
      Scenes.goto(id, { instant: true });
      return id;
    },
    skipPuzzle() { const s = Scenes.current; if (s && s.skip) { s.skip(); return true; } return false; },
    setFlag(k, v) { State.flags[k] = v; return State.flags[k]; },
    listScenes() { return ['acilis', 'cerceve_giris', 'yamac_ogretim', 'meleyen_ses', 'isigin_ardindan', 'agil_basinda', 'mujde', 'haydi_beytlehem', 'patika', 'hangi_kapi', 'yemlik', 'avlu', 'yanki', 'tablo1', 'tablo2', 'cerceve_kapanis', 'son']; },
    simulate(inputName, ms) { Input.simulate(inputName, ms); return true; },
    // yardımcılar (testler için)
    scene() { return State.sceneId; },
    ui() { return { dialog: UI.dlg.active, choice: UI.ch.active, choiceArmed: UI.ch.active && !(UI.ch.armT > 0) && !UI.ch.needRelease, card: UI.cardActive, menu: UI.menuOpen, menuKind: UI.menuKind, menuSel: UI.menuSel, prompt: $('prompt').classList.contains('hidden') ? null : $('prompt').textContent, bark: UI.bk.t > 0 ? UI.bk.text : null, fade: UI.fadeA, busy: Scenes.busy, hint: UI.hint.open ? $('hintpanel').innerText : null, touchMode: UI.touchMode }; },
    advance() {
      if (UI.cardActive) { const b = $('card').querySelector('button'); if (b) b.click(); else UI.closeCard(); return 'card'; }
      if (UI.ch.active) { UI.pick(0, true); return 'choice'; }
      if (UI.dlg.active) { UI.advance(true); return 'dialog'; }
      return null;
    },
    choose(i) { if (UI.ch.active) { UI.pick(i, true); return true; } return false; },
    world() {
      const id = State.sceneId;
      const P = Player.a;
      const out = { scene: id, tamar: P ? { x: +P.x.toFixed(2), y: +P.y.toFixed(2) } : null, focus: Player.focus ? (typeof Player.focus.label === 'function' ? Player.focus.label() : Player.focus.label) : null };
      if (KW.built && ['yamac_ogretim', 'meleyen_ses', 'isigin_ardindan', 'agil_basinda', 'haydi_beytlehem', 'yanki'].includes(id)) {
        out.father = { x: +KW.father.x.toFixed(2), y: +KW.father.y.toFixed(2), stone: KW.father.stone, standing: !!KW.father.standing, walking: !!KW.father.path, lamp: KW.father.lamp };
        out.sheep = Flock.sheep.map((s) => ({ g: s.group, x: +s.x.toFixed(2), y: +s.y.toFixed(2), mode: s.mode, gathered: s.gathered, stuck: s.stuck, at: s.gatherAt, fold: s.inFold }));
        out.units = Flock.units.length;
        out.lamb = KW.lamb ? { x: KW.lamb.x, y: KW.lamb.y, mode: KW.lamb.mode, visible: KW.lamb.visible } : null;
        out.gate = !!KW.gateClosed;
        out.carry = { tamar: KW.tamar.carry, father: KW.father.carry };
      }
      return out;
    },
    fps() { return State.fps; },
    path(x, y) { if (!Player.map || !Player.a) return null; return Player.map.findPath(Player.a.x, Player.a.y, x, y); },
    hint() { Hints.request(); return { level: Hints.level, ctx: Hints.ctx }; },
    // testler için: geçerli sahnenin seçili alanları ve ekrandaki ses dalgaları
    sceneState(keys) { const s = Scenes.current || {}, o = {}; (keys || []).forEach((k) => { o[k] = s[k]; }); return JSON.parse(JSON.stringify(o)); },
    ripples() { return Ripples.list.map((r) => ({ x: +r.x.toFixed(2), y: +r.y.toFixed(2), kind: r.kind })); },
    dialogIndex() { return UI.dlg.active ? UI.dlg.i : -1; },
  },
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
