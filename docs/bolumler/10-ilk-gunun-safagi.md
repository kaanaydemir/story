# Bölüm 10 — İlk Günün Şafağı

> *Bütün gece taşı nasıl açacağını düşündü. Taş açıktı.*

## 0. Künye

| Alan | Değer |
|---|---|
| **Kaynak** | **Öncü:** Luka 24:1–43 (bağlam 23:55–56; Kleopas'ın adı 24:18). **Tamamlayıcı (§2.3):** Markos 16:3–4; Matta 28:8 ve Yuhanna 20:2 (kadınların koşusu; Luka yürüyüş biçimi belirtmez); Markos 15:46 (yalnızca hatıra ve Kodeks). **Yalnızca Kodeks:** Markos 16:8 ("kalbinde" ucunun dayanağı; gösterilmez, Luka 24:9 izlenir); Matta 27:57, 27:62–66; Yuhanna 19:17, 20, 41–42; Elçilerin İşleri 1:13; Luka 8:3; Yeşu 2:5 ve Nehemya 13:19 (gece kapanan kapılar); Nehemya 7:3 (karşıt örnek); Yasa'nın Tekrarı 16:16–17 (yan hikâye) |
| **Oynanabilir karakter ve yaş** | Tamar (44); 8 yön, portreli; yan görünüm büyük sprite'ı (64×96) |
| **Yer, vakit, yıl** | Yeruşalim: 9. bölümün Şabat evi, kapıları kapalı sokaklar, Bahçe Kapısı, surun dışındaki mezar bahçesi, 8. bölümün üst odalı evi. Haftanın ilk günü, gün ağarmadan akşama. Mayasız Ekmek Bayramı haftası, bahar; yıl ekranda, Kodeks'te ve tasarım belgelerinde verilmez (GDD §2.3) |
| **Erişim düzeyi (§3.4)** | **Doğrudan:** baharatla mezara giden "öbür kadınlar" (24:10); akşam "onlarla birlikte olanlar" (24:33). Emmaus yolu oynanmaz, akşam iki yolcunun anlatısı olarak anılır (Aktarılmış) |
| **Yeni fiil / kıvrım** | **Koşu** / **Kandil yerini şafağa bırakır; 7. bölümün kaldıraç ve ip düzeneği boşa çıkar** (GDD §5.2) |
| **Kullanılan mekanikler** | Bakış (baş kaldırma, açıklıklarda gök okuma); Kandil (olağan tutuş, kaldırma, yere koyma, Koru, üfleme; bu bölümün sabitleri §6.1); Kulak ve Kavrayış; Bağla/Çöz; Taşı (kavrama, al-koy ve omuz yükü; GDD §5.1c); Söz; Seğirtme; Koşu; Güt yalnızca yan hikâyede. Tuş değil eylem adları kullanılır (GDD §5.1a, kural 3) |
| **Zorluk** | 3 (Usta 3,5) |
| **Tahmini süre** | Ana yol ≈45 dk (keşif/iş 9, bulmaca 15, katılım 14, yankı ve çerçeve 7); yan hikâye +6 |
| **Duygusal yay** | Yasın ağırlığı → ustalığın gururu → açık taşın sarsıntısı → korkuyla karışık sevinç, ilk koşu → inanılmamanın acısı → kendi tanıklığını seçmek → esenlik |
| **Palet ve ışık anahtarı** | Gece çividi ve mor (24 renk); B3'te doğuda soluk ağarma, batıda alçak pembe kuşak (morun en açık tonları) → Bahçe Kapısı'nda mor pembeye → bahçede pembe altına → koşu set-piece'inin ilk hareket karesinde **64 rengin tamamı ilk kez**. Öğle LUT'u. Akşam tam palet, kandil sıcaklığında. Doğan güneş |
| **Kurulan bayraklar** | `b10_tanik`, `b10_ifade_kosu_ugrak`, `eks_soz`, `usta_b10_tek_sefer`, `kol_b10_incir_yapragi`, `kol_b10_ip_ucu`, `kol_b10_merhem_comlegi`, `kol_b10_yun_bilezik`, `tan_b10_cok_buyuk_tas`, `tan_b10_sozlerini_hatirladilar`, `tan_b10_petrus_kostu`, `tan_b10_ekmegi_bolerken`. **Yerel:** `b10_mika_gece`, `b10_yanki`, `b10_balik`, `b10_tanik_cumlesi` (kayıt) |
| **Okunan bayraklar** | `b01_haber`, `b03_sir`, `b04_yoram`, `b05_dositeos`, `b06_esik`, `b08_kapi`, `b09_yoram_soz`, `eks_soz`, `eks_el`, `eks_kalp`, `ilis_yoram`, `ilis_natan`, `ilis_dositeos`, `ilis_hananya`; isteğe bağlı `kol_b09_kemik_boncuk` |

## 1. Kaynak Metin ve Uyarlama Sınırları

Bütün alıntılar **[yakın aktarım]**dır; İsa dışındaki kanonik konuşanların satırları **[yakın aktarım; kanonik replik]** etiketini taşır (GDD §15.1-7). Ağ erişimi kısıtlı olduğundan YC yalnızca arama özetleriyle karşılaştırılabildi; özetlerin hangi çeviriden geldiği her zaman kesin değil. **Örtüşenler:** 24:5 ("Diri olanı neden ölüler arasında arıyorsunuz?"), 24:6 ("O burada yok, dirildi"), 24:36 ("Size esenlik olsun!"). **Özetlerde farklı görünenler:** 24:34 "…Simun'a görünmüş!" (iki ayrı özette; bu belge bu biçimi benimser), 24:11 "Ne var ki, bu sözler elçilere saçma geldi…" (tek özet), Markos 16:3 "…kim yana yuvarlayacak?" (tek özet). **Metin kilidinden önce YC'nin basılı metniyle tek tek karşılaştırılacaklar:** 23:55, 24:5–7, 24:11, 24:34, 24:35, 24:38–39, 24:41 ve Markos 16:3. Bulunan farklar bu tabloya işlenir.

### 1.1 Metnin anlattığı

| Ayet | Metin | Oyunda |
|---|---|---|
| Mk 15:46; Lk 23:55–56 | Yusuf taşı yuvarlar; kadınlar mezarı ve cesedin nasıl konduğunu görür, baharat hazırlar, Şabat'ta dinlenir | 9. bölüm; burada Tamar'ın hatıra sözleri (B2, B3) ve Sahne 5'te ekranda 23:55 |
| Lk 24:1; Mk 16:3 | Haftanın ilk günü sabah erkenden kadınlar hazırladıkları baharatı alıp yola çıkar; "Taşı bizim için kim yuvarlayacak?" | B2'nin sebebi; kadınlar kendi kaplarını taşır; B3'te fısıltı |
| 24:2–3; Mk 16:4 | Başlarını kaldırınca taşı yuvarlanmış bulurlar (çok büyük bir taştır); içeride ceset yoktur | Baş kaldırma; tersine "aha"; dokunmama |
| 24:4–8 | Parlak giysili iki adam: "Diri olanı neden ölüler arasında arıyorsunuz? O burada yok, dirildi!" Celile'deki sözü hatırlatırlar; kadınlar hatırlar | Dokunmama; yalnızca metin |
| 24:9–12 | Mezardan dönüp On Birler'e ve öbürlerine bildirirler (Mecdelli Meryem, Yohanna, Yakup'un annesi Meryem, öbür kadınlar); elçiler inanmaz; Petrus mezara koşar, keten bezleri görür | Koşu ve haber sahnesi |
| 24:13–35 | Emmaus. İki öğrenci Yeruşalim'e döner; On Birler ve onlarla birlikte olanlar onlara "Rab gerçekten dirildi, Simun'a görünmüş!" der (24:34); iki yolcu yolda olanları ve İsa'yı ekmeği bölerken nasıl tanıdıklarını anlatır (24:35) | Yalnızca 24:33–35; 24:27'nin içeriği verilmez. 24:34'ün konuşanı için Kodeks 8 |
| 24:36–43 | İsa aralarında belirir: "Size esenlik olsun!"; dehşet; "Ellerime, ayaklarıma bakın"; yiyecek ister, kızarmış balığı yer | Dokunmama; tek girdi baş kaldırmak |

### 1.2 Oyunun eklediği kurgusal katman

"Öbür kadınlar"dan Şifra (Kefarnahumlu Amram'ın dulu; 2. ve 9. bölüm); Şabat evinin avlusunda uyuyan Mika (9. bölüm) ve annesi; kaldıraç düzeneğinin bu mezara uyarlanması ve taşın kanalı (arkeolojik sahneleme); rüzgârla ve ağaran gökle yol bulma; kent kapılarının gün ağarınca açılması ve Bahçe Kapısı bekçisi (sahneleme kararı, Kodeks 4); koşuda rastlanan yüzler (kervan hanındaki Samiriyeli kervan da bir sahneleme kararıdır, Kodeks 4); öğlen Mika'nın sorusu; akşam ızgaradaki balığı Tamar'ın çevirebilmesi (kurul onayına bağlı).

### 1.3 Bu bölümün kırmızı çizgileri

- Taşın yuvarlanışı ve diriliş anı asla gösterilmez; hiçbir girdi taşın açık bulunmasını etkilemez.
- Mezarda asker yoktur (bekçileri yalnızca Matta anar; Kodeks). Kent kapısı bekçisi sivil bir Yahudi'dir; Roma ya da yardımcı birlik kiti kullanılmaz.
- İki adamda kanat, hale, ışın ya da şimşek efekti yoktur; yüz ayrıntısı çizilmez; parlaklık yalnızca giysidedir.
- Dirilmiş İsa'da yüz, ses, portre ve beliriş efekti yoktur; elleri ve ayakları silüet jestidir, yara izi çizilmez.
- Golgota uzakta ve boştur; direk görünmez.
- Kanonik kadınlar ışığı izleyen bir sürü gibi kurgulanmaz. Nereye gittiklerini bilen gruptur; Tamar kandili taşıyarak hizmet eder. Kurgusal satırları yoktur.
- 24:34 ve iki adamın duyurusu Tamar'ın ağzından ancak aktarım olarak çıkar ("… dedi"); 24:34'ü hiç söylemez.
- 24:36'nın selamı ("Size esenlik olsun!") bu bölümde yalnızca İsa'nındır; başka kimse bu kalıbı kullanmaz.
- Emmaus açıklaması (24:27), bahçıvan figürü ve iki yolcuya yüklenmiş jestler yer almaz.
- Kodeks'teki ayet atıfları yalnızca ayetin gerçekten söylediğine verilir; arkeolojik ve sahneleme kararları ayrıca işaretlenir.

## 2. Deneyim Hedefi

**Tez:** Oyuncu oyun boyunca öğrendiği her beceriyi bir gecede birleştirip taşı açmaya hazırlanır; şafakta taşı açık bulur ve elleri ilk kez boş, koşar.

- **Hissetmesi gereken:** Ustalığın gururu (7. bölümde öğrendiğini yeni koşullara uydurabilmenin rahatlığı), bu gururun sevinçle boşa çıkması, bedende özgürlük, sonda esenlik.
- **Yapması gereken:** Uyuyanları uyandırmadan toplamak, 7. bölümün düzeneğini yeni koşullara uyarlamak (Yair yok, taş daha ağır), ip ulamak, rüzgârı ve ağaran göğü okumak, koşmak, kime uğrayacağına ve nasıl tanıklık edeceğine karar vermek.
- **Öğrenmesi gereken:** Yuvarlak mezar taşlarının nadirliği, Bahçe Kapısı ve Kral Hirodes'in kuleleri, kentin suyu, haftanın ilk günü.

## 3. Karakterler

| Ad | Kanonik/kurgusal | Rol | Replik kilidi | Sprite notu |
|---|---|---|---|---|
| Tamar (44) | Kurgusal | Oynanabilir | — | 8 yön, portre, yan görünüm 64×96 |
| Yaşlı Tamar, Sara | Kurgusal | Çerçeve | — | Sabit kompozisyon, portre |
| İsa | Kanonik | Akşam belirir | **Evet** (24:36, 38–39, 41) | 4 yön seti; yalnızca 3/4 arkadan duruş ve el jesti; yüzsüz; portre yok |
| İki adam | Kanonik | 24:4–7 | **Evet** | İnsan boyu, beyaz giysi; yüz ayrıntısı çizilmez (portresiz NPC kuralı); parlaklık yalnızca giysidedir; portre yok |
| Mecdelli Meryem, Yohanna, Yakup'un annesi Meryem | Kanonik | 24:1, 10; kendi baharat kaplarını taşırlar; Tamar'la grup olarak yürür ve koşarlar | **Evet**; kurgusal satır yok | Kit varyantı ×3 (9. bölümdeki "Celile'den gelen kadınlar" kitinden); 4 yön; yan görünümde orta katman (32×48); portre yok |
| Petrus, elçiler; Kleopas (24:18) ve arkadaşı | Kanonik | 24:11–12, 33–35 | **Evet**; iki yolcuya söz ya da jest yazılmaz | Kit (8. bölüm) |
| Şifra (≈60) | Kurgusal (9. bölüm) | Yoldaş; Kefarnahumlu bazalt değirmen taşı ustası Amram'ın dulu; 3. ışık. Kandilin ardından gelen tek kişi odur | — | 4 yön; yan görünümde orta katman; portre (9. bölüm). 2. bölümdeki kamp büyüğü Amram'ın karısıyla aynı kişi (GDD §3.3) |
| Mika (7) ve annesi | Kurgusal (9. bölüm) | Avluda uyurlar; öğlen soruyu Mika sorar | — | 4 yön; portre yok; annesi kit |
| Yoram | Kurgusal | `b09_yoram_soz`'e göre | — | 4 yön + yan görünüm 64×96 (4. bölüm), portre |
| Natan | Kurgusal | `b06_esik`'e göre evde ya da Mecdel'de | — | Mevcut set, portre |
| Gad, Elişeva, Dositeos, Hananya | Kurgusal | Koşudaki yüzler | — | Mevcut setler; yan görünümde orta katman |
| Bahçe Kapısı bekçisi; B3'teki batı kapısı bekçisi | Kurgusal | Kapılar | — | Kent kapısı bekçisi: Yahudi, sivil giysili, elinde sopa ve fener. Roma ya da yardımcı birlik kiti kullanılmaz; sivil kit varyantı |
| Başkâhinin kapı muhafızı (8. bölüm) | Kurgusal | Koşuda dış kapıda esner | — | 8. bölümün sprite'ı |
| Eliab (10) | Kurgusal | Yan hikâye; 1. bölümdeki Yoaş'ın torunu | — | Çocuk kiti; 1. bölümün koyunları |

## 4. Mekânlar

### 4.1 Ev (9. bölümün Harita D'si; yeniden kullanım)

İç mekân kiti; koordinatlar her bölümün kendi köşesinden. **Oda (12×9):** kuzeyde kandil nişi ve yağ küpü (6,0); doğuda yüksek pencere (11,3); batıda hasırlar: Tamar (1,2), Şifra (1,4) uyanık, Natan `girdi` ise (1,6); ortada açılmış bohça ve altı alet (6,4), Tamar'ın ipi burada; güneyde kapı ve eşik (6,8); `disarida_konustu` ise Natan eşikte uyur (baş 5,8); kapının dibinde merhem çömleği (7,7). **Avlu (16×10):** oda kapısı kuzeyde (6,0); ortak ocak (4,4), közün başında Mika (baş 4,5) ve annesi (baş 5,6) uyur; su küpü taş ayakta (2,4), taş takoz ayağın girintisinde (2,5); kova ipi küpün yanındaki askıda (1,4); havan sekisi (10,3); çamaşır ipi (8,8)–(14,8); güneyde avlu kapısı (8,9) ve altındaki kama; binek taşı (9,8); dama merdiven doğu duvarında (15,2–7); çalışma hasırı (8,5). **Dam (10×8):** merdiven başı (9,7); Yoram gölgelik direğiyle iki tahıl küfesi arasında uyur (baş 3,3); kayık ipi başının yanındadır (4,3), ancak (4,2) ya da (4,4)'ten uzanılır; 6 arşınlık meşe kiriş kuzey korkuluğa dayalı (8,0); komşu incirin dalları korkuluğa sarkar (2,0). **Işık:** gece, tek dinamik ışık Tamar'ın kandili; Sahne 13'te öğle LUT'u. **Paralaks:** yıldızlı gök, Tapınak duvarının kara kütlesi.

### 4.2 Sokaklar (yeni harita, 64×48 karo)

Evin sokağı (58,44) güneydoğuda; beş kavşak (§6.3), ikisi açıklık: A1 sarnıçlı meydan (54,32), A2 kepenkli pazar (30,28); kapı meydanı A3 (20,14). Sur y = 12'de, Bahçe Kapısı (20–21,12); batısında Kral Hirodes'in üç kulesi (x 6–14). Üst odalı evin girişi (14,30): A2'nin batı sokağı üzerinde, yukarı kente çıkan basamaklı geçidin başında; buradan eve giden yol A2 → K3 → A1 → K1'den geçer. Surun ötesi (y 0–11) yalnızca paralakstır; kapının dış yüzü 9. bölümün Harita A'sındaki kapıyla aynı çizimdir. Karo seti Yeruşalim. **Işık:** çivit ve mor → A3'te pembe; Sahne 12 ve yan hikâyede öğle LUT'u. **Paralaks:** gece göğü; B3 sırasında doğuda soluk ağarma, batıda alçak pembe kuşak; kuleler ve Tapınak duvarı bu aydınlığa karşı kara biçimler; dam silüetleri. **Dayanak:** Bahçe Kapısı (Josephus, *Yahudi Savaşı* 5.146), Kral Hirodes'in kuleleri (5.161–175).

### 4.3 Mezar bahçesi (9. bölümün Harita C'si; yeniden kullanım)

Taş ocağının batı duvarında yeni mezar (18,6), önünde yalnız zeytin (17,8); kadınlar batı girişinden, sur yolundan gelir. 9. bölümde kurulanlar (burada yeniden kullanılır): zeytinin dibinden avlucuğa inen üç basamak, basamak başı (17,9); ağzın önünde eğimli kanal (kapalı konum ağzın üstünde, açık konum yukarı uçta, 20,6). **Işık:** pembeden altına. **Dayanak:** kente yakın, çarmıha gerildiği yerdeki bahçe ve yeni mezar (Yuhanna 19:41–42). Kanal ve eğim oyunun arkeolojik sahnelemesidir (Kodeks 1).

### 4.4 Set-piece — Şafak koşusu (yan görünüm; GDD §11.1'deki beş set-piece'ten biri)

≈15 ekranlık (9.600 px) şerit, beş bölüm, aralarda silme: (1) bahçe yolu ve Bahçe Kapısı · (2) havuz başı (kulelerin yakınındaki Amygdalon Havuzu) · (3) pazar ağzı ve kervan hanı · (4) başkâhinin dış kapısı (8. bölüm) · (5) elçilerin evine çıkan sokak. **Katmanlar** (GDD §11.2'deki katman ve temas kuralı; derinlikle ölçek tutarlı): ön katmanda Tamar ve Yoram (64×96) ile çardaklar; orta katmanda kanonik kadınlar, Şifra ve yüzler (32×48, yan profil); uzak katmanda altın gök, kuleler, açılan kapı ve pencereler. Yüzler orta katmanda, eşiklerde durur. **Dayanak:** Amygdalon Havuzu (Josephus, *Yahudi Savaşı* 5.468; *doğrulanmalı*); Kodeks 11.

### 4.5 Üst odalı ev (8. bölümün Harita A'sı; yeniden kullanım)

Sabah zemin avlusu; akşam üst oda (13×10): kandiller, kapı yanında mangal. Sokaklar haritasındaki girişi (14,30). Luka yer vermez; Elçilerin İşleri 1:13 ile 8. bölümün odasının özdeşleştirilmesi *geleneksel*dir.

## 5. Sahne Akışı

| # | Sahne | Kip | Ne olur | Dk | Bayrak |
|---|---|---|---|---|---|
| 1 | **Çerçeve girişi** | Sabit | Sara: "Nine, o mezarın taşını kim yuvarladı?" Yaşlı Tamar: "Ben yuvarlayacaktım." + `b08_kapi` cümlesi | 1 | — |
| 2 | Karanlıkta | 3/4, Ev | Tamar uyanır. Şifra fısıldar: "Taşı kim açacak bize?" (seçim, §8.1). Şifra'nın fısıltıları ile 9. ve 7. bölümün hatıraları söz halkasına kendiliğinden düşer; yas evinde Kulak ile söz toplanmaz (GDD §5.3). Sahnenin son fısıltısı Şifra'nın takoz ve kama sözüdür | 2 | — |
| 3 | **B1 Uyuyan Ev** | 3/4 | Malzeme toplanır; damda Yoram'a Bakış, kayık ipi | 3 | `kol_b10_incir_yapragi`, `b10_mika_gece` |
| 4 | **B2 Taşı Kim Yuvarlayacak?** | 3/4, avlu | Plan cümlesi, ip, demet | 7 | `usta_b10_tek_sefer`, `kol_b10_ip_ucu` |
| 5 | Kapıda buluşma | 3/4 | Kanonik kadınlar hazırladıkları baharatın kaplarıyla (24:1) avlu kapısına sessizce gelir. Ekranda Luka 23:55 hatırlatılır (kadınlar mezarı ve cesedin nasıl konduğunu görmüştü; [yakın aktarım]); kurgusal satır yoktur. Tamar merhem çömleğini Şifra'ya verir, demeti omuzlar (omuz yükü, §6.1). Grup birlikte yola çıkar; Mecdelli Meryem Tamar'ın yanında yürür | 1 | — |
| 6 | **B3 Kapalı Kapılar** | 3/4, Sokaklar | Alev ve ağaran gök; A1'de Markos 16:3 | 5 | — |
| 7 | Bahçe Kapısı'nda şafak | 3/4, sinemaskop | Bekçi: "Gün ağarmadan açmam, hanımlar. Kuşlar ötsün, açarım." Grup kapının önünde bekler; Tamar demetin üstüne oturur. Gök pembeleşir, yıldızlar söner, ilk kuşlar öter. "Üfle" (Etkileşim); 15 sn girdi yoksa Şifra: "Söndür onu, kızım; gün geldi." ve Tamar söndürür. Bekçi kapıyı açar. Kandil arayüzü bölüm sonuna dek kaybolur | 2 | **Kıvrım** |
| 8 | Bahçe yolu | 3/4, Bahçe | Omuz yüküyle yavaş yürüyüş; kadınlar kaplarıyla yanında. Basamak başında (17,9) hareket kilitlenir, yalnızca soluk **"başını kaldır"** işareti kalır (Markos 16:4: "başlarını kaldırıp baktıklarında"). Tamar başını kaldırırsa ya da 8 sn sonra kamera taşa yükselir (§7.1). Kayıt yok | 1,5 | — |
| 9 | **Açık taş ve mezar** | 3/4, sinemaskop | §7.1 | 3,5 | `tan_b10_cok_buyuk_tas`, `tan_b10_sozlerini_hatirladilar` |
| 10 | **Şafak koşusu** | Set-piece | §7.2 | 2 | `b10_ifade_kosu_ugrak` |
| 11 | Elçilere haber | 3/4, Üst odalı ev | §7.3 | 3 | `kol_b10_merhem_comlegi`, `tan_b10_petrus_kostu` |
| 12 | Öğle dönüşü | 3/4, Sokaklar, öğle | Kurgu kesmesi: öğle. Tamar üst odalı evden (14,30) çıkar. Harita düşüncesi: "Eve dönmeliyim; Mika bekliyor." Yol A2'den geçer; A2'ye 8 karo kala Eliab'ın ağlaması duyulur ve harita düşüncesine yazılır ("Pazarda bir çocuk ağlıyor."). A2'de yan hikâye açılır ya da geçilir; A2 geçilince eve "Yolu biliyorum" geçişi açılır | 1 | — |
| — | *Yan hikâye* | 3/4, Sokaklar, öğle | §11 | +6 | `kol_b10_yun_bilezik` |
| 13 | **Yankı** | 3/4, Ev, öğle | Avluya girişte tanıklık cümlesi istemi; Mika'nın sorusu; seçim | 4 | `b10_tanik`, `b10_yanki`, `b10_tanik_cumlesi`, `eks_soz` |
| 14 | Akşama doğru | 3/4 | "Yolu biliyorum" geçişi; Yoram bayraklara göre | 1,5 | — |
| 15 | Toplantı odası | 3/4, üst oda | 24:33–34 metin olarak akar; iki yolcunun anlatısı (24:35) Kulak ile; Tamar mangaldaki balığı çevirebilir | 2,5 | `tan_b10_ekmegi_bolerken`, `b10_balik` |
| 16 | **"Size esenlik olsun!"** | 3/4, sinemaskop | §7.4 | 3 | — |
| 17 | **Çerçeve kapanışı** | Sabit | Tanıklık cümlesi yaşlı Tamar'dan; eksen satırı; onuncu bant; Diğer Yollar; epilog (GDD §8.9, ayrı belge) | 2 | — |

**Tempo:** keşif/iş 9 (Sahne 2, 5, 7, 8, 12, 14) · bulmaca 15 (Sahne 3, 4, 6) · katılım 14 (Sahne 9, 10, 11, 15, 16) · yankı ve çerçeve 7 (Sahne 1, 13, 17) = 45 dk.

## 6. Bulmacalar

### 6.1 B1 — Uyuyan Ev (günün işi)

**Tür:** Kandil ve Bakış ile toplama · **Zorluk:** 1,5 · **Süre:** 3 dk

- **Dünyadaki sebep:** Gereken her şey uyuyan evin içine dağılmıştır; yas evinde kimse erken uyandırılmak istemez.
- **Kurulum:** Kiriş (dam), binek taşı (avlu) ve iki kama (avlu kapısının kaması, su küpünün takozu) çalışma hasırına (8,5) getirilir. İpler (Tamar'ınki bohçada, kova ipi, Yoram'ın kayık ipi, çamaşır ipi) istenen sırayla alınır. Hangilerinin gerektiği B2'de anlaşılır: üç sağlam ipin üçü de gerekir. Eksik ip varsa Tamar B2-B'de söyler ve ev B1 kurallarıyla yeniden dolaşılır. Sıra serbesttir. **Bitiş:** Kiriş, binek taşı ve iki kama hasırda olunca B2-A başlar.

**Bu bölümün kandil sabitleri** (GDD §5.1b'deki kanonik değerler; Kaldırılmış'ın 4 karosu yerleşim içi değeridir; bölüm sapması: yağ tükenmez):

| Durum | Işık yarıçapı | Not |
|---|---|---|
| Olağan (GDD §5.1b'de Açık; elde, göğüste) | 2 karo | Yürürken varsayılan tutuş |
| Kaldırılmış | 4 karo (ev, avlu, dam, sokak); girintiler görünür | Omuz yükü ya da iki elle yük varken yapılamaz |
| Yerde | 2 karo | Etkileşim ile konur ve alınır |
| Kuşakta (Taşı'nın kavrama biçimiyle iki elle yük: binek taşı) | 1 karo; en kısık alev, sönmez | Hız −%40, seğirtme kapalı (GDD §5.1c); 4. bölüm kural 6 |
| Omuz yükü (kiriş; B3'te ve bahçe yolunda demet) | Olağan, 2 karo; alev okunur | Hız −%30, seğirtme kapalı (GDD §5.1c). Kandil elde kalır; kaldırılamaz, ama yere konup alınabilir. 4. bölüm kural 6 bu durumda uygulanmaz |
| Koru | 1 karo; alev sönmez ama bilgi vermez | Yalnızca yürürken; yürüyüş hızının %40'ı (GDD §5.1b); 4. bölümdeki gibi elle başka iş yapılamaz, bir şey almak için bırakılır |
| Yağ | Tükenmez; alev boyu sabittir | Kandil 9. bölümde ayrılan yağla doludur (Şifra: "Yağın birini kandile ayır; gece uzun"), nişteki küp de doludur |
| Sönme | Evde ve sokaklarda yok; açıklıklarda (A1, A2) korunmayan alev 2 karo yürüyüşte ya da 2 sn beklemede, kaldırılmışsa 1 karoda söner (GDD §5.1b) | Söneni Şifra köz çömleğinden yakar (§6.3) |

- **Kurallar:** (1) Kare merkezleri arası mesafe yarıçaptan küçükse kare aydınlıktır. (2) Uyuyanın baş karesi ışığa ilk girince bir kez kıpırdanır; yüzü ışıktayken Tamar 3 karo içinde Etkileşim yaparsa uyanır. (3) Bakış basılıyken nesneler yıldız ışığında kenar ışığı alır; girintideki iki kama ise yalnızca kaldırılmış kandille görünür ya da Şifra'nın Sahne 2'nin sonundaki fısıltısıyla bilinir: "Küpün ayağında taş takoz olur, kapının altında da kama." (4) Kiriş omuz yüküdür; binek taşı Taşı'nın kavrama biçimiyle iki elle taşınır (kandil kuşakta; GDD §5.1c). Kamalar ve ipler al-koy ile alınır. Kirişi Taşı ile kavramak çentik sözünü halkaya kendiliğinden ekler (§6.2).
- **Çözüm:** Kapı kaması kaldırılmış kandille bulunur; çevrede uyuyan yoktur ((8,8)'den Mika'nın başına 5 karo). **Takoz:** (2,6)'dan kandil kaldırılırsa Mika'nın başı (2,24 karo) ve annesininki (3 karo) aydınlanır, ikisi kıpırdanır. Tamar olağan tutuşla (2 karo) takozu (2,6) ya da (1,5)'ten alırsa kimse uyanmaz; (3,5)'ten alırsa olağan kandil bile Mika'nın yüzüne düşer (1 karo). Şifra'yı dinleyen oyuncu kandili hiç kaldırmadan el yordamıyla alır. **Kayık ipi** (B2 için gerekli; B1'de ya da B2-B sırasında alınır): Uzanılan iki kare de Yoram'ın başına 1,41 karo uzaktadır; elde olağan kandil yüzünü aydınlatır. Tamar kandili Yoram'ın başından en az 2 karo öteye koyar (yerde 2 karo; örneğin (6,3)) ve ipi Bakış'ın kenar ışığıyla alır. Koru ile alınamaz. `disarida_konustu` ise eşikteki Natan'ın yanından geçmek onu yalnızca kıpırdatır.
- **"Aha" anı:** *"Nerede olduğunu biliyorsam karanlıkta da bulurum."* Kandili bırakmak şafağı haber veren ilk adımdır.
- **Üç Işık:** 1. *"Annem bizi uyandırmadan sabah ateşini yakardı; ışığı hep kendinden uzak tutardı."* 2. Eksik nesneler ve uyuyanların yüzlerindeki halka parlar. 3. Şifra: "Takozu ben alırım; sen damdan kirişi indir." → Hikâyeye devam.
- **Yanlış denemelerde:** Uyanmak başarısızlık değildir. Mika'nın annesi: "Tamar? … Uyu, Mika." Natan: "Abla? … Git; ben buradayım." Mika ve Yoram için §8.1; Yoram uyansa da ip her durumda alınabilir.
- **Usta:** Yok. **Hikâye kipi:** Şifra takozu ve kirişi getirir, ipleri B2'de uzatır. **Kodeks:** 9.

### 6.2 B2 — Taşı Kim Yuvarlayacak? (imza bulmaca)

**Tür:** Kavrayış (plan) ve Bağla (ip) · **Zorluk:** 3 (Usta 3,5) · **Süre:** 7 dk (A 4, B 3)

**Dünyadaki sebep:** Cuma akşamı taş kanalda yokuş aşağı kolayca kaymıştı; açmak yokuş yukarıdır (Markos 15:46: Yusuf taşı yuvarladı; kanal ve eğim oyunun arkeolojik sahnelemesidir, Kodeks 1). Tamar düzeneği 7. bölümde Şimi'nin işliğinde kurmuştur. Bu kez **Yair yoktur**, kamaları koyacak olan Tamar'dır. Taş da başkadır: yuvarlaktır, daha ağırdır, yokuş yukarı itilecektir.

**Söz halkası** (yas evinde Kulak ile söz toplanmaz, GDD §5.3; bütün sözler halkaya kendiliğinden düşer):

| Kaynak | Söylenen | Söz (tür) |
|---|---|---|
| Cuma hatırası (9. bölüm; Sahne 2'de kendiliğinden) | "Taş kanalda yokuş aşağı bırakıldı; açmak yokuş yukarı." | *taş yokuş aşağı kapandı* (neden) |
| Aynı | "Ağız alçak; taş dört karış çekilmeden girilmez." | *dört karış* (sayı) |
| Aynı | "Avlucukta iki kişi zor durur; öbürleri basamakların başında, sekiz arşın geride bekledi." | *avlucukta iki kişi* (kişi), *sekiz arşın* (sayı) |
| 7. bölüm hatırası (Sahne 2'de kendiliğinden) | Şimi: "Kirişin kısa kolu bir, uzun kolu beş ise, bir el beş el olur." | *kısa kol, uzun kol* (neden), *beş el* (sayı) |
| Aynı | Tamar: "Desteği taşın dibine koyarsam üç kişi yeter. Taş az yürür ama kamalar yürür." | *üç kişi* (kişi), *iki kama yürür* (neden) |
| Şifra (Sahne 2, fısıltı) | "Kocam Kefarnahum'da değirmen taşı keserdi. Yuvarlak taş kaldırılmaz, yuvarlanır: o boyda bir taşı yokuş yukarı ancak yirmi el iter." | *yirmi el* (sayı) |
| Aynı | "Mecdelli Meryem, Yohanna, Yakup'un annesi Meryem, bir de ben: dört kadın. Seninle beş kadın." | *dört kadın*, *beş kadın* (kişi) |
| Aynı | "Cuma akşamı taşı Yusuf'un adamları yuvarlamıştı." | *Yusuf'un adamları* (kişi) |
| Kiriş (Taşı ile kavrayınca, kendiliğinden) | "Altı arşın; çentikler taş ucundan bir, iki, üç arşında." | *birinci / ikinci / üçüncü çentik* (yer) |

**A. Plan cümlesi:**
> "Bu taşı yokuş yukarı ancak **[sayı]** iter. Kamaları ben koyacağım; ipi **[kişi]** çeker. Az eli çok eden **[neden]**; öyleyse desteği **[yer]** bağlarım."

Adaylar 4 × 5 × 3 × 3 = 180 birleşim; toplu doğrulama, yanıt "doğru" ya da "henüz değil". Ekler şablonda çözülür (GDD §15.3).

**Kurallar (7. bölümle aynı):** Kısa kol d arşın, uzun kol 6 − d; bir el (6 − d)/d el olur. Her kaldırışta taş d karış ilerler; her kaldırıştan sonra kanala kama girer, iki kama sırayla yürür. **Yeni olan:** Kamaları koyan Tamar çekmez; ipte en çok dört kadın kalır ve taş yirmi el ister.

| Çentik | Bir el | Dört çekenle | Yirmi ele gereken çeken | Kaldırış (4 karış) | Sonuç |
|---|---|---|---|---|---|
| 1 | 5 el | 20 el | 4 | 4 | **Olur:** dört kadının dördü de çeker; biri eksik olsa (15 el) taş kımıldamaz. İki kama yürür |
| 2 | 2 el | 8 el | 10 | 2 | Olmaz |
| 3 | 1 el | 4 el | 20 | 2 | Olmaz |

**Çıkarım zinciri:** Taşın istediği güç Şifra'dandır (*yirmi el*); *beş el* Şimi'nin kaldıraç oranıdır, gücün kendisi değil. Çekenlerin sayısı bölümün kıvrımından çıkar: Yair yoktur, kamaları Tamar koyar, öyleyse beş kadından ipte dördü kalır (*dört kadın*). 7. bölümdeki alışkanlıkla *üç kişi* diyen ya da Tamar'ı da ipe sayıp *beş kadın* diyen oyuncu "henüz değil" alır. Dört el ancak birinci çentikte yirmi el eder. Az eli çok eden kaldıraçtır (*kısa kol, uzun kol*); *iki kama yürür* doğru bir sözdür ama taşın kazandığını tutar, eli çoğaltmaz.

**Tamar'ın çıkarımı (ölçü; 9. bölümün Cuma hatırasına eklenen yorum):** *"Kirişin uzun ucu avlucukta kalır; çekenler basamak başında, oradan sekiz arşın geride durur."* Planın ipteki sekiz arşınlık boş kısmı ve ilmiklerin kirişten sekizinci arşından başlaması (B-4) buradan çıkar.

**Çözüm (tek):** *yirmi el* · *dört kadın* · *kısa kol, uzun kol* · *birinci çentik*. Tamar sonucu söyler: "Birinci çentik: bir el beş el olur. Dört kadın yirmi el eder; biri eksik olsa taş kımıldamaz. Dört kaldırışta dört karış; kamaları Yair gibi ben yürütürüm. İp: sekiz arşın, kiriş düğümüne bir, her çekene bir. Dört çekene on üç arşın."

**B. Düzenek (Bağla):**
1. **İpler:** Tamar'ın ipi (7. bölümde altı arşın, her arşına bir düğüm; Tamar arşınlarken mezarda püsküllenen ucunu kendiliğinden keser, beş arşın kalır; kesilen uç hasırda kalır ve Bakış ile alınırsa `kol_b10_ip_ucu`) · kova ipi 7 arşın · Yoram'ın kayık ipi 4 · çamaşır ipi 9, ince keten. Tamar eline aldığı ipi kendiliğinden arşınlar ve her arşına düğüm atar; uzunluk halkada sayı olarak kalır. **Gerdir** (Etkileşim): sağlam ip dokunsal olarak serttir, ince ip çıtırdar: "Tek kişiyi bile zor kaldırır."
2. **Ulama düğümü** (Bağla): bir arşın yer; Tamar yeniden arşınlar.
3. **Bilezik bağı:** binek taşı birinci çentiğe; **kiriş düğümü:** ip uzun uca, 2 ya da 3 tur (7. bölüm kuralı), bir arşın.
4. **İlmikler:** Plana göre dört çeken vardır. Her ilmik bir Bağla girdisidir ve kirişten sekizinci arşından başlayarak birer arşın arayla kendiliğinden yerleşir.
5. Kamalar demete. **Demeti kaldır** (Taşı) toplu denetimdir: ip ≥ 13 arşın (9 + 4), her parça sağlam, iki kama demette, kiriş düğümü 2–3 tur.

**Kabul edilen tek düzen:** Üç sağlam ip ulanır (5 + 7 + 4 − 2 ulama = 14 arşın); sıra serbesttir. Tamar + kova (11), kova + kayık (10) ve Tamar + kayık (8) yetmez; ince ipin girdiği her birleşim kopar. Düğümler 8 tanedir: 2 ulama, bilezik, kiriş ve 4 ilmik (≈1 dk; §5.4). Kayık ipi elde değilse Tamar arşınlayınca söyler: "İp yetmiyor. Damda Yoram'ın kayık ipi var."

**"Aha" anı:** *"Yair yok; kamaları ben koyarsam ipte dört kadın kalır. Dört el ancak birinci çentikte yirmi el eder."* İkincisi: *"On üç arşın gerek. En uzun ip en zayıf olanı; üç sağlam ipi ulamalıyım."* Asıl tersine "aha" mezarda gelir (§7.1).

**Üç Işık:** Plan: 1. *"Şimi'nin işliğinde kamaları Yair koymuştu. Burada kim koyacak? O zaman ipte kaç kişi kalır?"* 2. Boşlukların doğruluğu işaretlenir. 3. Şifra: "Kamaları sen koyacaksın, kızım; ipte dördümüz kalırız. Dördümüz ancak taşın dibinde yirmi el ederiz." İp: 1. *"Düğüm her seferinde bir arşın yiyor. İnce ip birini bile kaldırır mı?"* 2. Sağlam ipler parlar, ince ip kesik çizgilidir. 3. Şifra: "Seninkini kova ipiyle ula; Yoram'ınkini de kat. Çamaşır ipine güvenme." Her üçüncü ışıktan sonra "Hikâyeye devam".

**Yanlış denemelerde:** Plan için "Henüz değil"; üç denemeden sonra 1. ışık kendiliğinden gelir. Düzenek fiziksel ve bilinebilir olduğundan Tamar tek sebep söyler: "İlmikler basamağa yetişmiyor." / "İnce ip kopar." / "Tek kamayla taş geri kaçar." / "Tek tur kayar." Her düğüm Çöz ile açılır.

**Usta kısıtı:** `usta_b10_tek_sefer`: plan ilk toplu denemede doğru, düzenekte hiç Çöz yok, demet ilk kaldırışta denetimi geçer. Köşede tek düğüm simgesi.

**Hikâye kipi:** Plan kendiliğinden kurulur, Şifra ipleri uzatır (gerekirse kayık ipini damdan getirir), düğümler otomatiktir. **Kodeks:** 1, 2. Ölçüler ipe düğümle tutulur (okuryazarlık varsayılmaz).

### 6.3 B3 — Kapalı Kapılar

**Tür:** Kandil ve Bakış ile yol bulma · **Zorluk:** 2,5 · **Süre:** 5 dk

- **Dünyadaki sebep:** Gece sokakları birbirine benzer; hacılar avlularda ve sokak başlarında uyur; mezar surun dışındadır. Kadınlar nereye gittiklerini bilir: mezarı Cuma akşamı görmüşlerdir (23:55) ve yol Bahçe Kapısı'ndan geçer. Karanlıkta hangi sokağın kapıya çıktığını kandili taşıyan Tamar okur.
- **Grup:** Kanonik kadınlar Tamar'la birlikte, grup olarak yürür; Mecdelli Meryem Tamar'ın yanındadır, her kadın kendi baharat kabını taşır (24:1). Kavşakta grup Tamar'la birlikte durur, Tamar bir ağza girince birlikte yürür, çıkmazda birlikte döner. Kadınlar ışığı izleyen bir yapay zekâ olarak kurulmaz; yol göstermez, yol sormaz, kurgusal satırları yoktur. Kandilin 3 karo ardından gelen tek yoldaş Şifra'dır.
- **Kurallar:** (1) Gece esintisi kırlardan sokaklara iner. Şifra: "Gece rüzgârı kırlardan iner, kente dolar. Kefarnahum'da balıkçılar kıyıyı rüzgârın geldiği yandan bulurdu." (2) **Alev okuma:** Sokak ağzında olağan tutuşla 1 sn durulursa alev (a) Tamar'a yatar, duman geriye akar: sokak kırlara açılır; (b) içeri yatar: kente iner; (c) dik durur: çıkmaz. Sokak esintisi alevi söndürmez; Koru altındaki alev bilgi vermez. Omuz yükü alev okumayı engellemez (§6.1). (3) **Açıklıklarda** (A1, A2) rüzgâr serbesttir; korunmayan alev 2 karo yürüyüşte ya da 2 sn beklemede söner (GDD §5.1b). Koru ile yanık tutulabilir ama örtülü alev bilgi vermez: açıklıkta yol gökten okunur. Tamar açıklıktan bir sokağa girince Şifra kandili köz çömleğinden kendiliğinden yakar (2 sn; Tamar durmaz). (4) **Gök okuma:** Açıklıkta bir ağzın önünde durup Bakış ile baş kaldırılınca o sokağın ucundaki gök açılır: iki yanda dam saçaklarının çerçevelediği ≈120°'lik, önceden çizilmiş tek görünüm (7. bölümdeki gök şeridinin ağza bağlı, sabit sürümü). Gece bitmektedir: doğuda soluk bir ağarma, batıda alçak, pembe bir kuşak vardır. Yüksek yapılar bu aydınlığa karşı kara biçimler olarak seçilir: Tapınak'ın geniş, alçak duvarı doğunun soluğunda, üç ince kule batının pembe kuşağında. Görünüm kandilin durumundan bağımsızdır; kandili kısmak, örtmek ya da yere koymak bir şey değiştirmez (GDD §5.1b'deki göz alışması kuralı şafak göğüne uygulanmaz). (5) **Hatıra sözü** (9. bölümün Cuma dönüşü, Sahne 8; Sahne 2'de kendiliğinden): "Bahçe Kapısı'ndan girerken üç kule sağ omzumdaydı." Öyleyse kapı kulelerin dibindedir; kapıya kulelere doğru gidilir ve kapıya yaklaşırken kuleler solda kalmalıdır.

| Kavşak | Ağızlar | Doğru | Nasıl bilinir |
|---|---|---|---|
| K1 (54,40) | K: alev Tamar'a · B: dik · G: içeri (eve) | K | Öğretim; Şifra: "Bak, alev sana yattı." |
| K2/A1 (54,32), açıklık | K: Tapınak'ın geniş duvarı tam karşıda, sağında doğunun ağarması (sokak Tapınak merdivenine çıkar; kapılar kapalı) · B: üç kule sokağın ucunda, biraz sağda, pembe kuşakta · D: yalnızca doğunun ağarması ve damlar, yüksek biçim yok (aşağı kente iner) | B | Gök: kapı kulelerin dibindedir |
| K3 (42,30) | K: dik · B: Tamar'a (uyuyan hacılar) · G: içeri (Siloam'a iner) | B | Alev |
| K4/A2 (30,28), açıklık | K: kuleler sol önde, pembe kuşakta (sokak kulelerin doğusundan geçer) · B: kuleler sağ önde (sokak kulelerin güneyinden batıdaki başka kapıya gider) · KD: Tapınak'ın duvarı sağ önde (K2'ye döner) | K | Hatıra sözü: kapıya giderken kuleler solda |
| K5 (24,20) | K: Tamar'a · B: dik (kule temeli) · D: içeri (sur boyu) | K | Alev |

- **Çözüm:** K1-K → K2-B → K3-B → K4-K → K5-K → A3. Kapı meydanına varan her yol kabul edilir; yanlışlar kısa döngüdür (Tapınak merdiveninde Şifra: "Tapınak'a gitmiyoruz; kapı kulelerin dibinde." Batı kapısında bekçi: "Bahçe Kapısı kulelerin öbür yanında."). Doğru yol omuz yükü altında ≈30 sn yürünür.
- **A1'de, her yolda:** Kadınlar Markos 16:3'ü birbirlerine fısıldar; Tamar demete dokunur: *"Ben biliyorum nasıl açılacağını."*
- **"Aha" anı:** *"Alevin tutmadığı yerde yolu gök gösteriyor: kuleler pembenin içinde."* Ve: *"Gök ağardıkça kandile daha az bakıyorum."* (Kıvrımın habercisi.)
- **Üç Işık:** 1. *"Alev bana rüzgârın geldiği yanı gösterir."* / açıklıkta: *"Burada alev tutmuyor. Başımı kaldırsam sokağın ucunu görür müyüm?"* 2. Doğru ağız; açıklıkta kara biçimlerin çevresi parlar. 3. Şifra: "Şu sokak, kızım: alev sana yattı." / açıklıkta: "Kulelere bak; kapı onların dibinde. Kuleler solumuzda kalsın." → Hikâyeye devam (Şifra bir kavşak önden yürür).
- **Yanlış denemelerde:** Ceza yok; hacılar ışıkta homurdanır. **Usta:** Yok. **Hikâye kipi:** Şifra önden yürür. **Kodeks:** 4, 11.

## 7. Katılım Anı

**İnsanın işi:** düzeneği hazırlamak, yolu aydınlatmak, koşmak. **İlahi olan:** yuvarlanmış taş; dirilmiş İsa.

### 7.1 Açık taş ve mezar (dokunmama)

Basamak başında (17,9) göstergeler söner, hareket kilitlenir ve yalnızca "başını kaldır" kalır (Sahne 8). Tamar başını kaldırırsa ya da 8 sn sonra kamera kadınların bakışıyla birlikte taşa yükselir: taş kanalın yukarı ucundadır, ağız açıktır. **Bu girdi kaydedilmez.** Demet omuzdan kayar, ip basamaklara açılır, bir kama kanaldan aşağı yuvarlanır (elle çizilmiş kareler). Yaşlı Tamar: "Bütün gece taşı nasıl açacağımı düşündüm, Sara. Taş açıktı." Kadınlarla birlikte Tamar içeri girer (24:3); sekide keten bezler, ceset yok. İki adam yanlarında belirir; herkes yüzünü yere eğer; 24:5b–7 metin olarak akar. 24:8'de kadınlar hatırlar; 24:9'da mezardan dönerler. İki adamın çıkışı ya da kayboluşu canlandırılmaz; kamera kadınlarla birlikte dışarı çıkar. **Girdi yok, kayıt yok.**

Kontrol bahçede, dışarıda döner. Bakış ile: kadınların sessizce kıpırdayan dudakları (`tan_b10_sozlerini_hatirladilar`, 24:8) ve kanalın ucundaki taş (`tan_b10_cok_buyuk_tas`, Markos 16:4). Söz halkasına bildirimsiz tanıklık sözleri eklenir (*taş yuvarlanmıştı*, *ceset yoktu*, iki adamın iki sözü, B2'den *ipim boşa gitti*); kutsal anda söz toplanmaz (GDD §5.3). Batı girişine yürünür ya da 20 sn sonra Şifra seslenir: "Gidelim, kızım; söylemeliyiz." Silme ile koşu başlar.

### 7.2 Şafak koşusu

- **Ölçek ve katmanlar:** §4.4. Büyük sprite yalnızca Tamar'da ve yuva 1'de Yoram'dadır (GDD §11.2); kanonik kadınlar, Şifra ve yüzler orta katmanda normal boydadır.
- **Hızlar** (yan görünüm; GDD §4.1'deki sabitler): yürüme 80 px/sn, seğirtme 108 px/sn, Koşu 200 px/sn.
- **Kontroller:** Hareket; **Koşu** (basılı ya da aç/kapa) ilk kez açılır, istem bir kez görünür, nefes sesi duyulur. Palet 64 renge ve müzik koşu katmanına **set-piece'in ilk hareket karesinde** (kadınların ilk adımında) açılır; Koşu girdisine bağlı değildir. Yüzlerin yanında **Uğra** (Etkileşim). Engel ve atlama yok.
- **Akış:** Kanonik kadınlar orta katmanda, Tamar'ın 160–320 px önünde grup olarak koşar (Matta 28:8 ve Yuhanna 20:2'deki tamamlayıcı ayrıntı; Kodeks 6). Tamar yavaşlar ya da uğrarsa kadınlar soluklanarak yavaşlar ve aradaki fark 320 px'i geçmez; Tamar koşarken fark 160 px'in altına inmez, yani grup hep öndedir ve Tamar onları geçmez. Şifra orta katmanda Tamar'ın ≈120 px gerisinden seğirtir. Uğrayan Tamar durur, eşikteki kişiye dönüp adını seslenir, elini kaldırır; 3–4 sn'lik alışveriş. Haberi anlatmaz: soluğu yetmez, yalnızca güler ya da ağlar. Uğramazsa kişi arkasından bakar. Başkâhinin dış kapısında yuva yoktur, yalnızca iç ses vardır.

| Yuva | Şerit bölümü | Kim (bayrak) | Boş kalırsa |
|---|---|---|---|
| 1 | (1) bahçe yolu ve Bahçe Kapısı | Yoram (`b09_yoram_soz`); ön katman | `ofke_paylasti` |
| 2 | (2) havuz başı | Natan (`b06_esik`, `ilis_natan`) | `gitti` |
| 3 | (3) pazar ağzı | Gad ve Elişeva (`b03_sir`) | Hiçbir zaman |
| 4 | (3) kervan hanı | Dositeos ya da adamları (`b05_dositeos`, `ilis_dositeos`) | Hiçbir zaman |
| — | (4) başkâhinin dış kapısı | İç ses (`b08_kapi`) | — |
| 5 | (5) elçilerin evine çıkan sokak | Hananya (`ilis_hananya`) | Hiçbir zaman |

- **İfade:** N dolu yuva sayısıdır: N = 5 − (`ofke_paylasti` ise 1) − (`gitti` ise 1), yani 3–5. U uğrak sayısıdır. `b10_ifade_kosu_ugrak` = `dogruca` (U=0) / `birkacina` (0<U<N) / `hepsine` (U=N). Puanlanmaz, ilişkileri değiştirmez; epilogda ve bandın kenarında (uğrak başına küçük düğüm) okunur.
- **Girdi kesilirse:** Koşu bırakılınca Tamar yürür. 20 sn girdi yoksa Şifra orta katmandan seslenir: "Koş, kızım! Ben arkandayım." 40 sn'de Şifra yeniden seslenir ("Haydi, Tamar!") ve Tamar kendiliğinden yürüyerek şeridin sonuna dek ilerler. Herhangi bir hareket girdisi kendiliğinden yürüyüşü bitirir. Kendiliğinden yürüyüş sırasında geçilen yuvalar ifadeye yazılmaz: N'den düşülür, U'ya eklenmez. Bütün yuvalar böyle geçilirse bayrak yazılmaz; bantta uğrak düğümü olmaz, epilogda ilgili satır gelmez (1. bölümdeki "değer yazılmaz" örneği). Süre sınırı ve başarısızlık yoktur.
- **Koşu'nun sonrası:** Koşu bölüm sonuna dek açık kalır: Sokaklar haritasında (Sahne 12, yan hikâye, Sahne 14) kullanılabilir; ev içlerinde ve sinemaskop sahnelerde devre dışıdır. Yan hikâyede koyunları etkilemez. Epilogda koşu yoktur (yaşlı Tamar'ın yürüyüş seti yoktur, GDD §3.1); bölüm seçimiyle yeniden oynanan önceki bölümlerde de açılmaz (GDD §4.1).
- **Süre:** Koşarak ≈1,7 dk (şerit 48 sn, beş uğrak 20 sn, dört silme 6 sn, açılış ve kapanış ≈25 sn); yürüyerek ≈3 dk. Bütçe 2 dk.

### 7.3 Elçilere haber

24:9–10 metin olarak verilir; Tamar "öbür kadınlar" arasındadır. Haber **her yolda** verilir; Tamar'ın sonraki seçimi bunu etkilemez. 24:11'de elçiler alaysız bir inanamazlıkla döner; müzik düşer. Petrus kapıdan koşar (24:12; Bakış ile `tan_b10_petrus_kostu`). Şifra'nın taşıdığı merhem çömleği sedire bırakılır (Bakış ile `kol_b10_merhem_comlegi`). Ardından kurgu kesmesiyle öğleye geçilir (Sahne 12).

### 7.4 "Size esenlik olsun!" (dokunmama; tek girdi)

**Toplantı odası (Sahne 15):** 24:33 ve 24:34 metin olarak akar; 24:34'ü elçilerin çevresinden bir ses söyler, Tamar söylemez. İki yolcu anlatırken Kulak ile onlara kulak verilirse 24:35 ekranda, ayet etiketiyle metin olarak akar (`tan_b10_ekmegi_bolerken`); balon çıkmaz, söz toplanmaz. Kulak kullanılmazsa anlatıları uğultu olarak kalır. İki yolcuya kurgusal söz ya da jest yazılmaz. Mangalın başında **balığı çevir** (Etkileşim, tek dokunuş; isteğe bağlı) → yerel `b10_balik = cevirdi`, yapılmazsa `cevirmedi`.

**24:36:** Yalnızca Tamar kapı yanındaki mangalın başındayken tetiklenir. 24:35 bittikten 20 sn sonra Tamar orada değilse kendiliğinden mangala yürür. Tamar başı balığa eğik durur. 24:36 akar, göstergeler söner, altta soluk **"başını kaldır"** işareti belirir (baş kaldırma eylemi; Bakış gerekmez, GDD §5.1a). Tamar başını kaldırırsa kamera odanın ortasına yükselir: İsa 3/4 arkadan ayaktadır; yüz ve parıltı yoktur, belirişini yalnızca kurgu kesmesi söyler. Kaldırmazsa 8 sn sonra kamera kandillerin aydınlattığı yüzlerde kalır. 24:37–41 metin olarak akar; 24:40'ta tek jest elleri uzatmaktır, kamera çoğunlukla yüzlerdedir. 24:42'de Tamar'ın elleri tabağı kendiliğinden kaldırır, tabak elden ele kadraj dışına geçer. 24:43 metin. **Kayıt yok.**

**Kanon güvencesi:** Taş her yolda açıktır; kadınlar haber verir, elçiler inanmaz, Petrus koşar, iki yolcu anlatır, İsa belirir ve aynı sözleri söyler. Hiçbir girdi bunların içeriğini, sırasını ya da süresini değiştirmez; dünya yalnızca Tamar'ın yerini almasını bekler.

## 8. Seçimler ve Sonuçlar

### 8.1 Bu bölümdeki seçimler

| Bağlam | Seçenekler | Anlık tepki | Bayrak / eksen | Okunur |
|---|---|---|---|---|
| Şifra: "Taşı kim açacak bize?" | "Ben açarım. Beytanya'da öğrendim." · "Bir yolunu buluruz." · *Sessiz kal* | "Rab yardımcımız olsun." / "Kocam bulurdu." / Şifra iç çeker | Yok (ton) | — |
| B1, Mika uyanırsa: "Teyze, nereye?" | "Uyu, kuzum." · "Sabah anlatırım." · *Sessiz kal* (saçını okşar) | Mika yeniden uyur | "Uyu, kuzum" → `b10_mika_gece = uyuttu` · "Sabah anlatırım" → `soz_verdi` · Sessiz kal → `sustu` · Mika hiç uyanmazsa → `uyudu` | Sahne 13 |
| B1, Yoram uyanırsa | — | `umut`: "Anne? İpimi mi alıyorsun? Al." · `sessiz_yakinlik`: ipi sözsüz iter · `ofke_paylasti`: "Ölüye taş mı açacaksın? Her şey bitti." Döner yatar; ip yerinde kalır | Yok | — |
| Koşu | Her yuvada uğra ya da geç | §7.2 | `b10_ifade_kosu_ugrak` | Ep, bant |
| **Yankı.** Mika: "Bütün gece neredeydin, teyze?" (1. bölümdeki sorunun yankısı) | **"Gördüğümü anlat"** · **"Mika'nın elini tut: 'Bir gün anlatacağım.'"** · *Sessiz kal* | Tamar cümlesini söyler; Mika: "Sonra?" "Sonra koştum." / "Söz mü?" "Söz." / Tamar göğe bakar, Mika ona yaslanır | Anlat → `b10_tanik = anlatti`, `eks_soz +1` · Bir gün → `b10_tanik = kalbinde`, `eks_soz 0` · Sessiz kal → `b10_tanik = kalbinde`, `eks_soz −1`. Yerel `b10_yanki = anlatti / bir_gun / sustu` | Sahne 17, ep; bant: dalgalı / ortası düzleşen / düz |

**Tanıklık cümlesi** (Kavrayış; isteğe bağlı; yanlışı yoktur, çünkü her söz Tamar'ın gerçekten gördüğü ya da duyduğudur). **İstem:** Sahne 13'te Tamar avluya girince, Mika'nın sorusundan önce düşünce balonu istemi belirir; açılmazsa varsayılan cümle kullanılır.
> "[`b01_haber` cümlesi] Bu sabah taşı açmaya gittik; **[neden]**. İki adam bize **[söz]** dedi. Sonra **[kişi]** koştu."

Neden: *taş yuvarlanmıştı*, *ceset yoktu*, *ipim boşa gitti*, *taş çok büyüktü* (`tan_b10_cok_buyuk_tas` ile). Söz: iki adamın iki sözü (aktarım; GDD §2.2-C). Kişi: *ben*, *kadınlar* (koşuda önde koşan kanonik kadınlar; Matta 28:8, Yuhanna 20:2), *Petrus* (`tan_b10_petrus_kostu` ile), *Yoram* (`b09_yoram_soz` `umut`/`sessiz_yakinlik` ise; iki durumda da yuva 1'den Tamar'la ya da ardından koşar). Ekler şablonda çözülür. Sonuç `b10_tanik_cumlesi`'ne yazılır; kurulmazsa varsayılan: *taş yuvarlanmıştı* · *"O burada yok, dirildi!"* · *ben*.

**Sahne 17 (her yol tam bir son):** `anlatti`: "O gün Mika'ya anlattım; sonra pazarda balıkçılara, Mecdel'de komşulara. Kimi güldü, kimi sustu. Hep aynı sözle başladım: [cümle]" · `bir_gun`: "Mika'ya 'Bir gün anlatacağım' dedim. O gün bu gece, Sara: [cümle]" · `sustu`: "O gün kimseye bir şey demedim; yemlikteki bebeğin annesi gibi sakladım. Şimdi sana söylüyorum: [cümle]". Kurulan cümle her yolda Sara'ya ulaşır.

### 8.2 Okunan önceki bayraklar

| Bayrak | Değer | Bu bölümde değişen |
|---|---|---|
| `b08_kapi` | `itiraf` | Sahne 1: "Üç gün önce bir kapıda 'Onlardanım' demiştim, muhafız beni köşeye itmişti. O gece köşede değil, işin ortasında olmak istedim." Koşuda: *"Bu köşeye itilmiştim. Şimdi koşarak geçiyorum."* |
| | `inkar` | "Üç gün önce bir kapıda 'Hayır' demiştim. O gece ellerim hiç durmadı; dilimin yaptığını ellerimle onarırım sandım." Koşuda: *"Muhafız esniyor; beni tanımadı bile."* |
| | `sessiz` | "Üç gün önce bir kapıda susmuştum. O gece de sustum; konuşan ellerimdi." Koşuda: *"Burada susmuştum. Şimdi soluğum konuşuyor."* |
| `b01_haber` | `koye` / `babaya` / `kalbinde` | Tanıklığın ilk cümlesi: "Dokuz yaşımda gördüğümü bütün obaya anlatmıştım." / "…yalnızca babama fısıldamıştım." / "…otuz beş yıl sakladım." Yan hikâyede Eliab'ın satırı |
| `b09_yoram_soz` (+ `ilis_yoram`) | `umut` | B1 iç sesi: *"Dün akşam ona 'İşimiz bitmedi' demiştim. Kendim inanıyor muydum?"* Yuva 1 (bahçe yolu ve kapı): Yoram "Anne!" diye koşarak gelir; uğranırsa el ele, uğranmazsa arkasından koşar |
| | `sessiz_yakinlik` | *"Dün akşam yanımda sustu. Uyurken yüzü çocukluğundaki gibi."* Yuva 1: Yoram Tamar'ın unuttuğu şalla kapıda bekler, yüzünü ilk o görür; uğranırsa şalı omzuna atıp sözsüz yanında koşar, uğranmazsa arkasından gelir |
| | `ofke_paylasti` | *"Uykusunda bile yumruğu sıkılı."* Yuva 1 boş; Yoram evde bekler. Sahne 13'te: "Ellerin ip yanığı, anne. Bütün gece ne yaptın?" Seçimden sonra inanamaz, "Ben gidip bakacağım." der ve çıkar (Luka 24:11–12'nin yankısı). `ilis_yoram` yalnızca bu yolda okunur: Sahne 13'te `yakin` ise Yoram çıkmadan önce Tamar'ın ip yanığı ellerini tutar, `temkinli` ise ona bakmadan çıkar. |
| `b04_yoram` | `kutsadi` | Akşam her yolda içeride (`ofke_paylasti` ise duvar dibinde ayrı) |
| | `yasakladi` / `erteledi` | Akşam: `umut` içeride · `sessiz_yakinlik` eşikte · `ofke_paylasti` yok; yaşlı Tamar: "Yoram o akşam gelmedi. Gece yarısı döndü, ipleri dizimin dibine koydu; bir şey demedi." |
| `b06_esik` (+ `ilis_natan`) | `girdi` | B1'de odada uyur; iç ses: *"Annem 'Ablanı yalnız bırakma' demiş. Bırakmadı."* Yuva 2 (havuz başı): havuzdan su doldururken; `ilis_natan = yakin` ise kovayı bırakıp koşar gelir: "Abla! Ne oldu?", değilse doğrulup seslenir: "Abla?" Sahne 13'te dinleyenler arasında |
| | `disarida_konustu` | B1'de eşikte uyur. Yuva 2: `ilis_natan = yakin` ise "Abla! Bekle!" diye birkaç adım peşinden gelir, değilse yalnızca "Abla?" der. Sahne 13'te kapı eşiğinde dinler |
| | `gitti` | Natan Mecdel'dedir; yuva 2 boş. Sahne 13 iç sesi: *"Bu haberi Mecdel'e kim götürecek?"* |
| `b03_sir` | `hizmetkarlarla` | Yuva 3 (pazar ağzı): Gad ve Elişeva. Gad: "Suyu taşıyan eller! Nereye böyle?" Uğranırsa Elişeva Kana'daki dansın bir adımını atar |
| | `damada` | Temkinli Gad: "Kana'daki aşçı? Damat bize bir şey anlatmıştı…" |
| | `kalbinde` | Yalnızca Elişeva: "Kana'daki aşçı! O şarap… ne şaraptı ama." |
| `ilis_dositeos` + `b05_dositeos` | `yakin` / `temkinli` / `uzak` | Yuva 4 (kervan hanı): Kervan Şabat çıktıktan sonra, bayram haftasının ticarete açık ara gününde kente gelmiştir (sahneleme kararı, Kodeks 4); Dositeos 9. bölümde görünmemiştir. Her yolda, Tamar yaklaşırken han kapısında yük çözen çivit başörtülü bir adam ötekilere seslenir: "Şabat biter bitmez girdik; bugün bayramın ara günü, pazar açık!" Ardından Dositeos kendisi / uzaktan / yalnızca çivit başörtülü adamları. Satır: `yuk_birakti` "Tamar! Yolda beni bırakmamıştın; şimdi nereye koşuyorsun?" · `para_gonderdi` "Haberin bana paradan önce ulaşmıştı; bu sabah da önce haber mi getiriyorsun?" · `gecti` "Tamar. Yol açık; koş." `uzak`ta çivit başörtülü adamlardan biri seslenir: "Erken yola düşmüşsünüz, hanımlar!"; uğranırsa Tamar el kaldırır, adam şaşkın güler |
| `ilis_hananya` | `yakin` / `temkinli` | Yuva 5: sabah duasına giden Hananya. `yakin`: "Tamar? Ne oldu, komşu?… Git, git; sonra anlatırsın." · `temkinli`: karşı kaldırımdan bakar: "Komşu?" |
| `eks_soz`, `eks_el`, `eks_kalp` | −4…+4 | Sahne 17'nin son satırı mutlak değeri en büyük eksenden (eşitlikte Söz, Kalp, El): Söz + "Ömrüm anlatmakla geçti; sesim yorulsa da sözüm yorulmadı." · Söz − "Sakladığım şey çürümedi, Sara; bak, sana ulaştı." · Kalp + "Kapıları açtım; bazen geç, ama açtım." · Kalp − "Yasımı da öfkemi de taşıdım. Taşıdıklarım beni ezmedi, buraya getirdi." · El + "O sabah ellerim boştu ve ilk kez koştum." · El − "Elimdekini korudum: seni, bu tezgâhı, bu hikâyeyi." · Hepsi 0 "Bazen anlattım, bazen sakladım. İkisi de bendim." |
| `b10_mika_gece` (yerel) | `uyudu` / `uyuttu` / `soz_verdi` / `sustu` | Sahne 13'te Mika'nın ilk cümlesi: `uyudu` → "Kapının kaması yok, annem söylendi." · `uyuttu` → "Bana 'Uyu' dedin, sonra gittin." · `soz_verdi` → "Sabah anlatırım demiştin. Öğle oldu!" · `sustu` → "Saçımı okşayıp gittin." `kol_b09_kemik_boncuk` varsa ekler: "Boncuğum sendeydi; kaybolsaydın bulurdum!" |
| `b10_balik` (yerel) | `cevirdi` / `cevirmedi` | Sahne 17'de yaşlı Tamar'ın balık satırı (§9-16) |

## 9. Diyalog Örnekleri

1. **Sara:** "Nine, o mezarın taşını kim yuvarladı?" — **Yaşlı Tamar:** "Ben yuvarlayacaktım, Sara. Bütün gece ip bağladım."
2. **Şifra (fısıltı):** "Taşı kim açacak bize? Cuma akşamı Yusuf'un adamları yuvarlamıştı; kanalda kendiliğinden kaydı, gördün."
3. **Şifra (fısıltı):** "Kocam değirmen taşı keserdi. Yuvarlak taş kaldırılmaz, yuvarlanır. O boyda bir taşı yokuş yukarı ancak yirmi el iter."
4. **Tamar (iç ses):** *"Şimi'nin işliğinde kamaları Yair koymuştu. Burada Yair yok."*
5. **Kadınlar (kendi aralarında):** "Mezarın girişindeki taşı bizim için kim yuvarlayacak?" *(Markos 16:3) [yakın aktarım; kanonik replik]*
6. **Tamar (iç ses):** *"Alevin tutmadığı yerde yolu gök gösteriyor: kuleler pembenin içinde."*
7. **Bekçi:** "Gün ağarmadan açmam, hanımlar. Kuşlar ötsün, açarım."
8. **İki adam:** "Diri olanı neden ölüler arasında arıyorsunuz? O burada yok, dirildi! Daha Celile'deyken size ne söylediğini hatırlayın: İnsanoğlu'nun günahlı insanların eline teslim edilmesi, çarmıha gerilmesi ve üçüncü gün dirilmesi gerektiğini söylemişti." *(Luka 24:5–7) [yakın aktarım; kanonik replik]*
9. **Ekranda:** "Ama bu sözler elçilere saçma göründü; kadınlara inanmadılar." *(Luka 24:11) [yakın aktarım]*
10. **Gad:** "Suyu taşıyan eller! Nereye böyle?"
11. **Mika:** "Sabah anlatırım demiştin. Öğle oldu! Bütün gece neredeydin, teyze?"
12. **Toplananlar (elçilerin çevresinden bir ses; Tamar söylemez):** "Rab gerçekten dirildi, Simun'a görünmüş!" *(Luka 24:34) [yakın aktarım; kanonik replik]*
13. **İsa:** "Size esenlik olsun!" *(Luka 24:36) [yakın aktarım]*
14. **İsa:** "Neden telaşlanıyorsunuz? Neden yüreğinizde kuşku uyanıyor? Ellerime, ayaklarıma bakın, benim! Bana dokunun da görün. Bir ruhun, gördüğünüz gibi bende olan eti ve kemikleri yoktur." *(Luka 24:38–39) [yakın aktarım]*
15. **İsa:** "Burada yiyecek bir şeyiniz var mı?" *(Luka 24:41) [yakın aktarım]*
16. **Yaşlı Tamar:** "Ömrüm balıkla geçti, Sara. Tuzladım, sattım, borcunu ödedim." `b10_balik = cevirdi` ise: "O akşam ızgaradaki balığı ben çevirmiştim." · `cevirmedi` ise: "O akşam ızgarada balık vardı; kokusu hâlâ burnumda."

## 10. Hatıra Nesneleri, Tanıklık Ayrıntıları ve Kodeks

| Kimlik | Nerede | Yaşlı Tamar'ın cümlesi |
|---|---|---|
| `kol_b10_incir_yapragi` | Damda, korkuluğa sarkan incir; baş kaldırınca (B1) | "Komşunun inciri yeni yapraklanıyordu. İncir yapraklanınca annem kışlık yünleri yıkayıp kaldırırdı." |
| `kol_b10_ip_ucu` | B2, kesilen püsküllü uç | "İpimin ucunu belime sokmuştum, 'Gerekirse' diye. O sabah hiçbir şey gerekmedi." |
| `kol_b10_merhem_comlegi` | Üst odalı evde, sedirde | "Merhemi hiç sürmedik. Çömlek yıllarca mür koktu; koku gitti, çömlek kaldı." |
| `kol_b10_yun_bilezik` | Yan hikâye ödülü | "Bir çoban çocuğu bileğime yün bağladı. Otuz beş yıl önce annem de bağlamıştı." |

| Tanıklık | Nasıl fark edilir | Ayet | Hatıra cümlesi |
|---|---|---|---|
| `tan_b10_cok_buyuk_tas` | Mezardan çıkınca Bakış ile kanalın ucundaki taş | Markos 16:4 | "Taş çok büyüktü; Şifra yirmi el demişti, bana kırk gibi geldi." |
| `tan_b10_sozlerini_hatirladilar` | Mezardan çıkınca Bakış ile kadınların dudakları | Luka 24:8 | "Celile'de duydukları sözleri hatırladılar; dudakları kıpırdıyordu." |
| `tan_b10_petrus_kostu` | Bakış ile kapıdan koşan Petrus | Luka 24:11–12 | "Elçiler inanmazken Petrus kalkıp mezara koştu. O sabah koşan bir tek ben değildim." |
| `tan_b10_ekmegi_bolerken` | Kulak ile iki yolcunun anlatısı; 24:35 ekranda metin olarak akar, söz toplanmaz | Luka 24:35 (Kleopas'ın adı 24:18) | "Emmaus'tan dönen iki yolcu, O'nu ekmeği bölerken tanıdıklarını anlattı." |

**Kodeks**

1. **Yuvarlak mezar taşları:** İkinci Tapınak dönemi mezarlarının çok büyük çoğunluğu kare tıkaç taşla kapanırdı. Yuvarlak taşlı mezarlar çok nadirdir (Kloner'in taramasında 900'ü aşkın mezarda yalnızca 4; "Did a Rolling Stone Close Jesus' Tomb?", *BAR* 25/5, 1999; *doğrulanmalı*) ve varlıklı aile mezarlarında görülür. Oyunun yuvarlak taş seçimi Markos 16:3–4'ün ("yuvarlayacak", "yuvarlanmış") geleneksel okumasına dayanır. Yusuf zengindi (Matta 27:57); taşı yuvarladığını Markos anlatır (15:46). Kanal ve eğim oyunun arkeolojik sahnelemesidir.
2. **Kirişli zeytin presi ve kaldıraç:** 7. bölümün girdisine bağlanır. Arşın dirsekten parmak ucunadır (≈45 cm, *doğrulanmalı*); karış yarım arşındır. Kefarnahum'un bazalt değirmen taşları arkeolojik olarak bilinir (*doğrulanmalı*).
3. **Haftanın ilk günü:** Gün gün batımıyla başlar. Luka baharatın Şabat'tan önce hazırlandığını (23:56), Markos sonra alındığını (16:1) söyler; oyun Luka'yı izler.
4. **Bahçe Kapısı ve üç kule:** Josephus'un "Gennat" kapısı (*Yahudi Savaşı* 5.146) ve Kral Hirodes'in (Büyük Hirodes) Hippikos, Fasael ve Mariamne kuleleri (5.161–175). Kapının yeri ve bugünkü "Davut Kulesi" kalıntısının kimliği *tartışmalıdır*. Kent kapılarının gece kapalı tutulduğuna örnekler: Yeşu 2:5 (Eriha), Nehemya 13:19 (Yeruşalim, Şabat öncesi). Nehemya döneminde Yeruşalim kapıları güneş ısınınca açılırdı (Nehemya 7:3); birinci yüzyıldaki bayram uygulaması bilinmiyor. Mişna, bayramlarda Tapınak avlusunun gün ağarmadan dolduğunu anar (Yoma 1:8; Mişna MS 200 dolayında yazıya geçmiştir; birinci yüzyıl uygulaması doğrulanmalı); ama bu kent kapısı değil, Tapınak'tır. Oyunun gün ağarınca açılan kapısı bir sahneleme kararıdır (*doğrulanmalı*, §17). **Ek not:** Samiriyeli bir kervanın bayram haftasında kentteki handa bulunması oyunun sahneleme kararıdır (tarihçi onayı; kesme adayı). Koşudaki kervan Şabat çıktıktan sonra, bayram haftasının ticarete açık ara gününde kente gelmiştir (§8.2).
5. **Mezarın yeri:** Kente yakın, çarmıha gerildiği yerde bir bahçe (Yuhanna 19:17, 20, 41–42). Kutsal Kabir geleneği en geç 4. yüzyıla uzanır. Alan birinci yüzyılda surun dışındaydı ve çevresinde aynı döneme ait kaya mezarlar bulunur; çoğu arkeolog bu yeri daha olası sayar. 19. yüzyılda önerilen Bahçe Mezarı'nın daha eski bir döneme ait olduğu düşünülür. Oyun belirli bir yeri göstermez. (*Metin kurul onayına bağlı.*)
6. **Haberciler, bekçiler, koşu:** Luka iki adam (24:4; 24:23'te "melekler"), Markos bir genç (16:5), Matta bir melek (28:2), Yuhanna iki melek (20:12) anar. Mezardaki bekçileri yalnızca Matta yazar (27:62–66); oyun onları göstermez. Luka kadınların mezardan nasıl döndüğünü belirtmez; Matta 28:8 kadınların, Yuhanna 20:2 Mecdelli Meryem'in koştuğunu söyler. Oyun bu çelişmeyen tamamlayıcı ayrıntıyı kullanır (GDD §2.3): kadınlar da Tamar da koşar.
7. **Kadınlar:** Luka 24:10 izlenir; Yohanna, bölge kralı Hirodes'in (Antipas) kâhyası Kuza'nın karısıdır (8:3).
8. **Markos 16:8, Luka 24:9 ve 24:34:** Markos kadınların korkudan kimseye bir şey söylemediğini yazar; en eski el yazmalarından bazıları burada biter. Oyun Luka'yı izler; iki uç tarafsızca notlanır (GDD §8.2). Eleştirel metinde 24:34'ü "On Birler ve onlarla birlikte olanlar" söyler; bir el yazmasında (Codex Bezae) sözü iki yolcu söyler. Oyun çoğunluk okumasını izler. Luka 24:12, 24:36'daki selam ve 24:40 bazı Batı el yazmalarında yoktur (YC dipnotu *doğrulanmalı*).
9. **Hirodes dönemi kandili (1. bölümdeki Kandil girdisine ek):** Çarkta yapılmış, kazıma burunlu (kürek biçimli); duvar nişlerinde dururdu.
10. **Emmaus:** Yeri *tartışmalıdır* (Amvas, Kubeybe, Motza); 24:27'nin içeriği oyunda yer almaz.
11. **Kentin suyu:** Birinci yüzyıl Yeruşalim'inde su havuzlardan (Siloam, Beytesda, kulelerin yakınındaki Amygdalon), sarnıçlardan ve su kemerinden gelirdi (Josephus, *Yahudi Savaşı* 5.468; *doğrulanmalı*). Sokak çeşmeleri sonraki dönemlerin yapısıdır.
12. **Bayram sunusu:** Erkekler üç bayramda Rab'bin önüne eli boş çıkmazdı (Yasa'nın Tekrarı 16:16–17). Bayram sunusu ilk gün getirilmediyse bayram boyunca getirilebilirdi (Mişna, Hagiga 1:6; Mişna MS 200 dolayında yazıya geçmiştir; birinci yüzyıl uygulaması doğrulanmalı).
13. **Tamar'ın kenti (4. bölümdeki Tuzlu balık ve Mecdel girdisine ek):** Tarichea adının balık tuzlama işliklerinden geldiği 2. bölümdeki ana girdide anlatılır (Strabon, *Coğrafya* 16.2.45; *doğrulanmalı*). Bu bölümün eki: Josephus Tarichea'yı anar, Mecdel adını anmaz. İki yerin özdeşleştirilmesi yaygın kabuldür (Talmud'daki Migdal Nunya, "Balık Kulesi"; Babil Talmudu MS 500 dolayında yazıya geçmiştir, *doğrulanmalı*).

## 11. Yan Hikâye — Eliab'ın Kuzuları (6 dk, Sokaklar, öğle)

- **Erişim:** Sahne 12'de (Öğle dönüşü) eve giden yol A2'den geçer; A2'ye 8 karo kala ağlama duyulur ve harita düşüncesine yazılır. Yan hikâye geçilirse A2'den sonra eve "Yolu biliyorum" geçişi açılır.
- **Açılış:** A2'de on yaşında bir çocuk ağlar: "Kuzularım! Bayram sunusuna getirmiştik, dördü kaçtı." (Kodeks 12.)
- **Kurallar:** 1. bölümün gündüz Güt kuralları: değnek konisi (60°, 4 karo) koyunu 3 karo iter; ıslık 8 karo içindekileri çağırır, koyunlar ıslığın çalındığı noktaya yürüyüp 1,5 karo kala durur; yürüyen koyun 2 karo içindeki duranları peşinden götürür. Ekler: Geçit sokağa giren koyun öbür uçtaki meydana kadar yürür ve meydanın ağız karesinde durur: A2'nin doğu ağzı (32,28), batı ağzı (28,28), kuzey ağzı (30,26). Üçü de Eliab'a (30,28) 2 karodur. Çıkmazdaki koyun ancak ıslıkla çıkar. Eliab'ın 3 karo içine gelen koyun ona gider. Koşu koyunları etkilemez.
- **Kurulum:** 1. koyun K5-B çıkmazında, 2. koyun K3-K çıkmazında, 3. koyun K4-B geçidinin ortasında (batıya yürür), 4. koyun A2'de Eliab'dan 5 karo ötede.
- **Çözüm:** 4. koyunu Eliab'a doğru it (3 karo yürür, 2 karo kalır). K5-B ağzında ıslık, sonra güneye it: geçitten A2'nin kuzey ağzına (30,26) yürür. K3-K ağzında ıslık, sonra batıya it: K3-B geçidinden A2'nin doğu ağzına (32,28) yürür. 3. koyunu arkadan itmek onu batı kapısı meydanına götürür; Tamar oraya geçip koyunun batısına dolanmalı, sonra doğuya itmelidir: koyun A2'nin batı ağzına (28,28) yürür. Sıra serbesttir. Gecenin sokak bilgisi işe yarar: geçitler taşır, çıkmazlar tutar.
- **Üç Işık:** 1. *"Babam derdi ki: koyunun önüne geçmeden onu eve itemezsin."* 2. Koyunlar ve doğru ağızlar parlar. 3. Eliab: "Sen ıslık çal, ben sokağın ağzında dururum." → Hikâyeye devam.
- **Ödül:** Eliab bileğine yün bağlar (`kol_b10_yun_bilezik`): "Dedem Yoaş Beytlehem'de çobandır. Bir gece melekleri görmüşler; önden bir kız kandille yürümüş." `koye`: "Sabah kız bütün obaya anlatmış." / `babaya`: "Kız babasının elini tutup yürümüş, hiç konuşmamış." / `kalbinde`: "Kız bir şey dememiş; ama dedem gözlerini unutmamış." Tamar kendini tanıtmaz.

## 12. Ses ve Müzik

- **Ev ve sokaklar:** Müzik yok; soluklar, közün çıtırtısı, uzak bir köpek. Geçit sokakların ağzında hafif rüzgâr ıslığı, çıkmazlarda sessizlik (alev okumanın işitsel karşılığı). Açıklıklarda rüzgâr açılır; gök okunurken rüzgâr bir an incelir.
- **Kapıda şafak:** İlk kuşlar; Mezmur 23 teması, 1. bölümdeki babanın ezgisi olarak tek kavalla yeniden.
- **Mezar:** Müzik kesilir; kısa, sözsüz nevel armonikleri (1. bölümdeki müjdenin yankısı). Koro yok.
- **Koşu katmanı:** Set-piece'in ilk hareket karesinde açılır. Tof, kinnor, halil, kaval; Mezmur 23 ilk kez tam ve parlak. Nefes ve ayak sesleri; başkâhinin dış kapısında 2 sn incelir.
- **Haber:** 24:11'de müzik düşer.
- **Akşam:** İsa belirince müzik geri çekilir, tek uzun ton kalır; mangal ve soluklar netleşir. İsa'nın motifi yoktur.
- **Seslendirme:** Yalnızca yaşlı Tamar.

## 13. Sanat Notları

- **Palet:** Gece 24 renk (çivit 6, mor 5, kandil turuncusu 4, taş 6, cilt 3); B3'teki pembe kuşak morun en açık tonlarıyla verilir. Kapıda ve bahçede LUT geçişi; koşu set-piece'inin ilk hareket karesinde palet maskesi kalkar, 64 renk; öğle LUT'u; akşam tam palet, sıcak LUT.
- **Gök görünümleri:** Açıklıklarda ağza bağlı altı önceden çizilmiş görünüm (A1: K, B, D; A2: K, B, KD), dam saçaklarıyla çerçeveli ≈120°. Doğuda soluk ağarma, batıda alçak pembe kuşak (gün doğmadan önce batı göğünde görülen doğal alacakaranlık kuşağı); Tapınak duvarı ve kuleler elle çizilmiş kara biçimler.
- **Özel animasyonlar:** Demetin kayması ve kanaldan yuvarlanan kama (elle çizilmiş kareler); kandili üfleme (7. bölümden); alevin üç durumu ve duman çizgisi; ip arşınlama (7. bölümden).
- **Koşu katmanları:** Tamar ve Yoram ön katmanda 64×96; kadınlar, Şifra ve yüzler orta katmanda 32×48, yan profil (GDD §11.2'deki katman ve temas kuralı; farklı ölçekteki figürler birbirine değmez).
- **İsa:** 3/4 arkadan duruş ve el jesti; göz pikseli yok; ellerde ve ayaklarda iz yok. Yedek kip (§11.6): yalnızca duvara düşen gölge ve kandil ışığı.
- **İki adam:** Beyaz giysili insan biçimi; yüz ayrıntısı yok; parlaklık giyside; hacimsel ışık yok.
- **Bekçi:** Sivil giysili Yahudi kent bekçisi; sopa ve fener. Roma ya da yardımcı birlik kiti kullanılmaz.
- **GDD tavanlarından:** Yan görünüm set-piece'i **1** (şafak koşusu). Tablo **0**.

## 14. Erişilebilirlik ve Zorluk Ayarları

- Alevin üç durumu biçimle (eğim, duman), sesle (rüzgâr ıslığı) ve titreşimle ayrılır; renge dayanmaz.
- Gökteki kara biçimler için "yüksek kontrastlı silüet" (ince kenar çizgisi); ağarma ve pembe kuşak renge ek olarak desenle (yatay tarama) verilir.
- Uyuyanların yüzünde ışık halkası (Rahat'ta her zaman açık).
- Koşu için aç/kapa; büyük Uğra simgesi; Rahat'ta yüze yaklaşınca Tamar yavaşlar.
- Mezardaki parlaklık ve şafak için ışık yumuşatma (varsayılan açık).
- Plan ve tanıklık cümleleri süresizdir; ip uzunlukları halkada sayı olarak kalır.
- **Rahat:** Denenmiş çıkmazlara "kapalı" simgesi; 60 sn'de 1. ışık. **Hikâye:** Şifra toplar, plan kendiliğinden kurulur, Şifra yolu yürür. **Usta:** tek düğüm simgesi.

## 15. Sadakat ve Hassasiyet Kontrolü

- [x] **A.** İsa yönetilmez; sözleri yalnızca Luka 24:36, 38–39, 41'den, referanslı ve [yakın aktarım]; bunlar Tamar'ın içinde bulunduğu gruba söylenir. Ses, portre, yüz, hale, parıltı yok; müzik tek tona çekilir; 24:27 somutlaştırılmaz. 24:36'nın selam kalıbı bölümde başka kimseye verilmez; İsa'nın sözünü andıran kurgusal deyişler kullanılmaz.
- [x] **B.** Taş her yolda açıktır; düzenek bilerek boşa çıkar, mucize bulmaca olmaz. Haber her yolda verilir (24:9–10); Tamar'ın sessizliği engellemez.
- [x] **C.** Kanonik kişiler yalnızca metin sözleri söyler (24:5–7; Markos 16:3 ortak; 24:34 ortak). İkrar niteliğindeki 24:34 Tamar'dan çıkmaz; iki adamın duyurusu tanıklık cümlesinde yalnızca aktarımdır. Kanonik kadınlar sürü mekaniğine indirgenmez; Tamar'la grup olarak yürür ve koşarlar. Kleopas'a ve arkadaşına uydurma jest ya da söz yüklenmez. Mecdelli Meryem hiçbir kalıpla karıştırılmaz.
- [x] **D.** Sayısal çubuk yok; her diyalogda "Sessiz kal"; `kalbinde` tam bir sondur ve cümle Sara'ya ulaşır; uğraklar puanlanmaz.
- [x] **E.** Kalabalık genellenmez; Hananya sabah duasına giden saygın komşudur; bekçi ve muhafız bireydir; elçilerin inanmazlığı alaysızdır. Polemik ve ikame gizemi yok. Yara, çivi, kan yok; Golgota boş. Ekmeğin bölünüşü bir jestle öne çıkarılmaz; yalnızca 24:35'in metniyle anılır.
- [x] **F.** Roma askeri yok; kent kapısı bekçisi sivil giysili bir Yahudi'dir. Çeşme yerine dönemin havuz ve sarnıçları. Tamar okuryazar değil, tanıklığı sözlü. Geleneksel ve tartışmalı ayrıntılar işaretli; Kodeks atıfları yalnızca ayetin söylediğine verilir, sahneleme kararları (kanal, kapının açılış saati, kervanın handa bulunuşu) ayrıca işaretlidir.
- [x] **Süslemeler:** Şimşek, kanat, ışık hüzmesi, beliriş efekti yok.
- [ ] **Kurul onayı bekleyenler:** 24:37–43 ve 24:40'taki jest; tabağın Tamar'dan geçmesi ve Tamar'ın balığı çevirebilmesi; iki adamın tasviri; üst odalı evin toplantı yeri sayılması; kadınların koşusunun Luka sahnesine tamamlayıcı olarak eklenmesi; Kodeks 5'in metni.

## 16. Üretim Notları

- **Haritalar:** 1 yeni (Sokaklar; üst odalı evin girişi (14,30) dahil); 3 yeniden kullanım (9. bölümün Ev ve Bahçe haritaları, 8. bölümün üst odalı evi). Ev ve Sokaklar gündüz LUT'uyla ikinci kez kullanılır.
- **Karo setleri:** Yeni set yok.
- **Karakterler:** Yeni: Bahçe Kapısı bekçisi (sivil kit varyantı), Eliab, iki adam figürü, Mika'nın annesi (kit); üç kanonik kadın için kit varyantı ×3 (9. bölümün "Celile'den gelen kadınlar" kitinden). Adlandırılmış karakter tavanına (GDD §16.1) bu bölümden yalnızca iki adam figürü (tek varlık) girer; bekçi, Eliab, Mika'nın annesi ve kanonik kadınlar kit varyantı ya da adlı kit NPC'dir. Yeni portre yok.
- **Animasyon dizileri (≈29):** Tamar 3/4: 6 (koşu, omuz yüküyle yürüme, demetin kayması, gerdirme, yüzünü yere eğme, balık çevirme); yeniden kullanım (sayılmaz, GDD §16.1): kandili üfleme, ip arşınlama ve kandili yere koyup alma 7. bölümden; kandili kaldırma, Koru, kandili kuşağa asma ve ağır yükü iki elle taşıma (binek taşı) 4. bölümden; düğüm atma ve çözme (ulama, bilezik bağı, ilmikler) 5. bölümün yular bağlama ve çözme dizisinden · Tamar yan hikâyede değnek ve ıslık: 6. bölümden yeniden kullanım (0) · Tamar yan görünüm: 3 (koşu, dönüp seslenme, soluklanma) · Yoram yan görünüm: 2 (koşu, el ele koşu) · Yoram 3/4: 1 (damda uyuma) · İsa: 2 · iki adam: 1 · kanonik kadınlar (kit varyantlarında ortak): 3 (eğilme, yan görünüm koşusu, soluklanma) · Şifra: 2 (köz çömleğinden yakma, yan görünüm seğirtme) · Mika: 1 (uyuma, kıpırdanma, doğrulma) · Mika'nın annesi: 1 (kıpırdanma) · Natan: 1 (uyuma ve kıpırdanma) · Eliab: 2 (ağlama, bileğe yün bağlama) · Petrus: 1 (3/4 koşu, Sahne 11) · Elişeva: 1 (dans adımı) · bekçi: 1 (kapıyı açma) · yüzler kiti: 1 (eşikte el kaldırma). İki yolcu kitin konuşma dizisini kullanır. 450 tavanı içinde.
- **Set-piece:** 1 (15 ekranlık şerit). **Tablo:** 0. **Önceden çizilmiş kompozisyon:** 6 gök görünümü (§13; GDD §16.1). **Hatıra nesnesi simgesi:** 4. **Motor içi ara sahne:** 3 (kapıda şafak, mezar, akşam).
- **Riskler:** Ağaran gökteki kara biçimlerin ve pembe kuşağın 640×360'ta okunması; küçük sprite'ta alev eğimi; 15 ekranlık koşu şeridinin maliyeti; orta katmandaki kadın grubunun Tamar'ın hızına uyarlanması; yüz yuvalarının bayrak birleşimleri için QA matrisi; dirilmiş İsa'nın tasvirinin kuruldan geçmesi; 7. ve 9. bölümlerle eşitliğin korunması.
- **Kesme adayları:** Yan hikâye (Sahne 12 kalır, Eliab'ın sesi çıkarılır); K2'deki Tapınak dalı (gök okuması yalnızca A2'de); koşudaki başkâhinin dış kapısı; koşudaki kervan hanı yuvası (Kodeks 4; kesilirse N bir azalır); 24:37–43 metni (sahne 24:36'da biter); `b10_mika_gece`; `b10_balik`.

## 17. Açık Sorular

1. 24:37–43 metin olarak verilsin mi? 24:42'de tabağın Tamar'ın elinden geçmesi ve Tamar'ın balığı çevirebilmesi kabul mü? (Yedek: tabak başka sofradan gelir; balık çevirme kaldırılır; yaşlı Tamar: "Izgarada balık vardı.")
2. **Kapandı:** GDD §2.2-A toplananlara söylenen sözleri Luka 24:36, 38–39, 41 olarak açıkça sayar.
3. 7. bölümle eşitlik: kiriş, çentikler, "bir el beş el olur", "kiriş düğümüne bir arşın, her çekene bir arşın", iki kama, Tamar'ın 6 arşınlık ipi ve Tamar'ın "üç kişi yeter" sözü 7. bölümün son sürümüyle aynıdır. Bu bölümdeki yeni koşullar şunlardır: Yair'in olmaması, yuvarlak taşın yirmi el istemesi ve ipte dört kadının kalması.
4. **Kapandı:** Cuma hatıraları (9. bölüm Sahne 7), kuleleri sağda gösteren dönüş karesi (Sahne 8), bahçedeki basamaklar ve kanal 9. bölümde kurulu. 9. bölümün Harita A'sı rota boyunca çizilir; ortak kapı çiziminde kapı kuzey surda, kuleler batısındadır.
5. **Kapandı:** Şifra tek kişidir; 2. bölüm yeniden adlandırılmaz, Amram'ın Kefarnahumlu değirmen taşı ustası olduğu orada kurulur.
6. **Kapandı:** GDD §8.4 `b10_ifade_kosu_ugrak`'ı, 10'da okunan `b05_dositeos`, `b06_esik`, `ilis_*` ve isteğe bağlı `kol_b09_kemik_boncuk`'u içerir; `b03_suc` 10'da okunmaz. `ilis_yoram` yalnızca `ofke_paylasti` yolunda, `ilis_hananya` yalnızca `yakin`/`temkinli` değerleriyle okunur.
7. **Kapandı:** Kanonik kandil tablosu GDD §5.1b'dedir (kuşakta ve omuz yükü dahil); "Yere koy" Etkileşim eylemidir (GDD §5.1a). Bu bölüm o değerleri kullanır (§6.1).
8. Kent kapılarının gün ağarınca açılması ve Samiriyeli bir kervanın bayram haftasında kentteki handa bulunması tarihçiye sorulmalı (Kodeks 4).
9. **Kapandı:** İki adamın stil kuralı GDD §2.2-A'dadır: insan biçimi, parlaklık yalnızca giysilerde; kanat, hale ve yüz ayrıntısı yok.
10. **Kapandı:** GDD §5.1a'da Kandil ile Kavrayış ayrı eylemlerdir, Kulak Bakış'ın içindedir; bulmacalar eylem adlarına dayanır.
11. **Kapandı:** GDD §14.1 24:5'i "Diri olanı neden ölüler arasında arıyorsunuz?" biçiminde verir ve bahçeye yolu kandil ve ağaran gökle anlatır.
12. **Çözüldü:** Hız sabitleri GDD §4.1'de tanımlıdır; bu bölüm yan görünümde 80 / 108 / 200 px/sn kullanır. Epilogda koşu yoktur (yaşlı Tamar'ın yürüyüş seti yoktur, GDD §3.1); Koşu bölüm seçimiyle yeniden oynanan önceki bölümlerde açılmaz (§7.2).
13. **Kapandı:** GDD §11.2 genel kuralı verir: büyük sprite yalnızca ön katmanda, öbür figürler orta katmanda 32×48; farklı ölçekteki figürler birbirine değmez. Bu bölüm o kuralı uygular (§4.4).
14. **Kapandı:** GDD §5.3 yas evini tanımlar (bu bölümün şafaktan önceki evi dahil); orada Kulak ile söz toplanmaz, gerekli sözler halkaya kendiliğinden düşer.
15. YC karşılaştırması: 23:55, 24:5–7, 24:11, 24:34, 24:35, 24:38–39, 24:41 ve Markos 16:3 basılı metinle doğrulanmalı (§1).
16. **Kapandı:** GDD §7.2'deki 10. bölüm satırının "Girdi kesilirse" hücresi bu belgenin §7.2'siyle aynıdır.
