# Kandil — Bölüm 1 “Yıldızın Altında” · oynanabilir prototip

Bu klasör, `docs/bolumler/01-yildizin-altinda.md` belgesindeki 1. bölümün tarayıcıda oynanabilir bir prototipidir. Tek bir HTML dosyası olarak çalışır; telefonda (Claude uygulamasının içinde ya da tarayıcıda) ve masaüstünde baştan sona oynanabilir. Ana yol yaklaşık **12–15 dakika** sürer.

- Düz JavaScript + Canvas 2D + DOM arayüz katmanı; çatı (framework) yok.
- Bütün piksel sanat kodla çizilir (palet indeksli dizgeler ve prosedürel karolar); dış görsel ya da ses dosyası yok.
- Bütün sesler WebAudio ile sentezlenir ve ilk dokunuştan/tuştan sonra başlar. Oyun sessizken de baştan sona oynanabilir.
- İç çözünürlük 640×360, 16 px karo; ekrana tam sayı katıyla (gerekirse kesirli) ölçeklenir, `image-rendering: pixelated`.
- Ağ isteği yalnızca isteğe bağlı “Pixelify Sans” yazı tipi içindir; yüklenemezse eş aralıklı yazı tipine düşer.

## Prototipin kapsadığı sahneler

| # | Sahne | Ne yapılır |
|---|---|---|
| 0 | Açılış notu ve içerik notu | İki ayrı ekran (GDD §2.2-E, bölüm §14) |
| 1 | Çerçeve girişi | Mecdel, tezgâh başı: Sara'nın sorusu, yaşlı Tamar'ın cevabı; başını kaldırıp yıldızlara bakar, silmeyle yamaca geçilir |
| 2 | Alacakaranlık: “Ustayı izle” | Yazısız öğretim, dört adım: değnek (K1'i Orta taşa sür) → ıslık (kayanın arkasındaki koyun) → durak taşı çağrısı → baş kaldırma (yedi yıldız). Akşam duası (Şema), “On bir... Kuzu nerede?”, gece çöker |
| 3 | **Meleyen Ses** (bulmaca) | Bakış ile ince tek dalgayı (kuzu) kalın çift dalgadan (anası) ayır; stereo meleme; duvar dibinde yön kaybolur, başını kaldır; basamak taşlarından tırman, dikenleri arala; `kol_b01_kuzu_yunu` |
| 4 | **Işığın Ardından** (imza bulmaca) | §6.2'deki kurallar: kandil halkası 10 karo, ıslık 8, kayma 4, zincir 2, toplanma 3; geçitler, sarnıç, babanın ret cümleleri, `usta_b01_iki_islik` |
| 5 | Ağıl başında | Değneğin altından sayım (“bir ... on bir”), Nahum ateşi yakar, Mezmur 23:1 mırıltısı ve kaval, sapan (`kol_b01_sapan`), “Otur” |
| 6 | **Müjde** (dokunmama) | Kontroller çekilir; beyaza yakın altın ışık; melek kanatsız, halesiz, yüzsüz dikey bir ışık biçimidir; Luka 2:10–12 ve 2:13–14 ayet etiketiyle; gök ordusu titreşmeyen beyaz-altın ışıklar; tek girdi “başını kaldır”; 2:15'te bütün ışıklar söner |
| 7 | Haydi Beytlehem'e | Luka 2:15 ortak söz (“Çobanlar”), kandil Tamar'a geçer; kuzuyu kucakla ya da ışıkla ağıla götür → `b01_ifade_kuzu` |
| 8 | Kandille yol açmak | Patikada önde yürü; çobanlar izler; yolda üç söz ve hedef düşüncesi |
| 9 | **Hangi Kapı?** (bulmaca) | Altı ev, beş ipucu türü (A, B, C1, C2, C3) Bakış ile kenar ışığı ve biçimli simgelerle; “önce bak” kuralı; yanlış kapılar nazik yanıt verir, pencere yanar, `b01_uyanan_ev` artar; ikinci yanlış kapıda 1. ışık kendiliğinden gelir; Ev 4'ün dam odası da çözüm sayılır |
| 10 | **Yemlik** (dokunmama) | Yalnızca yaklaşmak ve çömelmek; İsa'nın annesi Meryem portresiz, sözsüz, yemliğe eğik bir silüet; bebek kundaklı, yüz pikseli, hale ve parıltı yok; tek ışık evin kandili; Luka 2:16 |
| 11 | Avluda | Luka 2:17–18; Bakış ile tanıklık ayrıntıları (`tan_b01_duyanlar_sasti`, `tan_b01_yureginde_sakladi`, `tan_b01_overek_dondu`); şafak grisinde dönüş, Luka 2:20 |
| 12 | Yankı: obada şafak | “Seçimlerin İncil'deki olayları değiştirmez” kartı; “Koşup anlat” / “Babama fısılda” / “Sessiz kal” → `b01_haber = koye / babaya / kalbinde`, `eks_soz` +1 / 0 / −1; her yol Natan'a bakan Tamar'la biter |
| 13 | Tablo 1 | Yıldızbilimciler ve yıldız (parşömen üzerinde silüet; deve, taç ve üç figür yok) |
| 14 | Tablo 2 | Gece yola çıkan aile → uzakta yas tutan kadınlar ve Matta 2:18 → kuzeye kaçan Tamar'ın ailesi; asker ve şiddet yok; uzak ağıt sesi |
| 15 | Çerçeve kapanışı | Yaşlı Tamar'ın kapanış cümlesi ve hatıra cümleleri; seçime göre dokunan bant; “Bölüm 1 — Yıldızın Altında” son kartı, yargılamayan seçim özeti, “Yeniden oyna” |

**Üç Işık:** Her bulmacada duruma göre üç kademeli ipucu (bölüm belgesindeki cümlelerle). Üçüncü ışıktan sonra “Hikâyeye devam” gelir (sürüde “Babam halleder”: baba zinciri kendisi yürür). İpucu hiçbir zaman engellemez, hiçbir yerde kayda geçmez.

## Nasıl çalıştırılır

- **Oynamak:** `dist/bolum1.html` dosyasını doğrudan açın (çift tık, `file://`). Dosya kendi kendine yeter; korumalı (sandbox) bir iframe içinde de çalışır (localStorage'a bağlı değildir).
- **Yeniden derlemek:** `python3 build.py` — `src/index.html` şablonuna `src/style.css` ve `src/*.js` dosyalarını (ad sırasıyla) gömer, `dist/bolum1.html` yazar.
- **Test:** `NODE_PATH=$(npm root -g) node tests/playthrough.js`
  Playwright ile oyunu açar; konsol hatalarını toplar; öğretim, kuzu, sürü, kapı ve patika bölümlerini **gerçek klavye girdisiyle** oynar (sürüde belgenin referans çözümü: 1 ıslık, 6 çağrı); diyalogları gerçek tuşlarla ilerletir; bitiş kartına ulaşıldığını doğrular; her sahnenin ekran görüntüsünü `tests/screens/` altına kaydeder (klasör `.gitignore`'dadır). Ayrıca 400×800 dikey dokunmatik görünümü (kayma yok, kontroller oyunun altında, sanal çubuk ve Güt düğmesi çalışıyor), yatay telefonu ve korumalı iframe'i sınar. Paketli tarayıcı yoksa `/opt/pw-browsers/chromium` kullanılır. Tam koşu yaklaşık 12 dakika sürer (bulmacalar gerçek zamanlı oynanır).

### Kaynak dosyalar (`src/`)

| Dosya | İçerik |
|---|---|
| `00_core.js` | Yardımcılar, güvenli depolama, durum ve bayraklar (GDD §8.3), betik (eşyordam) yürütücüsü |
| `01_art.js` | Palet, sprite dizgeleri (Tamar, yetişkinler, koyun, kuzu, kandil, simgeler, portreler), prosedürel ağaç/çalı/kaya, titreşimli ışık sprite'ları |
| `02_audio.js` | WebAudio sentezi: rüzgâr, cırcır böceği, ince/kalın meleme (stereo), ıslık, değnek, adım, kapı, ateş, uğultu, tek uzun ton, müjde ton kümesi, kaval, ağıt |
| `03_input.js` | Klavye, fare, dokunmatik (sanal çubuk + düğmeler), gamepad, test benzetimi |
| `04_ui.js` | DOM katmanı: diyalog (daktilo + atlama), kısa sözler, seçenekler, kartlar, Üç Işık, menüler, ölçekleme ve güvenli alan |
| `05_render.js` | Kamera, gök (paralaks, Büyükayı), uzak sırt, karanlık katmanı ve ışık delikleri, efektler |
| `06_world.js` | Karo haritası ve boyama, aktörler, **sürü kuralları (§6.0/§6.2)**, baba çağrısı, oyuncu denetimi |
| `07_kirlar.js` | Sahne yöneticisi, Üç Işık, Kırlar dünyası ve 2–5, 7. sahneler |
| `08_beytlehem.js` | Patika, Beytlehem ve “Hangi Kapı?”, Avlu, Yankı |
| `09_composed.js` | Başlık, açılış notları, çerçeve, Müjde, Yemlik, tablolar, dokuma bandı, son kart |
| `10_main.js` | Ana döngü, açılış, `window.KANDIL` test arayüzü |

`window.KANDIL = { state, debug: { goto(sceneId), skipPuzzle(), setFlag(k, v), listScenes(), simulate(inputName, ms), … } }` otomatik test içindir.

## Kontroller

| Eylem | Klavye / fare | Dokunmatik | Gamepad |
|---|---|---|---|
| Yürü | Oklar / WASD | Sol sanal çubuk | Sol çubuk / D-pad |
| Seğirt | Ctrl basılı | Çubuğu sonuna kadar it | LB |
| Bakış (basılı) | Shift ya da farenin sağ tuşu | “Bakış” düğmesi | LT |
| Başını kaldır | Bakış + ↑ (dokunmama anlarında yalnızca ↑) | Bakış + çubuk yukarı | Sağ çubuk yukarı |
| Güt | Boşluk: kısa bas = değnek, 0,35 sn basılı tut = ıslık | “Güt” düğmesi (dokun / basılı tut) | X |
| Islığı iptal | Basılıyken Esc ya da Backspace | Parmağı düğmeden kaydır | B |
| Etkileşim | E (durak taşında “Baba, buraya!”) | “Etkileşim” düğmesi | A |
| Diyalog | E / Boşluk / Enter ya da tıkla; seçenek 1–4, oklar | Dokun | A |
| Üç Işık | H | Sağ üstteki kandil | View |
| Menü | Esc | Sağ üstteki ≡ | Menu |

Dokunmatik kontroller yalnızca dokunmatik cihazlarda görünür. Yatay ekranda oyunun üstünde, dikey ekranda oyunun altında durur.

## Bölüm belgesinden sapmalar

**Kapsam ve süre**
1. Ana yol ~12–15 dakikadır (belge: 35 dk). Sahneler kısaltıldı; öğretim, sayım, avlu ve dönüş sıkıştırıldı.
2. Yan hikâye “Kör Ninni” ve `kol_b01_cingirak` yok (belgenin kesme listesinde ilk sıradadır).
3. Kodeks, Heybe (Hatıralar/İnsanlar sekmeleri), Harita, Diğer Yollar ekranı ve dokuma tezgâhı biçimli ana menü yok. Hatıra nesneleri ve tanıklık ayrıntıları bildirimsiz toplanır; son kartta ve yaşlı Tamar'ın kapanış cümlelerinde görünür.
4. Zorluk ayarları (Hikâye/Rahat/Dengeli/Usta) yok; oyun “Dengeli” gibi davranır. Hikâye kipi yalnızca 3. ışıktan sonraki “Hikâyeye devam” ile açılır. Usta kısıtının iki ıslık sayacı (belgeye göre yalnızca Usta ayarında görünür) sürü bulmacasında her zaman köşede durur; `usta_b01_iki_islik` her durumda izlenir (Hikâyeye devam kullanılırsa yazılmaz). Rahat'taki “60 sn takılınca 1. ışık” ve “?” işaretleri yok.
5. Yaşlı Tamar seslendirilmez; bütün sözler altyazıdır.

**Görsel**
6. Tamar 4 yönlü çizildi (belge: 8 yön); sol yön, sağın aynasıdır (GDD §11.2'deki ayna yasağına aykırı, prototip kısaltması). Sprite boyutları küçültüldü: çocuk Tamar ~16×22, yetişkinler ~16×29 piksel (belge: 20×30 ve 24×40).
7. Normal haritalar, LUT ve hacimsel ışık yok. Gece/şafak, bir karanlık katmanı ile önceden çizilmiş, titreşimli (dithered) radyal ışık deliklerinden (`destination-out`) yapılır; kandil halkasının kenarı kesikli çizilir.
8. Sabit kompozisyonlar (çerçeve, müjde, yemlik, tablolar) kodla çizilmiş basit silüetlerdir. Müjdede kamera “çobanların ışıkla aydınlanan yüzleri” yerine sırttan kompozisyonda kalır (yakın plan yok).
9. Kırlar haritası 48×45 karodur (belge: 48×44): en üstte gök için bir satır eklendi. Bulmaca koordinatları (taşlar, duvarlar, geçitler, sarnıç, sürü konumları) belgeyle birebirdir.
10. Beytlehem'de altı ev, 3/4 görünümde okunurluk için iki teraslı sıra hâlinde dizildi ve hepsi güneye bakar (belge: yokuşun iki yanı). Harman, iki üst ev arasındaki aralığın kuzeyindedir; taze saman izi oradan Ev 4'ün kapısına iner.

**Mekanik**
11. Güt konisi fare yönüne değil, Tamar'ın baktığı yöne açılır (klavye, dokunmatik ve gamepad için tek kural).
12. Öğretim “yazısız”dır ama bağlama göre tuş göstergeleri (ör. “Güt: kısa bas — değnek”) görünür. Öğretim için K1 batıda başlar; “kayanın arkasındaki tek koyun” K3'ün koyunlarından biridir; sonra sürü gece konumlarına (§6.2 Kurulum) dağılır.
13. Toplanmış sürü belgedeki gibi tek birim olarak hesaplanır (merkez = toplandığı taş ya da takıldığı nokta; rota, kayma ve takılma bu merkeze göre). Görselde koyunlar merkezin izini sırayla izler ve kandilin çevresindeki yuvalara (1,6 / 2,55 / 3,15 karo) dağılır; ayrıca hafif ayrışma (boids) uygulanır.
14. Baba için belgede olmayan kısa durum cümleleri eklendi: “Yoldayım, kızım.”, “Buradayım, kızım.”, “Bekle kızım, önce gelsinler.” (sürü hâlâ yürürken yapılan çağrılarda).
15. Kuzunun duvar dibindeki kararsız göstergesi, Tamar'ın W0'a 2 karodan yakın olduğu her yerde devreye girer. Kuzuyu kurtarırken Tamar'a kısa bir düşünce cümlesi eklendi (“Dikende bir tutam yün kalmış...”). Sapan ve saman çöpü için de kısa düşünce cümleleri eklendi.
16. Müjde ve Yemlik'teki ayet metinleri girdi gerektirmeden kendiliğinden akar (dokunmama anında “devam” tuşu da girdi sayılacağı için). Müjdede 2:15'in başı için kısa bir anlatı satırı (“Melekler onların yanından göğe dönünce...”, [yakın aktarım]) eklendi. Müzik: çekilir; tek uzun ton ve altında sessiz, sözsüz bir ton kümesi kalır.
17. Yemlik: belgedeki 45 sn yerine ~26 sn sessizlik. Görev tanımına uygun olarak oyuncu kapıya doğru yaklaşabilir ve “Çömel” ile çömelir; 14 sn girdi yoksa Tamar kendiliğinden yaklaşıp çömelir.
18. “Hangi Kapı?”: Ev 4'ün konuk odası, dam merdiveninin dibindeki tek bir Etkileşim'le (“çık ve çal”) çalınır. Dul Şelomit'in yanıtı §6.3 ile diyalog 11 birleştirilerek verildi. İpucu görmek için Bakış basılıyken ipucuna ~6,5 karo yakın olmak yeter.
19. Avluda tanıklık ayrıntıları Bakış ile alınır: dinleyenlerin yanında (2:18), Ev 4'ün alçak kapısının önünde (2:19) ve dönüş yürüyüşünde (2:20).
20. Yankı: “Koşup anlat” dalında dinleyenlerin şaşkınlığı kısa bir anlatı balonuyla gösterilir. “Babama fısılda” dalında el tutma animasyonu yerine Tamar babasının yanında durur. Natan kundak olarak çizilir.
21. Dokuma bandı: renk bölümün teması (çivit, yıldız altını, kandil turuncusu), desen belgedeki gibi (`koye` dalgalı · `babaya` ortası düzleşen dalga · `kalbinde` düz). Ek olarak bandın ucuna kuzu yününden küçük bir düğüm eklendi.
22. `babaya` yolu için belgede yaşlı Tamar'ın ayrı bir kapanış cümlesi olmadığından bu yolda kapanışta yalnızca hatıra cümleleri duyulur.

**Metin**
23. Luka 2:10–12, 2:14, 2:15, Yasa'nın Tekrarı 6:4, Mezmur 23:1 ve Matta 2:18 belgedeki yakın aktarımlarla verildi. Luka 2:15a, 2:16, 2:17–18 ve 2:20 için prototipte yakın aktarımlar yazıldı. Hepsi “[yakın aktarım]” etiketlidir ve belgenin istediği gibi basılı YC ile **karşılaştırılmamıştır** (doğrulanmalı).
24. Konuşmacı etiketleri GDD §2.2-C'ye uyar: İsa'nın annesi ve Yusuf konuşmaz; tek başına “Meryem” etiketi yoktur (ad yalnızca ayet metninde geçer).
