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
| 3 | **Meleyen Ses** (bulmaca) | Bakış ile ince tek dalgayı (kuzu) kalın çift dalgadan (anası) ayır; yalnızca kuzu ve anasının karşılıklı sesi gösterge bırakır, sürünün öteki melemeleri kısık duyulur; stereo meleme; duvar dibinde yön kaybolur; basamak taşları ancak **Bakış'la başını kaldırınca** (ya da 2. ışıktan sonra) kullanılabilir; tırman, dikenleri arala; `kol_b01_kuzu_yunu` |
| 4 | **Işığın Ardından** (imza bulmaca) | §6.2'deki kurallar: kandil halkası 10 karo, ıslık 8, kayma 4, zincir 2, toplanma 3; geçitler, sarnıç, babanın ret cümleleri, `usta_b01_iki_islik` |
| 5 | Ağıl başında | Değneğin altından sayım (“bir ... on bir”), Nahum ateşi yakar, Mezmur 23:1 mırıltısı ve kaval, sapan (`kol_b01_sapan`), “Otur” |
| 6 | **Müjde** (dokunmama) | Kontroller çekilir; beyaza yakın altın ışık; melek kanatsız, halesiz, yüzsüz dikey bir ışık biçimidir; Luka 2:10–12, 2:13 ve 2:14 ayet etiketiyle; gök ordusu titreşmeyen beyaz-altın ışıklar; tek girdi “başını kaldır” (yalnızca ↑ / çubuk yukarı, Bakış gerekmez); 2:15'te bütün ışıklar söner |
| 7 | Haydi Beytlehem'e | Luka 2:15 ortak söz (“Çobanlar”), kandil Tamar'a geçer; kuzuyu kucakla ya da ışıkla ağıla götür → `b01_ifade_kuzu` |
| 8 | Kandille yol açmak | Patikada önde yürü; çobanlar izler; yolda üç söz ve hedef düşüncesi |
| 9 | **Hangi Kapı?** (bulmaca) | Altı ev, beş ipucu türü (A, B, C1, C2, C3) Bakış ile kenar ışığı ve biçimli simgelerle; “önce bak” kuralı; yanlış kapılar nazik yanıt verir, pencere yanar, `b01_uyanan_ev` artar; ikinci yanlış kapıda 1. ışık kendiliğinden gelir; Ev 4'ün dam odası da çözüm sayılır |
| 10 | **Yemlik** (dokunmama) | Yalnızca yaklaşmak ve çömelmek; İsa'nın annesi Meryem portresiz, sözsüz, yemliğe eğik bir silüet; bebek kundaklı, yüz pikseli, hale ve parıltı yok; tek ışık evin kandili; Luka 2:16 |
| 11 | Avluda | Luka 2:17–18; Bakış ile tanıklık ayrıntıları (`tan_b01_duyanlar_sasti`, `tan_b01_yureginde_sakladi`, `tan_b01_overek_dondu`); şafak grisinde dönüş, Luka 2:20 |
| 12 | Yankı: obada şafak | “Seçimlerin İncil'deki olayları değiştirmez” kartı; “Koşup anlat” / “Babama fısılda” / “Sessiz kal” → `b01_haber = koye / babaya / kalbinde`, `eks_soz` +1 / 0 / −1; her yol Natan'a bakan Tamar'la biter |
| 13 | Tablo 1 | Yıldızbilimciler ve yıldız (parşömen üzerinde silüet; deve, taç ve üç figür yok) |
| 14 | Tablo 2 | Gece yola çıkan aile → uzakta yas tutan kadınlar ve Matta 2:18 → kuzeye kaçan Tamar'ın ailesi; asker ve şiddet yok; uzak ağıt sesi |
| 15 | Çerçeve kapanışı | Yaşlı Tamar'ın kapanış cümlesi ve hatıra cümleleri; seçime göre dokunan bant; “Bölüm 1 — Yıldızın Altında” son kartı, yargılamayan seçim özeti, “Yeniden oyna” |

**Üç Işık:** Her bulmacada ve yönlendirmeli sahnede (öğretim, ağıl başı, kuzu, patika, avlu) duruma göre üç kademeli ipucu (bölüm belgesindeki cümlelerle). Üçüncü ışıktan sonra **her yerde** “Hikâyeye devam” gelir (sürüde “Babam halleder”: baba, sürü hangi durumda olursa olsun — yürürken, takılmışken, karanlıkta ya da bölünmüşken — zinciri kendisi yürür). Panel dokunarak, fareyle ya da klavyeyle (Enter = Hikâyeye devam, Backspace = Kapat; gamepad Y / B) kullanılır. İpucu hiçbir zaman engellemez, hiçbir yerde kayda geçmez. İpucu olmayan anlarda (çerçeve, Müjde, Yemlik, tablolar) ipucu tuşu sessizce yok sayılır; Müjde ve Yemlik'te ipucu düğmesi tamamen kalkar.

## Nasıl çalıştırılır

- **Oynamak:** `dist/bolum1.html` dosyasını doğrudan açın (çift tık, `file://`). Dosya kendi kendine yeter; korumalı (sandbox) bir iframe içinde de çalışır (localStorage'a bağlı değildir).
- **Yeniden derlemek:** `python3 build.py` — `src/index.html` şablonuna `src/style.css` ve `src/*.js` dosyalarını (ad sırasıyla) gömer, `dist/bolum1.html` yazar.
- **Test:** `NODE_PATH=$(npm root -g) node tests/playthrough.js`
  Playwright ile oyunu açar; konsol hatalarını toplar; öğretim, kuzu, sürü, kapı ve patika bölümlerini **gerçek klavye girdisiyle** oynar (sürüde belgenin referans çözümü: 1 ıslık, 6 çağrı); diyalogları gerçek tuşlarla ilerletir; bitiş kartına ulaşıldığını doğrular; her sahnenin ekran görüntüsünü `tests/screens/` altına kaydeder (klasör `.gitignore`'dadır). Ayrıca 400×800 dikey dokunmatik görünümü (kayma yok, kontroller oyunun altında, sanal çubuk ve Güt düğmesi çalışıyor), yatay telefonu ve korumalı iframe'i sınar.
  Ardından `tests/regressions.js` içindeki **gerileme testleri** koşar: incelemelerde bulunan her hata gerçek girdiyle yeniden üretilir (yeniden oynayışta Yemlik ve kuzu, karartma sırasında yeniden başlatma, birim yürürken “Hikâyeye devam”, öğretimin yalnızca ışıklarla bitirilmesi ve sahne istemleri, klavyeyle Üç Işık, başını kaldırmadan tırmanılamaması, Meleyen Ses'te yalnızca ananın kalın dalgası, bitişten sonraki ıslıklar, kuzu kucaktayken bekleme, patikada babanın öne geçmesi, Ev 6'nın C3 işareti, ikinci yanlış kapıda kendiliğinden ışık, dokunmama anlarında bildirimsizlik, seçim koruması, menü seçiminin korunması; yatay telefonda 44 px dokunma hedefleri, diyalogda gizlenen çubuk, kısa Etkileşim dokunuşu, parmağı kaydırarak ıslık iptali, yeniden başlatma onayı).
  Yalnızca bir kısmı: `ONLY=main` (ana oynanış), `ONLY=reg` (gerileme), `ONLY=regtouch` (dokunmatik gerileme). Paketli tarayıcı yoksa `/opt/pw-browsers/chromium` kullanılır. Tam koşu yaklaşık 20 dakika sürer (bulmacalar gerçek zamanlı oynanır).

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
| Başını kaldır | Bakış + ↑ (Müjde'de yalnızca ↑) | Bakış + çubuk yukarı (Müjde'de yalnızca çubuk yukarı) | Sağ çubuk yukarı |
| Güt | Boşluk: kısa bas = değnek, 0,35 sn basılı tut = ıslık | “Güt” düğmesi (dokun / basılı tut) | X |
| Islığı iptal | Basılıyken Esc ya da Backspace | Parmağı düğmeden kaydır (düğme kızarır) | B |
| Etkileşim | E (durak taşında “Baba, buraya!”) | “Etkileşim” düğmesi | A |
| Diyalog | E / Boşluk / Enter ya da tıkla; seçenek 1–4, oklar | Dokun | A |
| Üç Işık | H; panelde Enter = Hikâyeye devam, Backspace = Kapat | Sağ üstteki kandil; paneldeki düğmeler | View; panelde Y / B |
| Menü | Esc (menüde ↑↓ + Enter, Esc/Backspace = Devam) | Sağ üstteki ≡ | Menu |

Dokunmatik kontroller yalnızca dokunmatik cihazlarda görünür. Yatay ekranda oyunun üstünde, dikey ekranda oyunun altında durur. Yalnızca o an kullanılabilenler görünür: diyalogda ve kesitlerde yalnızca Etkileşim (= devam) kalır; menü ve kartlarda hepsi gizlenir; Müjde'de yalnızca “başını kaldır” anında çubuk, Yemlik'te çubuk ve Etkileşim görünür. Yatay ekranda diyalog kutusu sağdaki düğmenin altına girmeyecek biçimde daralır. Dokunmatik cihazlarda bütün düğmeler en az 44 px'tir ve yazı en az 15 px'lik temele göre ölçeklenir.

“Bölümü yeniden başlat” bir onay adımı ister (“Evet, baştan başla” / “Hayır, devam et”). Sekme ya da uygulama arka plana geçince ses susar ve oyun duraklatma menüsüyle bekler. Seçenekler göründükten sonra kısa bir süre (0,8 sn; bu sırada onay tuşuna yeniden basılırsa süre baştan başlar) seçim kabul edilmez: diyalogu hızla geçen oyuncu seçeneği okumadan seçmesin diye.

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
12. Öğretim “yazısız”dır ama her adımda bağlama göre tuş göstergeleri görünür (“Güt: kısa bas — değnek”, “Güt: basılı tut — ıslık”, “Orta taşta: Baba, buraya!”, “Başını kaldır”). Öğretimin her adımında da üç ışık vardır; üçüncü ışıktaki “Hikâyeye devam” o adımı geçer. Öğretim için K1 batıda başlar; “kayanın arkasındaki tek koyun” K3'ün koyunlarından biridir; sonra sürü gece konumlarına (§6.2 Kurulum) dağılır.
13. Toplanmış sürü belgedeki gibi tek birim olarak hesaplanır (merkez = toplandığı taş ya da takıldığı nokta; rota, kayma ve takılma bu merkeze göre). Görselde koyunlar merkezin izini sırayla izler ve kandilin çevresindeki yuvalara (1,6 / 2,55 / 3,15 karo) dağılır; ayrıca hafif ayrışma (boids) uygulanır.
14. Baba için belgede olmayan kısa durum cümleleri eklendi: “Yoldayım, kızım.”, “Buradayım, kızım.”, “Bekle kızım, önce gelsinler.” (sürü hâlâ yürürken yapılan çağrılarda).
15. Kuzunun duvar dibindeki kararsız göstergesi, Tamar'ın W0'a 2 karodan yakın olduğu her yerde devreye girer. Basamak taşlarına ilk varışta Tamar'ın kısa bir iç sesi duyulur (“Ses duvarın içinden geliyor gibi... Kuzu duvarın içine giremez ki.”); basamaklar ancak Bakış'la başını kaldırdıktan (ya da 2. ışık onları parlattıktan) sonra tırmanılabilir. Kuzuyu kurtarırken Tamar'a kısa bir düşünce cümlesi eklendi (“Dikende bir tutam yün kalmış...”). Sapan ve saman çöpü için de kısa düşünce cümleleri eklendi. Meleyen Ses sırasında sürünün rastgele melemeleri kısık sesle duyulur ama dalga göstergesi bırakmaz; böylece kalın çift dalga yalnızca anayı gösterir.
16. Müjde ve Yemlik'teki ayet metinleri girdi gerektirmeden kendiliğinden akar (dokunmama anında “devam” tuşu da girdi sayılacağı için); ekranda kalma süresi metnin uzunluğuna göre uzar (en az ~18 harf/sn okuma). Müjdede 2:13 için bir anlatı satırı (“Birden meleğin yanında Tanrı'yı öven büyük bir gök ordusu belirdi.”) ve 2:15'in başı için kısa bir anlatı satırı (“Melekler onların yanından göğe dönünce...”) eklendi; ikisi de [yakın aktarım]. Müzik: çekilir; tek uzun ton ve altında sessiz, sözsüz bir ton kümesi kalır. Dokunmama anlarında ipucu düğmesi kalkar; menü düğmesi (≡) soluk biçimde durur ki oyuncu isterse bilerek duraklatabilsin. Melek ışık biçimi ~35 px'tir (yetişkin sprite'ı ~29 px: “insan boyunu biraz aşan”).
17. Yemlik: belgedeki 45 sn yerine ~26 sn sessizlik. Görev tanımına uygun olarak oyuncu kapıya doğru yaklaşabilir ve “Çömel” ile çömelir; 14 sn girdi yoksa Tamar kendiliğinden yaklaşıp çömelir. İçerideki bütün ışık evin duvar kandilinden düşer (çocuğa odaklı ek ışık yok); avludaki hafif ışık yalnızca çobanların durduğu yeri gösterir ve içeriye ulaşmaz.
18. “Hangi Kapı?”: Ev 4'ün konuk odası, dam merdiveninin dibindeki tek bir Etkileşim'le (“çık ve çal”) çalınır. Dul Şelomit'in yanıtı §6.3 ile diyalog 11 birleştirilerek verildi. İpucu görmek için Bakış basılıyken ipucuna ~6,5 karo yakın olmak yeter. Ev 6'ya belgede olmayan bir “olumsuz C3” hücresi eklendi (“Hayvanlar içeride; dışarı bağlanan yok.”, kapı ardında hayvan simgesi): Ev 6 çalınınca kalıcı olarak işaretlenen eksik ipucu budur (belge tablosunda Ev 6'nın A'sı vardır; eksik olanlar C1 ve C3'tür, C1'in işaretlenecek bir simgesi yoktur).
19. Avluda tanıklık ayrıntıları Bakış ile alınır: dinleyenlerin yanında (2:18), Ev 4'ün alçak kapısının önünde (2:19) ve dönüş yürüyüşünde (2:20).
20. Yankı: “Koşup anlat” dalında dinleyenlerin şaşkınlığı kısa bir anlatı balonuyla gösterilir. “Babama fısılda” dalında el tutma animasyonu yerine Tamar babasının yanında durur. Natan kundak olarak çizilir.
21. Dokuma bandı: renk bölümün teması (çivit, yıldız altını, kandil turuncusu), desen belgedeki gibi (`koye` dalgalı · `babaya` ortası düzleşen dalga · `kalbinde` düz). Ek olarak bandın ucuna kuzu yününden küçük bir düğüm eklendi.
22. `babaya` yolu için belgede yaşlı Tamar'ın ayrı bir kapanış cümlesi olmadığından bu yolda kapanışta yalnızca hatıra cümleleri duyulur.

**Metin**
23. Luka 2:10–12, 2:14, 2:15, Yasa'nın Tekrarı 6:4, Mezmur 23:1 ve Matta 2:18 belgedeki yakın aktarımlarla verildi. Luka 2:13, 2:15a, 2:16, 2:17–18 ve 2:20 için prototipte yakın aktarımlar yazıldı. Hepsi “[yakın aktarım]” etiketlidir ve belgenin istediği gibi basılı YC ile **karşılaştırılmamıştır** (doğrulanmalı).
24. Konuşmacı etiketleri GDD §2.2-C'ye uyar: İsa'nın annesi ve Yusuf konuşmaz; tek başına “Meryem” etiketi yoktur (ad yalnızca ayet metninde geçer).

**İnceleme sonrası netleşen davranışlar**
25. Patika: 60 sn girdi yoksa baba öne geçer ve yolu yürür; Tamar kandille hemen arkasından, Nahum ile Yoaş onun izinden gelir (üçüncü ışıktaki “Hikâyeye devam” da aynısını yapar).
26. Haydi Beytlehem'e: kuzu kucaktayken 20 sn girdi olmazsa Tamar kendiliğinden ağıla yürür ve `b01_ifade_kuzu = kucakta` yazılır (oyuncu kuzuyu zaten kucağına almıştır). Kuzu kucakta değilse belgedeki kural geçerlidir: baba kuzuyu ağıla koyar, değer yazılmaz.
27. Tabloların köşe yazısı tasarım notu değil, tablonun adıdır: “Yıldızbilimciler ve yıldız · Matta 2:1–12”, “Gece yola çıkan aile · Matta 2:13–18”. Tablo 1'in kompozisyonu diyalog kutusunun üstünde kalacak biçimde yukarı alındı; yıldızbilimciler eşikte, üst üste binen bir grup olarak durur.
28. Son kart yargılamayan özet verir: sürü cümlesi ıslık sayısını sade biçimde anar (“ıslık çalmadan”, “tek ıslıkla”, “n ıslıkla”; Hikâye kipinde “Sürü, babanın kandilinin ardından ağıla indi.”); “Usta işi” övgüsü kartta yoktur (köşedeki iki ıslık sayacı yalnızca bulmaca sırasında görünür). Kapanış cümlesi: “Seçimlerin İncil'deki olayları değiştirmez.”
29. Akşam duası (Şema) müziksizdir: uğultu duadan hemen önce susar, “On bir... Kuzu nerede?” sözünden sonra döner.

## Bilinen sorunlar ve sınırlar

- **iOS Safari'de denenmedi.** Ses bağlamı dokunuşun hem başında hem sonunda (touchstart/touchend/click) açılmaya çalışılır; yine de ilk dokunuştan sonra ses gelmezse ikinci bir dokunuş gerekebilir. Oyun sessizken de tamamen oynanabilir.
- **Gamepad** yalnızca standart eşlemeyle (Gamepad API) kodlandı; gerçek bir denetleyiciyle sınanmadı.
- **Dikey ekranda** oyun genişliğe göre kesirli ölçeklenir (tam sayı ölçek yerine); pikseller hafif düzensiz görünebilir. Yatay ekran önerilir.
- **Başarım:** Masaüstünde ve başsız Chromium'da kare başına JS süresi 5 ms'nin altındadır. Orta düzey telefonu taklit eden 4× CPU yavaşlatmasında Beytlehem sahnelerinde karelerin küçük bir kısmı 16 ms'yi aşabiliyordu; gök ve uzak sırt artık yalnızca görünen şeritte, önceden çizilmiş sırt şeridinden kopyalanarak çizilir ve kare başına bellek ayırma azaltıldı. Gerçek telefonda ölçülmedi.
- **Öğretimdeki değnek adımı** (dört koyunu Orta taşın 3 karo yakınına sürmek) birkaç deneme isteyebilir; köşeye kaçan koyun için üçüncü ışıktaki “Hikâyeye devam” adımı geçer.
- **Yazı tipi:** “Pixelify Sans” ağdan yüklenemezse eş aralıklı yazı tipine düşülür; bu durumda bazı düğme yazıları biraz daha geniş görünür.
- **Tarayıcı yakınlaştırması** artık engellenmez (görüntü alanında `user-scalable=no` yok); oyun alanında dokunma hareketleri (`touch-action: none`) yine de sayfayı kaydırmaz ya da yakınlaştırmaz.
- Ayet aktarımları basılı YC ile karşılaştırılmamıştır (yukarıdaki 23. madde).
