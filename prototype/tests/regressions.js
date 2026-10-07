// KANDİL — Bölüm 1: inceleme sonrası düzeltilen hataların gerileme testleri.
// playthrough.js tarafından çağrılır (tek başına: ONLY=reg node tests/playthrough.js).
// Her senaryo bir inceleme bulgusunu gerçek girdiyle yeniden üretir ve düzeltmeyi doğrular.

module.exports = function makeRegressions(h) {
  const { ok, sleep, W, scene, ui, shot, walkTo, waitFor, pump, inScene, tap, URL, watch } = h;
  const D = (page, fn, arg) => page.evaluate(fn, arg);
  const sceneState = (page, keys) => D(page, (k) => KANDIL.debug.sceneState(k), keys);

  async function restartViaMenu(page) {
    await page.keyboard.press('Escape'); await sleep(page, 250);
    for (let i = 0; i < 3; i++) { await page.keyboard.press('ArrowDown'); await sleep(page, 60); }
    await page.keyboard.press('Enter'); await sleep(page, 250); // onay ekranı: "Hayır" seçili
    await page.keyboard.press('ArrowDown'); await sleep(page, 60);
    await page.keyboard.press('Enter'); await sleep(page, 400);
  }
  async function hint3(page) { for (let i = 0; i < 3; i++) { await page.keyboard.press('KeyH'); await sleep(page, 160); } return (await ui(page)).hint || ''; }

  // ---------------------------------------------------------------
  async function desktop(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await ctx.newPage();
    watch(page, 'gerileme');
    await page.goto(URL);
    await sleep(page, 1000);

    // Başlık menüsü: "Ses" değiştirilince klavye seçimi yerinde kalır
    await page.keyboard.press('ArrowDown'); await sleep(page, 80); await page.keyboard.press('Enter'); await sleep(page, 200);
    const m1 = await ui(page);
    ok('menü: Ses değişince seçim yerinde kalır', m1.menu && m1.menuSel === 1, 'menuSel=' + m1.menuSel);
    await page.keyboard.press('Enter'); await sleep(page, 150); // sesi geri aç

    // Öğretim: sahne istemleri görünür; üç ışık sonrası "Hikâyeye devam" klavyeyle (Enter) çalışır
    await D(page, () => KANDIL.debug.goto('yamac_ogretim'));
    ok('öğretim: kuzu öğretimde görünmez', (await W(page)).lamb.visible === false);
    ok('öğretim: ağıl kapısı açık (yeniden başlatmada sıfırlanır)', (await W(page)).gate === false);
    ok('öğretim: "Güt: kısa bas — değnek" istemi görünür', await pump(page, async () => ((await ui(page)).prompt || '').includes('değnek'), 40000));
    let hx = await hint3(page);
    ok('öğretim: 3. ışıkta "Hikâyeye devam"', hx.includes('Hikâyeye devam'), hx.split('\n')[1]);
    await page.keyboard.press('Enter');
    ok('öğretim adım 2: ıslık istemi', await pump(page, async () => ((await ui(page)).prompt || '').includes('ıslık'), 40000));
    hx = await hint3(page); await page.keyboard.press('Enter');
    ok('öğretim adım 3: çağrı istemi', await pump(page, async () => ((await ui(page)).prompt || '').includes('Baba, buraya'), 40000));
    hx = await hint3(page); await page.keyboard.press('Enter');
    ok('öğretim adım 4: "Başını kaldır" istemi', await pump(page, async () => ((await ui(page)).prompt || '').includes('Başını'), 40000));
    await shot(page, 'reg_ogretim_bas_istemi');
    hx = await hint3(page); await page.keyboard.press('Enter');
    ok('öğretim yalnızca ışıklarla da biter → Meleyen Ses', await pump(page, inScene(page, 'meleyen_ses'), 60000));

    // Meleyen Ses: dalgalar — kalın dalga yalnızca anadan gelir
    await D(page, () => KANDIL.debug.goto('meleyen_ses'));
    await page.keyboard.down('Shift');
    const thick = [], thin = [];
    for (let i = 0; i < 60; i++) {
      const rs = await D(page, () => KANDIL.debug.ripples());
      rs.forEach((r) => (r.kind === 'thick' ? thick : thin).push(r.x + ',' + r.y));
      await sleep(page, 200);
    }
    await page.keyboard.up('Shift');
    const thickSet = [...new Set(thick)];
    ok('Meleyen Ses: kalın dalga yalnızca anada', thickSet.length > 0 && thickSet.every((k) => k === '25,2.5'), thickSet.join(' '));
    ok('Meleyen Ses: ince dalga (kuzu) var', thin.length > 0);
    // basamaklar başını kaldırmadan kullanılamaz
    await walkTo(page, 20, 1.4, 0.35);
    await sleep(page, 300);
    let w = await W(page);
    ok('Meleyen Ses: başını kaldırmadan tırmanma istemi yok', w.focus === null, String(w.focus));
    await tap(page, 'KeyE'); await sleep(page, 800);
    ok('Meleyen Ses: başını kaldırmadan E tırmandırmaz', (await W(page)).tamar.y > 0.5);
    await page.keyboard.down('Shift'); await sleep(page, 150); await page.keyboard.down('ArrowUp'); await sleep(page, 1000);
    await page.keyboard.up('ArrowUp'); await page.keyboard.up('Shift'); await sleep(page, 300);
    w = await W(page);
    ok('Meleyen Ses: başını kaldırınca basamaklar etkin', (w.focus || '').includes('Basamak'), String(w.focus));
    await tap(page, 'KeyE');
    ok('Meleyen Ses: tırmandı', await waitFor(page, () => KANDIL.debug.world().tamar.y < 0, null, 6000));
    // kurtarma ardından karartma sırasında duraklat → yeniden başlat
    await sleep(page, 400); await tap(page, 'KeyE');
    ok('karartma başladı', await waitFor(page, () => KANDIL.debug.ui().busy, null, 30000, 40));
    await restartViaMenu(page);
    await sleep(page, 3500);
    ok('karartma sırasında yeniden başlat: sahne açılış notu', (await scene(page)) === 'acilis', await scene(page));
    ok('karartma sırasında yeniden başlat: bayraklar sıfır', await D(page, () => KANDIL.state.flags.kol_b01_kuzu_yunu === false));
    // ikinci tur: kuzuya yine tırmanılabilir (sc.busy sıfırlanır)
    await D(page, () => KANDIL.debug.goto('meleyen_ses'));
    await sleep(page, 600);
    await walkTo(page, 20, 1.4, 0.35);
    await page.keyboard.down('Shift'); await sleep(page, 150); await page.keyboard.down('ArrowUp'); await sleep(page, 1000);
    await page.keyboard.up('ArrowUp'); await page.keyboard.up('Shift'); await sleep(page, 300);
    await tap(page, 'KeyE');
    ok('yeniden oynayışta kuzuya tırmanılır', await waitFor(page, () => KANDIL.debug.world().tamar.y < 0, null, 6000));
    // kenarda "Hikâyeye devam": duvarın içinden yürümez, sahne ilerler
    hx = await hint3(page);
    const ys = [];
    await page.keyboard.press('Enter');
    for (let i = 0; i < 20; i++) { ys.push((await W(page)).tamar.y); await sleep(page, 100); }
    ok('kenarda "Hikâyeye devam": Tamar duvardan geçmez', !ys.slice(0, 8).some((y) => y > 0.3 && y < 1.0), ys.slice(0, 8).join(','));
    ok('kenarda "Hikâyeye devam" → Işığın Ardından', await waitFor(page, () => KANDIL.debug.scene() === 'isigin_ardindan', null, 30000));

    // Işığın Ardından: bulmaca bittikten sonraki ıslıklar sayılmaz
    await D(page, () => KANDIL.debug.goto('isigin_ardindan'));
    await sleep(page, 500);
    await D(page, () => KANDIL.debug.skipPuzzle()); await sleep(page, 100);
    for (let i = 0; i < 2; i++) { await page.keyboard.down('Space'); await sleep(page, 450); await page.keyboard.up('Space'); await sleep(page, 150); }
    ok('bitişten sonraki ıslık sayılmaz', await D(page, () => KANDIL.state.stats.gece_islik === 0));
    await waitFor(page, () => KANDIL.debug.scene() === 'agil_basinda', null, 8000);

    // Işığın Ardından: birim yürürken "Hikâyeye devam" kilitlemez
    await D(page, () => KANDIL.debug.goto('isigin_ardindan'));
    await sleep(page, 1200);
    await tap(page, 'Space'); await sleep(page, 250); await tap(page, 'Space');
    await waitFor(page, () => KANDIL.debug.world().sheep.filter((s) => s.g === 'K1').every((s) => s.gathered), null, 20000);
    await walkTo(page, 21, 7, 0.3);
    await page.keyboard.down('Space'); await sleep(page, 650); await page.keyboard.up('Space');
    const atT2 = await waitFor(page, () => { const w = KANDIL.debug.world(); return w.units === 0 && w.sheep.every((s) => s.gathered && s.at && s.at.x === 12 && s.at.y === 5); }, null, 60000);
    await walkTo(page, 3.9, 7.6, 0.4);
    await tap(page, 'KeyE');
    const unitOn = await waitFor(page, () => KANDIL.debug.world().units > 0, null, 15000, 60);
    ok('sürü birimi yürüyor (T2 → T1)', atT2 && unitOn);
    hx = await hint3(page);
    ok('birim yürürken ipucu bağlamı "k2k3" değil', !hx.includes('İkisinin arasına'), hx.split('\n')[0]);
    await page.keyboard.press('Enter'); // klavyeyle "Hikâyeye devam"
    ok('birim yürürken "Hikâyeye devam": baba zinciri sonuna kadar yürür', await waitFor(page, () => KANDIL.debug.scene() === 'agil_basinda', null, 200000, 500));
    ok('Hikâye kipinde usta bayrağı yazılmaz', await D(page, () => KANDIL.state.flags.usta_b01_iki_islik === false));
    await D(page, () => KANDIL.debug.goto('son')); await sleep(page, 1200);
    const card = await D(page, () => document.getElementById('card').innerText);
    ok('son kart: Hikâye kipinde sürü cümlesi', card.includes('babanın kandilinin ardından') && !card.includes('Usta işi'), card.split('\n').find((l) => l.includes('Sürü')));

    // Haydi Beytlehem: kuzu kucaktayken 20 sn girdi yoksa "kucakta" yazılır, ikisi birden taşımaz
    await D(page, () => KANDIL.debug.goto('haydi_beytlehem'));
    await pump(page, async () => !!(await D(page, () => (document.getElementById('objective').classList.contains('hidden') ? '' : document.getElementById('objective').textContent).includes('Kuzuyu'))), 40000);
    const lamb = (await W(page)).lamb;
    await walkTo(page, lamb.x + 0.6, lamb.y, 0.5); await tap(page, 'KeyE');
    await sleep(page, 22000);
    w = await W(page);
    ok('kuzu kucaktayken bekleme: baba da taşımaz', !(w.carry && w.carry.father === 'lamb' && w.carry.tamar === 'lamb'), JSON.stringify(w.carry));
    ok('kuzu kucaktayken bekleme → kucakta, Patika', await waitFor(page, () => KANDIL.debug.scene() === 'patika', null, 30000) && await D(page, () => KANDIL.state.flags.b01_ifade_kuzu === 'kucakta'));

    // Patika: üçüncü ışık sonrası baba öne geçer
    await sleep(page, 800);
    hx = await hint3(page); await page.keyboard.press('Enter');
    await sleep(page, 5000);
    const pk = await D(page, () => KANDIL.debug.sceneState(['f', 't']));
    ok('Patika: baba öne geçer', pk.f.x > pk.t.x, `baba ${pk.f.x.toFixed(1)} · Tamar ${pk.t.x.toFixed(1)}`);
    await shot(page, 'reg_patika_baba_onde');
    ok('Patika: baba önde → Hangi Kapı?', await waitFor(page, () => KANDIL.debug.scene() === 'hangi_kapi', null, 60000));

    // Hangi Kapı: Ev 6'da eksik ipucu C3 işaretlenir; ikinci yanlış kapıda baba sözü + 1. ışık
    await sleep(page, 1200);
    await walkTo(page, 37.2, 18.0, 0.4);
    await page.keyboard.down('Shift'); await sleep(page, 900); await page.keyboard.up('Shift');
    await walkTo(page, 36, 17.4, 0.4); await tap(page, 'KeyE');
    await pump(page, async () => (await D(page, () => KANDIL.state.flags.b01_uyanan_ev)) >= 1, 20000);
    await pump(page, async () => !(await ui(page)).dialog, 8000);
    ok('Ev 6: eksik ipucu C3 işaretli', (await sceneState(page, ['marked'])).marked['6'] === 'C3');
    await walkTo(page, 30, 10.4, 0.4);
    await page.keyboard.down('Shift'); await sleep(page, 900); await page.keyboard.up('Shift');
    await walkTo(page, 30, 9.4, 0.4); await tap(page, 'KeyE');
    await pump(page, async () => (await D(page, () => KANDIL.state.flags.b01_uyanan_ev)) >= 2, 20000);
    await pump(page, async () => !(await ui(page)).dialog, 8000);
    ok('ikinci yanlış kapı: kendiliğinden 1. ışık', await waitFor(page, () => !!KANDIL.debug.ui().hint, null, 6000));

    // Müjde ve Yemlik: Üç Işık bildirimi yok; Müjde istemi yalnızca ↑
    await D(page, () => KANDIL.debug.goto('mujde')); await sleep(page, 2000);
    await page.keyboard.press('KeyH'); await sleep(page, 200);
    let u = await ui(page);
    ok('Müjde: H bildirim göstermez', !u.bark && !u.hint);
    ok('Müjde: istem yalnızca ↑', await waitFor(page, () => { const p = KANDIL.debug.ui().prompt; return !!p && p.startsWith('↑') && !p.includes('Shift'); }, null, 60000));
    await shot(page, 'reg_mujde_istem');

    // Yemlik: ilk tur → avlu; yeniden başlat; ikinci tur da biter
    for (let run = 1; run <= 2; run++) {
      await D(page, () => KANDIL.debug.goto('yemlik'));
      await sleep(page, 1500);
      await page.keyboard.press('KeyH'); await sleep(page, 200);
      u = await ui(page);
      if (run === 1) ok('Yemlik: H bildirim göstermez', !u.bark && !u.hint);
      await waitFor(page, () => KANDIL.debug.sceneState(['phase']).phase === 1, null, 20000);
      await page.keyboard.down('ArrowRight'); await sleep(page, 4500); await page.keyboard.up('ArrowRight');
      await tap(page, 'KeyE');
      if (run === 1) { await sleep(page, 1500); await shot(page, 'reg_yemlik_isik'); }
      const reached = await pump(page, inScene(page, 'avlu'), 60000);
      ok(`Yemlik ${run}. tur → Avluda`, reached);
      if (run === 1) { await sleep(page, 800); await restartViaMenu(page); await sleep(page, 500); }
    }

    // Seçim koruması: diyalogu Boşluk'la geçen oyuncu seçeneği okumadan seçmez
    await D(page, () => KANDIL.debug.goto('yanki'));
    let sawChoice = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 16000) {
      await page.keyboard.down('Space'); await sleep(page, 60); await page.keyboard.up('Space'); await sleep(page, 90);
      if ((await ui(page)).choice) sawChoice = true;
      if (sawChoice && Date.now() - t0 > 12000) break;
    }
    ok('seçim koruması: hızlı Boşluk seçim yapmaz', sawChoice && (await D(page, () => KANDIL.state.flags.b01_haber)) === null, String(await D(page, () => KANDIL.state.flags.b01_haber)));
    await waitFor(page, () => KANDIL.debug.ui().choiceArmed, null, 3000);
    await page.keyboard.press('Digit2'); await sleep(page, 300);
    ok('seçim koruması: bekleyince seçim çalışır (babaya)', (await D(page, () => KANDIL.state.flags.b01_haber)) === 'babaya');
    await ctx.close();
  }

  // ---------------------------------------------------------------
  async function touch(browser) {
    const ctx = await browser.newContext({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
    const page = await ctx.newPage();
    watch(page, 'gerileme-dokunmatik');
    await page.goto(URL); await sleep(page, 900);
    const tb = await D(page, () => { const r = document.getElementById('btn-menu').getBoundingClientRect(); return { w: r.width, h: r.height }; });
    // üst düğmeler başlıkta gizli; sahneye geçince ölç
    await D(page, () => KANDIL.debug.goto('cerceve_giris'));
    await waitFor(page, () => KANDIL.debug.ui().dialog, null, 10000);
    const tb2 = await D(page, () => { const r = document.getElementById('btn-menu').getBoundingClientRect(); return { w: r.width, h: r.height }; });
    ok('dokunmatik: üst düğmeler ≥ 44 px', tb2.w >= 44 && tb2.h >= 44, `${tb2.w}×${tb2.h}`);
    void tb;
    const st = await D(page, () => ({ m: KANDIL.debug.ui().touchMode, joy: getComputedStyle(document.getElementById('joy')).pointerEvents, gut: getComputedStyle(document.getElementById('tb-gut')).pointerEvents }));
    ok('dokunmatik: diyalogda çubuk ve Güt gizli', st.m === 'etk' && st.joy === 'none' && st.gut === 'none', JSON.stringify(st));
    await shot(page, 'reg_dokunmatik_diyalog');
    // çok kısa Etkileşim dokunuşu diyalogu ilerletir
    await sleep(page, 3500);
    const i0 = await D(page, () => KANDIL.debug.dialogIndex());
    const e = await D(page, () => { const r = document.getElementById('tb-etk').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await page.touchscreen.tap(e.x, e.y); await sleep(page, 300);
    const i1 = await D(page, () => KANDIL.debug.dialogIndex());
    ok('dokunmatik: kısa Etkileşim dokunuşu diyalogu ilerletir', i1 === i0 + 1 || (i0 >= 0 && i1 === -1), `${i0} → ${i1}`);
    // parmağı Güt'ten kaydırınca ıslık iptal
    await D(page, () => KANDIL.debug.goto('isigin_ardindan')); await sleep(page, 1500);
    const g = await D(page, () => { const r = document.getElementById('tb-gut').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: g.x, y: g.y, id: 7 }] });
    await sleep(page, 650);
    for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: g.x - i * 30, y: g.y - i * 10, id: 7 }] }); await sleep(page, 30); }
    await sleep(page, 150);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(page, 300);
    ok('dokunmatik: parmağı Güt\'ten kaydırmak ıslığı iptal eder', await D(page, () => KANDIL.state.stats.gece_islik === 0), String(await D(page, () => KANDIL.state.stats.gece_islik)));
    // karşılaştırma: parmak düğmede kalırsa ıslık çalınır ve sayılır
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: g.x, y: g.y, id: 8 }] });
    await sleep(page, 650);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(page, 300);
    ok('dokunmatik: Güt basılı tutulup bırakılınca ıslık sayılır', await D(page, () => KANDIL.state.stats.gece_islik === 1));
    // menü açıkken dokunmatik denetimler gizli; yeniden başlatma onay ister
    await page.tap('#btn-menu'); await sleep(page, 300);
    ok('dokunmatik: menüde denetimler gizli', (await ui(page)).touchMode === 'none');
    const bh = await D(page, () => [...document.querySelectorAll('#menu button')].map((b) => Math.round(b.getBoundingClientRect().height)));
    ok('dokunmatik: menü düğmeleri ≥ 44 px', bh.every((x) => x >= 44), bh.join(','));
    await page.getByRole('button', { name: 'Bölümü yeniden başlat' }).tap(); await sleep(page, 300);
    ok('yeniden başlatma onay ister', (await ui(page)).menu && (await scene(page)) === 'isigin_ardindan');
    await shot(page, 'reg_yeniden_baslat_onay');
    await page.getByRole('button', { name: 'Hayır, devam et' }).tap(); await sleep(page, 300);
    ok('onayda "Hayır": oyun sürer', (await scene(page)) === 'isigin_ardindan' && (await ui(page)).menu);
    await ctx.close();
  }
  return { desktop, touch };
};
