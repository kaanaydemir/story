// KANDİL — Bölüm 1 prototipi: uçtan uca oynanış testi (Playwright, node)
// Çalıştırma:  NODE_PATH=$(npm root -g) node tests/playthrough.js
// Kuzu ve sürü bulmacaları (ve öğretim, kapı, patika) gerçek klavye girdisiyle oynanır;
// sahne geçişleri ve diyaloglar gerçek tuşlarla ilerletilir. Her sahnenin ekran görüntüsü
// tests/screens/ altına kaydedilir. Ayrıca 400×800 dikey dokunmatik görünüm, yatay telefon
// ve korumalı (sandbox) iframe içinde açılış sınanır.
const path = require('path');
const fs = require('fs');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('playwright-core')); }

const ROOT = path.resolve(__dirname, '..');
const URL = 'file://' + path.join(ROOT, 'dist', 'bolum1.html');
const OUT = path.join(__dirname, 'screens');
fs.mkdirSync(OUT, { recursive: true });

const errors = [];
const results = [];
function ok(name, cond, extra) { results.push({ name, ok: !!cond, extra }); console.log((cond ? 'TAMAM ' : 'HATA  ') + name + (extra ? ' — ' + extra : '')); }

async function launch() {
  try { return await chromium.launch(); } catch (e) { return await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); }
}
function watch(page, tag) {
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${tag}] console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`[${tag}] pageerror: ${e.message}`));
}
const sleep = (page, ms) => page.waitForTimeout(ms);
const W = (page) => page.evaluate(() => KANDIL.debug.world());
const scene = (page) => page.evaluate(() => KANDIL.debug.scene());
const ui = (page) => page.evaluate(() => KANDIL.debug.ui());
let shotN = 0;
async function shot(page, name) { shotN++; const f = path.join(OUT, String(shotN).padStart(2, '0') + '_' + name + '.png'); await page.screenshot({ path: f }); return f; }

// ---------- gerçek klavye ile gezinme ----------
const ARROWS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
async function setKeys(page, want, st) {
  for (const k of ARROWS) {
    const on = want.includes(k);
    if (on && !st[k]) { await page.keyboard.down(k); st[k] = true; }
    if (!on && st[k]) { await page.keyboard.up(k); st[k] = false; }
  }
}
async function stepTo(page, x, y, tol, timeout) {
  const st = {}; const t0 = Date.now(); let last = null, stall = 0;
  while (Date.now() - t0 < timeout) {
    const w = await W(page);
    if (!w.tamar) break;
    const dx = x - w.tamar.x, dy = y - w.tamar.y;
    if (Math.hypot(dx, dy) < tol) break;
    const want = [];
    if (dx > 0.12) want.push('ArrowRight'); if (dx < -0.12) want.push('ArrowLeft');
    if (dy > 0.12) want.push('ArrowDown'); if (dy < -0.12) want.push('ArrowUp');
    await setKeys(page, want, st);
    if (last && Math.hypot(last.x - w.tamar.x, last.y - w.tamar.y) < 0.01) stall++; else stall = 0;
    if (stall > 30) break;
    last = w.tamar;
    await sleep(page, 35);
  }
  await setKeys(page, [], st);
}
async function walkTo(page, x, y, tol = 0.35, timeout = 40000) {
  const p = await page.evaluate(([x, y]) => KANDIL.debug.path(x, y), [x, y]);
  if (!p) throw new Error('yol bulunamadı: ' + x + ',' + y);
  for (let i = 0; i < p.length; i++) await stepTo(page, p[i].x, p[i].y, i === p.length - 1 ? tol : 0.5, timeout);
  return (await W(page)).tamar;
}
async function waitFor(page, fn, arg, timeout = 30000, step = 150) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) { if (await page.evaluate(fn, arg)) return true; await sleep(page, step); }
  return false;
}
// diyalog/kart/seçenekleri gerçek tuşlarla ilerleterek bir koşulu bekler
async function pump(page, cond, timeout = 60000, choice = '1') {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    if (await cond()) return true;
    const u = await ui(page);
    if (u.choice) await page.keyboard.press('Digit' + choice);
    else if (u.card || u.dialog) await page.keyboard.press('Enter');
    await sleep(page, 220);
  }
  return false;
}
const inScene = (page, id) => async () => (await scene(page)) === id;
async function tap(page, key) { await page.keyboard.press(key); await sleep(page, 120); }

// ============================================================
async function desktopRun(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  watch(page, 'masaüstü');
  await page.goto(URL);
  await sleep(page, 1200);
  ok('KANDIL arayüzü var', await page.evaluate(() => !!(window.KANDIL && KANDIL.debug && KANDIL.state)));
  const scenes = await page.evaluate(() => KANDIL.debug.listScenes());
  ok('sahne listesi', scenes.length >= 15, scenes.join(', '));
  await shot(page, 'baslik');
  // Başla (gerçek tıklama)
  await page.getByRole('button', { name: 'Başla' }).click();
  await waitFor(page, () => KANDIL.debug.scene() === 'acilis', null, 5000);
  await sleep(page, 1600);
  await shot(page, 'acilis_notu');
  ok('çerçeve girişi', await pump(page, inScene(page, 'cerceve_giris'), 20000));
  await sleep(page, 2600);
  await shot(page, 'cerceve_giris');
  // ---- Sahne 2: Ustayı izle (gerçek girdi) ----
  ok('yamaç: öğretim', await pump(page, inScene(page, 'yamac_ogretim'), 40000));
  await sleep(page, 4500);
  await shot(page, 'yamac_alacakaranlik');
  // adım 1: babanın gösterisi ve sözü
  await pump(page, async () => (await ui(page)).prompt && (await ui(page)).prompt.includes('değnek'), 30000);
  for (let i = 0; i < 10; i++) {
    const w = await W(page);
    const K1 = w.sheep.filter((s) => s.g === 'K1');
    if (K1.every((s) => Math.hypot(s.x - 12, s.y - 5) <= 3)) break;
    const far = K1.filter((s) => Math.hypot(s.x - 12, s.y - 5) > 3);
    const cx = far.reduce((a, s) => a + s.x, 0) / far.length, cy = far.reduce((a, s) => a + s.y, 0) / far.length;
    const ang = Math.atan2(5 - cy, 12 - cx);
    const tx = Math.min(30.5, Math.max(0.6, cx - Math.cos(ang) * 2.4)), ty = Math.min(8.8, Math.max(1.2, cy - Math.sin(ang) * 2.4));
    try { await walkTo(page, tx, ty, 0.3); } catch (e) { continue; }
    // yüzünü Orta taşa çevir (çapraz da olabilir)
    const keys = [];
    if (Math.cos(ang) > 0.38) keys.push('ArrowRight'); if (Math.cos(ang) < -0.38) keys.push('ArrowLeft');
    if (Math.sin(ang) > 0.38) keys.push('ArrowDown'); if (Math.sin(ang) < -0.38) keys.push('ArrowUp');
    for (const k of keys) await page.keyboard.down(k);
    await sleep(page, 50);
    for (const k of keys) await page.keyboard.up(k);
    await tap(page, 'Space'); await sleep(page, 200); await tap(page, 'Space');
    await sleep(page, 4500);
  }
  await shot(page, 'yamac_degnek');
  // adım 2: kayanın arkasındaki koyun — ıslık
  await pump(page, async () => { const w = await W(page); return w.father && !w.father.walking && Math.abs(w.father.x - 13.6) < 0.5; }, 30000);
  await pump(page, async () => !(await ui(page)).dialog, 10000);
  await walkTo(page, 14.2, 9.4, 0.4);
  await page.keyboard.down('Space'); await sleep(page, 650); await shot(page, 'yamac_islik_menzili'); await page.keyboard.up('Space');
  await sleep(page, 5000);
  // adım 3: Orta taşa çağır
  await pump(page, async () => { const w = await W(page); return w.father && !w.father.walking && Math.abs(w.father.x - 3.7) < 0.3; }, 30000);
  await pump(page, async () => !(await ui(page)).dialog, 10000);
  await walkTo(page, 12.6, 5.9, 0.4);
  await tap(page, 'KeyE');
  // adım 4: baş kaldırma (Bakış + ↑)
  await pump(page, async () => { const u = await ui(page); return u.prompt && u.prompt.includes('Başını'); }, 30000);
  await page.keyboard.down('Shift'); await page.keyboard.down('ArrowUp');
  await sleep(page, 2000); await shot(page, 'yamac_yedi_yildiz'); await sleep(page, 900);
  await page.keyboard.up('ArrowUp'); await page.keyboard.up('Shift');
  const teachOk = await pump(page, inScene(page, 'meleyen_ses'), 60000);
  ok('öğretim tamamlandı → Meleyen Ses', teachOk);
  if (!teachOk) { await page.evaluate(() => KANDIL.debug.goto('meleyen_ses')); await sleep(page, 800); }
  // ---- Sahne 3: Meleyen Ses (gerçek girdi) ----
  await sleep(page, 1500);
  await page.keyboard.down('Shift');
  await waitFor(page, () => true, null, 100);
  await sleep(page, 5200);
  await shot(page, 'kuzu_bakis_dalgalari');
  await page.keyboard.up('Shift');
  await walkTo(page, 20, 1.4, 0.35);
  await page.keyboard.down('Shift'); await sleep(page, 200); await page.keyboard.down('ArrowUp'); await sleep(page, 1800);
  await shot(page, 'kuzu_bas_kaldir');
  await page.keyboard.up('ArrowUp'); await page.keyboard.up('Shift');
  await tap(page, 'KeyE');
  ok('basamaklardan tırmandı', await waitFor(page, () => KANDIL.debug.world().tamar.y < 0, null, 6000));
  await sleep(page, 400);
  await tap(page, 'KeyE');
  await sleep(page, 2500);
  await shot(page, 'kuzu_kurtarma');
  ok('kuzu yünü (kaçırılamaz)', await waitFor(page, () => KANDIL.state.flags.kol_b01_kuzu_yunu, null, 8000));
  ok('Işığın Ardından başladı', await pump(page, inScene(page, 'isigin_ardindan'), 40000));
  // ---- Sahne 4: Işığın Ardından (gerçek girdi; referans çözüm: 1 ıslık, 6 çağrı) ----
  await sleep(page, 1500);
  await shot(page, 'suru_baslangic');
  await tap(page, 'Space'); await sleep(page, 250); await tap(page, 'Space');
  ok('iki değnek vuruşu: baba kandili kaldırdı', await waitFor(page, () => { const f = KANDIL.debug.world().father; return f.standing && f.lamp && f.lamp.raised; }, null, 5000));
  ok('K1 kendiliğinden geldi', await waitFor(page, () => KANDIL.debug.world().sheep.filter((s) => s.g === 'K1').every((s) => s.gathered), null, 20000));
  await walkTo(page, 21, 7, 0.3);
  await page.keyboard.down('Shift'); await sleep(page, 2500); await shot(page, 'suru_karanlikta_cift_dalga'); await page.keyboard.up('Shift');
  await page.keyboard.down('Space'); await sleep(page, 700); await shot(page, 'suru_islik'); await page.keyboard.up('Space');
  const STN = { T1: [3, 7], T2: [12, 5], T3: [3, 14], T5: [11, 17], T6: [16, 24], T7: [8, 26], T8: [5, 33] };
  const gathered = (id) => { const S = { T1: [3, 7], T2: [12, 5], T3: [3, 14], T5: [11, 17], T6: [16, 24], T7: [8, 26], T8: [5, 33] }[id]; const w = KANDIL.debug.world(); if (w.scene !== 'isigin_ardindan') return true; return w.units === 0 && w.sheep.every((s) => s.gathered && !s.stuck && s.at && Math.abs(s.at.x - S[0]) < 0.01 && Math.abs(s.at.y - S[1]) < 0.01 && Math.hypot(s.x - S[0], s.y - S[1]) < 3.4); };
  ok('tek ıslıkla K2 ve K3 Orta taşta', await waitFor(page, gathered, 'T2', 60000));
  for (const id of ['T1', 'T3', 'T5', 'T6', 'T7', 'T8']) {
    const [x, y] = STN[id];
    await walkTo(page, x + 0.9, y + 0.6, 0.4);
    await tap(page, 'KeyE');
    const g = await waitFor(page, gathered, id, 45000);
    ok('sürü ' + id + ' taşında toplandı', g);
    if (id === 'T3' || id === 'T6') await shot(page, 'suru_' + id);
    if (!g) break;
  }
  ok('imza bulmaca bitti → Ağıl başında', await waitFor(page, () => KANDIL.debug.scene() === 'agil_basinda', null, 8000));
  ok('usta_b01_iki_islik', await page.evaluate(() => KANDIL.state.flags.usta_b01_iki_islik === true));
  // ---- Sahne 5: Ağıl başında ----
  await sleep(page, 6000);
  await shot(page, 'agil_sayim');
  await pump(page, async () => { const w = await W(page); return w.focus !== undefined && (await page.evaluate(() => KANDIL.state.sceneId)) === 'agil_basinda' && (await page.evaluate(() => !!(document.getElementById('objective').classList.contains('hidden') ? '' : document.getElementById('objective').textContent).includes('Ateş'))); }, 60000);
  await walkTo(page, 6.6, 32.4, 0.4); await tap(page, 'KeyE');
  ok('sapan (hatıra)', await waitFor(page, () => KANDIL.state.flags.kol_b01_sapan, null, 3000));
  await walkTo(page, 9.1, 32.6, 0.4);
  await shot(page, 'agil_ates');
  await tap(page, 'KeyE');
  // ---- Sahne 6: Müjde (dokunmama; tek girdi başını kaldırmak) ----
  ok('Müjde', await waitFor(page, () => KANDIL.debug.scene() === 'mujde', null, 10000));
  await sleep(page, 4200);
  await shot(page, 'mujde_isik');
  await waitFor(page, () => { const u = KANDIL.debug.ui(); return u.prompt && u.prompt.includes('başını'); }, null, 40000);
  await shot(page, 'mujde_gok_ordusu');
  await page.keyboard.down('ArrowUp'); await sleep(page, 400); await page.keyboard.up('ArrowUp');
  await sleep(page, 3200);
  await shot(page, 'mujde_bas_kaldirdi');
  ok('Haydi Beytlehem\'e', await waitFor(page, () => KANDIL.debug.scene() === 'haydi_beytlehem', null, 40000));
  // ---- Sahne 7: kuzu (ifade) ----
  await pump(page, async () => !!(await page.evaluate(() => (document.getElementById('objective').classList.contains('hidden') ? '' : document.getElementById('objective').textContent).includes('Kuzuyu'))), 40000);
  await shot(page, 'haydi_kandil_tamarda');
  const lamb = (await W(page)).lamb;
  await walkTo(page, lamb.x + 0.6, lamb.y, 0.5); await tap(page, 'KeyE');
  await walkTo(page, 5, 35.2, 0.4);
  ok('kuzu kucakta ağıla (b01_ifade_kuzu)', await waitFor(page, () => KANDIL.state.flags.b01_ifade_kuzu === 'kucakta', null, 5000));
  ok('Patika', await waitFor(page, () => KANDIL.debug.scene() === 'patika', null, 15000));
  // ---- Sahne 8: Patika (gerçek girdi) ----
  await sleep(page, 1200);
  await walkTo(page, 30, 12.5, 0.6, 60000);
  await shot(page, 'patika');
  await walkTo(page, 61.5, 4.5, 0.6, 60000);
  ok('Hangi Kapı?', await waitFor(page, () => KANDIL.debug.scene() === 'hangi_kapi', null, 10000));
  // ---- Sahne 9: Hangi Kapı? (gerçek girdi) ----
  await sleep(page, 1500);
  await walkTo(page, 17, 9.4, 0.4);
  await tap(page, 'KeyE');
  await sleep(page, 400);
  ok('önce bak kuralı (Bakış olmadan çalınmaz)', !(await ui(page)).dialog);
  await page.keyboard.down('Shift'); await sleep(page, 1200); await shot(page, 'kapi_bakis_ev2'); await page.keyboard.up('Shift');
  await tap(page, 'KeyE');
  await pump(page, async () => (await page.evaluate(() => KANDIL.state.flags.b01_uyanan_ev)) >= 1, 20000);
  ok('yanlış kapı: b01_uyanan_ev = 1', (await page.evaluate(() => KANDIL.state.flags.b01_uyanan_ev)) === 1);
  await pump(page, async () => !(await ui(page)).dialog, 8000);
  await walkTo(page, 15.4, 12.6, 0.4);
  await page.keyboard.down('Shift'); await sleep(page, 900);
  await walkTo(page, 11.6, 17.4, 0.4);
  await sleep(page, 800); await shot(page, 'kapi_ev4_ipuclari'); await page.keyboard.up('Shift');
  await walkTo(page, 10, 17.1, 0.4);
  await tap(page, 'KeyE');
  ok('Yemlik', await pump(page, inScene(page, 'yemlik'), 25000));
  // ---- Sahne 10: Yemlik (dokunmama: yalnızca yaklaş ve çömel) ----
  await sleep(page, 6500);
  await page.keyboard.down('ArrowRight'); await sleep(page, 4500); await page.keyboard.up('ArrowRight');
  await tap(page, 'KeyE');
  await sleep(page, 1500);
  await shot(page, 'yemlik_comel');
  ok('Avluda', await pump(page, inScene(page, 'avlu'), 60000));
  // ---- Sahne 11: Avluda ----
  await pump(page, async () => !(await ui(page)).dialog && (await page.evaluate(() => (document.getElementById('objective').classList.contains('hidden') ? '' : document.getElementById('objective').textContent).length > 0)), 20000);
  await page.keyboard.down('Shift'); await sleep(page, 1000); await shot(page, 'avlu_dinleyenler'); await page.keyboard.up('Shift');
  await walkTo(page, 38.5, 19.8, 0.5);
  await page.keyboard.down('Shift'); await sleep(page, 2500); await page.keyboard.up('Shift');
  ok('Yankı', await pump(page, inScene(page, 'yanki'), 40000));
  // ---- Sahne 12: Yankı — seçim (Koşup anlat) ----
  await pump(page, async () => (await ui(page)).choice, 30000);
  await waitFor(page, () => KANDIL.debug.ui().choiceArmed, null, 4000);
  await shot(page, 'yanki_secim');
  await tap(page, 'Digit1');
  ok('Tablo 1', await pump(page, inScene(page, 'tablo1'), 40000));
  ok('b01_haber = koye, eks_soz = +1', await page.evaluate(() => KANDIL.state.flags.b01_haber === 'koye' && KANDIL.state.flags.eks_soz === 1));
  await sleep(page, 1500); await shot(page, 'tablo1');
  ok('Tablo 2', await pump(page, inScene(page, 'tablo2'), 30000));
  await sleep(page, 9000); await shot(page, 'tablo2_rama');
  ok('Çerçeve kapanışı', await pump(page, inScene(page, 'cerceve_kapanis'), 60000));
  await pump(page, async () => !(await ui(page)).dialog, 30000);
  await sleep(page, 2500); await shot(page, 'cerceve_dokuma_bandi');
  ok('Son kart', await pump(page, inScene(page, 'son'), 30000));
  await sleep(page, 1500);
  const card = await page.evaluate(() => document.getElementById('card').innerText);
  ok('bitiş kartı: "Bölüm 1 — Yıldızın Altında"', card.includes('Bölüm 1 — Yıldızın Altında'), card.split('\n')[0]);
  ok('bitiş kartında "Yeniden oyna"', card.includes('Yeniden oyna'));
  await shot(page, 'son_kart');
  // pause menüsü
  const fps = await page.evaluate(() => KANDIL.debug.fps());
  ok('kare hızı ölçüldü', fps > 0, fps + ' fps (başsız tarayıcı)');
  // ---- debug ile kalan sahne ekranları (diğer seçim dalları dahil) ----
  for (const id of ['mujde']) { await page.evaluate((s) => KANDIL.debug.goto(s), id); await sleep(page, 9000); await shot(page, 'debug_' + id); }
  await page.evaluate(() => KANDIL.debug.goto('isigin_ardindan'));
  await sleep(page, 800);
  await page.keyboard.press('Escape'); await sleep(page, 500);
  ok('duraklatma menüsü', (await ui(page)).menu);
  await shot(page, 'duraklatma_menusu');
  await page.keyboard.press('Escape'); await sleep(page, 300);
  // Üç Işık
  await page.keyboard.press('KeyH'); await sleep(page, 300);
  const h1 = await page.evaluate(() => document.getElementById('hintpanel').innerText);
  ok('Üç Işık 1 (bölüm metni)', h1.includes('Karanlıkta değneğimi görmüyorlar'), h1.split('\n')[0]);
  await page.keyboard.press('KeyH'); await sleep(page, 200); await page.keyboard.press('KeyH'); await sleep(page, 300);
  const h3 = await page.evaluate(() => document.getElementById('hintpanel').innerText);
  ok('Üç Işık 3 + "Hikâyeye devam"', h3.includes('Hikâyeye devam'));
  await shot(page, 'uc_isik');
  // "Babam halleder" (Hikâye kipi) zinciri sonuna kadar yürür
  await page.getByRole('button', { name: 'Hikâyeye devam' }).click();
  ok('Hikâye kipi: baba zinciri yürür', await waitFor(page, () => KANDIL.debug.scene() === 'agil_basinda', null, 180000, 500));
  await ctx.close();
}

// ============================================================
async function portraitRun(browser) {
  const ctx = await browser.newContext({ viewport: { width: 400, height: 800 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  watch(page, 'dikey-dokunmatik');
  await page.goto(URL);
  await sleep(page, 1200);
  await shot(page, 'dikey_baslik');
  await page.getByRole('button', { name: 'Başla' }).tap();
  await sleep(page, 1200);
  ok('dikey: dokunmatik kontroller görünür', await page.evaluate(() => !document.getElementById('touch').classList.contains('hidden')));
  await page.evaluate(() => KANDIL.debug.goto('isigin_ardindan'));
  await sleep(page, 1500);
  const L = await page.evaluate(() => {
    const r = (id) => document.getElementById(id).getBoundingClientRect();
    return { stage: r('stage'), joy: r('joy'), gut: r('tb-gut'), etk: r('tb-etk'), bakis: r('tb-bakis'), vw: innerWidth, vh: innerHeight, sh: document.scrollingElement.scrollHeight, sw: document.scrollingElement.scrollWidth };
  });
  const inside = (b) => b.left >= -1 && b.top >= -1 && b.right <= L.vw + 1 && b.bottom <= L.vh + 1;
  ok('dikey: sayfa kaymıyor', L.sh <= L.vh && L.sw <= L.vw, `${L.sw}×${L.sh} / ${L.vw}×${L.vh}`);
  ok('dikey: oyun genişliğe ölçekli', L.stage.width >= L.vw - 2 && L.stage.top >= 0, `sahne ${Math.round(L.stage.width)}×${Math.round(L.stage.height)}`);
  ok('dikey: kontroller oyunun altında', L.joy.top >= L.stage.bottom - 1 && L.gut.top >= L.stage.bottom - 1);
  ok('dikey: düğmeler ekranda', inside(L.joy) && inside(L.gut) && inside(L.etk) && inside(L.bakis));
  // dokunmatik Güt: iki dokunuş → baba kalkar
  await page.tap('#tb-gut'); await sleep(page, 250); await page.tap('#tb-gut');
  ok('dikey: Güt düğmesi (iki değnek) babayı kaldırır', await waitFor(page, () => KANDIL.debug.world().father.standing, null, 4000));
  // sanal çubuk: CDP ile sürükle
  const cdp = await ctx.newCDPSession(page);
  const jx = L.joy.left + L.joy.width / 2, jy = L.joy.top + L.joy.height / 2;
  const before = (await W(page)).tamar;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: jx, y: jy, id: 1 }] });
  for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: jx + i * 8, y: jy, id: 1 }] }); await sleep(page, 30); }
  await sleep(page, 900);
  await shot(page, 'dikey_suru_dokunmatik');
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const after = (await W(page)).tamar;
  ok('dikey: sanal çubuk Tamar\'ı yürütür', after.x > before.x + 0.5, `${before.x} → ${after.x}`);
  await page.evaluate(() => KANDIL.debug.goto('hangi_kapi')); await sleep(page, 2500);
  await shot(page, 'dikey_beytlehem');
  await page.evaluate(() => KANDIL.debug.goto('cerceve_giris')); await sleep(page, 3500);
  await shot(page, 'dikey_diyalog');
  await ctx.close();
  // yatay telefon
  const ctx2 = await browser.newContext({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
  const p2 = await ctx2.newPage();
  watch(p2, 'yatay-telefon');
  await p2.goto(URL); await sleep(p2, 800);
  await p2.evaluate(() => KANDIL.debug.goto('meleyen_ses')); await sleep(p2, 2500);
  const L2 = await p2.evaluate(() => ({ s: document.getElementById('stage').getBoundingClientRect().toJSON(), sh: document.scrollingElement.scrollHeight, vh: innerHeight }));
  ok('yatay telefon: sahne sığıyor, kayma yok', L2.s.bottom <= L2.vh + 1 && L2.sh <= L2.vh, JSON.stringify({ w: Math.round(L2.s.width), h: Math.round(L2.s.height) }));
  await shot(p2, 'yatay_telefon');
  await ctx2.close();
}

// ============================================================
async function sandboxRun(browser) {
  const ctx = await browser.newContext({ viewport: { width: 960, height: 540 } });
  const page = await ctx.newPage();
  watch(page, 'sandbox-iframe');
  const html = fs.readFileSync(path.join(ROOT, 'dist', 'bolum1.html'), 'utf8');
  await page.setContent('<!doctype html><body style="margin:0;background:#222"><iframe id="f" sandbox="allow-scripts" style="width:960px;height:540px;border:0"></iframe></body>');
  await page.evaluate((h) => { document.getElementById('f').srcdoc = h; }, html);
  await sleep(page, 2500);
  const frame = page.frames().find((f) => f !== page.mainFrame());
  const hasK = frame ? await frame.evaluate(() => !!window.KANDIL) : false;
  ok('sandbox iframe (localStorage yok): oyun açılır', hasK);
  if (frame) { await frame.evaluate(() => KANDIL.debug.goto('patika')); await sleep(page, 2500); }
  await shot(page, 'sandbox_iframe');
  await ctx.close();
}

const REG = require('./regressions.js')({ ok, sleep, W, scene, ui, shot, walkTo, waitFor, pump, inScene, tap, URL, watch });

(async () => {
  const browser = await launch();
  const t0 = Date.now();
  const only = process.env.ONLY || '';
  try {
    if (!only || only === 'main') {
      await desktopRun(browser);
      await portraitRun(browser);
      await sandboxRun(browser);
    }
    if (!only || only === 'reg' || only === 'regtouch') { if (only !== 'regtouch') await REG.desktop(browser); await REG.touch(browser); }
  } catch (e) {
    ok('test akışı hatasız', false, e && e.stack ? e.stack.split('\n').slice(0, 3).join(' | ') : String(e));
  } finally {
    await browser.close();
  }
  ok('konsol hatası yok', errors.length === 0, errors.slice(0, 8).join(' || '));
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} denetim geçti · ${Math.round((Date.now() - t0) / 1000)} sn · ekran görüntüleri: ${OUT}`);
  process.exit(failed.length ? 1 : 0);
})();
