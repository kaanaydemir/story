# KANDİL — Yıldızdan Şafağa

**Oyun Tasarım Belgesi (GDD)** · Sürüm 1.1 · Ekim 2026
**Aşama:** Tasarım (kod yok) · **Dil:** Türkçe (İngilizce yerelleştirme planlı)

> **Bu belge nasıl oluştu?** Panelin üç konseptinden genel puanda öne çıkan **Konsept C (Kandil)** temel alındı. Ondan şunlar geldi: az sayıda ama derinleşen fiil, tırmanma tablosu ve "yeni sistem eklenmez" disiplini. Kahraman, çerçeve hikâye ve kaynağa sadakat kuralları **Konsept A**'dan (Tamar) alındı, çünkü sadakat jürisi kanona en sağlam yerleşen kahramanın o olduğunu tespit etti. **Konsept B**'den en güçlü katılım fikirleri, dokunmama anları, danışma kurulunun yapısı ve arkeolojiye dayanan Kodeks aşılandı. Jürilerin "mutlaka ele alınmalı" (mustAddress) maddelerinin her biri bu belgede bir karar olarak karşılık buluyor. **Ek A**, her maddenin hangi bölümde çözüldüğünü gösterir. "Doğrulanmalı" etiketi, dış kaynak ya da danışman onayı bekleyen bilgileri işaretler.

> **Sürüm 1.1 notu.** On bölüm belgesi yazıldıktan sonra üç bölümler arası denetim (sistemler; anlatı ve sadakat; üretim ve sanat) yapıldı ve kanonik kararlar bu belgeye işlendi:
> - **Kontroller ve sistem sabitleri:** Tek kontrol eşlemesi (§5.1a; Bakış ile Kulak aynı tutuşta, Kavrayış D-pad ↑ / Tab'da). Kandil sabitleri tablosu (§5.1b), Taşı'nın iki biçimi ve kap kapasiteleri (§5.1c), Güt'ün kısa ve uzun basış dilbilgisi eklendi. Bölüm belgeleri tuş değil eylem adı kullanır.
> - **Bulmaca kuralları:** Kavrayış'ın tipli boşlukları (nesne türü dahil), her ayarda geçerli üç başarısız deneme kuralı (§6.2), Bekleyiş geri bildirimi, imza bulmaca başına bir Usta kısıtı, §5.4'ün kapsamı ve "oyun kısaltması" işareti (§6.1). §4.1 tempo tablosu bölüm kırılımlarına eşitlendi; hız sabitleri eklendi.
> - **Seçimler ve bayraklar:** Seçim girdisi kuralları (§8.1), Kalp ekseninin ölçütü (§8.2), adlandırma ve tür kuralları (§8.3; eksenler −4…+4) yazıldı. §8.4 bayrak tablosu bölümlerden yeniden üretildi; §8.9 epilog yuvaları bayraklarla eşlendi. "Kutsal eşik" tanımlandı ve dokunmama listesi netleşti (§7.1).
> - **Kronoloji ve kadro:** Kaçış, müjdeden bir iki yıl sonradır. Tamar Kana'ya düğünün dördüncü günü varır. Çarmıh ve diriliş için hiçbir yerde yıl verilmez. Bölümler arası kurgusal kişiler kaydı ve "bir ad, bir kişi" kuralı eklendi (§3.3); Yoram'ın ve Dositeos'un yayları tekleştirildi (§8.6).
> - **Sözlük ve metin:** YC terimleri, yer adları, kitap adları ve birim politikası (§15.1-5); kanonik replik etiketleri (§15.1-7); dört kanonik Meryem için tam konuşmacı etiketi; "Mecdelli" yalnızca sıfattır, Tamar'ın lakabı "tuzlamacı"dır.
> - **Hassasiyet ve tasvir:** Melek, Vaftizci Yahya ve İsa'nın annesi için tasvir kuralları; katliamın her yerde aynı biçimde anılması; Tutku görsellerinin ölçütü; Yahuda'nın tasviri; açılış notunun yeri; askerlerin bölgeye ve döneme göre gösterilmesi; Şabat ve bayram günleri (§2.2). Arka ışık kuralı §11.6'ya eklendi.
> - **Uyumlaştırma:** §2.3 tablosuna vaftiz, doğum anlatıları, ekmeklerin dağıtımı, Luka'nın yolculuk anlatısı, başkâhin, kadınların koşusu ve Luka 24:34 satırları eklendi. Öncü Müjde bölüm künyesinde yazılır.
> - **Sanat ve üretim tavanları:** Set-piece sayım kuralı (5 kullanılır, tavan 6) ve Anlatılan Sahne şeritleri (§11.1); yan görünümde katman ve temas kuralı (§11.2); bölüm paletleri (§11.3); tablolar (8, tavan 12), kartlar ve kalabalık kiti (§11.5). §16.1 sayım birimleriyle yeniden yazıldı: harita 24, adlandırılmış karakter 38 (tavan 40), portre 24, animasyon ≈425 (tavan 450), önceden çizilmiş kompozisyonlar, 40 hatıra simgesi. Dikey dilim, kitaplara göre sanat yükü, kesme listesi ve riskler güncellendi (§16.3–16.5).
> - **Bölüm belgeleri:** `docs/bolumler/` altındaki on bölüm belgesi bu sürümle hizalanmıştır. Ortak sabitler, bayraklar, sayımlar ve kurallar bu belgeden alınır (§14 bağlantıları).

---

## 1. Özet

| | |
|---|---|
| **Oyun adı** | *Kandil — Yıldızdan Şafağa* (çalışma adı; uluslararası çalışma adı *Lamplight*) |
| **Tür** | Anlatı odaklı bulmaca-macera ("story game"), modern ve detaylı piksel sanat |
| **Platform** | Önce PC (Steam), ikinci dalgada Switch; mobil daha sonra değerlendirilecek. Gamepad ve klavye/fare |
| **Süre** | Ana yol yaklaşık 7,4 saat (445,5 dk; 10 bölüm, bölüm başına 35–55 dk, §4.1); isteğe bağlı yan hikâyelerle yaklaşık 8,4 saat |
| **Hedef kitle** | 10 yaş ve üstü genel kitle: aileler, inananlar, bu hikâyelere ve tarihe meraklı oyuncular, anlatı ve bulmaca oyunu sevenler |
| **Yaş derecelendirmesi** | Hedef **PEGI 12 / ESRB E10+** (gerekçesi aşağıda) |
| **Ekip ve takvim** | 7–8 çekirdek kişi ve sözleşmeliler; 30–36 ay. Üç kitaplık bölümsel yayın seçeneği var |

**Logline.** Beytlehem kırlarında meleklerin müjdesini duyan dokuz yaşındaki çoban kızı Tamar, otuz yıl sonra kırgın bir dul ve işten işe koşan bir gündelikçidir. Küpleri dolduran, sepetleri taşıyan, mezar taşının ipini çeken eller onunkidir; mucizeyi yapan ise asla o değildir. Oyuncu tarihi değiştirmez, bir kadının kalbini değiştirir.

**Kısa tanıtım.** *Kandil*, İncil'deki on olayı birinci yüzyıl Celile'si ve Yahudiye'sinde yaşamış kurgusal bir tanığın gözünden anlatır. Oyuncu İsa'yı hiçbir zaman yönetmez, O'nun sözlerini seçmez. Olayların çevresindeki *insan işini* yapar: sürü güder, su taşır, ip bağlar, kandili rüzgâra karşı korur, duyduklarını birleştirip bir sonuca varır. Beş temel sistem on bölüm boyunca birbirine eklenerek derinleşir. Seçimler kanonu değiştirmez; Tamar'ın ilişkilerini, anlayışını ve sonunda nasıl tanıklık edeceğini şekillendirir. Görsel dil yıldız ışığıyla başlar, kandil ışığıyla sürer, öğle karanlığından geçer ve şafakta oyunun ilk tam renkli paletine açılır.

**Neden PEGI 12?** Varsayılan hedef 7–12 aralığıydı. Beytlehem'deki çocukların öldürülmesine yapılan ima (bir tablo, bir yas cümlesi, uzaktan bir ağıt sesi ve ayet metni; şiddet gösterilmez) ile çarmıh bölümü, en ölçülü anlatımla bile 7 etiketinin sınırlarını zorlar. Bu yüzden 12'yi hedefliyoruz; derecelendirme kuruluşlarının ön değerlendirmesi *doğrulanmalı*. Ailelere yönelik "birlikte oynanabilir" mesajı pazarlama üzerinden verilir.

**Referans oyunlar**

| Oyun | Ondan aldığımız |
|---|---|
| *Eastward*, *Sea of Stars* | Sıcak, ayrıntılı piksel dünya; dinamik ışık; ifadeli NPC animasyonu |
| *Chained Echoes*, *Owlboy* | 3/4 okunurluk; yan görünümde paralaks derinliği |
| *Octopath Traveler* (HD-2D) | Yalnızca ışık ve atmosfer hissi; 3B ortam kullanmıyoruz (bkz. §11) |
| *Hyper Light Drifter* | Az sözle anlatım; renkle duygu |
| *The Case of the Golden Idol* | Yumuşatılmış, kaba kuvvete kapalı çıkarım (Kavrayış) |
| *Unpacking* | Dokunsal, sakin el işi hissi |
| *What Remains of Edith Finch* | Anlatı içinde anlatı cesareti (benzetme bölümleri) |

---

## 2. Tasarım İlkeleri ve Kaynağa Sadakat Kuralları

### 2.1 Tasarım sütunları

1. **Tanık ol, yönetme.** Kanon sabittir. Oyuncunun etki alanı Tamar'ın elleri, sözleri ve kalbiyle sınırlıdır.
2. **İnsanın işi, Tanrı'nın işi.** Oyuncu küpü doldurur, suyu şaraba çevirmez. Taşı çeker, ölüyü diriltmez. Mucize hiçbir zaman bulmaca olmaz.
3. **Az fiil, derin bileşim.** Beş sistem vardır. Her bölüm en fazla bir yeni fiil ve bir kıvrım getirir. Yeni bir sistem türü eklenmez.
4. **Gündelik hayat bulmacadır.** Her bulmaca birinci yüzyılın gerçek bir ihtiyacından doğar. Bulmacayı çözen oyuncu tarih de öğrenir.
5. **Işık anlatır.** Yıldız, kandil, öğle karanlığı ve şafak hem mekaniktir hem de duygusal dilbilgisi.
6. **Ölçülülük ve herkese saygı.** Vaaz yok, parodi yok, karma çubuğu yok. Hangi gelenekten gelirse gelsin hiçbir oyuncu kendini hedef alınmış hissetmemeli.

### 2.2 Sadakat ve hassasiyet kontrol listesi (değiştirilemez)

Her sahne betiği, metin kilidinden önce bu listeyle denetlenir. Listedeki bir maddeyi esnetmek için danışma kurulunun yazılı onayı gerekir.

**A. İsa'nın temsili**
- [ ] Oyuncu İsa'yı hiçbir zaman yönetmez ve O'nun sözlerini ya da eylemlerini seçmez.
- [ ] İsa'nın sözleri yalnızca İncil'den alınır: lisanslı alıntı ya da kurulun onayladığı yakın aktarım, her zaman ayet referansıyla (§15).
- [ ] **Seslendirme yok, portre yok, hiçbir ölçekte yüz ayrıntısı yok, hale ya da parıltı yok.** Kutsallık kompozisyonla ve insanların tepkileriyle anlatılır.
- [ ] **Melekler ve göksel haberciler** metnin betimlediği biçimde gösterilir: kanat, hale ve yüz ayrıntısı yoktur, şarkı söylemezler. Luka 2'deki melek insan boyunu biraz aşan dikey bir ışık biçimidir; gök ordusunun ışıkları yıldızlardan ayrı çizilir ve 2:15'te söner. Luka 24:4'teki iki adam insan biçimindedir, parlaklık yalnızca giysilerindedir.
- [ ] **Vaftizci Yahya:** İslam'da peygamber sayılan Vaftizci Yahya'ya İsa'nın yüz kuralı uygulanır: göz pikseli, yakın plan ve portre yoktur; uzak plan ya da 3/4 arkadan çizilir.
- [ ] **İsa'nın annesi:** İsa'nın annesi Meryem'in portresi yoktur; sprite'ında yüz örtü gölgesiyle yarı kapalıdır. Bu tasvir kuralları (melekler, Yahya, İsa'nın annesi) kurulun, Müslüman ilahiyatçı dahil, onayına bağlıdır.
- [ ] İsa'nın kişisel bir müzik motifi yoktur. O sahnedeyken müzik geri çekilir ve geriye tek bir uzun ton kalır.
- [ ] İsa, Tamar'ın içinde bulunduğu gruba yalnızca metnin o gruba söylediği sözlerle hitap eder; örneğin hizmet edenlere Yuhanna 2:7–8, Yeruşalim kızlarına Luka 23:28, toplananlara Luka 24:36, 38–39, 41. Bunların dışında ilgisi jestle gösterilir: bir bakış, bir duraksama, uzatılan bir el.
- [ ] Kaydedilmemiş öğretiler somutlaştırılmaz. Örneğin Emmaus yolundaki açıklamanın içeriği (Luka 24:27) oyunda yer almaz.
- [ ] Yedek plan: Türkiye'deki danışmalar gerektirirse "yalnızca ışık ve gölge" biçiminde daha soyut bir temsil kipi hazır tutulur (§11.6).

**B. Kanon ve sıralama kilitleri**
- [ ] Kanonik olaylar hiçbir seçimle değişmez. Kanonu bozabilecek bir girdi oyunda **hiç yer almaz**: Yahuda'yı durduracak bir düğme yoktur. Oyuncuyu geri çeken yollar ve sahte seçimler de yasaktır.
- [ ] Küpler ancak "Küpleri suyla doldurun" (Yuhanna 2:7) buyruğundan sonra dolar. Şölen başkanı 2:9–10 boyunca habersiz kalır. Sırla ilgili seçim 2:10'dan sonra gelir.
- [ ] Taş, "Taşı kaldırın" (11:39) sözünden ve Marta'nın itirazından sonra kaldırılır. Marta her durumda Beytanyalı Meryem'i çağırır (11:28).
- [ ] Yahuda her durumda gider. Petrus'un suda yürüyüşünün süresi sabittir ve oyuncunun girdisine bağlı değildir.
- [ ] Kanonik bir hareketin (ör. Yahuda'nın merdivenden inişi) yanındaki seçimler hareketten önce ya da sonra sunulur, hareket sürerken sunulmaz; süresiz seçim kanonik kişiyi bekletmez.
- [ ] Kadınlar her durumda boş mezarın haberini elçilere götürür (Luka 24:9–10). Tamar'ın kişisel sessizliği bu kanonik haberi engellemez.
- [ ] Oyuncunun girdisi hiçbir mucizenin kapsamını, süresini ya da biçimini değiştirmez.

**C. Kanonik kişiler**
- [ ] İsa'nın annesi Meryem, Marta, Beytanyalı Meryem, Petrus, Mecdelli Meryem ve diğer kanonik kişiler kanonik anlarda yalnızca metindeki sözlerini söyler (kanonik replik kilidi).
- [ ] Kanonik bir kişi için yazılan her kurgusal satır (örneğin Marta'nın gündelik ticaret konuşması) kurul onayından geçer ve en aza indirilir. Oyundaki kanonik Meryemlerin hiçbiri için (İsa'nın annesi, Beytanyalı Meryem, Mecdelli Meryem, Yakup'un annesi Meryem) kurgusal diyalog yazılmaz; portre yasağı da hepsini kapsar (§10).
- [ ] **Konuşmacı etiketleri** her zaman tam biçimdedir: "İsa'nın annesi", "Beytanyalı Meryem", "Mecdelli Meryem", "Yakup'un annesi Meryem". Tek başına "Meryem" etiketi kullanılmaz.
- [ ] İnanç ikrarları ve ilahi duyurular (Yuhanna 11:27; Matta 14:33; Luka 2:11; Luka 24:5–7; Luka 24:34) oyuncunun karakterinin ağzından ne seçimle ne otomatik olarak çıkar; Tamar bunları ancak "… dedi" biçiminde aktarabilir. Matta 14:33 ve Luka 24:34 ona hiç verilmez. Bu sözler her zaman kanonik konuşanın alıntısı olarak duyulur.
- [ ] **Topluluk sözleri:** Kanonik ama adsız topluluk sözleri (Luka 2:15, 3:10, 15:2; Markos 16:3; Luka 24:34) metni değiştirilmeden kurgusal konuşanlara bölünebilir ya da grupça söylenir. Altyazıda grup etiketi (Çobanlar, Halk…) ve ayet etiketi bulunur; kurgusal ekler ayrı bir vuruşa konur.
- [ ] **Benzetmeler:** Benzetmelerde (Anlatılan Sahne) ayet metni dışındaki her söz Tamar'ın iç sesidir ve onun çerçevesiyle gösterilir. Benzetme sürerken kalabalıktan kimse konuşmaz.
- [ ] **Yönlendirme mekanikleri:** Güt, ışık izleme ve benzeri yönlendirme mekanikleri İsa'ya ve kanonik kişilere uygulanmaz.
- [ ] **Kanonik kadınlar:** Luka 24:10'daki kanonik kadınlar (Mecdelli Meryem, Yohanna, Yakup'un annesi Meryem) 9. ve 10. bölümlerde portresiz, kurgusal satırsız, ayırt edilir kit varyantlarıyla görünür; 9. bölümde adsız, 10. bölümde adlarıyla anılırlar. Tamar onların yerini almaz ve önlerine geçmez; haberi elçilere götüren her durumda onlardır.
- [ ] Mecdelli Meryem, Luka 7:37'deki "günahkâr kadın" ile ya da fahişe kalıbıyla asla karıştırılmaz.
- [ ] **"Mecdelli" sözcüğü** yalnızca betimleyici sıfattır (Mecdelli komşular, Mecdelli Ferisi); tek başına hitap ya da Tamar'ın lakabı olarak kullanılmaz. Tamar'a mesafeli hitap "tuzlamacı" (kapattığı tuzlu balık atölyesinden), yakın hitap "Tamar"dır. 9. ve 10. bölümlerde Tamar için "Mecdelli" sözcüğü hiç geçmez; Mecdelli Meryem her zaman tam adıyla anılır.

**D. Seçim etiği**
- [ ] Sayısal bir iyilik/kötülük çubuğu yoktur. Eksenlerin iki ucu da metinden meşruiyet alır (§8).
- [ ] Hiçbir seçim sadakatsizliği içerikle ödüllendirmez. Kapıdaki soruya itiraf, inkâr ya da sessizlikle yanıt veren oyuncu aynı kanonik tanıklığa ulaşır (§8.5).
- [ ] "Sessiz kal" her diyalogda geçerli bir seçenektir. Sessizliği seçen oyuncu finalde eksik bir sonla cezalandırılmaz (Markos 16:8 ve Luka 2:19 kanonik uçlardır).
- [ ] "Makul gerekçeyle geçip gitmek" gibi seçenekler saygıyla yazılır. Oyun kimseyi azarlamaz.

**E. Hassasiyet**
- [ ] **Antisemitizme karşı:** İsa, annesi Meryem, öğrenciler ve Tamar Yahudidir; Yahudi gelenekleri sevgiyle ve doğru biçimde gösterilir. Kalabalık hiçbir zaman "Yahudiler" diye genellenmez. Ferisiler, kâhinler ve Kayafa kendi kaygıları olan bireyler olarak yazılır (Yuhanna 11:48). İnfazı Roma gerçekleştirir. **Matta 27:25 oyunda kullanılmaz.** Yuhanna'dan yapılan alıntılarda "Yahudiler" ifadesi geçiyorsa bağlamı Kodeks'te açıklanır; ana sahnelerde Luka öncü metin olarak seçilmiştir (§2.3).
- [ ] **Müslüman oyuncular:** Açılış notu farklı yorumları anar: "Bu oyun İncillerdeki anlatıyı izler; farklı inanç gelenekleri bu olayları farklı yorumlar." Oyun polemiğe girmez. Kireneli Simun ya da Yahuda etrafında, ikame (şebbihe) tartışmasına malzeme olabilecek bir gizem kurulmaz.
- [ ] **Şiddet:** Beytlehem'deki katliam bir tablo, yaşlı Tamar'ın tek yas cümlesi, uzaktan tek bir ağıt sesi ve ekranda Matta 2:18 ile anılır; asker ve şiddet gösterilmez. Katliam her yerde (§1, 1. bölüm, §17.10) bu biçimde anılır. Çarmıh silüet, ses ve tepkilerle anlatılır; çivi ve kan gösterilmez. Markos 14:51–52 oyunda yer almaz.
- [ ] **Tutku görselleri** (kalabalık, kâhinler, Pilatus) ABD Katolik Piskoposlar Konferansı'nın Tutku canlandırmalarını değerlendirme ölçütlerini (1988) ve kurulun İkinci Tapınak dönemi uzmanının onayını izler: kalabalık ayrışmamış uzak bir silüettir, bağıran yüz ve kâhin karikatürü yoktur; karar valinin, infaz Roma'nındır. "Pilatus'un önünde" tablosu bu ölçüte bağlıdır ve tasvirli sancak içermez (Josephus, Yahudi Eski Eserleri 18.55–59).
- [ ] **Yahuda** öbür öğrenciler gibi olağan ışıkta çizilir; özel gölge, ışık, renk filtresi ya da para kesesi gibi ayırt edici bir simge yoktur ve görünüşü İsa'nınkinden açıkça ayrılır.
- [ ] **Açılış notu** oyunun ilk ekranıdır ve 1. bölümün içerik bilgilendirmesinden ayrı, ondan önce gösterilir; son metni §17.9'daki karara bağlıdır.
- [ ] **Efkaristiya sözleri** (Matta 26:26–28) kelimesi kelimesine ve bir tablo içinde verilir. Hiçbir geleneğin Efkaristiya teolojisini öne çıkaran bir yorum eklenmez; sahne "gizlice dinleme" biçiminde kurgulanmaz.

**F. Tarihsellik**
- [ ] **Askerler bölgeye ve döneme göre gösterilir:** Büyük Hirodes dönemi Yahudiye'sinde (1. bölüm) Kral Hirodes'in kendi ordusu (yabancı paralı birlikler dahil); Celile ve Perea'da bölge kralı Hirodes'in (Antipas) askerleri; MS 6 sonrası Yahudiye'de Roma valisinin yardımcı birlikleri (çoğu Sebaste ve Sezariye'den). Hiçbir bölümde lejyon sancağı ya da lejyon kalkan amblemi yoktur. Çivili sandalet (caliga) sesi yalnızca Roma yardımcı birliklerine verilir; Kral Hirodes'in askerleri için, tarihçi aksini onaylamadıkça nötr bir askerî adım ve donanım sesi kullanılır.
- [ ] **Şabat ve bayram günleri:** Şabat'ta ve bayramların kutsal toplantı günlerinde (Fısıh'ın 1. ve 7., Çardak Bayramı'nın 1. ve 8. günü) iş ve ticaret gösterilmez. Yasaklar kaynağıyla verilir (Mısır'dan Çıkış 16:22–30, 35:3; Levililer 23; Yeremya 17:21–22; Nehemya 10:31, 13:15–19; Mişna Şabat 7:2, yazıya geçişi MS 200 dolayı); izinli olanlar açık kalır ve gelenek olduğundan katı gösterilmez. Birden çok güne yayılan Yahudi ortamlarında Şabat görünür olur. Kanonik metnin açıkça anlattığı eylemler (Luka 23:56; Markos 15:46) bu kuralla düzeltilmez; sinoptik çerçevedeki gerilim Kodeks'te tarafsızca notlanır (§2.3).
- [ ] **Gün başlangıcı ve Nisan:** Yahudi günü gün batımında başlar. Miladi ayla karışmaması için ekranda ve Kodeks'te "İbrani Nisan ayının 14'ü" ya da "Nisan'ın 14'üne giren gece" biçimi kullanılır.
- [ ] Yalnızca gelenekte geçen ayrıntılar (yıldızbilimcilerin develeri gibi) Kodeks'te "geleneksel" diye işaretlenir. Mayalı ekmeği kandille arama geleneğinin kaynağı Mişna'dır (Pesahim 1:1; Mişna MS 200 dolayında yazıya geçmiştir; birinci yüzyıl uygulaması doğrulanmalı); bu da notlanır.
- [ ] Kadınlarla erkeklerin ayrı alanlarda bulunması abartılmaz ve bir bulmaca mekaniğine dönüştürülmez.
- [ ] Köylü bir kadının okuryazar olduğu varsayılmaz: Tamar'ın tanıklığı sözlü olarak aktarılır.

**G. Süreç**
- [ ] **Danışma kurulu:** Rum Ortodoks, Ermeni Apostolik, Süryani, Katolik ve Protestan danışmanlar; bir Müslüman ilahiyatçı (yalnızca bir kültür danışmanı değil); bir İkinci Tapınak dönemi Yahudiliği uzmanı ve bir birinci yüzyıl tarihçisi.
- [ ] Her bölümün metni, sabit bir inceleme ritmiyle kuruldan geçtikten sonra kilitlenir (§16).

### 2.3 Müjdeler arası farklar için uyumlaştırma politikası

**Kural:** Her bölümün bir **öncü Müjdesi** vardır. Öncü Müjde ile çelişmeyen tamamlayıcı ayrıntılar başka Müjdelerden alınabilir. Çelişen ayrıntılarda (isim listeleri, saatler, kimin neyi önce gördüğü) yalnızca öncü Müjde izlenir. Farklılıklar Kodeks'te tarafsız notlarla açıklanır. Öncü Müjde bölüm künyesinde yazılır. Bir sahne başka bir Müjde'yi öncü alıyorsa (8. bölümde öncü Markos'tur, ama sofra sözleri Matta 26:26–28'i, kapı sahnesi Luka 22:54–62'yi izler) bu istisna gerekçesiyle bölüm belgesinde yazılır.

| Konu | Farklılık | Oyundaki karar |
|---|---|---|
| Son Akşam Yemeği'nin tarihi | Sinoptik İnciller: Fısıh yemeği (Markos 14:12). Yuhanna: Fısıh'tan önceki hazırlık günü (19:14) | 8. bölüm sinoptik çerçeveyi izler (öncü Markos). Yan etkisi: çarmıh Cuması bayramın ilk günüdür (İbrani Nisan ayının 15'i; Levililer 23:6–7). Yusuf'un bez alması (Markos 15:46) ve baharat hazırlığı (Luka 23:56) bu farkla birlikte Kodeks'te tarafsızca notlanır. MS 30 ve 33 önerileri Yuhanna'nın kronolojisine uyan yıllardır; oyun çarmıh ve diriliş için hiçbir yerde yıl vermez |
| Çarmıhın saatleri | Markos 15:25 ve Yuhanna 19:14 farklı saatler verir | 9. bölümde Luka öncüdür. Yeni Çeviri saatleri günümüz saatine çevirdiği için bölüm başlıkları "altıncı saat" gibi ifadeler kullanmaz |
| Yüzbaşının sözü | Luka 23:47 ile Markos 15:39 farklıdır | Luka 23:47 kullanılır |
| Mezara giden kadınlar | Her Müjde farklı bir liste verir | Luka 24:10 izlenir; Tamar "öbür kadınlar" arasındadır |
| İsa'nın ilk görünmesi | Matta 28:9, Yuhanna 20:14 ve Luka 24:13 vd. | Tamar dirilmiş İsa'yı mezarda görmez. Onunla Luka 24:33–36'daki toplantıda, "onlarla birlikte olanlar" arasında karşılaşır |
| Vaftizde gökleri kimin gördüğü | Matta 3:16 ve Markos 1:10: İsa gördü. Yuhanna 1:32: Yahya tanıklık etti | Tamar suyun çevresindeki ışığı görür. Açılan gökler, güvercin ve ses Matta 3:16–17'nin anlatımıyla bir Anlatılan Sahne kartında verilir. Yahya'nın tanıklığı (Yuhanna 1:32: Ruh'un güvercin gibi inişi; ses ve açılan gök yoktur) metindeki yerinde, Tanrı Kuzusu sahnesinin başında ayrı bir kartta verilir |
| Doğum anlatıları | Çobanlar, sünnet, sunuluş ve Nasıra'ya dönüş Luka'da (2:8–39); yıldızbilimciler, Mısır'a kaçış ve Nasıra'ya yerleşme Matta'da (2:1–23). Ziyaretin zamanı belirsizdir (Matta 2:11 ev, 2:16 iki yaş) | Yalnızca Luka'nın çobanlar sahnesi oynanır; Luka 2:21–39 oynanmaz. Matta'nın anlatısı iki tabloda, tanıklık iddiası olmadan ve Tamar'a aylar sonra anlatılan bir haber olarak verilir. Tamar'ın ailesinin kaçışı bir iki yıl sonradır |
| Ekmeklerin dağıtımı | Matta 14:19'da öğrenciler dağıtır; Yuhanna 6:11'de İsa dağıtır, 6:5–7'de Filipus sınanır | 4. bölüm Matta'yı izler. Yuhanna'dan yalnızca çelişmeyen ayrıntılar alınır (6:4, 6:8–9, 6:12–13); fark Kodeks'te notlanır |
| Luka'nın yolculuk anlatısı | Luka 9:51–19:28 süre ve güzergâh vermez; İsa kente 19:28–45'te girer; Yuhanna 7:10 gizli bayram gidişini anar | 5. bölüm varış ya da bayrama katılım ima etmez; Yuhanna 7:10 Kodeks'te tarafsızca notlanır |
| Başkâhin | Luka 22:54 adsızdır; Matta 26:57 Kayafa der; Yuhanna 18:13 önce Hanan'ı anar | Oyun "başkâhinin konağı" der; Kayafa adı yalnızca Kodeks'te tamamlayıcı ayrıntıdır |
| Kadınların mezardan dönüşü | Matta 28:8 ve Yuhanna 20:2 koşudan söz eder, Luka biçim vermez | 10. bölüm koşuyu çelişmeyen tamamlayıcı ayrıntı olarak kullanır |
| Luka 24:34'ün konuşanı | On Birler ve onlarla birlikte olanlar; Codex Bezae'de iki yolcu | Söz toplananlardan bir sese verilir, Tamar söylemez; fark Kodeks'te |
| Metinde olmayan süslemeler | Fırtınada şimşek, suyun gözle görülür biçimde renk değiştirmesi, meleklerin "şarkı söylemesi" | Hiçbiri kullanılmaz. Fırtına rüzgâr ve dalgadır (Matta 14:24), melekler "Tanrı'yı övüyordu" (Luka 2:13), şarabın rengi gösterilmez |

---

## 3. Anlatı Çerçevesi ve Oyuncu Karakteri

### 3.1 Çerçeve: Mecdel, MS 67'den hemen önce

Roma ordusu Celile'ye ilerlemektedir; Mecdel (Tarichea) MS 67'de düşecektir (Kodeks'te notlanır). Kaçıştan önceki son gece seksen yaşındaki Tamar dokuma tezgâhının başında oturur ve torunu Sara'ya hikâyesini anlatır. Her bölüm Sara'nın bir sorusuyla açılır ve tezgâhta dokunan bir bantla kapanır. Çerçeve sahneleri kısadır (1–3 dk) ve sabit kompozisyonlarla, portrelerle kurulur: yaşlı Tamar'ın ayrı bir 8 yönlü yürüyüş seti yoktur. Sara okuryazar değildir; hikâyeyi ezberleyerek ve Mezmur 23'ü mırıldanarak taşır.

### 3.2 Tamar

Beytlehemli bir çobanın kızıdır. Müjde gecesinden bir iki yıl sonra (Matta 2:16), Kral Hirodes'in askerlerinin Beytlehem'e geldiği gece ailesi, iki yaşından küçük kardeşi Natan'ı bir postun içine saklayıp Celile'ye kaçar; Tamar o sırada 10–11 yaşındadır. Babası yolun yorgunluğuyla birkaç yıl içinde ölür.

- **Yarası:** Tamar'ın kendi sözleriyle: "Melekler Tanrı'yı övdü, sonra askerler geldi." Kocası 2. bölümden bir yıl önce ateşli bir hastalıktan ölmüştür. Mecdel'deki tuzlu balık atölyesinin borcunu ödemek için atölyeyi kapatmış, gündelikçi aşçı ve hizmetli olarak çalışmaya başlamıştır. Mesafeli olanlar ona hâlâ "tuzlamacı" der (§2.2-C).
- **İsteği:** Elinde kalanı korumak: oğlu Yoram, kardeşi Natan ve yaşlı annesi Hulda. Bunun yanında içine gömdüğü bir soru taşır: "O gece gördüğüm neydi?"
- **Neden gündelikçi?** Gündelikçilik tasarımın omurgasıdır. Her bölümde Tamar'a yeni bir iş düşer ve bu işler onu kanonun adını vermediği yerlere doğal biçimde yerleştirir: hizmet edenler, kalabalığa yardım eden kadınlar, ev hizmetlileri.
- **Neden bir kadın?** "Celile'den beri İsa'nın ardından gelen kadınlar" çarmıhı uzaktan izler (Luka 23:49), mezarın yerini görür (23:55) ve boş mezara gider. Boş mezara gidenler arasında adı verilmeyen "öbür kadınlar" da vardır (24:10). Luka 8:1–3 de İsa'yı kendi olanaklarıyla destekleyen kadınlardan söz eder. Tamar bu kadınlardan biridir; son bölümlerde orada bulunması metnin bıraktığı boşluğa yerleşir.

### 3.3 Yan kadro

| Karakter | Kim? | Uzun yay |
|---|---|---|
| **Yoram** | Tamar'ın 19 yaşındaki oğlu; Zebedi'nin teknelerinde gündelikçi (Markos 1:20) | 4. bölümde İsa'nın ardından gitmek ister; 8–10. bölümlerde yanıt bulur |
| **Natan** | Tamar'ın dokuz yaş küçük kardeşi (müjde gecesi birkaç aylık; 6. bölümde ≈34). Babalarının tek oğlu olarak mirasın tamamı ona düşmüştür (Çölde Sayım 27:8); payını alıp Dekapolis'e gitmiştir | 6. bölümde döner, eşikte bekler; 9. ve 10. bölümlerde ve epilogda yankılanır (§8.6) |
| **Dositeos** | Samiriyeli bir tüccar; Tamar'ın rakibi | 2. bölümde Tamar'a kendiliğinden yardım eder; 5. bölümde kendisi yardıma muhtaçtır; 9. bölümde görünmez, 10. bölümde koşudaki kervan hanındadır; epilogda torunu ortaya çıkar (§8.6) |
| **Hananya** | Mecdelli bir Ferisi; komşu ve dürüst bir adam | 6. bölümde benzetmenin açık sorusunu Tamar'a geri sorar (büyük oğulun yerinde Tamar durur); 9. bölümde Yeruşalim'dedir; 10. bölümde koşudaki yüzlerdendir; epilogda torunu Natan'ın mektubunu okur |
| **Hulda** | Tamar'ın annesi | 6. bölümde Natan için sofrayı kurar |
| **Sara** | Torun; çerçevenin dinleyicisi | Epilogda hikâyeyi nasıl taşıyacağı belirlenir |
| **Marta** | Kanonik; Beytanyalı. Tamar onunla ticaret yapar | Replik kilidi geçerlidir; kurgusal satırları kurul onayından geçer |

**Bölümler arası kurgusal kişiler**

| Kişi | Bölümler | Not |
|---|---|---|
| Tamar'ın babası | 1 | Adsız; sonra yalnızca anılır |
| Nahum, Yoaş | 1 (Yoaş 10'da torunu Eliab'ın ağzından anılır) | Çobanlar |
| Amram | 2 | Kefarnahumlu bazalt değirmen taşı ustası, kamp büyüğü; 9. bölümden önce ölmüştür |
| Şifra | 2, 9, 10 | Amram'ın karısı, sonra dulu; "öbür kadınlar"dan; 9. bölümde portre alır |
| Asa ve annesi | 2, 4, 9 | — |
| Gad, Elişeva | 3, 4, 10 | Kana hizmetkârları (`b03_sir`) |
| Abiezer | 4, 9 | Horazinli ihtiyar |
| Yonatan | 5, 6 | — |
| Tobi | 7 | Dositeos'un kervancısı |
| Şimi, Yair | 7 (10'da anılır) | — |
| Eldad, Atara | 8 | Testili adam (ad kurgusal); ev hanımı |
| Mika ve annesi | 9, 10 | Ev sahibi aile |
| Eliab | 10 | Yoaş'ın torunu |

**Adlandırma kuralı:** Bir ad oyunun tamamında yalnızca bir kişiye verilir. Şifra tek kişidir; 8. bölümün ev hanımı Atara'dır, 9–10. bölümlerin ev sahibi ailesi Mika ve annesidir. Tamar'ın babasına ad verilmez. Kit NPC adları dönemin Yahudi (Samiriyeli için Samiriyeli ya da Grek) ad havuzundan seçilir; kanonik kişilerin ve ana kadronun adları ile Türkçede gündelik bir sözcükle karışan adlar (ör. "Hala") kurgusal NPC'lere verilmez. Bu kurala göre 6. bölümdeki Şelomit "Rizpa", 7. bölümdeki Hala "Hagit" olur. Adlandırılmış karakter tavanına nasıl sayıldıkları §16.1'de belirlenir.

### 3.4 On bölümde Tamar: neden orada, ne kadar yakın?

"Forrest Gump etkisini" sınırlamak için her olaya bir **erişim düzeyi** atanır. *Doğrudan:* Tamar oradadır. *Kalabalıkta:* kalabalığın içindedir. *Aktarılmış:* başka birinin anlatısından dinler. *Anlatılan Sahne:* olay ayet metniyle birlikte bir okuma olarak verilir ve tanıklık iddiası taşımaz.

| # | Yaş | Neden orada? | Erişim | İç yolculuk |
|---|---|---|---|---|
| 1 | 9 | Çobanlardan birinin kızıdır (Luka 2:8) | Doğrudan; yıldızbilimciler (Tamar'a aylar sonra anlatılan haber) ve bir iki yıl sonraki kaçış iki tabloyla | Hayret, ardından kayıp |
| 2 | 41 | Tövbe vaftizi için Şeria'ya gelir, hacı kampında aşçılık yapar | Kalabalıkta; gökler, güvercin ve ses (Matta 3:16–17) ile Yahya'nın tanıklığı (Yuhanna 1:32) Anlatılan Sahne kartlarında; denenme Anlatılan Sahne kipinde bir triptik tablo | Kırgınlık |
| 3 | 41 | Düğünün son günleri için tutulmuş ek aşçı ve hizmetlidir; Şeria'dan, Yuhanna 1:35–2:1'in gün sayımına uygun olarak düğünün dördüncü gününe (oyunun kararı) yetişir | Doğrudan (hizmet edenler arasında, 2:9) | İsa'nın annesi Meryem'i tanır (yüzünü değil, eğik başını ve bakışını) |
| 4 | 42 | Matta 14:21'de sayılmayan kadınlar ve çocuklar arasındadır; kalabalığa yardım eder | Kalabalıkta; fırtına Yoram'ın anlatısından (Aktarılmış) | Korku ve bırakmak |
| 5 | 42 | Yeruşalim'e giden yolda İsa'yı izleyen kalabalıktadır (Luka 9:51; 10:25); varış ya da bayrama katılım ima edilmez (İsa kente ancak Luka 19:28–45'te girer) | Kalabalıkta; benzetme Anlatılan Sahne'de | "Komşum kim?" |
| 6 | 43 | Vergi görevlileri ve günahkârlarla birlikte dinler (Luka 15:1) | Kalabalıkta; benzetme Anlatılan Sahne'de; sofranın yakın uçlarına ve mutfağa hizmet eder, İsa'nın bulunduğu uca gitmez; 15:3'te eşiktedir | Kıskançlık ve lütuf |
| 7 | 43 | Marta'nın ticaret dostudur; hastalık haberini İsa'ya götürür (Yuhanna 11:3) | Doğrudan (yas tutan komşular arasında, 11:19) | Yas ve öfke |
| 8 | 44 | Üst odalı evde gündelikçi aşçıdır (Markos 14:14–15) | Doğrudan (mutfak, merdiven); sofra sözleri tabloyla; Getsemani uzaktan; avlunun içine girmez | Yakınlık ve utanç |
| 9 | 44 | Uzakta duran kadınlarla birliktedir (Luka 23:49) | Uzaktan | Sadakat ve yas |
| 10 | 44 | Baharatlarla mezara giden "öbür kadınlar"dandır (24:10); akşam toplananlar arasındadır (24:33) | Doğrudan | Tanıklık |

Yaşlar göreli bir kronolojidir. Çarmıh ve diriliş için ekranda, Kodeks'te ve tasarım belgelerinde yıl verilmez (§2.3).

---

## 4. Oynanış Döngüsü

**Anlık döngü (10–60 sn):** *Bak ve dinle → topla (söz, nesne) → uygula (fiil) → dünyanın tepkisi.* Her eylemin dokunsal bir karşılığı vardır: akan suyun titreşimi, gerilen ipin direnci, rüzgârda titreyen alev.

**Bölüm döngüsü (35–55 dk):**
1. **Çerçeve girişi:** Sara'nın sorusu (1 dk).
2. **Günün işi:** Yeni fiil ilk kez baskısız bir anda öğretilir: görev sayılmayan kısa bir an ya da başarısızlığı olmayan tek kararlı bir günün işi. Günün işi o fiili ya da önceki bir fiili derinleştirebilir (5–10 dk).
3. **Keşif ve söz toplama** (5–10 dk).
4. **2–3 bulmacalık zincir:** En az biri bir "aha" anı içerir (10–20 dk).
5. **Katılım anı:** Kanonik olay (5–10 dk).
6. **Yankı:** Tamar'ın kendi hayatında, bölümün kişisel seçimi (3–5 dk).
7. **Çerçeve kapanışı:** Dokuma bandı ve isteğe bağlı "Diğer Yollar" ekranı (1–2 dk).

**Meta döngü:** Fiiller birikir ve birleşir. Üç eksen (Söz, El, Kalp) ile beş ilişki gelişir. Heybe'deki Hatıra nesneleri ve Kodeks dolar, tezgâhtaki halı büyür. Çocuklukta öğrenilen girdiler yetişkinlikte geri gelir. 9. bölümdeki Şabat ve 10. bölümdeki tanıklık, oyun boyunca biriken her şeyi okur.

### 4.1 Tempo bütçesi (ana yol, dakika)

| Bölüm | Keşif/iş | Bulmaca | Katılım | Yankı + çerçeve | Toplam | Not |
|---|---|---|---|---|---|---|
| 1 | 8 | 12 | 8 | 7 | 35 | Yıldızbilimciler ve kaçış iki tablo |
| 2 | 13 | 11,5 | 10,5 | 5 | 40 | Kırk gün dört onluğa sıkıştırılır |
| 3 | 8 | 19 | 6 | 7 | 40 | Dikey dilim |
| 4 | 13,5 | 17 | 15,5 | 8,5 | 54,5 ≈ 55 | Gündüz (Sahne 0–10) 31,5 dk, gece ve sabah (Sahne 11–17) 23 dk; 3 dk bulmaca payı gecenin Kandil öğretimine aktarıldı |
| 5 | 8,5 | 12 | 10 | 8,5 | 39 | Yan şerit, sessiz el işi |
| 6 | 10 | 20 | 12 | 13 | 55 | Kayıp koyun ve kayıp para toplam 3 dk (sahne toplamı 54) |
| 7 | 13,5 | 18 | 11 | 7,5 | 50 | En zor düşünme bölümü; eşekli yolda 48 |
| 8 | 11,5 | 23,5 | 10,5 | 6,5 | 52 | Gerçek bulmacalar korunur |
| 9 | 10 | 0 | 18 | 7 | 35 | Bilinçli olarak bulmacasız |
| 10 | 9 | 15 | 14 | 7 | 45 | Koşu ve final |
| **Toplam** | **105** | **148** | **115,5** | **77** | **445,5 dk ≈ 7,4 sa** | Yan hikâyeler +60 dk (5'te 7, 9'da 5, öbürlerinde 6) |

Bulmaca sütunu oyun testi medyanıdır (düşünme, hatalı deneme ve ipucu dahil); §5.4-1'deki sınır temiz el işi süresidir.

**Yürüme ve geri dönüş kuralları:** Koşu 10. bölüme kadar kapalıdır. Onun yerine her zaman kullanılabilen bir **seğirtme** vardır (yürüyüşten %35 hızlı, LB/Ctrl basılı tutulur). Bir bölüm haritasının bir ucundan öbürüne yürümek 90 saniyeyi geçmez. Görev zincirleri aynı yolu ikinci kez yürütmeyecek biçimde dizilir. Tekrarlı taşıma görevlerinde (2. bölümde Su Yolu, 3. bölümde Altı Küp) ilk doğru teslimattan ya da art arda üç doğru turdan sonra kalan seferleri bitiren montaj seçeneği her ayarda açılır; montaja kadar geçen temiz süre §5.4-1 sınırına sayılır. Ziyaret edilen noktalara Tamar'ın "Yolu biliyorum" düşüncesiyle kısa geçiş yapılabilir.

**Hız sabitleri:** Tamar'ın 3/4 yürüyüşü 2,5 karo/sn'dir (40 px/sn); seğirtme %35 hızlıdır; koşu yürüyüşün 2,5 katıdır. Yan görünüm set-piece'lerinde büyük sprite ölçeği nedeniyle aynı oranlar 80 / 108 / 200 px/sn'dir. Yükle hız düşüşleri §5.1c'dedir. Koşu 10. bölümün şafak koşusunda açılır ve bölüm sonuna dek Sokaklar haritasında açık kalır; ev içlerinde ve sinemaskop sahnelerde kapalıdır. Epilogda koşu yoktur (yaşlı Tamar'ın yürüyüş seti yoktur, §3.1); bölüm seçimiyle yeniden oynanan 1–9. bölümlerde de açılmaz.

---

## 5. Mekanik Araç Kutusu

**Kural:** Beş temel sistem vardır: **Bakış**, **Güt**, **El** (Taşı/Dök, Bağla/Çöz, Ez/Karıştır), **Kulak ve Kavrayış**, **Kandil ve Vakit**. Bir bölüm en fazla bir yeni fiil ve bir kıvrım getirir. Adaptif tetik ve HD titreşim yalnızca cila katmanıdır: her girdinin klavye karşılığı, ileride dokunmatik karşılığı ve "otomatik/değiştir" seçeneği girdi mimarisine baştan dahil edilir. Analog güç eşiğine dayanan girdiler (dökme eğimi, bastırma) dijital girdide basış başına bir kademeye ya da sabit bir hıza dönüşür; analog ve dijital girdi aynı sonucu verir.

### 5.1 Araç tablosu

| Mekanik | Nasıl çalışır | Kontrol (Gamepad / Klavye) | İlk bölüm | Kullanıldığı bölümler | Derinleşme |
|---|---|---|---|---|---|
| **Bakış** | Basılı tutulunca yürüyüş yavaşlar, ekranın kenarları kararır, ayrıntılar ve uzaktaki sesler belirginleşir. Etkileşimli nesneler ince bir kenar ışığı alır; odak tektir. 3. bölümden itibaren Kulak bu tutuşun işitsel katmanıdır. Basılıyken sağ çubuk bakış yönünü çevirir; dokunmama anlarında baş kaldırmak için Bakış gerekmez (§5.1a) | LT basılı + sağ çubuk / Fare sağ tuş basılı + fare | 1 (temel kontrol olarak, yıldıza bakarken) | Tümü | Ömür boyu geri çağırma: 1'de yıldıza ve meleme yönüne, 2'de ışığa, 7'de yedi yıldızın döndüğü boş noktaya, 10'da ağaran gökte kuleleri okumaya ve "Size esenlik olsun" anında baş kaldırmaya |
| **Güt** | Sağ çubuk (Bakış kapalıyken) 60°lik bir çağrı konisi açar; X kısa ya da uzun basılır. *Hayvanlara:* kısa basış değnektir (koni 4 karo; içindekiler Tamar'dan uzaklaşan yönde 3 karo yürür; 1 sn içindeki ikinci vuruşla toplam 5 karo; fazla vuruşun cezası yoktur). Uzun basış ıslıktır (yönsüz 8 karo menzil; bırakınca hayvanlar ıslık noktasına yürür; basılıyken İptal ile vazgeçilir; ışık halkasındaki hayvanlar ıslığa yalnızca kulak kabartır). *İnsan ve gruplara:* kısa basış çağrıdır (koni 6 karo; kişiyi ya da grubu seçer, bir yere atar, ardına takar, yerine oturtur ya da ritim komutu verir). Uzun basış (1 sn) atanmış ya da oturmuş olanı kaldırır. Ritim, art arda verilen çağrıların sırasıdır; zamanlama penceresi yoktur (tek istisna değneğin çift vuruşu). Işığa yürüme yalnızca hayvanlara uygulanır. Durak taşı çağrısı gibi bağlamsal komutlar Güt değil Etkileşim'dir | Sağ çubuk (koni) + X / Fare yönü + Boşluk | 1 | 1, 3, 4, 6, 7, 9 (yan hikâyelerde 8, 10) | 1: sürü kandili izler → 3: hizmetkâr zinciri (kişi ve yer ataması) → 4: kalabalık grupları → 6: tersine döner (domuzlar değneğe aldırmaz, ıslıktan kaçar, kokuya gelir; ıslık yalnızca bu bulmacada 60°/5 karoluk koniyle hedeflenir) → 7: ip takımına ritim → 9: kalabalık seni sürükler |
| **Taşı / Dök** | İki biçimlidir (§5.1c): **kavrama** dökülecek kaplar ve ağır nesneler içindir, **al-koy** dökülmeden yuvaya konan ya da birine verilen nesneler içindir. Ağırlık hızı ve dengeyi belirler; yalnızca kavranmış kap sol çubuk eğilerek dökülür. Bırakmak hiçbir şeyi kırmaz, Tamar yükü yere koyar (kutsal taşıma anları hariç, §5.1c). Kaplar ve kapasiteler §5.1c'dedir | Kavrama: RT basılı; al-koy: A; Dök: RT + sol çubuk; Başa al / İndir: R3 / Sol tık basılı; E; sol tık + A/D; R | 2 | 2–10 (6'da yalnızca al-koy) | 2: ölçü ve pay → 3: zincirle aktarma → 4: siper ve teknede su boşaltma → 5: yük dengesi → 8: kutsal taşıma (leğen) → 9: yağ payı → 10: omuz yükü |
| **Kulak ve Kavrayış** | Kulak, Bakış'ın 3. bölümden itibaren açılan işitsel katmanıdır: Bakış basılıyken çevredeki konuşmalar simgeli balonlara dönüşür; Söz sakla ile odaktaki bir **söz** saklanır. Kavrayış'ta Tamar'ın başının üstünde boşluklu bir **düşünce cümlesi** belirir ve boşluklar toplanan sözlerle doldurulur (§5.3) | Söz sakla: LT + A; Kavrayış: D-pad ↑ / Sağ tuş + E; Tab | 3 | 3, 4, 6, 7 (yalnızca ihtiyaç simgeleri), 8, 10 (9'da yalnızca susan hâl) | 3: kiler hesabı → 4: kalabalıkta kişi bulma → 6: hesap zinciri ve konuşma kurma (lütufla kesilir) → 8: kanıttan yer çıkarma → 10: plan cümlesi ve tanıklık cümlesi |
| **Kandil** | Kısa dokunuşla yakılır ya da Açık↔Kısık arasında geçer; basılı tutulunca kaldırılır. Işık izleri, gölgeleri ve girintileri gösterir; hayvanlar ışığı izler. Koru basılıyken Tamar alevi gövdesiyle rüzgârdan korur. Işık yarıçapları, yağ, rüzgâr ve doldurma kuralları §5.1b'dedir. Kandili yere yakın tutma (Alçak) yalnızca 8. bölümde öğretilir | Kandil: Y; Koru: RB; Alçalt: D-pad ↓ / Q, F, C | 1'de basit kıvrım olarak; tam sistem 4'te | 1, 4, 7, 8, 9 (yalnızca yakma), 10 | 4: rüzgâr, Koru ve yağ → 7: Üfle ve göz alışmasıyla yıldızlardan yön bulma → 8: Alçak tutuşla arama → 10: şafak kandili gereksiz kılar |
| **Bağla / Çöz** | Sağ çubuk saat yönünde dairesel çevrilince sarılır, ters yönde çözülür; her tam daire bir turdur, düğüm A ile atılır. Gerginlik dokunsal olarak hissedilir. Hız ve özen "ifade" olarak kaydedilir | Sağ çubuk daire + A / Fare daire ya da ←/→ dönüşümlü + E | 5 | 5, 7, 10 (8'de yan hikâye) | 5: sargı → 7: kiriş düğümü ve yüz bezi → 10: ip ulama ve kaldıraç düzeneği |
| **Ez / Karıştır** | Havan ve tokmakla çalışılır, oranlar dengelenir: mayasız hamur, batırma ezmesi (haroset) harcı, baharat ve mür; acı otlar ezilmez | Ez: sağ çubuk daire + RT; Karıştır: yalnızca daire / Ez: fare daire + sol tık; Karıştır: yalnızca fare dairesi | 8 | 8, 9 | 8: oran ve parti kararı → 9: güneş batmadan baharat, tek karar |
| **Bekleyiş** (Kandil ve Vakit'in alt sistemi) | Bir Bekleyiş panosu 3–5 vakte (sütuna) ayrılır. Sınırlı kaynaklar (un, su, yer, yağ) vakitlere paylaştırılır. Zaman gerçek saatle değil, anlatı adımlarıyla ilerler; süre baskısı yoktur. Geri bildirim: Dengeli ve Usta'da yalnızca o anda düzenlenen sütun anında güncellenir; öbür sütunlar "Çeteleye işle" oynatmasına dek "henüz bilinmez" durur. Rahat'ta öbür sütunlar soluk önizlemeyle hesaplanır. Onay eylemi "Çeteleye işle"dir; bölüm dünya içi bir etiket kullanabilir (8. bölümde "Günü başlat"). Oynatma ilk eksikte durur ve Tamar sorunu adıyla söyler | Pano kipi (§5.1a) / Oklar, fare sürükle-bırak, Enter | 2 (kıvrım olarak) | 2, 7, 8 | 2: kırk gün dört onluğa → 7: yas evinde dört gün (ev planı) → 8: Fısıh hazırlığı (dört vakit) |
| **Kal** (tutuş) | Tek tuş basılı tutulur. Bırakmak hiçbir şeyi düşürmez; Tamar diz çöker, soluklanır ve yeniden kalkar ya da gözlerini kapatır. Kutsal anlarda hiçbir şey kaydedilmez | A basılı / E basılı (her zaman aç/kapa) | 7 | 7, 9 | 7: ip takımında yerini almak → 9: Golgota |
| **Söz** (diyalog) | 2–4 seçenek ve her zaman geçerli "Sessiz kal". Seçenekler ton simgeleri taşır; süre sınırı yoktur | Sağ çubuk/D-pad + A / Fare ya da 1–4 | 1 | Tümü | 6 ve 10'da Kavrayış'la birleşir |
| **Seğirtme / Koşu** | Seğirtme her zaman açıktır. Gerçek koşu (nefes sesi, müzik katmanı) yalnızca 10. bölümde açılır | LB / Ctrl; koşu: L3 / Shift | Seğirtme 1; **koşu 10** | Seğirtme tümü; koşu 10 (§4.1) | Diriliş sabahında bedenle hissedilen bir özgürlük |

### 5.1a Kontrol eşlemesi

| Eylem | Gamepad | Klavye / fare | Not |
|---|---|---|---|
| Yürü | Sol çubuk | WASD | Dökme hedefinde sol çubuk ve A/D eğme girdisine döner (Dök) |
| Seğirtme | LB basılı | Ctrl basılı | Yükle kapalı |
| Koşu (yalnızca 10) | L3 (aç/kapa) | Shift (basılı ya da aç/kapa) | §4.1 |
| Bakış (Kulak dahil) | LT basılı | Fare sağ tuş basılı | 3. bölümden itibaren konuşmalar balona dönüşür |
| Bakış yönü / baş kaldırma | LT basılıyken sağ çubuk | Sağ tuş basılıyken fare | Dokunmama anlarındaki "Başını kaldır": sağ çubuk yukarı ya da fare yukarı / ↑; LT gerekmez |
| Söz sakla | LT basılıyken A | Sağ tuş basılıyken E | Bakış'ta odak tektir; söz balonu ile nesne çakışırsa sağ çubuk ya da fare odağı kaydırır; odak türü balon çerçevesiyle ya da kenar ışığıyla gösterilir |
| Etkileşim | A | E | Al, koy, konuş, aç, durak taşı çağrısı, Uğra; hedef yokken kandil eldeyse istem "Yere koy", kandil yerdeyse "Al"; tanımlı anlarda "Üfle"; Bakış basılıyken odaktaki nesneye uygulanır |
| İptal | B | Esc | Basılı ıslığı iptal eder, kipten ya da duruştan çıkar, son yerleştirmeyi geri alır |
| Güt | Sağ çubuk (koni) + X | Fare yönü + Boşluk | Kısa basış değnek (hayvan) ya da çağrı (insan, grup); uzun basış ıslık (hayvan) ya da kaldır (insan, grup) |
| Taşı — kavrama | RT basılı | Sol tık basılı | Aç/kapa seçeneği; bırakınca yük yere konur (kutsal taşıma anlarında kilitli, §5.1c) |
| Taşı — al-koy | A | E | Yuvadan al, yuvaya koy |
| Dök | RT tutulurken dökme hedefinde sol çubuk eğimi | Sol tık basılıyken A / D | Üç kademeli akış; bırakınca durur |
| Başa al / İndir | R3 | R | 2. bölümden itibaren testi |
| Kandil | Y | Q | Kısa dokunuş: sönükse yak, yanıyorsa Açık↔Kısık; basılı: Kaldır |
| Koru | RB basılı | F basılı | §5.1b |
| Alçalt | D-pad ↓ (basılı ya da aç/kapa) | C | 8. bölümden itibaren, bağlam göstergesiyle |
| Bağla / Çöz | Sağ çubuk saat yönünde daire / ters daire; A düğüm | Fare dairesi ya da ← / → dönüşümlü; E düğüm | Her tam daire bir tur |
| Ez / Karıştır | Sağ çubuk dairesi + RT (Ez, bastırarak) / yalnızca daire (Karıştır) | Fare dairesi + sol tık / yalnızca fare dairesi | — |
| Kal | A basılı | E basılı | Yalnızca Kal anlarında; her zaman aç/kapa seçeneği |
| Söz (diyalog) | Sağ çubuk ya da D-pad + A | Fare ya da 1–4 | Süre sınırı yok; "Sessiz kal" her zaman listede |
| Kavrayış (düşünce balonu) | D-pad ↑ (aç/kapa) | Tab | Düşünce istemi olan nesnede Etkileşim ile de açılır |
| Kavrayış kipi | Sağ çubuk ya da D-pad: söz halkası · LB/RB: boşluk · A: koy · X: boşalt · Y: Doğrula · B: kapat | Fareyle seç ve sürükle · Enter: Doğrula · Backspace: boşalt · Esc: kapat | Doğrula yalnızca bütün boşluklar doluyken etkin |
| Pano kipi (Bekleyiş) | D-pad ya da sol çubuk: yuva · LB/RB: sütun · A: koy / al · B: geri al · X: Taslağa dön (1 sn basılı: Temizle) · Y: Çeteleye işle | Oklar ya da fareyle sürükle-bırak · Enter: Çeteleye işle · Backspace: geri al | — |
| İpucu (Üç Işık) | View | H | — |
| Heybe (duraklatma) | Menu | I (açık kip yokken Esc de) | — |

1. Söz, Kavrayış, pano, liste ve el işi kiplerinde D-pad ve yüz tuşları o kipe aittir; kip dışında D-pad ↑ Kavrayış'ı açar, D-pad ↓ Alçalt'tır.
2. Etkileşim ile Söz sakla ayrı yeniden atanabilir; Bakış, kavrama, Koru, Alçalt, Kal ve Koşu için aç/kapa seçeneği vardır.
3. Bölüm belgeleri tuş değil eylem adı kullanır.

### 5.1b Kandil sabitleri

| Durum | Girdi | Işık | Yağ | Rüzgârda |
|---|---|---|---|---|
| Sönük | Üfle ya da rüzgâr | Yok; 3 sn'de göz alışır | Yanmaz | — |
| Yakma | Kandil kısa dokunuş (sönükken) | — | Harcanmaz | Kaynak ocak, köz ya da kor çömleği ya da yanan kandil; kaynak yoksa kavla (kaya gölgesinde 6 sn, açıkta çömelerek 8 sn) |
| Kısık | Kandil kısa dokunuş (yanarken, Açık↔Kısık) | Kor; halka yok | Yakmaz | — |
| Açık (elde, göğüste) | Varsayılan | 2 karo (çocuk Tamar 5 karo) | Yürürken 240 karoda 1 ölçü; dururken yakmaz (fitil iğneyle geri itilir) | Korunmazsa açık karede 2 karo yürüyüşte ya da 2 sn beklemede söner |
| Kaldırılmış | Kandil basılı | Açık arazide durgun havada 10 karo; rüzgârda (kısa fitil) ve yerleşim içinde (ev, avlu, dam, sokak) 4 karo; iz ve girintiler görünür | Yürürken Açık ile aynı; dururken 5 sn'de ¼ ölçü | 1 karo yürüyüşte söner |
| Alçak (8'den itibaren) | Alçalt | Yere yatık 2 karoluk halka; kırıntı gibi küçük izler yalnızca bu halkada etkileşimlidir; yürüyüş %70 | Yürürken Açık'ın 1,5 katı; dururken yakmaz | — |
| Koru | Koru basılı | 1 karo; alev sönmez ama alev okuma bilgisi vermez | Açık gibi | Sönmez; yürüyüş hızının %40'ı; elle başka iş yapılamaz |
| Kuşakta | Kavrama biçiminde iki elle yük taşınırken kendiliğinden | 1 karo, en kısık alev | Yakmaz | Sönmez |
| Omuz yükü (10) | Omuzda yük varken | 2 karo; kaldırılamaz | Açık gibi | Açık gibi |
| Yerde | Etkileşim ile konur ve alınır | 2 karo | Yakmaz | Açıkta 2 sn'de söner; rüzgâr gölgesinde sönmez |

- **Rüzgâr gölgesi** nesnenin rüzgâraltındadır: ev 4 karo; devrik tekne, direk, sütun ve kaya 2 karo; gölgede alev diktir.
- El kandili en çok 1 ölçü alır; öbür kapların yağ kapasitesi nesneye özgüdür (§5.1c).
- Doldurma küpten, sahibinin izniyle, durup Etkileşim ile 3 sn'de yapılır; yağ alevin boyuyla gösterilir.
- Sönme yağ harcatmaz ve hiçbir şey kaybettirmez.
- **Göz alışması:** 3 karo içinde yanan bir kandil varken yalnızca en parlak birkaç yıldız görünür; kandil söndürülünce ya da yere konup 3 karo uzaklaşılınca bütün yıldızlar 3 sn'de belirir (7). 10. bölümün şafak göğü bu kuraldan etkilenmez.
- Işığa yürüme yalnızca hayvanlar içindir; insanlar ve kanonik kişiler ışığı izlemez.
- **Bölüm sapmaları:** 1. bölümde kandil yalnızca taşınan ışıktır (yağ, rüzgâr ve kaldırma yok); 9. bölümde yalnızca yakılır; 10. bölümde yağ tükenmez.

### 5.1c Taşı biçimleri ve kaplar

1. **Kavrama** (RT / sol tık; basılı ya da aç/kapa): dökülecek kaplar (testi, kova, ibrik, yağ testisi) ve ağır nesneler (siper, binek taşı, leğen). Dök yalnızca kavranmış kapla yapılır. Kavrama nesnesi bir yuvadan A ile de alınabilir; o zaman aç/kapa kavramadaymış gibi tutulur. RT bırakılınca yük dik olarak yere konur, hiçbir şey kırılmaz.
2. **Al-koy** (A / E): dökülmeden yuvaya konan ya da birine verilen nesneler (küfe yükü, hasır malı, tepsi, keçiboynuzu, sikke, duvar taşı). Tek basışla alınır, tek basışla yuvaya ya da yere konur. İki biçimde de A yükü yuvasına koyar.
3. **Hız:** Tek elle taşınan hafif yük hızı değiştirmez; iki elle taşınan ya da ağır yük yürüyüşü %40 yavaşlatır (4, 5, 6, 7); su yükü kalçada %25, başta %15 yavaşlatır, eldeki küçük testi %10 ekler (2); omuz yükü %30 yavaşlatır (10); yükle seğirtme kapalıdır.
4. **Taşıma konumları:** kalçada (tek kap), başta (büyük ya da iki kulplu testi), başta ve elde; Başa al / İndir ayrı bir eylemdir (§5.1a).
5. **Kutsal taşıma anları** (3. bölümde kepçe, 4. bölümde ilk sepet ve artanlar, 8. bölümde leğen ve ibrik): yük hiçbir zaman yere konmaz ve düşmez. Kavrama ya hiç istenmez (3) ya da tek basışla kilitlenir (4, 8). Çubuk bırakılınca Tamar durur ve yükü tutar; yük yalnızca hedefinde A ile bırakılır.

| Kap | Kapasite | Kademeler | Bölüm |
|---|---|---|---|
| Küçük testi | 2 su ölçüsü = 1 pay | yarım, ağız | 2, 3 |
| Büyük testi | 4 su ölçüsü = 2 pay | yarım, omuz, ağız | 2, 3 |
| İki kulplu testi | 6 su ölçüsü = 3 pay (yalnızca omuzda) | — | 3 |
| Mutfak küpü | 8 su ölçüsü | — | 2 |
| Kana küpleri | alçak 6 pay, yüksek 9 pay | ıslaklık bandı | 3 |
| El kandili | 1 yağ ölçüsü | alev boyu | 4–10 |
| Kuşak çömleği | 1 yağ ölçüsü | — | 7 |
| Yağ testisi | 2 yağ ölçüsü (4, Keziya'nın) / 3 yağ ölçüsü (9, Tamar'ın üç çentikli testisi) | çentik | 4, 9 |
| İşaret çanağı | 2 yağ ölçüsü | — | 4 |
| Şabat kandili | 2 yağ ölçüsü | — | 9 |

Su ölçüsü ile yağ ölçüsü ayrı soyut birimlerdir; 1 pay = 2 su ölçüsü yalnızca su için geçerlidir.

### 5.2 Öğretim yükünün dağılımı

| Bölüm | Yeni fiil | Kıvrım |
|---|---|---|
| 1 | Güt | Sürü kandili izler (kandil babanın elindedir; bölümün son kısmında Tamar taşır) |
| 2 | Taşı / Dök | Bekleyiş: kırk günlük erzakı dört onluğa bölmek |
| 3 | Kulak ve Kavrayış | Güt insanlara uygulanır: hizmetkâr zinciri |
| 4 | Kandil (tam sistem) | Güt kalabalık gruplarına uygulanır; teknede Taşı/Dök |
| 5 | Bağla / Çöz (2. sahnede görev sayılmayan bir anda öğretilir) | Anlatılan Sahne kipinde oynanan yan şerit |
| 6 | — | Güt tersine döner (domuzlar ıslıktan kaçar, kokuya gelir); Kavrayış cümlesi lütufla kesilir |
| 7 | — (Kal tutuşu bir girdi seçeneğidir, ayrı bir fiil değildir) | Güt ve Bağla birleşir: ip takımı; Kandil'e Üfle ve göz alışması eklenir |
| 8 | Ez / Karıştır | Kandil ile Kavrayış birleşir: arama (yeni Kandil tutuşu: Alçak) |
| 9 | — | Mekanikler susar |
| 10 | Koşu | Kandil yerini şafağa bırakır; 7. bölümün düzeneği boşa çıkar |

Çocuk Tamar'la geçen 1. bölüm yalnızca tek bir fiil öğretir. Bakış ve yürüyüş temel kontroldür ve yazısız öğretilir ("Ustayı izle": babası yapar, Tamar taklit eder).

### 5.3 Kavrayış: kaba kuvvete kapalı, dünyanın içinde

- **Dünyanın içinde:** Düşünce cümlesi ayrı bir menü ekranında değil, Tamar'ın başının üstünde bir balon olarak belirir. Boşluklar, karakterin çevresinde açılan bir **söz halkası**ndan seçilir. Oyun durmaz; çevredeki sesler kısılır. Heybe'deki "Sözler" sekmesi yalnızca bir kayıttır, oyun orada oynanmaz. "Söz halkası" yalnızca bu seçim halkasının adıdır.
- **Tipli boşluklar:** Her boşluk bir türe aittir: kişi, sayı, yer, neden, nesne (balon biçimleri figür, çentik, ev, düğüm, çuval). Unvan, zümre ya da "kime karşı" gibi alt türler kişi türünün alt etiketidir. Yalnızca o türden ve **toplanmış** sözler seçilebilir. Sayı adayları sabit bir havuzdan (6. bölümde Tamar'ın çakıl kesesi) gelebilir; doğru değer yalnızca toplanmış sözlerden çıkarılabilir olmalıdır.
- **Toplu doğrulama:** Cümle ancak tüm boşluklar dolunca doğrulanır ve yanıt yalnızca "doğru" ya da "henüz değil" olur. Kısmi geri bildirim yalnızca ipucu katmanı 2'de verilir.
- **Rastgele denemenin getirisi yok:** Tipik bir cümlede 3–4 boşluk ve 5–7 aday vardır (100'ü aşkın kombinasyon). Zorunlu bir söz toplanmamışken cümle doğrulanmaz ve deneme sayılmaz; Tamar sözün kaynağını anar, sözü söylemez (her bölümde geçerlidir). Üç başarısız toplu denemeden sonra (her ayarda, §6.2) Tamar kendiliğinden ipucu katmanı 1'i söyler; bu bir ceza değildir, oyun ilerlemeye devam eder.
- **Ton:** Yas evlerinde ve kutsal anlarda söz toplanmaz. **Yas evi**, gömmeden sonraki yas günlerinde yas tutanların bulunduğu evdir (7. bölümde Lazar'ın evi; 9. bölümün Şabat odası; 10. bölümün şafaktan önceki evi). Orada Kulak ile konuşma toplanmaz, söz saklanmaz; yalnızca pratik ihtiyaç simgeleri okunur (7) ya da gerekli sözler halkaya kendiliğinden, bildirimsiz düşer (10). 7. bölümde Kavrayış yas tutanların gündelik ihtiyaçlarıyla sınırlı kalır (kimin suya, kimin yere ihtiyacı var).
- **Anlatılan Sahne:** Söz yerine imge toplanır (girdi Söz sakla'dır; alınmayan imgeler sahne sonunda kendiliğinden eklenir). Metin dışında duyulan her ses Tamar'ın iç sesidir ve onun balon çerçevesiyle gösterilir.

### 5.4 El işi kuralları (mini oyun derlemesine karşı)

Bu kurallar ana girdisi bir El fiili (Taşı/Dök, Bağla/Çöz, Ez/Karıştır) ya da Kal olan görevleri kapsar: günün işi, bulmacaların el işi kısımları, katılım anlarındaki el işleri ve yan hikâyeler. Güt, Bakış ve Kavrayış bulmacaları kapsam dışıdır; onların çeşitliliği §6.3'teki karar türü sütunuyla izlenir.

1. Her görevin temiz çözüm süresi (çözümü bilen oyuncunun el işine harcadığı süre) en fazla 2–3 dakikadır; düşünme, hatalı deneme ve ipucu süresi buna dahil değildir. §4.1'deki bulmaca sütunu oyun testi medyanıdır.
2. Aynı ana girdi biçimi (RT ile kavrama, A ile al-koy, Dök, sağ çubuk dairesi, Kal) art arda iki görevde kullanılmaz. A ile onay, yürüme, D-pad ve pano seçimi sayılmaz. Aralarında oynanır bir anlatı sahnesi ya da başka bir görev bulunan iki görev art arda sayılmaz.
3. Her görevde çubuk çevirmenin ötesinde bir karar vardır: **oran** (yağ ve şarap), **sıra** (temizle, yatıştır, sar), **öncelik** (önce kime).
4. Hızlı tuş dizisi (QTE) ve zamanlama hatası yoktur.
5. El işi hiçbir zaman anlatıyı kilitlemez; "otomatik" seçeneği her zaman vardır.

---

## 6. Bulmaca Tasarım Felsefesi ve 3 Katmanlı İpucu Sistemi

### 6.1 İlkeler

- **Dünyaya ait:** Her bulmacanın sebebi dünyanın içindedir: şarap bitecek, kalabalık aç, taş ağır, bayram yaklaşıyor. Sürgülü bulmaca ya da şifreli kapı yoktur. Bulmacalardaki stilize nicelikler (pay, su ve yağ ölçüsü, yolculuk sayısı, 240 karoda bir ölçü yağ, karo cinsinden ışık yarıçapı) Kodeks'te "oyun kısaltması" diye işaretlenir; oyuncu tarihi bu kısaltmalardan öğrenmez.
- **Adil:** Gereken bütün bilgi ekranda, diyalogda ya da toplanan sözlerdedir. Piksel avı yoktur; Bakış etkileşimli nesneleri belirginleştirir.
- **Kalıcı başarısızlık yok:** Dökülen su yeniden doldurulur, çözülen ip yeniden bağlanır.
- **Mucize asla bulmaca olmaz:** Bulmacalar kutsal anın *çevresindedir*.
- **Zorluk nerede durur?** Katılım anları bilinçli olarak sürtünmesizdir. **Gerçek düşünme zorluğu bulmacalardadır.** İsteğe bağlı **Usta kısıtları** ve zorluk ayarları bu zorluğu oyuncuya göre ölçekler.

### 6.2 Zorluk ayarları

| Ayar | Bulmacalar | İpucu |
|---|---|---|
| **Hikâye** | İstenirse otomatik çözülür | Her zaman açık |
| **Rahat** | Ek görsel işaretler (kısıt simgeleri daha belirgin) | 60 sn takılınca 1. ışık kendiliğinden gelir; üç başarısız deneme kuralı |
| **Dengeli** (varsayılan) | Tasarlandığı gibi | İstenince; üç başarısız deneme kuralı |
| **Usta** | Usta kısıtları görünür ve izlenir | İstenince; üç başarısız deneme kuralı |

**Üç başarısız deneme kuralı:** Her ayarda, sınanan bir denemenin üç kez başarısız olmasından sonra 1. ışık kendiliğinden gelir. Deneme Kavrayış toplu doğrulaması, pano oynatması, düzenek sınaması ya da bölüm belgesinin açıkça deneme saydığı görünür bir başarısızlıktır (5. bölümde dönemeçte duran yük, 6. bölümde devrilen sepet). Bölüm bu eşiği düşürebilir (1. bölümde ikinci yanlış kapı), yükseltemez. Döngüye kilitlenmeyi önleyen bağlamsal ipuçları (7. bölümde kandilin ikinci kez sönmesi) her ayarda gelebilir.

**Usta kısıtları** imza bulmaca başına birdir: iki kısımlı imza bulmaca (5. bölümde Yağ ve Şarap ile Kendi Hayvanına) tek kısıt taşır; iki imza bulmacalı bölüm (7) iki kısıt taşır; 9. bölümde kısıt yoktur. Toplam 10 "Usta işi" damgası vardır. Örnekler: Kana'daki altı küpü en fazla 9 yolculukla doldurmak; kalabalığı hiçbir grubu yerinden kaldırmadan oturtmak; 7. bölümdeki gece yolunda Marta'nın verdiği 2 ölçü yağın en fazla yarısını harcamak (çobanın ve bekçinin yağı alınmadan). Başarılan kısıt Heybe'de bir "Usta işi" damgası olarak görünür. Kutsal anlarla hiçbir bağı yoktur, hikâyeyi etkilemez.

### 6.3 Zorluk eğrisi

| Bölüm | Temel bulmacalar | "Aha" anı | Birleşen fiiller | Baskın karar türü | Zorluk (1–5) |
|---|---|---|---|---|---|
| 1 | Meleyen ses; teraslı yamaçta gece sürüsü (imza); Beytlehem'de doğru kapı | Koyunlar değneği değil ışığı izler: koyunları değil ışığı taşı | Güt + Bakış (+ taşınan kandil) | Işıkla yönlendirme; çevre okuyarak eleme | 1 |
| 2 | Irmaktan kampa su yolu; kırk günün payı (imza, dört onluk) | Hasta hacının suyu önce gider, yoksa kamp yürümez | Taşı/Dök + Bekleyiş | Kaynak planlama (gecikmeli geri bildirimli pano) | 2 |
| 3 | Kiler hesabı ve sofra düzeni (Kavrayış); hizmetkâr zinciriyle altı küp (imza) | Testiyi taşımak yerine zincirde el değiştirmek | Kavrayış + Taşı/Dök + Güt (insanlara) | Söz çıkarımı; lojistik zincir | 2,5 |
| 4 | Beş arpa ekmeği (kalabalıkta kişi bulma); yüzer ve ellişer (imza); küpteki ışık | Önce dar ağılı doldur: iki aileyi takas edince (B ↔ D) bütün kısıtlar çözülür | Güt (gruplar) + Kulak/Kavrayış + Taşı + Kandil | Kısıtlı yerleşim; rüzgâr siperi | 3 |
| 5 | İki küfe (günün işi); yağ ve şarap (imza 1: sıra ve oran); kendi hayvanına (imza 2: dönemeçlerde yük dengesi) | Yaralının kendisini bir ağırlık gibi kullanmak | Taşı + Dök + Bağla | Sıra ve oran; fiziksel denge | 3 |
| 6 | Taş ölçek; payına düşen (imza: miras hesabı); domuzlar dinlemez; yoldaki cümle | Yediyi tutan tek mal öküzler; domuzlar ıslıktan kaçar, keçiboynuzu kokusuna gelir | Kavrayış (hesap zinciri) + Güt (olağan ve tersine) | İlişkisel çıkarım; tersine yönlendirme | 3,5 |
| 7 | Babamın yıldızı (imza); dört gün (imza); taşın dili | Halka yıldızın üstünde değil boşlukta oturur: babanın 1. bölümde öğrettiği, yedi yıldızın döndüğü boş nokta | Bakış + Kandil + Bekleyiş + Güt + Bağla (+ Kal) | Gök okuyarak yön bulma; mekânsal emek planı | 4 |
| 8 | Havan (Ez öğretimi); sofra düzeni; kandil ışığında maya araması (imza); hazırlık sırası | Kırıntının gölgesi ancak kandil Alçak tutuşla yere yakın tutulunca görünür | Kandil + Kavrayış + Ez/Karıştır + Bekleyiş | Kanıttan yer çıkarma ve arama; zaman çizelgesi | 4 |
| 9 | — (bilinçli olarak yok) | — | Kal, tersine Güt, Ez (tek karar: yağ oranı) | — | 1 |
| 10 | Uyuyan ev; taşı kim yuvarlayacak (imza: plan cümlesi ve ip ulama); kapalı kapılar | Taş çoktan yuvarlanmıştır: öğrenilen beceri mucizenin önünde boşa çıkar | Bağla + Kandil + Bakış + Kavrayış + Taşı | Mekanik plan çıkarımı; alev ve ağaran gökle yol bulma | 3 |

8, 9 ve 10. bölümler pasif bir blok oluşturmaz: 8 ve 10'da gerçek bulmacalar vardır, 9 ise kasıtlı bir nefes durağıdır. 4–6. bölümlerde baskın karar türü yinelenmez: 4 kısıtlı yerleşim, 5 fiziksel denge, 6 ilişkisel çıkarım. 6. bölümde payları hasırlara baba yerleştirir; oyuncu yalnızca payı yola çıkarır.

### 6.4 "Üç Işık" ipucu sistemi

İpucu View/H tuşuyla istenir. Rahat ayarında köşede üç küçük kandil belirir.
1. **Birinci ışık:** Tamar'ın bir düşüncesi ya da hatırladığı bir söz ("Babam, önce rüzgâra bak derdi").
2. **İkinci ışık:** İlgili nesne ya da sözler parlar. Kavrayış'ta her boşluğun doğru ya da yanlış olduğu işaretlenir; doğru aday söylenmez.
3. **Üçüncü ışık:** Yakındaki bir karakter bir sonraki adımı gösterir ya da yapmayı teklif eder. Ardından "Hikâyeye devam" seçeneği gelir.

Anlatılan Sahne'de (İsa anlatırken) 3. ışık ya yakındaki bir karakterin daha önce söylediği sözün Tamar'ın belleğindeki yankısıdır (5) ya da gerçek dünyaya kısa bir kesmeyle yakındaki bir karakterin yardımıdır (6). Benzetme sürerken kimse benzetmenin içine konuşmaz.

İpucu kullanımı hiçbir yerde kayda geçmez ve hiçbir başarımı engellemez.

---

## 7. Katılım Anları

### 7.1 İlkeler

1. **Oyuncu anı eşiğe kadar taşır; mucize İsa'nındır.** Oyuncu yalnızca metnin zaten birine yaptırdığı destek işini üstlenir: küpleri hizmet edenler doldurur (Yuhanna 2:7), artanları öğrenciler toplar (6:12–13), taşı başkaları kaldırır, Lazar'ı başkaları çözer (11:41–44).
2. **Kanonik anlarda başarısızlık yoktur.** Oyuncu durursa dünya bekler ya da başkaları işi sürdürür. Basılı tutma mekaniklerinde bırakmak hiçbir şeyi düşürmez: Tamar diz çöker, soluklanır ve yeniden kalkar. Bir katılım anı aynı zamanda imza bulmacaysa (3. bölümde küpler), "girdi kesilirse" yedeği yalnızca hiç girdi gelmediğinde devreye girer. Dengeli ve Usta'da yalnızca teklif olarak gelir ve kabul edilmeden montaj başlamaz; Rahat ve Hikâye'de teklif kabul edilmezse 60 sn sonra montaj kendiliğinden başlar. Montaj Usta sayımını sürdürür.
3. **Kanonun gerektirdiği başarısızlık mekaniğe yüklenir, oyuncuya değil.** Fırtınada su her durumda kazanır; bu oyuncunun hatası değil, sahnenin kendisidir. İsa'nın Petrus'a söylediği "Ey kıt imanlı" sözü (Matta 14:31) yalnızca Petrus'a yönelir ve oyuncunun performansıyla hiçbir bağı yoktur.
4. **Girdi bir ifadedir, sınav değil.** Hız, sıra, süre ve "önce kime" bilgileri puanlanmadan `ifade_` bayraklarına kaydedilir ve sonradan diyaloglarda ve epilogda yankılanır (§8). Kutsal eşiklerde hiçbir şey kaydedilmez. **Kutsal eşik**, aşağıdaki listedeki dokunmama anları ile kanonik olayın kendisi ve hemen ardından gelen kanonik tepki anıdır; kontrollerin çekildiği andan kontrol geri gelene kadar sürer (ör. 2:9'daki tadış; horoz ötüşü ve Petrus'un ağlayışı, Luka 22:60–62; 23:46). Eşik boyunca nesne (`kol_`) verilmez, söz toplanmaz, hiçbir girdi ve `tan_` kaydedilmez. `tan_` pencereleri eşiğe bitişik olabilir, ama kontroller çekilmeden kapanır ve ancak kontrol döndükten sonra yeniden açılır. Benzetme içindeki girdiler, listedeki benzetme anları (6. bölümde babanın koşup sarılması ve 15:28b–32) dışında, kutsal eşik sayılmaz (ör. 5. bölümde `b05_ifade_sargi`).
5. **Dokunmama anları:** En kutsal anlarda kontroller usulca geri çekilir. Bakış seçimi, koleksiyon sayacı ya da "kazandın" bildirimi yoktur. Bazı anlarda tek bir girdi kalır: başını kaldırmak.

**Dokunmama anlarının listesi:** meleklerin müjdesi, yemlik (1) · İsa'nın sudan çıkışı (2) · şölen başkanının tadışı (3) · ekmeğin kutsanması (4) · babanın oğluna koşup sarılması ve 15:28b–32 (6) · "Lazar, dışarı çık!" (7) · ayak yıkama ve sofra sözleri (8) · çarmıhta İsa'nın son sözü ve son nefesi, Luka 23:46 (9; 23:34 ve 23:43 sırasında Kal açık kalır, hiçbir şey kaydedilmez) · açık mezar ve iki adamın sözü, 24:2–8, ve "Size esenlik olsun" (10). 5. bölümde dokunmama anı yoktur.

### 7.2 Katılım anları tablosu

| Bölüm | İnsanın işi (oyuncu) | Kanonik ve ilahi olan | Kaydedilen ifade | Girdi kesilirse |
|---|---|---|---|---|
| 1 | Kuzuyu ağıla koymak; kandille çobanlara yol açmak | Müjde; yemlikte bebek (dokunmama) | `b01_ifade_kuzu` | 20 sn sonra babası kuzuyu ağıla koyar, değer yazılmaz; yolda 30 sn'de baba seslenir, 60 sn'de öne geçer |
| 2 | Sırada beklemek; yaşlı Şifra'yı kaygan taşlardan suya indirmek | Vaftiz; tek girdi başını kaldırmak | — | 20 sn sonra Amram Şifra'nın öbür koluna girer, Tamar onları izler |
| 3 | Son küpü dökmek; kepçeyi daldırıp şölen başkanına taşımak (doldurma imza bulmacadır) | Su şarap olur (gösterilmez, tadışta anlaşılır; dokunmama) | `b03_ifade_doldurma` (bulmacada kaydedilir; kepçede hiçbir şey) | Bulmacada §7.1-2'deki imza bulmaca yedeği; kepçe yürüyüşünde 20 sn'de Elişeva seslenir, baş sofrada 20 sn'de Tamar kepçeyi kendiliğinden uzatır |
| 4 | İlk sepeti uzatmak, ekmek dağıtmak, artanları toplamak | Ekmeğin kutsanması (dokunmama); çoğalma efektsiz, sessizce hissedilir | `b04_ifade_ilk_sepet` | 30 sn sonra Andreas dağıtır; `andreas_dagitti` yazılır |
| 4 (Yoram) | Su boşaltmak, tekneyi dengede tutmak | Suda yürüme, Petrus'un batması, rüzgârın dinmesi (14:32) | — | Su her durumda kazanır; kova bırakılırsa bir kürekçi omuz verir; tek girdi çığlığa dönmek |
| 5 | Yaralı olarak bakmak ve zayıfça el kaldırmak; Samiriyelinin elleri olarak sarmak, yüklemek, handa su vermek ve iki dinar ödemek | Benzetme İsa'nın anlatımıdır; kâhin ve Levili her durumda geçer, Samiriyeli her durumda sarar, taşır ve öder | `b05_ifade_sargi` (yalnızca P2'deki sargı hızı) | Yolcu 10 sn sonra kendiliğinden yürür; handa eller 8 sn sonra kendiliğinden davranır; bulmacalarda "Hikâyeye devam" ve otomatik |
| 6 | Küçük oğul olarak eve dönüş yürüyüşü; büyük oğul olarak tarladan eve yürümek | Babanın koşup sarılması ve 15:28b–32 (dokunmama) | **Hiçbir şey** | Dünya bekler; otomatik yürüme seçeneği; büyük oğulda 20 sn sonra baba dışarı çıkar |
| 7 | Kiriş düğümü, ip takımına ritim, ipi tutmak (Kal), yüz bezini çözmek | Lazar'ın dirilişi (dokunmama) | `b07_ifade_cozme_hizi` | Şimi 20 sn sonra bağlar, 15 sn sonra kendisi çağırır; Kal bırakılırsa Şallum ipi tutar; çözmede 20 sn sonra Hogla çözer, değer yazılmaz |
| 8 | Leğeni, ibriği ve havluyu kapıya getirmek | Hizmetkârın işini İsa üstlenir (13:4–5; dokunmama); sofra sözleri tablo | — | Dünya bekler; mutfakta 45 sn sonra leğeni Eldad yüklenir |
| 9 | Kalmak (Kal tutuşu) | Çarmıh (silüet, ses); dokunmama yalnızca 23:46 (son söz ve son nefes) | **Hiçbir şey** | Tamar diz çöker, gözlerini kapar; ses ve metin sürer |
| 10 | Kaldıraç ve ip hazırlamak; yolu aydınlatmak; koşmak ve uğramak | Taş yuvarlanmıştır; açık mezar ve iki adamın sözü (24:2–8) ile dirilmiş İsa (dokunmama) | `b10_ifade_kosu_ugrak` | 20 sn'de Şifra seslenir, 40 sn'de Tamar kendiliğinden yürür; kendiliğinden geçilen yuvalar ifadeye yazılmaz |

---

## 8. Seçim ve Sonuç Sistemi

### 8.1 Ne değişir, ne değişmez?

Oyuncuya bayrak ya da eksen yazan ilk seçimden (1. bölüm, Sahne 12) hemen önce ve Heybe'de her zaman şu kart gösterilir:

> **Seçimlerin İncil'deki olayları değiştirmez.** Değiştirdiğin şey Tamar'ın iç dünyası, ilişkileri, neye nasıl tanıklık ettiği ve hikâyeyi Sara'ya nasıl anlattığıdır.

**Seçim girdisi kuralları:**
1. İfade girdileri (`bNN_ifade_`) ve yalnızca ton seçimleri bu kuralda seçim sayılmaz.
2. Seçimlerde süre sınırı ve zaman aşımı yoktur; sahne bekler; en çok tek bir zorlamayan ortam repliği söylenebilir (ör. 2. bölümde 20 sn'de Yoram'ın "Anne?" demesi).
3. Pasiflik (beklemek, girdi vermemek, uzakta durmak) hiçbir zaman seçim olarak kaydedilmez, değer ve eksen yazmaz; "Sessiz kal" yalnızca açıkça seçildiğinde kaydedilir. Eylem türündeki seçimlerde sahne bir eylem seçilmeden ilerlemez ya da beklemek yalnızca başlangıç değerini korur.
4. Kanonik bir hareketin yanındaki seçim hareketten önce ya da sonra sunulur, hareket sürerken sunulmaz (8. bölümde merdiven).

### 8.2 Takip modeli

1. **Üç eksen (iki ucu da değerli):**
   - **Söz:** *Anlatan ↔ Kalbinde Saklayan.* Çobanlar gördüklerini herkese anlattı (Luka 2:17–18); İsa'nın annesi Meryem yüreğinde sakladı (2:19). Boş mezar sabahında da iki uç kanoniktir: Luka 24:9 ve Markos 16:8.
   - **El:** *Veren ↔ Koruyan.* Ailesini korumak da meşru bir yoldur.
   - **Kalp:** *Açan ↔ Taşıyan.* **Açan (+)** duygusunu (sevgi, yas, öfke) söze ya da jeste döküp bir başkasına açar, ona uzanır; öfkeyi açmak da Açan'dır. **Ortada (0)** duygusunu söze dökmeden yanında kalır (sözsüz yakınlık). **Taşıyan (−)** duygusunu içinde taşır, geri çekilir ya da uzaklaşır. Ara değeri olmayan ikili seçimlerde (7. bölüm) sözsüz yakınlık Taşıyan'a yazılır. İki ucun metinden dayanağı: Marta İsa'yı karşılamaya koşup içini döker, Beytanyalı Meryem evde oturur (Yuhanna 11:20–21). Yası ve öfkeyi dürüstçe taşımak da bir yoldur.
2. **İlişkiler:** Yoram, Natan, Dositeos, Hananya ve Marta için tutulur. Oyuncuya sayı olarak değil, *uzak*, *temkinli* ya da *yakın* sözcükleriyle gösterilir.
3. **Bölüm bayrakları:** Kişisel seçimler.
4. **İfade bayrakları:** Katılım anlarındaki girdi biçimi.
5. **Tanıklık ayrıntıları:** Bakış ile fark edilen, kaçırılabilir kanonik ayrıntılar. Sayaç ya da bildirim yoktur; bunlar Heybe'de yalnızca Tamar'ın hatıra cümleleri olarak sessizce belirir.

### 8.3 Adlandırma kuralı

- Tüm tanımlayıcılar **snake_case**, küçük harf ve **yalnızca ASCII** karakterlerle yazılır. Türkçe harfler şöyle çevrilir: ç→c, ğ→g, ı→i, İ→i, ö→o, ş→s, ü→u. Değerler de aynı kurala uyar.
- **Önekler:**
  - `bNN_` bölüm bayrağı (`b01_`…`b10_`), iki haneli bölüm numarasıyla.
  - `bNN_ifade_` girdi ifadesi.
  - `eks_` eksen; tam sayı, −4…+4; her bölüm bir eksene en çok ±1 ekler (Söz 1, 3, 8, 10; El 2, 4, 5; Kalp 6, 7, 8, 9); oyuncuya hiçbir zaman gösterilmez.
  - `ilis_` ilişki; `uzak` | `temkinli` | `yakin`.
  - `kol_bNN_` Hatıra nesnesi.
  - `tan_bNN_` tanıklık ayrıntısı.
  - `usta_bNN_` Usta kısıtı.
  - `ep_` epilogda hesaplanan değer (yalnızca okunur).
- **Tür:** `kol_`, `tan_` ve `usta_` bayrakları boolean'dır (`true` / varsayılan `false`) ve `_var` eki almaz. `tan_` adı tanık olunan kanonik ifadeyi adlandırdığı için fiil içerebilir (`tan_b07_isa_agladi`). Bölüm bayraklarının sonuçları adlandırılmış seçenek listeleri (enum) olarak tutulur. Örnek: `b06_esik = girdi | disarida_konustu | gitti`.
- **Yerel değişkenler** `bNN_` önekini taşır, belgede "yerel" diye işaretlenir, bölüm dışında okunmaz ve §8.4'e girmez; tam sayı sayaçlarda aralık yazılır (ör. `b01_uyanan_ev`: 0–5).
- **Boş ifade:** İfade bayrağı girdi kesildiğinde, otomatik seçenekte ya da Hikâye kipinde yazılmaz (boş kalır); okuyan her bölüm boş hâl için nötr bir varyant tanımlar. Yedek eylemin kendisi anlatıda görünen bir olaysa bayrağa özgü açık değer yazılır: `b04_ifade_ilk_sepet = andreas_dagitti`, hizmetkâr yedeğinde `b03_ifade_doldurma = zincir`.

### 8.4 Bölümler arası bayrak tablosu

| Bayrak | Değerler | Kurulduğu yer | Okunduğu yer | Sahnede nasıl görünür |
|---|---|---|---|---|
| `b01_haber` | `koye` / `babaya` / `kalbinde` (`eks_soz` +1 / 0 / −1) | 1, yankı | 2, 3, 6, 10, ep | Kapsam: `koye` = obadakilere anlatır, dinleyenler şaşar (Luka 2:18); "bütün Beytlehem'e anlattım" ya da "kimse inanmadı" ifadeleri kullanılmaz; "Rab Mesih" yalnızca meleğin sözünün aktarımıdır. `babaya` = babasına yalnızca kendi fark ettiğini fısıldar ("Annesi hiç konuşmadı. Hep baktı."). 2'de "Tanrı Kuzusu" iç sesi; 3'te tanıma cümlesi; 6'da Natan'ın cümlesi; 10'da tanıklığın ilk cümlesi |
| `b01_ifade_kuzu` | `kucakta` / `guderek` / boş | 1 | 2, 6, ep | 2'de iç sese yarım cümle; 6'da kayıp koyun anısı; boşsa satır yok |
| `tan_b01_yureginde_sakladi` | boolean | 1 | 3 | Tanıma cümlesine ek |
| `b02_ekmek` | `boldu` / `sakladi` (`eks_el` +1 / −1) | 2 | 4, ep | 4'te Asa yer açar ya da uzak durur |
| `b02_tedarikci` | `dositeos` / `saray_adami` (Sessiz kal → `saray_adami`) | 2 | 3, 5 | 3'te tulumların tedarikçisi adıyla anılır; 5'te Dositeos'un ilk cümlesi |
| `b03_suc` | `ustlendi` (Sessiz kal dahil) / `tedarikciye` | 3 | 5, ep | 5'te Dositeos'un ilk cümlesi (`b02_tedarikci` ile birlikte); `dositeos` yolunda `tedarikciye` ilişkiyi düşürür |
| `b03_sir` | `damada` / `hizmetkarlarla` / `kalbinde` (`eks_soz` +1 / 0 / −1) | 3 (2:10 sonrası) | 4, 10 | 4'te Gad ve Elişeva yardım eder / mesafeli durur / yalnızca selam verir; 10'da koşudaki yuva 3 |
| `b03_ifade_doldurma` | `zincir` / `tek_basina` | 3 | 3 (çerçeve kapanışı), ep | Yaşlı Tamar'ın tek satırı |
| `b04_yoram` | `kutsadi` / `yasakladi` / `erteledi` (Sessiz kal → `erteledi`; `eks_el` +1 / −1 / 0) | 4 | 5, 7, 8, 9, 10, ep | 5'te 1. sahnedeki tek satır; 7'de geçit ve K6'daki kamalar; 8'de Yoram'ın yeri; 9'da durduğu yer ve Sahne 12'nin girişi; 10'da akşam; epilogda kürek. Yoram her yolda Fısıh için Yeruşalim'dedir |
| `b04_ifade_ilk_sepet` | `yaslilar` / `cocuklar` / `dislananlar` / `ailesi` / `andreas_dagitti` | 4 | 9, ep | 9'da K7'deki uzak yüzler; epilogdaki tek satır |
| `b05_dositeos` | `yuk_birakti` / `para_gonderdi` (Sessiz kal dahil) / `gecti` (`eks_el` +1 / 0 / −1) | 5 | 6, 7, 9, 10, ep | 6'da gümrükteki haber ve eşik iç sesi; 7'de `yuk_birakti` ve `para_gonderdi` eşek verir, `gecti` vermez; 9'da görünmez, yalnızca Şabat odasında testinin hatıra metni; 10'da koşuda kervan hanında (yuva 4); epilogda kurtarıcı tekne |
| `b05_ifade_sargi` | `ozenli` / `cabuk` / boş | 5 | 7 | Yüz bezi çözülmeden önceki iç ses |
| `kol_b05_civit_iplik` | boolean | 5 | 9 | Bilekte; öğle karanlığında renkli kalır; bantta çivit iplik |
| `b06_esik` | `girdi` / `disarida_konustu` / `gitti` (`eks_kalp` +1 / 0 / −1) | 6 | 9, 10, ep | 9'da Natan'ın yeri; 10'da yuva 2 ve Sahne 13; epilogda Natan yuvası |
| `b07_kalp` | `acti` / `tasidi` (`eks_kalp` +1 / −1) | 7 | 8, 9 | 8'de Marta'nın pazardaki jesti; 9'daki iç ses |
| `b07_ifade_cozme_hizi` | `yavas` / `olagan` / boş | 7 | ep | Yaşlı Tamar'ın bir cümlesi |
| `b08_yahuda` | `kandil_uzatti` / `sordu` / `sustu` / `geri_cekildi` (`eks_kalp` +1 / +1 / 0 / −1) | 8 | 9, ep | Şabat odasındaki kandil metni |
| `b08_kapi` | `itiraf` / `inkar` / `sessiz` (`eks_soz` +1 / 0 / −1) | 8 | 9, 10, ep | 9'da Sahne 1'in başladığı yer ve iç ses; 10'daki ilk cümleler ve koşudaki iç ses; epilogda Sara'ya anlatma seçimi |
| `b09_yoram_soz` | `umut` / `sessiz_yakinlik` / `ofke_paylasti` (`eks_kalp`: umut +1, öfke +1, "Buradayım" 0, Sessiz kal −1) | 9 | 10, ep | 10'da yuva 1 (koşarak gelir / kapıda bekler / evde bekler) ve akşam |
| `kol_b09_kemik_boncuk` | boolean | 9 (yan hikâye) | 10 (isteğe bağlı) | Mika'nın Sahne 13 satırına ek |
| `b10_tanik` | `anlatti` / `kalbinde` (`eks_soz`: anlat +1, bir gün 0, Sessiz kal −1) | 10 | ep | Son sahnenin biçimi; iki biçim de tam bir sondur |
| `b10_ifade_kosu_ugrak` | `dogruca` / `birkacina` / `hepsine` / boş | 10 | ep, bant | Bant kenarında uğrak düğümleri; epilogda tek satır |
| `eks_soz`, `eks_el`, `eks_kalp` | −4…+4 | Söz 1, 3, 8, 10 · El 2, 4, 5 · Kalp 6, 7, 8, 9 | dokuma bandı, 10 (Sahne 17), ep | Bant deseni ve yaşlı Tamar'ın tonu |
| `ilis_dositeos` | `uzak` / `temkinli` / `yakin`; başlangıç `uzak` | 2 (dingilden sonra her yolda `temkinli`; `dositeos` seçimi `yakin`), 3 (yalnızca `dositeos` yolunda `tedarikciye` → `temkinli`), 5 (`yuk_birakti` → `yakin`; `para_gonderdi` değişmez; `gecti` bir kademe düşer) | 5, 7, 10, ep | Hitap, yuva 4'te kimin durduğu, epilog teknesi |
| `ilis_yoram` | `temkinli` / `yakin`; başlangıç `yakin` | 4 (`yasakladi` → `temkinli`, öbürleri `yakin`), 9 (`umut` ve `sessiz_yakinlik` bir kademe yakına; `ofke_paylasti` değiştirmez) | 9, 10 | 9'da Yoram'ın yeri; 10'da yalnızca `ofke_paylasti` yolunda Sahne 13 jesti |
| `ilis_natan` | `uzak` / `temkinli` / `yakin`; başlangıç `uzak` | 6 (`girdi` → `yakin`, `disarida_konustu` → `temkinli`, `gitti` → `uzak`) | 10, ep | 10'da yuva 2'deki karşılama; epilogda Natan yuvasının tonu (§8.9) |
| `ilis_hananya` | `temkinli` / `yakin`; başlangıç `temkinli` | 6 (Sahne 12: ilk iki yanıt `yakin`, öbürleri `temkinli`) | 9, 10, ep | 9'da testi ve selam; 10'da yuva 5; epilogda mektubu okuyan torunun satırı (§8.9) |
| `ilis_marta` | `temkinli` / `yakin`; başlangıç `temkinli` | 7 (dönüşte Marta'ya yürüyüp Etkileşim ya da `acti` → `yakin`; beklemek değer yazmaz) | 8 | Marta'nın yağ şişesi |

Okunan her değer daha önce kurulabilir olmalıdır; `ilis_hananya` ve `ilis_marta` için `uzak` dalı tanımlanmaz. Bütün `kol_` nesneleri ayrıca 9. bölümün Şabat odasında ve çerçevede okunur. Yerel değişkenler (`b01_uyanan_ev`, `b06_natan_sozu`, `b09_sabat_kandili`, `b09_duduk`, `b10_mika_gece`, `b10_yanki`, `b10_balik`, `b10_tanik_cumlesi`) bu tabloya girmez.

### 8.5 Eşit tanıklık ilkesi: kapıdaki soru

8. bölümde şafak sökerken Tamar, ev sahibinin testi taşıyan uşağıyla birlikte haber almak için başkâhinin konağının *dış kapısına* (Kodeks: Matta 26:57'ye göre Kayafa) gelir; avluya girmez. Kapıdaki muhafız sorar: "Sen de onlardan değil misin?"
- **İtiraf:** Muhafız Tamar'ı kapıdan sokağın köşesine iter.
- **İnkâr:** Tamar kapıda kalır.
- **Sessiz kal:** Muhafız omuz silker.

**Her üç durumda da** Tamar horozun ötüşünü duyar ve Petrus'un kapıdan çıkıp acı acı ağladığını görür (Luka 22:60–62). Değişen yalnızca mesafe (köşeden ya da kapıdan), Tamar'ın iç sesi ve 10. bölümde kurabildiği cümlelerin tonudur. İçerik ödülü yoktur.

### 8.6 Uzun yaylar (sahne farkı üretenler)

1. **Dositeos (2 → 3 → 5 → 6 → 7 → 9'da yalnızca hatıra → 10 → epilog):** Benzetmenin ters köşesi korunur. *Önce Samiriyeli Tamar'a komşu olur:* 2. bölümün açılışında Tamar'ın arabasının dingili kırılınca Dositeos kendiliğinden yardım eder ve Tamar bunu reddedemez. 5. bölümde İsa'nın "Git, sen de öyle yap" sözünden sonra sıra Tamar'a gelir; yardım etmenin gerçek bir bedeli vardır (bayram pazarına yetişmesi gereken yük). Epilogda yaşlı Tamar'ı her durumda bir Samiriyeli kurtarır: Dositeos'un torunu ya da Tamar'ın tanımadığı bir kayıkçı. Böylece "komşu"nun kim olduğunu Tamar her yolda anlar. 9. bölümde Dositeos görünmez; bayram ve Şabat günü Golgota'nın dibinde bir Samiriyeli kervan tarihsel olarak zayıftır (Josephus, Yahudi Eski Eserleri 18.29–30). 9. bölümdeki halkası yalnızca Şabat odasındaki testinin hatıra metnidir. 10. bölümde koşudaki kervan hanı yüzü korunur: kervanın Şabat çıktıktan sonra, bayram haftasının ara gününde kente geldiği bir satırla belirtilir ve Kodeks'te sahneleme kararı olarak işaretlenir.
2. **Yoram (4 → 7 → 8 → 9 → 10 → epilog).** Yoram her `b04_yoram` yolunda Fısıh için Yeruşalim'dedir: `kutsadi` ise öğrencilerle, `erteledi` ise kentte Akkub'la hamal olarak, `yasakladi` ise kent dışındaki hacı kampında Zebedi'nin işçileriyle (Tamar bunu bilir; 8. bölümün kapı iç sesi). 9. bölüm `yasakladi` yolunda Yoram'ı sabah kamptan kente inmiş olarak getirir; "Tamar onu Mecdel'de sanır" ve "Mecdelli komşularla gelmiş" ifadeleri kullanılmaz.
3. **Natan (1 → 6 → 9 → 10 → epilog):** Natan, 1. bölümde kurtarılan bebektir.
4. **Kapıdaki soru (8 → 10 → epilog).**
5. **Hananya (6 → 9 → 10 → epilog):** 6. bölümde benzetmenin açık sorusunu Tamar'a geri sorar; 9. bölümde `ilis_hananya` `yakin` ise Şabat'tan önce yağ testisini bırakır; 10. bölümde koşudaki yüzlerdendir; epilogda torunu Natan'ın mektubunu okur.

### 8.7 Sonuçlar oyuncuya nasıl gösterilir?

- **Sahnede:** Kimin nerede durduğu, kimin selam verdiği. **Kalabalıktaki Yüzler**: 9. bölümde uzakta duranlar ve 10. bölümdeki koşuda rastlanan yüzler önceki seçimlere göre değişir.
- **Diyalogda:** Karakterler önceki olaylara gönderme yapar ("Kana'da bana söylememiştin...").
- **Anlatıda:** Yaşlı Tamar'ın yorumları ("O gece sustum. Belki doğrusu buydu, belki değil.").
- **Dokuma bandı:** Her bölüm sonunda dokunur. İpliğin rengi bölümün temasını, deseni (düz ya da dalgalı) eksenin hangi ucuna yakın olunduğunu gösterir; bu sayede renk körü oyuncular da farkı okuyabilir.
- **Diğer Yollar:** Bölüm sonunda isteğe bağlı bir ekran açılmamış yolları yalnızca silüet olarak gösterir. Bu ekran ikinci oyunu ödüllendirir; ilk oyunu eksik hissettirmez.

### 8.8 Seçimlerin ahlak sınavına dönüşmemesi

- **2. bölüm:** Denenmeyi taklit etmeyen ama ona yankı veren iki küçük seçim vardır. *Son ekmek:* aç bir çocukla bölmek ya da yarın için saklamak (Yoram'ın yolda yiyeceği). *Tedarikçi:* ucuz ama toplulukta hoş karşılanmayan Samiriyeli Dositeos ya da pahalı ama güvenli saray adamı. Seçeneklerin hiçbiri "kötü" diye yazılmaz.
- **5. bölüm:** "Geç" seçeneğinin gerekçesi saygıyla yazılır: annenin ilacı, kervanın beklemeyeceği, Dositeos'un adamlarının arkadan geleceği. Oyun sonucu yorumlamaz; Dositeos yalnızca olanları hatırlar.

### 8.9 Epilog varyasyonları

Epilog tek bir sahne düzenidir: kaçış gecesi, göl kıyısı, tekne. Varyasyonlar yalnızca **metin, portre, palet ve küçük yerleşim değişiklikleriyle** kurulur; yeni animasyonlu sahne üretilmez.

| Yuva | Varyantlar | Belirleyen |
|---|---|---|
| Kurtarıcı tekne | Dositeos'un torunu / tanımadığı bir Samiriyeli kayıkçı | `b05_dositeos`, `ilis_dositeos` |
| Kürekte kim var? | Yoram / Yoram'dan gelen haber (uzak kentlerde anlatmaktadır) / Yoram'ın oğlu | `b04_yoram`, `b09_yoram_soz` |
| Natan | Torunları yükleri taşır / ondan kalan bir mektup okunur (Hananya'nın torunu okur) | `b06_esik` (varyant), `ilis_natan` (ton), `ilis_hananya` (mektubu okuyan torunun satırı) |
| Sara hikâyeyi nasıl taşır? | Tamar'ın sözlerini ezberler / Mezmur 23'ü mırıldanarak dinler | `eks_soz` |
| Kapıdaki soru | Tamar inkârı Sara'ya anlatır mı? (Yalnızca `inkar` yolunda son bir seçim) / itiraf hatırası / sessizlik hatırası | `b08_kapi` |
| Son sahnenin biçimi | Tamar anlatır / kalbinde saklar (ikisi de tam son) | `b10_tanik` |
| Yaşlı Tamar'ın tek cümlelik anıları | §8.4'te okunduğu yer sütununda `ep` bulunan her bölüm ve ifade bayrağı için en çok bir cümle; değer yazılmamışsa nötr cümle ya da hiç cümle | İlgili bayraklar |
| Son halı | On bandın oyuncuya özel kompozisyonu | Tüm eksenler |

Kaçış gecesi her yolda güvenle biter, çünkü lütuf temasında ceza yoktur.

---

## 9. İlerleme, Koleksiyonlar ve Kodeks

Seviye, tecrübe puanı ya da yetenek ağacı yoktur. İlerleme fiillerin birikmesi, ilişkiler ve halıdır.

- **Heybe (alet çantası):** Değnek (1), testi (2), düğüm bileziği (3; bilekteki yün, dünya içi söz kaydı), kandil (4), ip (5), havan (8). Aletler hikâyeyle gelir, satın alınmaz.
- **Hatıra nesneleri (`kol_`):** Her bölümde 4 tane, toplam 40 (sapan, düğün kadehinin kırığı, sepetten bir saz parçası...). Çerçevede yaşlı Tamar her biri için tek cümlelik bir anı anlatır. Kutsal eşiklerde nesne bulunmaz (tanım: §7.1-4).
- **Tanıklık ayrıntıları (`tan_`):** Örneğin İsa'nın ekmeği kutsarken göğe bakması (Markos 6:41) ya da "İsa ağladı" (Yuhanna 11:35). Sayaç, bildirim ya da "kaçırdın" uyarısı yoktur. Hatıralar sekmesinde düzyazı olarak sessizce belirir. Pencere bir dokunmama anına bitişik olabilir; kontroller çekilmeden kapanır (§7.1-4).
- **Yan hikâyeler:** Her bölümde mevcut haritayı kullanan, 5–8 dakikalık isteğe bağlı bir hikâye vardır. Örnekler: yaşlı çobanın kör koyunu (1), Kana'da gelinin kardeşinin kayıp bileziği (3), Beytanya'da yas tutan bir çocuğa eşlik etmek (7).
- **Ezgiler:** Duyulan müziklerden oluşan bir galeri.
- **Kodeks (yaklaşık 120 girdi):**
  - *Dönem:* Roma ve Hirodes yönetimi, sikkeler (dinar, lepton), taş arınma küpleri, düğün haftası, tuzlu balık ticareti, yas ve gömme gelenekleri, kaya mezarlar, Fısıh. Arkeolojik dayanaklar: alt katında hayvan bölmesi bulunan köy evi (ev tipi arkeolojiktir; Luka 2:7'deki katalyma'nın "konuk odası" diye okunması yorumsaldır, YC 2:7'de "han" der), Sezariye'deki Pilatus yazıtı, Kayafa'nın kemik sandığı, Celile teknesi, sofraya yaslanarak oturma (Markos 14:18; ayrıca Yuhanna 13:23).
  - *Kutsal Metin:* Karşılaşılan her alıntı ayet referansıyla; Müjdeler arası farklar tarafsız notlarla (§2.3).
  - *Yerler ve Kişiler.* Kodeks tarihçilerin ve kurulun denetiminden geçer.
  - **Kodeks kuralları:**
    1. Bir konu Kodeks'te tek girdidir: ilk geçtiği bölümde açılır, sonraki bölümler aynı girdiye ek yazar ve sayı ile tarihleri o girdiden alır.
    2. Ayet atıfları yalnızca ayetin gerçekten söylediğine verilir. Arkeolojik ve sahneleme kararları, tablo yorumları ve benzetmeye eklenen kurgusal ayrıntılar ("oyunun ya da Tamar'ın hayali") ayrıca işaretlenir; ayet etiketli metin arayüzde görsel olarak ayrılır.
    3. Bulmacalardaki stilize nicelikler (pay, yolculuk sayısı, yağ ölçüsü, kandil menzili) "oyun kısaltması" diye işaretlenir (§6.1).
    4. Mişna ya da Talmud'u kaynak gösteren her girdi yazıya geçiş tarihini bir kez belirtir (Mişna MS 200 dolayı; Kudüs Talmudu MS 400, Babil Talmudu MS 500 dolayı; *doğrulanmalı*).
    5. Çarmıh ve diriliş için yıl verilmez; dönem ifadeleri "birinci yüzyıl" biçiminde yazılır. MS 30 ve 33 önerileri ile sinoptik–Yuhanna farkı yalnızca tarafsızca anılır (§2.3).

---

## 10. Arayüz / UX

- **Ana menü bir dokuma tezgâhıdır.** Bölümler halının bantlarından seçilir. Oyun bittiğinde her bant, o bölümün seçim dallarını sade bir akış şeması olarak gösterir.
- **Heybe (duraklatma menüsü):** Sekmeleri Hatıralar, İnsanlar, Sözler, Kutsal Metin, Dönem ve Harita'dır. Bir arayüz metaforudur, oyun dünyasında yazılı bir nesne değildir. İnsanlar sekmesinde ilişkiler düzyazıyla anlatılır. İnsanlar sekmesi Tamar'ın "tuzlamacı" lakabını (kapattığı tuzlu balık atölyesi) açıklar.
- **Diyalog:** Ekranın altında esnek yükseklikte bir kutu vardır. Ana kadronun 2–6 ifadeli (yetişkin Tamar 6) piksel portreleri kullanılır. **İsa ve kanonik Meryemlerin hiçbiri için portre yoktur** (§2.2-C). İsa'nın sözleri ayrı bir serif piksel yazı tipiyle, köşede ayet etiketiyle (kapatılabilir) ve yumuşak bir tonla belirir. Benzetmelerde İsa'nın anlatımı ekranın üst kısmında satır satır akar.
- **Söz halkası:** Kavrayış için, karakterin çevresinde dünyanın içinde açılır.
- **Harita:** Dönem üslubunda elle çizilmiş bir Celile–Samiriye–Yahudiye haritasıdır. Tamar'ın hayat yolu haritaya bir iplikle işlenir. Hedefler görev oku olarak değil, Tamar'ın düşünceleri olarak yazılır: "Konuklar gelmeden tulumları saymalıyım."
- **HUD:** Sağlık çubuğu ya da sayaç yoktur. Yalnızca bağlama göre beliren tuş göstergeleri vardır. Kandil yağı, kandilin alevinin boyuyla gösterilir.
- **Bölüm sonu:** Önce dokuma bandı, ardından isteğe bağlı Diğer Yollar ekranı.

---

## 11. Sanat Yönü

### 11.1 Perspektif ve görsel kipler (en fazla üç)

1. **3/4 ana kip:** Keşif, bulmaca ve kalabalık sahneleri. Alan gerektiren sürü, kalabalık ve rota bulmacaları için en iyi okunurluğu sağlar.
2. **Yan görünüm set-piece'leri (tavan 6; kullanılan 5):** Kana'da küpler ve kepçe (3) · Yoram'ın fırtınası (4) · Lazar'ın mezar taşı ve çözme (7) · Golgota'ya bakan yamaç (9; büyük sprite yok, tek düzlem 32×48; erişilebilirlik için elle çizilmiş uzak kompozisyon) · şafak koşusu (10). Altıncı yuva yedektir. Tavan yalnızca ana piksel üslubunda (normal haritalı, dinamik ışıklı) kurulan, elle betiklenmiş yan görünüm sahnelerini sayar. Anlatılan Sahne kipinde (parşömen zemin, tek tonlu 32×48 silüet kiti, normal harita ve hacimsel ışık yok) kurulan yan görünüm şeritleri set-piece sayılmaz. Geçiş kesintisiz bir kamera numarasıyla değil, **kurgu kesmesi ya da silme efektiyle** yapılır. Her biri elle düzenlenmiş, tek seferlik bir sahne betiğidir.
3. **Anlatılan Sahne:** Sıcak parşömen zemin üzerinde silüet ağırlıklı bir "kandil gölgesi" üslubu. Bu kip benzetmeleri, Tamar'ın görmediği olayları (denenme, vaftizde açılan gökler) ve tabloları taşır. Ayrı mozaik, papirüs ya da fresk kipleri yoktur. Bu kipte oynanabilir 3/4 haritalar (6. bölümde baba evi ve uzak diyar) ve yan görünüm şeritleri kurulabilir: Eriha'ya iniş (5) ve eve dönen yol (6). Şeritler ayrı bir kalemdir; fırtına §16.4'e göre Anlatılan Sahne'ye çevrilirse bu kaleme geçer (en fazla 3).

**HD-2D'ye itiraz:** Octopath tarzı 3B ortamlar 7–8 kişilik bir ekip için fazla pahalı. Onun yerine normal haritalı 2B sprite'lar, dinamik ışık, çok katmanlı paralaks ve tam sayı adımlı kamera kullanıyoruz.

### 11.2 Teknik ölçüler

| Öğe | Değer |
|---|---|
| İç çözünürlük | **640×360**: 720p'ye 2×, 1080p'ye 3×, 1440p'ye 4×, 4K'ya 6× tam sayı ölçekleme (Switch el modu dahil) |
| Karo | 16×16 |
| Yetişkin karakter | Yaklaşık 24×40 px figür, 32×48 hücrede |
| Çocuk Tamar | Yaklaşık 20×30 px; daraltılmış fiil seti (yürü, seğirt, güt [değnek ve ıslık], kandil taşı, çömel: topuklarının üstüne oturma, secdeyi andırmaz); 17 dizi |
| Aksiyon hücresi | 64×64: kol kaldırma, başta testi taşıma, ip çekme |
| Yan görünüm büyük sprite | 64×96; yalnızca Tamar, İsa (yüzsüz, tek duruşlu silüet) ve Yoram için; yalnızca ön katmanda; kullanımı zorunlu değil |
| Yön | Tamar 8 yönlü; NPC'ler ve kısa süre oynanan roller 4 yönlü |
| Palet | 64 renklik ana palet; bölüm başına en fazla 32 renklik alt küme (10. bölümün gecesi 24 renk; 64 rengin tamamı yalnızca 10. bölümün şafak koşusunda, §11.3) |
| Sinemaskop | 2:1 oran; üstte ve altta 20'şer piksel bant (360 satırdan 320'si görünür kalır) |

**Kurallar:** Farklı piksel yoğunluklarının karıştırılması (mixel) yasaktır: motor içinde sprite döndürülmez ve ölçeklenmez. Yuvarlanan taş elle çizilmiş karelerle canlandırılır. Gerçek yakınlaştırma ve uzaklaştırma yoktur: yakın planlar, uzak kompozisyonlar (9. bölümde §13'ün daha uzak kamerası) ve gök görünümleri önceden elle çizilir; fiziksel temas anlarının ve kutsal anlara bitişik yakın planların çizimi kurul onayına bağlıdır. Kamera kaydırmalarında alt piksel titremesi, sahnenin önce bir dokuya çizilmesiyle (render-to-texture) önlenir. **Asimetrik ekipman** (kandil, değnek, testi) ayrı bir katmanda ve kare başına bağlantı noktalarıyla çizilir. Tamar'da sağ ve sol yönler ayna kopyası alınmadan ayrı çizilir.

**Yan görünümde katman ve temas:** 64×96 büyük sprite yalnızca ön katmanda durur ve bir set-piece onu kullanmak zorunda değildir (9. bölüm). Öbür bütün figürler orta katmanda standart ölçekte (32×48 hücre) ve derinlikle tutarlı ölçekte çizilir; ön katmanda yalnızca koyu silüet şeridi bulunabilir. Büyük sprite'lı bir figür standart ölçekli biriyle temas ederse (dokunma, uzanma, çözme, bir nesneyi elden ele verme) temas ya önceden çizilmiş bir yakın planla verilir (7. bölümde yüz bezi) ya da o sahne tek düzlemde 32×48 kurulur (9. bölüm); farklı ölçekteki iki figür aynı karede birbirine ya da aynı nesneye değmez.

### 11.3 Bölüm paletleri

| Bölüm | Anahtar renkler | Işık anahtarı |
|---|---|---|
| 1 | Çivit gece, gümüş, yıldız altını, kandil turuncusu | Tek ve güçlü bir ışık kaynağı (müjde) |
| 2 | Çöl okru, kireç taşı, Şeria'nın kil ve zeytin yeşili (turkuaz yalnızca sığlıklardaki gök yansımasında ve dokuma bandında) | Sert öğle güneşi, uzun gölgeler |
| 3 | Safran, keten beyazı; tek vurgu nar kırmızısı (yalnızca nar ağacında, gelinin örtüsünün nakışında ve boncukta; kadehte ve kepçede asla, §2.3) | Gündüzden kandil ışığına geçiş |
| 4 | Bahar yeşili (Markos 6:39), göl mavisi, arduvaz grisi rüzgâr | Bulutlu ay ışığı (şimşek yok); şafak kurşuni ve soluk |
| 5 | Parşömen sepyası, kuru okra; tek vurgu çivit (benzetmede Samiriyelinin örtüsü ve sargı şeritleri; gerçek dünyada yalnızca Dositeos'un baş bezi) | Kandil gölgesi |
| 6 | Uzak diyarda soğuk mor; baba evinde sıcak kehribar | Palet ikiye bölünür |
| 7 | Kireç taşı beyazı, zeytin gümüşü, yas mavisi-grisi | Mağara karanlığı ve kapı ışığı |
| 8 | Kandil altını, gece laciverdi, meşale | Çok sayıda küçük ışık kaynağı; şafak gri |
| 9 | Renkler solar. Öğle karanlığında ekran neredeyse tek renktir; **yalnızca kadınların örtüleri ve varsa Tamar'ın bileğindeki çivit iplik renkli kalır** (LUT ve palet maskesiyle) | Işık çekilir |
| 10 | Gece 24 renklik alt küme (çivit, mor); mordan pembeye, pembeden altına dönen şafak; **64 rengin tamamı ilk kez koşu set-piece'inin ilk hareket karesinde** | Doğan güneş |

### 11.4 Işık ve animasyon

- Çevre ve Tamar için normal haritalar elle çizilir. NPC'ler ve kalabalık için normal haritalar otomatik üretilir ya da yalnızca kenar ışığı kullanılır.
- **Switch bütçesi:** Ekranda en fazla 8 dinamik ışık ve tek geçişli aydınlatma gölgelendiricisi. Hacimsel ışık yalnızca set-piece'lerde kullanılır.
- Vakte göre değişen renkler LUT'larla verilir. Toz, kıvılcım ve su için parçacıklar vardır. Gölde bir su gölgelendiricisi kullanılır.
- Yürüyüş 8 karedir. Karakterler dururken nefes alır, kumaşlar ikincil hareketle salınır. Fiil başına 6–12 kare çizilir.
- İsa'nın hareketleri sakin ve ağırbaşlıdır.

### 11.5 Ara sahneler ve kalabalık

- Ara sahneler oyun motorunda, sinemaskop bantlarla ve tam sayı adımlı kamera hareketleriyle yapılır. FMV kullanılmaz.
- **Tam ekran tablolar en fazla 12'dir; kullanılanlar 8:** yıldızbilimciler ve yıldız (1); gece yola çıkan aile ve Rama'daki ağıt (1; Matta 2:18); denenme triptiği (2); kayıp para (6); Kayafa'nın kurulu (7; Yuhanna 11:47–53); sofra sözleri (8; Matta 26:26–28); Pilatus'un önünde, köprü tablosu (9; Luka 23); mezara konuluş (9; Luka 23:53). Dört yuva yedektir. Animasyonlu ara sahnelerin yerini tutarlar.
- **Anlatılan Sahne kartları** (tek imgeli, en çok iki silüetli küçük parşömen kompozisyonu ve ayet metni) tablo tavanına sayılmaz; ayrı bir kalemdir, en fazla 6 (şu an 3, hepsi 2. bölümde). Yalnızca metin taşıyan ayet ve alıntı kartları ile 9. bölümün set-piece karelerinden türetilen "Tablolarla özet" (§13) yeni görsel varlık sayılmaz.
- **Kalabalık üç katmanlıdır:** önde yaklaşık 150 ajan, ortada impostor (uzaktan grup görüntüsü) ve arkada paralaks kalabalık katmanları.
- **Kalabalık kiti:** 12 yetişkin gövde ve çocuk gövdeleri (çocuk Tamar'ın 20×30 ölçeğinde, en az kız ve erkek) × 8 kafa × palet, 4 yönlü; ayrıca 6 tekil kafa (Asa, Şelamsiyon, Yair, Dina, Uzzi, Nehuşta). Kadın gövdelerinde örtü ayrı katmandır ve palet maskesinde "renk koru" işareti taşır (9. bölüm); örtü katmanı ve maske, kit üretimi başlamadan ön üretimdeki teknik keşifte karara bağlanır (§16.3). Asker varyantları: Hirodes ordusu askeri (2. bölüm, bölge kralı Hirodes'in askeri; lejyon işaretleri yok) ve Roma yardımcı birliği (9. bölüm; 1 gövde, 2 kafa). Anlatılan Sahne silüet kiti ayrıdır: tek tonlu, 32×48, 4 yönlü, normal harita yok (5. ve 6. bölüm). Kitin yan profilleri yan görünüm sahnelerinin orta katmanında kullanılır (§11.2).

### 11.6 İsa'nın tasvir kuralları (stil rehberi)

- Sprite ölçeğinde yüz bölgesine **göz pikseli konmaz**; yüz örtü gölgesiyle ve saçla tek ton bir alan olarak çizilir.
- Kompozisyonlar arkadan, 3/4 arkadan ya da uzak planda kurulur. Yakın plan, portre ve hale yoktur. Büyük yan görünüm sprite'ında da yüz, ışığa karşı bir silüet olarak çizilir.
- **Arka ışık:** İsa'nın silüeti geniş bir aydınlığa (gök, kapı ışığı) karşı durabilir; ama ay diski, güneş, alev ya da hacimsel ışık demeti gibi noktasal veya odaklı bir ışık kaynağı hiçbir karede başının ya da gövdesinin hemen arkasına düşmez. İsa'nın kenar ışığı çevresindekilerle aynı yoğunluktadır; silüet kendiliğinden hale etkisi üretmez. Melek, Yahya ve İsa'nın annesi için kurallar §2.2-A'dadır.
- **Yedek kip:** Gerekirse İsa'nın yalnızca ışık ve gölge olarak temsil edildiği soyut bir kip hazır tutulur. Bu kural dikey dilimdeki ilk mucize sahnesinde danışmanlarla doğrulanır.

### 11.7 Arayüz sanatı

Dokuma motifli çerçeveler ve kandil biçimli ipucu simgeleri kullanılır. **Türkçe piksel yazı tipi** büyük İ, Ş, Ğ, Ç, Ö, Ü için üst ve alt işaret payı bırakır; ı ve i ayrı çizilir. Disleksi dostu, piksel olmayan bir yazı tipi seçeneği de vardır. Diyalog kutuları esnek yüksekliklidir; Türkçe ve İngilizce metin uzunlukları baştan test edilir.

---

## 12. Ses ve Müzik

- **Ana tema Mezmur 23'tür ("Rab çobanımdır").** Çoban babanın küçük Tamar'a söylediği ninnidir. Dizeleri oyun boyunca sırayla duyulur: 23:1 babanın ateş başındaki mırıltısı (1. bölüm), 23:2 Tamar'ın nöbet mırıltısı (4), 23:3 gece yolunda (7), 23:4 Golgota'da yalnızca yaşlı Tamar'ın sesiyle, söz olarak (9; orada müzik çalmaz). Ezgi besteli müzik olarak Lazar'ın yas evinde kavalcının çalışıyla (7), Şabat gecesi yalnızca `gece_yarisi` yolunda Tamar'ın sözsüz mırıltısıyla (9) ve şafakta (10: kapıda tek kaval; koşuda ilk kez tam ve parlak) döner. Ara bölümlerde yalnızca sözsüz mırıltı ya da sahnenin içinden bir ezgi olarak duyulur; İsa sahnedeyken çalmaz ve O'na bağlanmaz. Hem Hristiyan hem de Zebur'u onurlandıran Müslüman oyuncular için çatışmasız bir seçimdir.
- **Çalgılar:** Kinnor (lir), nevel (arp), halil (çift kamışlı nefesli), tof (def) ve kaval; duygusal doruklarda ölçülü yaylılar. Şofar yalnızca dinsel bağlamda kullanılır. Döneme ait olmayan makam sistemlerinden kaçınılır.
- **İsa'nın motifi yoktur.** O sahnedeyken müzik geri çekilir, tek bir uzun ton kalır ve dünyanın sesleri netleşir.
- **Uyarlanabilir müzik:** Katmanlar vakte ve kandilin ışık yoğunluğuna bağlıdır. 10. bölümdeki koşuda ayrı bir koşu katmanı açılır.
- **Sahnenin içinden gelen müzik:** Düğün dansları; Markos 14:26'daki ilahi. Metin yalnızca "ilahi söyledikten sonra" der; Hallel olduğu yaygın bir yorumdur ve Kodeks'te öyle işaretlenir. İbranice Hallel kaydı (danışman onayıyla, *doğrulanmalı*) boğuk bir koroyla yapılan bir grup kaydıdır; içinde İsa'ya atfedilebilecek, tek başına öne çıkan bir ses (solo) bulunmaz. Kayıt kesme listesinin ilk sırasındadır (§16.4).
- **Ortam sesleri:** Koyun çanları, göl, rüzgâr ve Aramice kaydedilmiş pazar uğultusu. Askerî adım sesi bir gerilim motifidir: 9. bölümdeki Roma yardımcı birliklerinde çivili sandalet (caliga) sesi; 1. bölümdeki Kral Hirodes askerlerinde, tarihçi aksini onaylamadıkça nötr bir adım ve donanım sesi (§2.2-F).
- **9. bölüm:** Müzik geri çekilir; geriye rüzgâr, nefes ve uzak sesler kalır. Mezmur 23:4 yalnızca anlatıcının sesiyle söz olarak gelir.
- **Seslendirme:** İsa'nın sözleri yalnızca metindir. Yalnızca yaşlı Tamar'ın anlatısı seslendirilir (önce Türkçe, sonra İngilizce). Kayıt **metin kilidinden sonra** yapılır. Diğer karakterler kısa ses tepkileri kullanır.
- **Dokunsal geri bildirim:** Suyun akışı, ipin gerginliği ve toynak sesleri titreşimle desteklenir; hepsi ayarlanabilir.

---

## 13. Erişilebilirlik

| Alan | Özellikler |
|---|---|
| Bilişsel | Hikâye Modu (bulmacaları otomatik çözme), Rahat ayarı, Üç Işık ipucu sistemi, süresiz seçimler, kayıtlı hedef düşünceleri |
| Motor | Tüm tuşlar yeniden atanabilir; Etkileşim ile Söz sakla ayrı atanabilir; tek el ön ayarı; her "basılı tut" için aç/kapa; dairesel girdi yerine ←/→ dönüşümlü basma; tüm el işlerinde "otomatik" seçeneği |
| Görsel | Hiçbir anlam yalnızca renkle verilmez (şekil, desen ve simge de kullanılır); renk körlüğü modları; yazı boyutu ayarı; disleksi dostu yazı tipi; yüksek kontrastlı kenar ışığı |
| İşitsel | Konuşanın adını gösteren altyazılar; Kulak için görsel yön göstergesi; mono ses; yön belirten ses ipuçları |
| Işığa duyarlılık | Işık patlamalarını yumuşatma (müjde, şafak); ekran sarsıntısı ve hareket azaltma; titreşim ayarı |
| İçerik | 1. ve 9. bölümler için içerik bilgilendirmesi; 9. bölüm için "daha uzak kamera" (önceden çizilmiş uzak kompozisyon, §11.2) ve tablolarla anlatılan bir özet seçeneği |
| Okuma | Arayüz için metin okuma; ara sahneler için sesli betimleme (yaşlı Tamar'ın anlatısıyla bütünleşik) |

---

## 14. Bölüm Haritası

Her bölümün ayrıntılı tasarım belgesi `docs/bolumler/` altındadır; tablodaki başlıklar bu belgelere bağlanır. Bölüm belgeleri bu GDD'nin 1.1 sürümüyle hizalanmıştır.

| # | Başlık | Oynanabilir | Mekânlar | Odak mekanik | Yeni mekanik | İmza bulmaca | Katılım anı | Seçim teması | Zorluk | Süre |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | [Yıldızın Altında](bolumler/01-yildizin-altinda.md) | Çocuk Tamar (9) | Beytlehem kırları, ağıl, Beytlehem köyü | Güt, Bakış | Güt | Teraslı yamaçta gece sürüsünü ağıla indirmek | Müjde ve yemlik (dokunmama) | Anlatmak mı, saklamak mı? | 1 | 35 |
| 2 | [Irmak ve Çöl](bolumler/02-irmak-ve-col.md) | Tamar (41) | Şeria kıyısı, hacı kampı, çöl kenarı | Taşı/Dök, Bekleyiş | Taşı/Dök | Kırk günlük erzakı dört onluğa bölmek | Vaftiz; başını kaldırmak | Vermek mi, korumak mı? | 2 | 40 |
| 3 | [Altı Taş Küp](bolumler/03-alti-tas-kup.md) | Tamar | Kana'da düğün evi: avlu, kiler, kuyu | Kavrayış, Taşı/Dök, Güt (insanlara) | Kulak ve Kavrayış | Hizmetkâr zinciriyle altı küp | Kepçeyi şölen başkanına taşımak | Suç ve sır | 2,5 | 40 |
| 4 | [Ekmek ve Rüzgâr](bolumler/04-ekmek-ve-ruzgar.md) | Tamar; Yoram (anlatı) | Issız yamaç, Ginnesar kıyısı, tekne | Güt (gruplar), Kulak ve Kavrayış, Taşı/Dök, Kandil | Kandil (tam sistem) | Kalabalığı yüzer ve ellişer kişilik gruplara oturtmak | Ekmek dağıtmak; Yoram'ın fırtınası | Oğlunu bırakmak | 3 | 55 |
| 5 | [Yolda Biri](bolumler/05-yolda-biri.md) | Tamar; benzetmede yaralı yolcu ve Samiriyeli | Yeruşalim yolu; Eriha yolu (yan şerit); han | El (Dök, Bağla), Taşı | Bağla/Çöz | Sargı sırası ve oranı; dönemeçlerde yük dengesi | Yaralının bakışı; "Git, sen de öyle yap" | Komşum kim? | 3 | 39 |
| 6 | [Eşikte](bolumler/06-esikte.md) | Tamar; benzetmede küçük ve büyük oğul | Celile'de bir avlu; baba evi, uzak diyar; Mecdel | Kavrayış, Güt (olağan ve tersine) | — | Miras hesabı (Kavrayış hesap zinciri) ve domuzlar | Eve dönüş; konuşmanın kesilmesi | Kapıda durmak | 3,5 | 55 |
| 7 | [Dördüncü Gün](bolumler/07-dorduncu-gun.md) | Tamar (43) | Beytanya: Marta'nın evi, zeytin işliği, kaya mezar; gece yolu | Bakış, Kandil, Bekleyiş, Güt, Bağla, Kal | — (Kal girdi seçeneğidir) | Yıldızlarla gece yolu; yas evinde dört gün | Taşı çekmek; yüz örtüsünü çözmek | Yası açmak mı, taşımak mı? | 4 | 50 |
| 8 | [Gece İdi](bolumler/08-gece-idi.md) | Tamar (44) | Yeruşalim'de üst odalı ev, sokaklar, başkâhinin dış kapısı | Kandil, Kavrayış, Ez/Karıştır, Bekleyiş | Ez/Karıştır | Kandille maya araması (kanıttan yer çıkarma ve Alçak tutuş); sofra düzeni | Leğen; merdivende Yahuda; kapıdaki soru | Sadakat ve korku | 4 | 52 |
| 9 | [Uzaktan](bolumler/09-uzaktan.md) | Tamar | Çarmıh yolu, Golgota'ya bakan yamaç, mezar bahçesi, ev | Kal, Güt (tersine), Ez/Karıştır | — | Yok (bilinçli olarak) | Uzakta durmak; Şabat | Kalmak ve teselli | 1 | 35 |
| 10 | [İlk Günün Şafağı](bolumler/10-ilk-gunun-safagi.md) | Tamar | Karanlık ev, kapalı sokaklar, mezar bahçesi, toplantı odası | Bağla, Kandil, Bakış, Kavrayış, Taşı | Koşu | Kaldıraç ve ip planı; bahçeye yol | Boş mezar; "Size esenlik olsun" | Nasıl tanıklık edeceksin? | 3 | 45 |

### 14.1 Bölüm özetleri

**1. Yıldızın Altında** (Luka 2:1–20; Matta 2 tabloyla). Gece, teraslı bir yamaçta babası Tamar'a gütmeyi öğretir. Tamar meleme sesinin yönünü Bakış'la izler, kayıp kuzuyu bulur ve sürüyü ağıla indirir. Aha anı: koyunlar değneği değil, babasının kandilinin ışığını izler. Ardından müjde gelir: "Korkmayın!" (2:10). Işık patlar, kontroller usulca çekilir. Nüfus sayımıyla dolup taşan Beytlehem'de Tamar çevreyi okuyarak doğru kapıyı bulur: dolu konuk odaları, alt katında hayvan barındıran evler, taze saman izi. Yemlikte bebeğin başında dokunmama anı yaşanır. Yankı: Tamar gördüklerini köye mi, babasına mı anlatacak, yoksa kalbinde mi saklayacak? Bölüm iki tabloyla kapanır: yıldızbilimciler (Tamar'a aylar sonra anlatılan bir haber; yolu yıldız gösterir, Matta 2:9) ve gece yola çıkan aile. Bir iki yıl sonra Kral Hirodes'in askerleri Beytlehem'e gelir: uzaktan bir ağıt duyulur, ekrana Matta 2:18 yazılır ve Tamar'ın ailesi iki yaşından küçük Natan'ı bir postun içine saklayıp kuzeye kaçar.

**2. Irmak ve Çöl** (Matta 3–4; Luka 3:10–14; Yuhanna 1:28–40). Otuz iki yıl geçmiştir. Açılışta Tamar'ın arabasının dingili kırılır ve Samiriyeli Dositeos kendiliğinden yardım eder. Tamar, Şeria'nın ötesindeki hacı kampında aşçıdır. Irmaktan kampa su taşır (Taşı/Dök) ve kıt erzakı kırk günün dört onluğuna böler (Bekleyiş). Kısıtlar ekranda görünür: un, su, hasta hacılar, gelecek kervan. Kalabalık Yahya'ya "Ne yapalım?" diye sorar (Luka 3:10). İsa vaftiz olur. Tamar'ın tek girdisi başını kaldırmaktır; çocukken yıldıza bakarken yaptığı hareketin aynısıdır. Açılan gökler, güvercin ve ses Matta 3:16–17'nin anlatımıyla, Yahya'nın tanıklığı (Yuhanna 1:32) ise metindeki yerinde, Tanrı Kuzusu sahnesinin başında ayrı Anlatılan Sahne kartlarında verilir. Denenme bir triptik tabloyla anlatılır (Matta 4:4, 7, 10); ayartıcı yalnızca yüzsüz bir gölge ve metindir (seslendirme yoktur). Doruk, "İşte Tanrı Kuzusu!" sözüdür (Yuhanna 1:36). Eski çoban kızı "kuzu" sözünde irkilir ve Andreas'ın İsa'nın ardından gidişini görür.

**3. Altı Taş Küp** (Yuhanna 2:1–11). Tamar Şeria'dan, düğün sürerken (yedi günlük düğünün dördüncü günü; oyunun kararı) son günler için tutulmuş ek aşçı olarak gelir; bu, Yuhanna 1:35–2:1'in gün sayımına uyar. Kiler hesabı bir Kavrayış cümlesiyle çözülür: tulum sayısı, konuk sayısı ve düğünün kaçıncı günü olduğu. Tamar şarabın yetmeyeceğini önceden anlar, ama bunu fark edip İsa'ya söyleyen İsa'nın annesidir (2:3). Tamar sofra düzenini bir Kavrayış cümlesiyle kurar ve konuklar kendiliğinden yer değiştirir (4. bölümün aile takası burada kullanılmaz); utanç biraz gecikir, ama şarap her düzende biter. İsa'nın annesi: "Size ne derse onu yapın" (2:5). İsa: "Küpleri suyla doldurun" (2:7). İmza bulmaca burada başlar: uzak bir kuyu, üç boy testi, dans eden bir avlu ve hizmetkâr zinciri. Usta kısıtı en fazla 9 yolculuktur. Yan görünümde Tamar kepçeyi şölen başkanına taşır. Suyun rengi gösterilmez; başkan tadarken kontroller çekilir. Tamar'ın İsa'nın annesini tanıması (yüzünü değil, eğik başını ve bakışını) yalnızca bir iç sestir; aralarında konuşma geçmez. Yankı: şarap eksikliğinin suçunu üstlenmek ya da tedarikçiye yüklemek. Ardından, 2:10'dan sonra, sırrı damada söylemek, hizmetkârlarla paylaşmak ya da kalbinde saklamak.

**4. Ekmek ve Rüzgâr** (Matta 14:13–33; Markos 6:34, 6:37–41; Yuhanna 6:4, 6:8–9, 6:12–13; Luka 9:10). Gündüz, yeşil yamaçta kalabalık yüzer ve ellişer kişilik gruplara oturtulur. Kısıtlar simgelerle görünür: bölünmeyecek aileler, gölgeye ihtiyacı olan yaşlılar, öğlen iyileşen hastalarının boş sedyelerini eve taşıyacakları için yola bitişik oturması gereken aileler (Matta 14:14). Bir grup doğru yerleşince oturma animasyonu ve onay simgesi belirir. Tamar, Kulak ile beş arpa ekmeği ve iki balığı olan çocuğu bulup Andreas'a ulaştırır. Ekmeğin kutsanması bir dokunmama anıdır. Dağıtımda ilk sepet kime uzatılır? Sepet boşalmaz ama bu bir efektle gösterilmez. Ardından on iki sepet artık toplanır. Gece Tamar Ginnesar kıyısında işaret kandilini rüzgâra karşı korur (Kandil tam sistemi; şimşek yok). Sabah Yoram gelir ve anlatır: **Yoram'ın Anlatısı** yan görünümde oynanır. Su boşaltılır, tekne dengede tutulur, su her durumda kazanır. Petrus'un yürüyüşü sabit bir sinematiktir. Oyuncunun tek girdisi "Ya Rab, kurtar beni!" çığlığına dönmektir. İsa tekneye binince rüzgâr diner (14:32). Teknedekilerin sözü (Matta 14:33) yalnızca "Teknedekiler" etiketli bir alıntı kartında verilir; Yoram bu sözleri ağzına almaz. Yankı: Yoram İsa'nın ardından gitmek ister. Tamar onu kutsayacak, yasaklayacak ya da kararı erteleyecektir.

**5. Yolda Biri** (Luka 10:25–37). Tamar Yeruşalim'e giden kalabalıktadır. Kutsal Yasa uzmanı soruyu sorar ve benzetme başlar: Anlatılan Sahne'de Eriha'ya inen yan şerit. Oyuncu önce yaralı yolcudur; hareket edemez, yalnızca bakabilir ve zayıfça seslenebilir. Kâhin ve Levili geçip gider. Arınma kaygıları alay edilmeden Kodeks'e bağlanır. Sonra oyuncu Samiriyeli olur. Yol yalnızca yaralıya çıkar, çünkü "geçip gitme" girdisi hiç yoktur. Yara şarapla temizlenir, yağla yatıştırılır ve sarılır (sıra ve oran kararı, Bağla/Çöz tanıtımı). Yaralı eşeğe dengeli biçimde yüklenir, virajlarda dengede tutulur ve handa iki dinar ödenir. Yasa uzmanı "Ona acıyan" yanıtını verir (YC ile doğrulanmalı), İsa da "Git, sen de öyle yap" der. Yankı: aynı gün, Yeruşalim'e giden yolun devamında, 2. bölümde Tamar'a yardım etmiş olan Dositeos yol kenarında ateşler içinde yatmaktadır ve arabasının dingili kırıktır. Seçenekler: yükü bırakmak, para ve haber göndermek ya da makul bir gerekçeyle geçip gitmek.

**6. Eşikte** (Luka 15). Bir avluda vergi görevlileri ve günahkârlar vardır. Tamar 15:3'te eşikte, Ferisi komşusu Hananya'nın yanındadır; Hananya 15:2'yi Ferisiler ve din bilginleriyle birlikte söyler, benzetmenin sonunda açık soruyu Tamar'a geri sorar; saygıyla yazılmış bir karakterdir. Kayıp koyun 30 saniyelik bir anıyla (1. bölümün varlıklarıyla) ve kayıp para kandil yakıp evi süpüren kadının kısa tablosuyla (15:8–10) geçilir. Kayıp oğul Anlatılan Sahne'de 3/4 görünümde oynanır; palet uzak diyarda soğuk, baba evinde sıcaktır. Miras paylaşımı imza bulmacadır: ilişkisel değerlerden kurulan bir Kavrayış hesap zinciri (malların değerleri toplanan sözlerden birbirine bağlanarak çıkarılır) ve olağan Güt'le yerleştirme; ilk oğul öbürünün iki katını alır (Yasa'nın Tekrarı 21:17) ve bölünemeyen mallar vardır. Payları hasırlara baba kendi eliyle yerleştirir; oyuncunun Güt'le yaptığı yerleştirme, küçük oğulun payını yol kapısından çıkarmaktır (15:13a). Uzak diyarda kıtlık gelir; domuzlar değneğe aldırmaz, ıslıktan kaçar (tersine Güt) ve keçiboynuzunun kokusuna gelir. Oğul "aklı başına gelince" (15:17) yolda babasına söyleyeceği sözleri Kavrayış cümlesiyle kurar. Baba koşup sarılır ve konuşma "Beni işçilerinden biri gibi kabul et" (15:19) cümlesine gelmeden kesilir; bu 15:21'in bir okumasıdır (bazı elyazmalarında 15:21 bu cümleyi de içerir; Kodeks). Mekanik lütufla bozulur. Büyük oğul tarladan döner ve müziği duyar. Baba dışarı çıkar ve onunla konuşur. Benzetme 15:32'de babanın sözleriyle açık biter; bu sırada oyuncunun hiçbir girdisi yoktur. Yankı: Mecdel'de Natan dönmüştür ve annesi sofra kurmuştur. Tamar kapıdadır: içeri girebilir, dışarıda Natan'la konuşabilir ya da çekip gidebilir.

**7. Dördüncü Gün** (Yuhanna 11:1–53). Lazar hastadır. Tamar haberi gece vakti Şeria'nın ötesine (10:40), yani 2. bölümdeki ırmağa götürür. Yol, babasının 1. bölümde öğrettiği yöntemle, yedi yıldızın döndüğü boş noktadan kuzey bulunarak aranır (ön iki yıldızdan çizgi uzatma dönem dışıdır); kandil yağı sınırlıdır. Dositeos 5. bölümde yardım gördüyse onun kervanı Tamar'a bir eşek verir. Tamar "Bu hastalık ölümle sonuçlanmayacak" (11:4) sözüyle döner, ama Lazar ölmüştür. Yas evinde dört gün sınırlı su, ekmek ve yerle geçer (Bekleyiş). Tamar zeytin işliğinde taş itmeyi öğrenir. Marta İsa'yı karşılamaya koşar ve kanonik sözlerini söyler; ikrarı (11:27) Marta'nın alıntısı olarak duyulur. Marta her durumda Beytanyalı Meryem'i çağırır. "Taşı kaldırın" (11:39), Marta itiraz eder ve ardından ip takımına ritim verilir (Güt ve Bağla). "Lazar, dışarı çık!" bir dokunmama anıdır. "Onu çözün" üzerine Tamar yüz örtüsünü sağ çubuğu yavaşça döndürerek açar. Yankı (dirilişten sonra, sarnıç başında, geriye bakan bir itiraf olarak): getirdiği söz boşa çıkmış gibi göründüğü dört gün boyunca yaşadığı öfkeyi ve yası Marta'ya açmak ya da içinde taşımak. Bölüm, Kayafa'nın kuruluna ait bir tabloyla kapanır (11:47–53).

**8. Gece İdi** (Markos 14:12–26; Yuhanna 13:1–30; Luka 22:54–62). Tamar üst odalı evde gündelikçi aşçıdır; testi taşıyan uşak (Markos 14:13) onun iş arkadaşıdır. Maya araması kandil ışığında yapılır: sözlerden ekmeğin nerede yendiği çıkarılır ve kırıntının gölgesi ancak kandil yere yakın tutulunca görünür. Havanda haroset'in kuru harcı dövülür ve mayasız hamur yoğrulur (Ez/Karıştır tanıtımı); acı otlar pazardan seçilip yıkanır, ezilmez. On üç kişilik sofra, Nisan'ın 13'ünün ikindisinde, maya aramasından önce yaslanarak oturulacak biçimde düzenlenir; leğenin yeri o sırada hasırla işaretlenir. Hazırlık sırası vakitlere bölünür. Tamar leğeni ve havluyu kapıya getirir; hizmetkârın işini İsa üstlenir (13:4–5). Sofra sözleri bir tablodur. Merdivende kandille duran Tamar, dışarı çıkan Yahuda'yla karşılaşır: kandili uzatabilir, bir şey sorabilir, susabilir ya da geri çekilebilir. Yahuda her durumda gider. Damdan, Kidron'un ötesinde meşaleler uzak bir silüet olarak görünür. Şafakta kapıdaki soru sorulur (§8.5).

**9. Uzaktan** (Luka 23:26–56; Markos 15:21). Bilinçli olarak bulmaca yoktur. Kalabalık Tamar'ı sürükler (4. bölümün tersine). Yeruşalim kızları arasında Tamar, İsa'nın onlara dönüp söylediği sözleri duyar (23:28) ve Kireneli Simun'u görür. Golgota'da kadınlarla birlikte uzakta durur. Çarmıha germe anında kalabalık görüşü kapatır, ardından gökyüzüne karşı üç silüet belirir. Öğle karanlığında renkler çekilir; yalnızca kadınların örtüleri ve varsa Tamar'ın bileğindeki çivit iplik renkli kalır. Oyuncunun tek eylemi **Kal** tutuşudur. Tuşu bırakmanın cezası yoktur ve hiçbir şey kaydedilmez. İsa'nın son sözleri yalnızca metin olarak verilir, ardından yüzbaşının sözü gelir (23:47). Kalabalıktaki Yüzler önceki seçimleri yansıtır. Mezarın yeri görülür (23:55) ve güneş batmadan baharat dövülür (23:56). **Şabat:** iş yapmak yasaktır. Oyuncu yalnızca evin tek odasında Hatıra nesneleri arasında dolaşır; metinler seçimlere göre değişir. Yankı: "Her şey bitti" diyen Yoram'a umut, sessiz yakınlık ya da paylaşılan öfke.

**10. İlk Günün Şafağı** (Luka 24:1–43; Markos 16:3). Karanlıkta "Taşı kim yuvarlayacak?" sorusu sorulur. Tamar uyuyan evde sessizce 7. bölümdeki kaldıraç ve ip düzeneğini hazırlar: ip uzunluğu, destek noktası ve kaç kişi gerektiği. Kapıları kapalı sokaklarda kandil (alev okuma: alevin yatışı) ve ağaran gökteki kara biçimlerle bahçeye yol bulunur. Mezara varıldığında taş çoktan yuvarlanmıştır; öğrenilen beceri mucizenin önünde boşa çıkar. İki adam: "Diri olanı neden ölüler arasında arıyorsunuz?" (24:5). **Koşu ilk kez açılır:** şafak koşusu oyunun ilk tam renkli anıdır. Yolda Kalabalıktaki Yüzler'e rastlanır. Kadınlar elçilere haber verir; elçiler inanmaz (24:11) ve Petrus mezara koşar. Tamar'ın kişisel tanıklığı seçime bağlıdır: anlatmak ya da kalbinde taşımak. İki yol da tam bir sondur. Akşam Tamar toplananlar arasındadır (24:33). İsa ortalarında belirir: "Size esenlik olsun!" (24:36). Oyuncunun tek girdisi başını kaldırmaktır. Ardından çerçevede Sara'yla son sahne ve epilog gelir.

---

## 15. Metin Kullanımı ve Yerelleştirme

### 15.1 Kanonik sözler nasıl verilir?

1. **Kaynak:** Öncelik *Kutsal Kitap Yeni Çeviri* (YC) metnidir. Kelimesi kelimesine alıntı yalnızca lisans alındıktan sonra yapılır.
2. **Lisans alınamazsa:** Kurulun onayladığı yakın aktarım kullanılır. Yakın aktarım YC'nin sözlüğünü korur, anlamı genişletmez ve Kodeks'te "yakın aktarım" diye işaretlenir.
3. **Referans:** İsa'nın ve bütün kanonik konuşanların her satırının köşesinde bir ayet etiketi bulunur (kapatılabilir).
4. **Birleştirme yasağı:** Farklı Müjdelerden gelen cümleler tek bir replikte birleştirilmez.
5. **Sözlük tutarlılığı:** "şölen başkanı" (kâhya değil); "Kutsal Yasa uzmanı"; "bölge kralı Hirodes" (Antipas) ile "Kral Hirodes" (Büyük Hirodes) ayrımı; "Fısıh Bayramı", "Mayasız Ekmek Bayramı". Saatlerde YC'nin günümüz saati karşılıkları kullanılır. YC terimleri esastır:
   - **Terimler:** "yıldızbilimciler" ("müneccimler" yalnızca Kodeks'te geleneksel ad olarak anılır); "konuk odası" (YC Luka 2:7'de "han" der); "başkâhin" ve "başkâhinin konağı" (Kayafa adı kapı sahnesi için yalnızca Kodeks'te, Matta 26:57'ye dayanarak); "din bilgini"; "vergi görevlisi"; "Kutsal Yasa uzmanı"; "Tapınağın Açılışını Anma Bayramı" (Yuhanna 10:22); "İbrani Nisan ayı".
   - **Yer adları:** Ginnesar, Horazin, Beytsayda, Kefarnahum, Tarichea (Mecdel), Gavlanitis, Dekapolis, Gerasa, Şekem.
   - **Eski Antlaşma kitapları** YC adlarıyla anılır: Yaratılış, Mısır'dan Çıkış, Levililer, Çölde Sayım, Yasa'nın Tekrarı.
   - **Birim politikası:** Ayet alıntılarında YC'nin günümüz birimleri aynen kullanılır (Yuhanna 2:6, 11:18). Oyun içi konuşma ve bulmacalarda dönem birimleri (arşın, karış, ölçek, ölçü, avuç; dinar, lepton, drahmi) kullanılır; günümüz karşılıkları yalnızca Kodeks'te verilir.
   - **Hitap:** "Mecdelli" yalnızca sıfattır; Tamar'ın lakabı "tuzlamacı"dır (§2.2-C).
   - Bütün YC biçimleri metin kilidinden önce basılı YC ile doğrulanır (*YC biçimleri doğrulanmalı*).
6. **Alıntı denetimi:** Bu belgedeki bütün alıntılar tasarım referansıdır. Metin kilidinden önce her biri YC ile tek tek karşılaştırılmalıdır (*doğrulanmalı*; örneğin Yuhanna 13:30'un YC'deki tam ifadesi).
7. **Etiketler:** İsa'nın sözleri, anlatı metni ve Eski Antlaşma alıntıları `[yakın aktarım]` etiketini taşır. İsa dışındaki bütün kanonik konuşanların (melekler ve iki adam, İsa'nın annesi, Yahya, öğrenciler, Petrus, Andreas, Marta, Beytanyalı Meryem, şölen başkanı, Kutsal Yasa uzmanı, Kayafa, Pilatus, suçlu, yüzbaşı ve kanonik topluluklar) satırları `[yakın aktarım; kanonik replik]` etiketini taşır. Doğrulama notları noktalı virgülle sona eklenir; her kanonik satırın ayet referansı vardır. YC lisansı alınınca "yakın aktarım" yerine "YC" yazılır.

### 15.2 Lisans konuları

- YC telifli bir çeviridir. Telif sahibinin Kitab-ı Mukaddes Şirketi (ortak yayıncılarıyla) olduğu biliniyor; tam hak sahipliği ve alıntı kotası politikası *doğrulanmalı*. Görüşme ön üretimin ilk ayında başlar.
- Bir ticari oyunda kullanılacak ayet sayısı tahminen 250–400'dür (Kodeks dahil) ve bu sayı kota hesabı için raporlanır.
- **Alternatifler:** 1941 tarihli *Kitabı Mukaddes* çevirisi (dili eskidir; telif durumu *doğrulanmalı*) ya da tamamen yakın aktarım. Karar metin kilidinden önce verilmelidir.
- Lisans sözleşmesine şu maddeler eklenir: oyun içi gösterim, mağaza sayfası, fragman ve İngilizce sürüm için ayrı izin.

### 15.3 İngilizce yerelleştirme

- **Kutsal metin için** kamu malı bir çeviri tercih edilir: World English Bible (kamu malı) ya da Berean Standard Bible (kamu malına devredildiği bildiriliyor, *doğrulanmalı*). KJV'nin Birleşik Krallık'taki Crown patent durumu nedeniyle seçilmemesi öneriliyor. Lisanslı bir çeviri (ESV, NIV) de değerlendirilebilir.
- **Ad sözlüğü:** Türkçe → İngilizce eşleme tablosu (İsa → Jesus, Yuhanna → John, Mecdelli Meryem → Mary Magdalene, Fısıh → Passover...).
- **Metin uzunluğu:** Esnek kutular kullanılır. İngilizce metin Türkçeden ortalama %10–20 kısa olabilir; arayüz her iki dilde test edilir.
- **Kavrayış cümleleri:** Türkçenin ek yapısı nedeniyle boşluklar sözcük değil **kavram** taşır. Her dil kendi cümle şablonunu yazar; ekler şablonda çözülür.
- **Hacim tavanı:** Kodeks dahil 60–75 bin Türkçe kelime.

---

## 16. Kapsam, Üretim Planı ve Riskler

### 16.1 Varlık tahmini

| Kalem | Tahmin / tavan | Not |
|---|---|---|
| Haritalar | 24 (tavan 24) | Bölümlere göre 1: 2 · 2: 2 · 3: 2 · 4: 2 · 5: 1 · 6: 3 · 7: 5 · 8: 3 · 9: 3 · 10: 1. Yeniden kullanım: 6C ← 4B; 7'de 2B'nin kıyısı; 9'da 8C; 10'da 9C, 9D, 8A. Emmaus ve Antakya yok; çerçeve ve epilog sabit kompozisyondur |
| Karo setleri | 6 | Yahudiye kırsalı (1. bölüm kurar); Celile köyü ve gölü ile iç mekân kiti (3. bölüm, dikey dilim); çöl ve ırmak (2); Anlatılan Sahne (5; 6'da da); Yeruşalim (8). 1. bölümün Ev 4 içi iç mekân kitine köy evi parçaları ekler |
| Adlandırılmış karakter | 38 (tavan 40): bölümlerde 32, epilogda 6 portre varyantı | Kendine özgü sprite seti ya da portresi olanlar; yaş varyantları ayrı; adlı kit NPC ≈50 ayrı sayılır (bölüm başına en fazla 10); konuşan öğrenci en fazla 6 |
| Kalabalık kiti | 12 yetişkin gövde + çocuk gövdeleri × 8 kafa × palet; 6 tekil kafa | 4 yönlü; kadın gövdelerinde örtü ayrı katman; asker varyantları (Hirodes ordusu, Roma yardımcı birliği); Anlatılan Sahne silüet kiti ayrı (32×48, tek tonlu); §11.5 |
| Animasyon dizisi | **≈425, tavan 450** | Bölüm sayımları (ortak dizi, ilk çizen bölüme yazılır): 1: 48 · 2: 31 · 3: 36 · 4: 40 · 5: 41 · 6: 47 · 7: 50 · 8: 38 · 9: 38 · 10: 29 = ≈398; ortak temel setler ≈26 (yetişkin Tamar ≈8, İsa 2, Yoram 3, yaşlı Hulda 3, kalabalık kiti ≈10). Karakterlere göre: yetişkin Tamar ≈106 (3/4 ≈84, yan görünüm büyük sprite 14, temel set ≈8), çocuk Tamar 17, İsa ≈19, Yoram ≈16 (yan görünüm 10 dahil), NPC, kalabalık, hayvan ve silüetler ≈265 |
| Yan görünüm set-piece | 5 (tavan 6) | §11.1; altıncı yuva yedek |
| Anlatılan Sahne şeridi | 2 | Eriha'ya iniş (5), eve dönen yol (6); set-piece tavanına sayılmaz |
| Tablo | 8 (tavan 12) | §11.5 |
| Anlatılan Sahne kartı | 3 (tavan 6) | 2. bölüm; tablo tavanına sayılmaz |
| Önceden çizilmiş kompozisyon | yakın plan 3 · gök çizimi 10 · uzak kompozisyon 1 · pano 4 | 5. bölümde sargı panosu ve semer kenar çizimi; 7. bölümde yüz bezi; 7. bölümde 4 gök şeridi (1280×320); 10. bölümde 6 gök görünümü; 9. bölümde Golgota yamacının uzak çizimi; 2. bölümde çetele hasırı, 7. bölümde ev planı, 8. bölümde vakit panosu ve üst oda planı |
| Hatıra nesnesi simgesi | 40 × 16×16 | Bölüm başına 4; tek atlas (9. bölümün Şabat odası); aynı simge Heybe'de kullanılır |
| Portre | 24 (bölümlerde 18, epilogda 6 varyant) × 2–6 ifade | Yetişkin Tamar 6 ifade; epilog portreleri mevcut portrelerden türetilir, animasyon dizileri yoktur; İsa ve §10'daki portre kuralının kapsadığı kişiler için yok (bölümlerde hiçbir Meryem portreli değildir; Yahya için de yok, §2.2-A) |
| Metin | 60–75 bin kelime | |
| Seslendirme | ~8 bin kelime anlatıcı (TR + EN) | Metin kilidinden sonra kayıt |
| Müzik | ~75 dk, ~30 parça | |
| Ses efekti | ~600 | |

**Sayım kuralları**

- **Harita sayım birimi:** Ayrı yüklenen ve yürünebilen her ortam çizimi bir haritadır. Aynı yapının katları (8. bölümün üç katmanlı A'sı) ve aynı haritanın LUT ya da ışık hâlleri (6. bölümün B1/B4'ü) tek harita sayılır; ayrı ortam çizimi olan şerit bölmeleri ayrı sayılır (7. bölümün B1–B4'ü). Başka bölümün haritası LUT'la ya da yeniden giydirilerek kullanıldığında yeniden sayılmaz (6C ← 4B; 7'de 2B'nin kıyısı; 9'da 8C; 10'da 9C, 9D ve 8A). Set-piece'ler, Anlatılan Sahne şeritleri, tablolar, pano kompozisyonları, çerçeve ve epilog sabit kompozisyonları harita sayılmaz. Yedek: 7. bölümde B3'ün montaja çevrilmesi toplamı 23'e indirir.
- **Karo setleri** üretimde onları ilk kuran bölüme yazılır. 1. bölümün tabloları ve 2. bölümün kartları illüstrasyondur, karo seti değildir.
- **Adlandırılmış karakter:** Tavan, kendine özgü sprite seti ya da portresi olan karakterleri sayar; yaş varyantları ayrı varlıktır (Tamar: çocuk, yetişkin, yaşlı; Hulda: genç 1. bölümde, yaşlı 4. bölümden; Natan: bebek, yetişkin; İsa'nın annesi Meryem: 1. bölümde genç, 3. bölümde yetişkin; İsa: bebek, yetişkin; Yoram: genç, epilogda yaşlı portre). Bölümlerdeki 32 varlık: 1. bölümde çocuk Tamar, baba, Nahum, Yoaş, genç Hulda, bebek Natan, İsa'nın annesi (genç), Yusuf, bebek İsa, melek; çerçevede yaşlı Tamar ve Sara; ortak temelde yetişkin Tamar, İsa, Yoram, yaşlı Hulda; 2'de Yahya, Dositeos; 3'te İsa'nın annesi (yetişkin), Tirsa, Gad, Elişeva; 6'da Hananya, yetişkin Natan; 7'de Marta, Beytanyalı Meryem, Lazar, Şimi; 8'de Eldad, Atara; 9'da Şifra; 10'da iki adam. Epilogda 6 portre varyantı eklenir (yaşlı Yoram, Yoram'ın oğlu, Dositeos'un torunu, Samiriyeli kayıkçı, Hananya'nın torunu, Natan'ın torunu). Kalabalık kitinden türetilen adlı NPC'ler (kanonik olanlar dahil: Andreas, Petrus, Kireneli Simun, kanonik üç kadın) bu tavana girmez; "adlı kit NPC" olarak ayrı sayılır.
- **Animasyon dizisi sahipliği:** Her dizi onu ilk çizen bölümün sayımına yazılır; sonraki bölümler "yeniden kullanım" diye anar ve saymaz; her bölüm Tamar'ın yeni dizilerini adlarıyla listeler. Yetişkin Tamar'ın, İsa'nın, Yoram'ın ve yaşlı Hulda'nın temel setleri (bekleme, yürüyüş, seğirtme, oturma, uzanıp alma ve verme, konuşma jesti, testiden su içme) ile kalabalık kitinin temel döngüleri bölüm sayımlarına girmez; yukarıdaki "ortak temel setler" toplamında sayılır (≈26). Örnekler: 10. bölümde kandili üfleme, ip arşınlama ve kandili yere koyup alma 7. bölümündür; yetişkin Tamar'ın değnek ve ıslık dizileri ilk kez 6. bölümün yan hikâyesinde (Pinhas'ın Oğlağı) kullanıldığı için 6. bölümündür, 10. bölüm yeniden kullanır; 6. bölümde göl basamağındaki daldırma 2. bölümün testiyi suya daldırma dizisidir.
- **Önceden çizilmiş kompozisyonlar:** Motor yakınlaştırmaz, uzaklaştırmaz, döndürmez; yakın planlar, uzak kompozisyonlar ve gök görünümleri önceden elle çizilir ve ayrı kalemdir (§11.2).

### 16.2 Ekip

| Rol | Kişi |
|---|---|
| Yaratıcı yönetmen ve oyun tasarımcısı | 1 |
| Anlatı yazarı (Türkçe; kurulla irtibat) | 1 |
| Bulmaca ve seviye tasarımcısı | 1 |
| Programcı (motor ve araçlar; oynanış ve kalabalık) | 2 |
| Çevre sanatçısı | 1 |
| Karakter sanatçısı ve animatör | 1 + 1 tam zamanlı animatör |
| Yapımcı ve QA (yarı zamanlı QA desteğiyle) | 1 |
| Sözleşmeli: besteci, ses tasarımcısı, yerelleştirme, seslendirme | — |
| Yarı zamanlı: danışma kurulu (8 kişi) | — |

Kalabalık ve NPC gövde paketi gerekirse dış kaynağa verilir. Tablolar (8), Anlatılan Sahne kartları ve önceden çizilmiş gök görünümleri sözleşmeli bir illüstratöre verilebilir.

### 16.3 Kilometre taşları

| Ay | Aşama | Çıktı |
|---|---|---|
| 0–4 | Ön üretim | Kurulun kurulması; YC lisans görüşmesi; stil rehberi (İsa tasvir kuralları dahil); normal harita hattı kararı; Kavrayış kâğıt prototipi; **2–3 haftalık teknik keşif:** fırtına (su gölgelendiricisi, yumuşatılabilir ışık, silüetler); 150 ajan + impostor stres testi; LUT ve palet maskesi (9. bölümde örtülerin ve bilek ipliğinin rengi korunur, 10. bölümde maske kalkar); kitin örtü katmanı bu keşifte karara bağlanır |
| 5–9 | Dikey dilim | **Kana (3. bölüm), ≈35 dk:** Harita A (avlu, sokak, yokuş, kuyu) ve Harita B (kiler ve mutfak); Kiler Hesabı (Kavrayış tanıtımı) ve Altı Küp (imza bulmaca, Usta kısıtıyla); "Küpler ve kepçe" set-piece'i (Tamar ve İsa'nın 64×96 büyük sprite'ları); ~30 ajanlık dans halkası; gündüzden kandil ışığına LUT geçişi; suç ve sır seçimleri. Sofra Düzeni ve yan hikâye dilim dışında. "Celile köyü ve gölü" ile "iç mekân kiti" karo setleri burada kurulur; İsa'nın ve İsa'nın annesinin tasviri (§11.6) kurulla burada doğrulanır. 1. ya da 4. bölümden cilalı bir vitrin eklenmez |
| 9 | Karar kapısı | Kurulun ve oyun testlerinin geri bildirimi; bölümsel yayın kararı |
| 10–20 | Kitap 1: *Celile* (1–4) | Çıkış ~20. ay |
| 20–27 | Kitap 2: *Yol* (5–7) | |
| 27–35 | Kitap 3: *Yeruşalim* (8–10) | Tam sürüm ve Switch |

**Kitaplara göre sanat yükü:** Kitap 2 (5–7) harita ve animasyon bakımından en ağır kitaptır (9 harita, ≈138 dizi, iki Anlatılan Sahne şeridi, Lazar set-piece'i, 4 gök şeridi, 3 yakın plan; 7 ay). Kitap 3 (8–10) set-piece bakımından en ağırıdır (Golgota yamacı ve uzak kompozisyonu, 15 ekranlık şafak koşusu, 3 tablo, epilog) ve Switch sürümüyle aynı döneme düşer. Önlemler: Anlatılan Sahne karo seti ve silüet kiti Kitap 1 döneminde hazırlanır; 7. ve 10. bölümlerin gök çizimleri tek bir hatta üretilir; Golgota set-piece'i ve şafak koşusu metinleri kilitlenince Kitap 2 döneminde başlar ve koşu şeridi yinelenen modüllerle (çardak, dam saçağı, eşik, kapı) kurulur; tablolar, kartlar ve gök çizimleri sözleşmeli bir illüstratöre verilebilir.

Metin bölüm bölüm kilitlenir. Kurulun inceleme süresi bölüm başına 3 haftayla sınırlıdır ve kilitlenen metin sanat ve yerelleştirmeyle paralel ilerler. Böylece inceleme kritik yoldan çıkar.

### 16.4 Kesme listesi

| Öncelik | Kesilebilecekler |
|---|---|
| Önce | Yan hikâyeler 10 yerine 5; İbranice Hallel kaydı; İngilizce seslendirme (yalnızca altyazı) |
| Sonra | Yoram'ın fırtınası Anlatılan Sahne şeridine çevrilir (dönüş girdisi korunur); 6. bölümün domuz bulmacası 20 sn'lik montaja iner; tablolar 8 yerine 7 (9. bölümün Pilatus köprü tablosu; aktarım kalır); 7. bölümde Eriha yolunun B3 bölmesi montaja (harita 24 → 23); 10. bölümün koşusundaki Kayafa kapısı bölümü; 9. bölümde Kalabalıktaki Yüzler tek varyanta; epilog yuvaları 6 yerine 4 |
| Dokunulmaz | §2 kontrol listesi; 10 bölüm; Kana ve Lazar set-piece'leri; 9. bölümün ölçülülüğü, Kal'ı ve Şabat odası; 9. bölümde taşın kanaldan kayışı ve Cuma hatıraları (10. bölümün B2'si bunlara dayanır); 4. bölümün Kandil öğretimi (Sahne 11); 2. bölümün Şabat görüntüsü; erişilebilirlik çekirdeği (9. bölümün uzak kompozisyonu dahil) |

### 16.5 Riskler

| Risk | Etki | Önlem |
|---|---|---|
| İsa'nın tasviri yüzünden kamuoyu tepkisi (özellikle Türkiye'de) | Yüksek | Yüzsüz temsil, soyut yedek kip, açıklanmış ve kapsayıcı bir kurul, saygılı pazarlama |
| YC lisansının gecikmesi ya da reddedilmesi | Yüksek | İlk ayda görüşme; yakın aktarım planı hazır |
| Ton (vaaz gibi ya da fazla oyunsu) | Orta | Yazım kılavuzu; farklı inançlardan oyuncularla karma test grupları |
| Kalabalık teknolojisi | Orta | Üç katmanlı sistem; ön üretimde stres testi |
| Animasyon bütçesinin aşılması | Yüksek | 450 dizi tavanı; bölüm sayımlarıyla ≈425, pay ≈25; ortak dizi sahipliği kuralı (§16.1); tek oynanabilir yetişkin; aksiyon hücresi standardı |
| Kitap 2–3 sanat yoğunluğu | Orta | Anlatılan Sahne kiti Kitap 1'de; gök çizimleri tek hatta; Golgota ve şafak koşusu Kitap 2 döneminde başlar; koşu şeridi modüler; kesme listesi (§16.4) |
| El işlerinin tekrara düşmesi | Orta | §5.4 kuralları; oyun testi metrikleri |
| Kavrayış'ın kaba kuvvetle çözülmesi | Orta | Tipli boşluklar ve toplu doğrulama; telemetriyle deneme sayısı ölçülür |
| İlahiyat incelemesinin takvimi tıkaması | Orta | Bölüm bazında metin kilidi ve sabit inceleme ritmi |
| Niş pazar | Orta | İnanç temalı kitle ile piksel/indie kitlesi birlikte hedeflenir; bölümsel yayın |

---

## 17. Açık Sorular (kullanıcının kararı)

1. **Ad:** *Kandil — Yıldızdan Şafağa* mı, yoksa *Yıldızdan Şafağa* ya da *Tanık* mı?
2. **Kahraman:** Tek bir kadın tanık (Tamar) yapısı onaylanıyor mu? Yoksa birden çok tanıklı bir antoloji mi tercih edilir?
3. **İsa'nın görsel temsili:** Yüzsüz sprite mı (öneri; §11.6, dikey dilimde kurulla doğrulanır), yalnızca ışık ve gölge mi, yoksa hiç görünmemesi mi?
4. **Metin:** YC lisansı mı alınsın, yoksa baştan yakın aktarımla mı ilerlensin?
5. **Yaş derecelendirmesi:** PEGI 12 önerisi kabul ediliyor mu? Yoksa 7 için 1. ve 9. bölümlerin daha da yumuşatılması mı istenir?
6. **Bölümsel yayın:** Üç kitap mı, tek parça mı?
7. **Seslendirme:** Yalnızca yaşlı Tamar'ın anlatısı mı, hiç seslendirme olmaması mı?
8. **Danışma kurulu:** Hangi kişi ve kurumlarla temas kurulacak? Bütçesi ne kadar?
9. **Pazar:** Türkiye'de Müslüman oyunculara yönelik iletişim nasıl kurulacak? Açılış notunun son metni ne olacak?
10. **Hassas ayrıntılar:** Beytlehem'deki katliama yapılan ima bir tablo, bir yas cümlesi, uzaktan bir ağıt sesi ve ayet metniyle sınırlı kalacak mı (§2.2-E)? Matta 27:25'in kullanılmaması ve Hallel'in İbranice bir grup kaydıyla (solo yok, §12) söylenmesi onaylanıyor mu?
11. **Platform:** Switch ikinci dalgada mı? Takvimde Switch sürümü, set-piece yükü en ağır olan Kitap 3 ile aynı döneme düşüyor (§16.3); tam sürümle birlikte mi çıksın, yoksa sonraya mı kalsın? Mobil için dokunmatik girdi ön üretimde mi tasarlanmalı?
12. **Bütçe ve ekip:** 7–8 kişi ve 30–36 ay gerçekçi mi? Kalabalık ve NPC paketi dış kaynağa; tablolar, Anlatılan Sahne kartları ve gök çizimleri sözleşmeli bir illüstratöre verilebilir mi (§16.2)?
13. **Üretim payları:** Harita sayısı tavana tam oturuyor (24/24). 7. bölümdeki Eriha yolunun B3 bölmesi baştan montaja çevrilip pay açılsın mı (§16.1, §16.4)? Altıncı set-piece yuvası ve dört tablo yuvası pay olarak boş mu tutulsun, yoksa yeni sahnelere mi açılsın (§11.1, §11.5)?
14. **Kesme kararının zamanı:** Kesme listesinin "Sonra" grubuna hangi noktada geçilir: 9. aydaki karar kapısında mı, yoksa Kitap 1 çıktıktan sonra Kitap 2–3'ün sanat yükü ölçülünce mi (§16.3–16.4)?

---

## Ek A — Jüri maddelerinin izlenebilirliği

| Jüri | Madde (özet) | Çözüldüğü yer |
|---|---|---|
| Oynanış | Zorluk nerede durur; Usta kısıtları; ayarlanabilir zorluk | §6.1–6.2 |
| Oynanış | Bölüm bölüm zorluk eğrisi; 8 ve 10'da gerçek bulmaca | §6.3 |
| Oynanış | Kavrayış kaba kuvvete kapalı, dünyanın içinde | §5.3 |
| Oynanış | El işi QTE olmamalı, 2–3 dk, kararlı | §5.4 |
| Oynanış | Kutsal anlarda ödül ya da toplama yok | §7.1, §9 |
| Oynanış | Sonuçlar sahnede görünmeli; 3–4 uzun yay | §8.6–8.7 |
| Oynanış | Tempo bütçesi; 5 ve 6 ayrışmalı; yürüme ve geri dönüş | §4.1, §11.3, §14.1 |
| Oynanış | Bölüm başına en fazla 1 yeni fiil | §5.2 |
| Oynanış | Kahramanın yarası ve isteği; neden orada | §3.2, §3.4 |
| Oynanış | Girdi bir ifade; kanonik başarısızlık mekaniğe yüklenir | §7.1–7.2 |
| Oynanış | İlk oyun tek başına eksiksiz | §8.7, §9 |
| Oynanış | 2. ve 5. bölümlerde iyi/kötü sınavı yok | §8.8 |
| Oynanış | Tobiya ve Rut geçişi | Kaldırıldı: tek oynanabilir yetişkin (üretim jürisi önerisi); kadın tanıklığı Tamar'ın kendisinde |
| Oynanış | Kalabalık bulmacası okunaklı | §14.1 (4. bölüm), §11.5 |
| Sadakat | İsa'nın temsili ve yedek kip | §2.2-A, §11.6 |
| Sadakat | Kanonik kişilere uydurma söz yok; Emmaus somutlaştırılmaz; kanonik Meryemler için kurgusal konuşma yok | §2.2-A/C, §14.1 (3) |
| Sadakat | Sadakatsizlik içerikle ödüllendirilmez | §8.5 |
| Sadakat | Kanonik sıralama kilitleri | §2.2-B |
| Sadakat | Süslemelerin denetimi | §2.3 |
| Sadakat | Uyumlaştırma politikası; saat başlıkları | §2.3 |
| Sadakat | Benzetmelerin bütünlüğü; sahte seçim yok; Samiriyeli'nin ters köşesi | §8.6, §14.1 (5, 6) |
| Sadakat | Girdi mucizeyi değiştirmez | §2.2-B, §7.1 |
| Sadakat | Forrest Gump etkisinin sınırlanması | §3.4 |
| Sadakat | Antisemitizm; Matta 27:25 | §2.2-E |
| Sadakat | Müslüman oyuncular; ikrarlar; ikame tartışması | §2.2-C/E |
| Sadakat | Tarihsel doğruluk | §2.2-F |
| Sadakat | Hassas içerik; PEGI 12; Mecdelli Meryem | §1, §2.2-C/E |
| Sadakat | Efkaristiya sözleri | §2.2-E, §14.1 (8) |
| Sadakat | "Kalbinde saklayan" uç cezalandırılmaz | §8.2, §8.9 |
| Sadakat | YC lisansı; sözlük; İngilizce | §15 |
| Üretim | Dikey dilim: Kana ve ayrı teknik keşif | §16.3 |
| Üretim | Çözünürlük ve ölçek; aksiyon hücresi; mixel yasağı | §11.2 |
| Üretim | En fazla 3 görsel kip | §11.1 |
| Üretim | En fazla 6 yan görünüm set-piece; kurgu kesmesi | §11.1 |
| Üretim | Normal harita hattı; Switch bütçesi | §11.4 |
| Üretim | Animasyon tavanı; çocuk ve yaşlı sürümler; Rut | §11.2, §16.1, §3.1 |
| Üretim | Asimetrik ekipman | §11.2 |
| Üretim | 1. ve 4. bölümlerin kapsamı | §4.1, §14.1 |
| Üretim | Harita ve karo seti tavanı | §16.1 |
| Üretim | Metin hacmi; lisans; inceleme ritmi | §15.3, §16.3 |
| Üretim | Seslendirmenin sınırlanması | §12 |
| Üretim | Seçim varyantları animasyon üretmez | §8.9 |
| Üretim | Piksel kusursuz kamera; sinemaskop | §11.2 |
| Üretim | Türkçe piksel yazı tipi | §11.7 |
| Üretim | Girdi soyutlaması | §5 (giriş) |
| Üretim | İsa tasvir kuralları stil rehberinde | §11.6 |
| Üretim | Ekip yapısı; bölümsel yayın kararı | §16.2–16.3 |
