# KANDİL — Yıldızdan Şafağa

**Oyun Tasarım Belgesi (GDD)** · Sürüm 1.0 · Ekim 2026
**Aşama:** Tasarım (kod yok) · **Dil:** Türkçe (İngilizce yerelleştirme planlı)

> **Bu belge nasıl oluştu?** Panelin üç konseptinden genel puanda öne çıkan **Konsept C (Kandil)** temel alındı. Ondan şunlar geldi: az sayıda ama derinleşen fiil, tırmanma tablosu ve "yeni sistem eklenmez" disiplini. Kahraman, çerçeve hikâye ve kaynağa sadakat kuralları **Konsept A**'dan (Tamar) alındı, çünkü sadakat jürisi kanona en sağlam yerleşen kahramanın o olduğunu tespit etti. **Konsept B**'den en güçlü katılım fikirleri, dokunmama anları, danışma kurulunun yapısı ve arkeolojiye dayanan Kodeks aşılandı. Jürilerin "mutlaka ele alınmalı" (mustAddress) maddelerinin her biri bu belgede bir karar olarak karşılık buluyor. **Ek A**, her maddenin hangi bölümde çözüldüğünü gösterir. "Doğrulanmalı" etiketi, dış kaynak ya da danışman onayı bekleyen bilgileri işaretler.

---

## 1. Özet

| | |
|---|---|
| **Oyun adı** | *Kandil — Yıldızdan Şafağa* (çalışma adı; uluslararası çalışma adı *Lamplight*) |
| **Tür** | Anlatı odaklı bulmaca-macera ("story game"), modern ve detaylı piksel sanat |
| **Platform** | Önce PC (Steam), ikinci dalgada Switch; mobil daha sonra değerlendirilecek. Gamepad ve klavye/fare |
| **Süre** | Ana yol yaklaşık 7,5 saat (10 bölüm, bölüm başına 35–55 dk); isteğe bağlı yan hikâyelerle yaklaşık 8,5 saat |
| **Hedef kitle** | 10 yaş ve üstü genel kitle: aileler, inananlar, bu hikâyelere ve tarihe meraklı oyuncular, anlatı ve bulmaca oyunu sevenler |
| **Yaş derecelendirmesi** | Hedef **PEGI 12 / ESRB E10+** (gerekçesi aşağıda) |
| **Ekip ve takvim** | 7–8 çekirdek kişi ve sözleşmeliler; 30–36 ay. Üç kitaplık bölümsel yayın seçeneği var |

**Logline.** Beytlehem kırlarında meleklerin müjdesini duyan dokuz yaşındaki çoban kızı Tamar, otuz yıl sonra kırgın bir dul ve işten işe koşan bir gündelikçidir. Küpleri dolduran, sepetleri taşıyan, mezar taşının ipini çeken eller onunkidir; mucizeyi yapan ise asla o değildir. Oyuncu tarihi değiştirmez, bir kadının kalbini değiştirir.

**Kısa tanıtım.** *Kandil*, İncil'deki on olayı birinci yüzyıl Celile'si ve Yahudiye'sinde yaşamış kurgusal bir tanığın gözünden anlatır. Oyuncu İsa'yı hiçbir zaman yönetmez, O'nun sözlerini seçmez. Olayların çevresindeki *insan işini* yapar: sürü güder, su taşır, ip bağlar, kandili rüzgâra karşı korur, duyduklarını birleştirip bir sonuca varır. Beş temel sistem on bölüm boyunca birbirine eklenerek derinleşir. Seçimler kanonu değiştirmez; Tamar'ın ilişkilerini, anlayışını ve sonunda nasıl tanıklık edeceğini şekillendirir. Görsel dil yıldız ışığıyla başlar, kandil ışığıyla sürer, öğle karanlığından geçer ve şafakta oyunun ilk tam renkli paletine açılır.

**Neden PEGI 12?** Varsayılan hedef 7–12 aralığıydı. Beytlehem'deki çocukların öldürülmesine yapılan ima (yalnızca bir yas cümlesi ve bir tablo) ile çarmıh bölümü, en ölçülü anlatımla bile 7 etiketinin sınırlarını zorlar. Bu yüzden 12'yi hedefliyoruz; derecelendirme kuruluşlarının ön değerlendirmesi *doğrulanmalı*. Ailelere yönelik "birlikte oynanabilir" mesajı pazarlama üzerinden verilir.

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
- [ ] İsa'nın kişisel bir müzik motifi yoktur. O sahnedeyken müzik geri çekilir ve geriye tek bir uzun ton kalır.
- [ ] İsa, Tamar'a yalnızca metnin Tamar'ın içinde bulunduğu gruba söylediği sözlerle hitap eder: "Yeruşalim kızları" (Luka 23:28), toplanmış olanlara "Size esenlik olsun!" (Luka 24:36). Bunların dışında ilgisi jestle gösterilir: bir bakış, bir duraksama, uzatılan bir el.
- [ ] Kaydedilmemiş öğretiler somutlaştırılmaz. Örneğin Emmaus yolundaki açıklamanın içeriği (Luka 24:27) oyunda yer almaz.
- [ ] Yedek plan: Türkiye'deki danışmalar gerektirirse "yalnızca ışık ve gölge" biçiminde daha soyut bir temsil kipi hazır tutulur (§11.6).

**B. Kanon ve sıralama kilitleri**
- [ ] Kanonik olaylar hiçbir seçimle değişmez. Kanonu bozabilecek bir girdi oyunda **hiç yer almaz**: Yahuda'yı durduracak bir düğme yoktur. Oyuncuyu geri çeken yollar ve sahte seçimler de yasaktır.
- [ ] Küpler ancak "Küpleri suyla doldurun" (Yuhanna 2:7) buyruğundan sonra dolar. Şölen başkanı 2:9–10 boyunca habersiz kalır. Sırla ilgili seçim 2:10'dan sonra gelir.
- [ ] Taş, "Taşı kaldırın" (11:39) sözünden ve Marta'nın itirazından sonra kaldırılır. Marta her durumda Meryem'i çağırır (11:28).
- [ ] Yahuda her durumda gider. Petrus'un suda yürüyüşünün süresi sabittir ve oyuncunun girdisine bağlı değildir.
- [ ] Kadınlar her durumda boş mezarın haberini elçilere götürür (Luka 24:9–10). Tamar'ın kişisel sessizliği bu kanonik haberi engellemez.
- [ ] Oyuncunun girdisi hiçbir mucizenin kapsamını, süresini ya da biçimini değiştirmez.

**C. Kanonik kişiler**
- [ ] Meryem, Marta, Petrus, Mecdelli Meryem ve diğer kanonik kişiler kanonik anlarda yalnızca metindeki sözlerini söyler (kanonik replik kilidi).
- [ ] Kanonik bir kişi için yazılan her kurgusal satır (örneğin Marta'nın gündelik ticaret konuşması) kurul onayından geçer ve en aza indirilir. Meryem için kurgusal diyalog yazılmaz.
- [ ] İnanç ikrarları (Yuhanna 11:27; Matta 14:33) oyuncunun karakterinin ağzından çıkmaz, ne seçimle ne otomatik olarak. Bu sözler her zaman kanonik konuşanın alıntısı olarak duyulur.
- [ ] Mecdelli Meryem, Luka 7:37'deki "günahkâr kadın" ile ya da fahişe kalıbıyla asla karıştırılmaz.

**D. Seçim etiği**
- [ ] Sayısal bir iyilik/kötülük çubuğu yoktur. Eksenlerin iki ucu da metinden meşruiyet alır (§8).
- [ ] Hiçbir seçim sadakatsizliği içerikle ödüllendirmez. Kapıdaki soruya itiraf, inkâr ya da sessizlikle yanıt veren oyuncu aynı kanonik tanıklığa ulaşır (§8.5).
- [ ] "Sessiz kal" her diyalogda geçerli bir seçenektir. Sessizliği seçen oyuncu finalde eksik bir sonla cezalandırılmaz (Markos 16:8 ve Luka 2:19 kanonik uçlardır).
- [ ] "Makul gerekçeyle geçip gitmek" gibi seçenekler saygıyla yazılır. Oyun kimseyi azarlamaz.

**E. Hassasiyet**
- [ ] **Antisemitizme karşı:** İsa, Meryem, öğrenciler ve Tamar Yahudidir; Yahudi gelenekleri sevgiyle ve doğru biçimde gösterilir. Kalabalık hiçbir zaman "Yahudiler" diye genellenmez. Ferisiler, kâhinler ve Kayafa kendi kaygıları olan bireyler olarak yazılır (Yuhanna 11:48). İnfazı Roma gerçekleştirir. **Matta 27:25 oyunda kullanılmaz.** Yuhanna'dan yapılan alıntılarda "Yahudiler" ifadesi geçiyorsa bağlamı Kodeks'te açıklanır; ana sahnelerde Luka öncü metin olarak seçilmiştir (§2.3).
- [ ] **Müslüman oyuncular:** Açılış notu farklı yorumları anar: "Bu oyun İncillerdeki anlatıyı izler; farklı inanç gelenekleri bu olayları farklı yorumlar." Oyun polemiğe girmez. Kireneli Simun ya da Yahuda etrafında, ikame (şebbihe) tartışmasına malzeme olabilecek bir gizem kurulmaz.
- [ ] **Şiddet:** Beytlehem'deki katliam yalnızca bir yas cümlesi ve bir tabloyla anılır (Matta 2:18). Çarmıh silüet, ses ve tepkilerle anlatılır; çivi ve kan gösterilmez. Markos 14:51–52 oyunda yer almaz.
- [ ] **Efkaristiya sözleri** (Matta 26:26–28) kelimesi kelimesine ve bir tablo içinde verilir. Hiçbir geleneğin Efkaristiya teolojisini öne çıkaran bir yorum eklenmez; sahne "gizlice dinleme" biçiminde kurgulanmaz.

**F. Tarihsellik**
- [ ] Anakronizm yoktur. MS 44'ten önce Celile'de Roma lejyonerleri değil, bölge kralı Hirodes'in (Antipas) askerleri bulunur.
- [ ] Yalnızca gelenekte geçen ayrıntılar (müneccimlerin develeri gibi) Kodeks'te "geleneksel" diye işaretlenir. Mayalı ekmeği kandille arama geleneğinin kaynağı Mişna'dır (Pesahim 1:1); bu da notlanır.
- [ ] Kadınlarla erkeklerin ayrı alanlarda bulunması abartılmaz ve bir bulmaca mekaniğine dönüştürülmez.
- [ ] Köylü bir kadının okuryazar olduğu varsayılmaz: Tamar'ın tanıklığı sözlü olarak aktarılır.

**G. Süreç**
- [ ] **Danışma kurulu:** Rum Ortodoks, Ermeni Apostolik, Süryani, Katolik ve Protestan danışmanlar; bir Müslüman ilahiyatçı (yalnızca bir kültür danışmanı değil); bir İkinci Tapınak dönemi Yahudiliği uzmanı ve bir birinci yüzyıl tarihçisi.
- [ ] Her bölümün metni, sabit bir inceleme ritmiyle kuruldan geçtikten sonra kilitlenir (§16).

### 2.3 Müjdeler arası farklar için uyumlaştırma politikası

**Kural:** Her bölümün bir **öncü Müjdesi** vardır. Öncü Müjde ile çelişmeyen tamamlayıcı ayrıntılar başka Müjdelerden alınabilir. Çelişen ayrıntılarda (isim listeleri, saatler, kimin neyi önce gördüğü) yalnızca öncü Müjde izlenir. Farklılıklar Kodeks'te tarafsız notlarla açıklanır.

| Konu | Farklılık | Oyundaki karar |
|---|---|---|
| Son Akşam Yemeği'nin tarihi | Sinoptik İnciller: Fısıh yemeği (Markos 14:12). Yuhanna: Fısıh'tan önceki hazırlık günü (19:14) | 8. bölüm sinoptik çerçeveyi izler; fark Kodeks'te açıklanır |
| Çarmıhın saatleri | Markos 15:25 ve Yuhanna 19:14 farklı saatler verir | 9. bölümde Luka öncüdür. Yeni Çeviri saatleri günümüz saatine çevirdiği için bölüm başlıkları "altıncı saat" gibi ifadeler kullanmaz |
| Yüzbaşının sözü | Luka 23:47 ile Markos 15:39 farklıdır | Luka 23:47 kullanılır |
| Mezara giden kadınlar | Her Müjde farklı bir liste verir | Luka 24:10 izlenir; Tamar "öbür kadınlar" arasındadır |
| İsa'nın ilk görünmesi | Matta 28:9, Yuhanna 20:14 ve Luka 24:13 vd. | Tamar dirilmiş İsa'yı mezarda görmez. Onunla Luka 24:33–36'daki toplantıda, "onlarla birlikte olanlar" arasında karşılaşır |
| Vaftizde gökleri kimin gördüğü | Matta 3:16 ve Markos 1:10: İsa gördü. Yuhanna 1:32: Yahya tanıklık etti | Tamar suyun çevresindeki ışığı görür. Gökler, güvercin ve ses, Yahya'nın tanıklığı olarak Anlatılan Sahne kipinde verilir |
| Doğum anlatıları | Çobanlar Luka'da, müneccimler Matta'da | Çobanlar oynanır; müneccimler ve kaçış bir tablo olarak verilir |
| Metinde olmayan süslemeler | Fırtınada şimşek, suyun gözle görülür biçimde renk değiştirmesi, meleklerin "şarkı söylemesi" | Hiçbiri kullanılmaz. Fırtına rüzgâr ve dalgadır (Matta 14:24), melekler "Tanrı'yı övüyordu" (Luka 2:13), şarabın rengi gösterilmez |

---

## 3. Anlatı Çerçevesi ve Oyuncu Karakteri

### 3.1 Çerçeve: Mecdel, MS 67'den hemen önce

Roma ordusu Celile'ye ilerlemektedir; Mecdel (Tarichea) MS 67'de düşecektir (Kodeks'te notlanır). Kaçıştan önceki son gece seksen yaşındaki Tamar dokuma tezgâhının başında oturur ve torunu Sara'ya hikâyesini anlatır. Her bölüm Sara'nın bir sorusuyla açılır ve tezgâhta dokunan bir bantla kapanır. Çerçeve sahneleri kısadır (1–3 dk) ve sabit kompozisyonlarla, portrelerle kurulur: yaşlı Tamar'ın ayrı bir 8 yönlü yürüyüş seti yoktur. Sara okuryazar değildir; hikâyeyi ezberleyerek ve Mezmur 23'ü mırıldanarak taşır.

### 3.2 Tamar

Beytlehemli bir çobanın kızıdır. Kral Hirodes'in askerlerinin geldiği gece ailesi bebek kardeşi Natan'ı bir postun içine saklayıp Celile'ye kaçar. Babası yolun yorgunluğuyla birkaç yıl içinde ölür.

- **Yarası:** Tamar'ın kendi sözleriyle: "Melekler Tanrı'yı övdü, sonra askerler geldi." Kocası 2. bölümden bir yıl önce ateşli bir hastalıktan ölmüştür. Mecdel'deki tuzlu balık atölyesinin borcunu ödemek için atölyeyi kapatmış, gündelikçi aşçı ve hizmetli olarak çalışmaya başlamıştır.
- **İsteği:** Elinde kalanı korumak: oğlu Yoram, kardeşi Natan ve yaşlı annesi Hulda. Bunun yanında içine gömdüğü bir soru taşır: "O gece gördüğüm neydi?"
- **Neden gündelikçi?** Gündelikçilik tasarımın omurgasıdır. Her bölümde Tamar'a yeni bir iş düşer ve bu işler onu kanonun adını vermediği yerlere doğal biçimde yerleştirir: hizmet edenler, kalabalığa yardım eden kadınlar, ev hizmetlileri.
- **Neden bir kadın?** "Celile'den beri İsa'nın ardından gelen kadınlar" çarmıhı uzaktan izler (Luka 23:49), mezarın yerini görür (23:55) ve boş mezara gider. Boş mezara gidenler arasında adı verilmeyen "öbür kadınlar" da vardır (24:10). Luka 8:1–3 de İsa'yı kendi olanaklarıyla destekleyen kadınlardan söz eder. Tamar bu kadınlardan biridir; son bölümlerde orada bulunması metnin bıraktığı boşluğa yerleşir.

### 3.3 Yan kadro

| Karakter | Kim? | Uzun yay |
|---|---|---|
| **Yoram** | Tamar'ın 19 yaşındaki oğlu; Zebedi'nin teknelerinde gündelikçi (Markos 1:20) | 4. bölümde İsa'nın ardından gitmek ister; 8–10. bölümlerde yanıt bulur |
| **Natan** | Tamar'ın küçük kardeşi; mirasını alıp Dekapolis'e gitmiştir | 6. bölümde döner, eşikte bekler; 9. bölümde ve epilogda yankılanır |
| **Dositeos** | Samiriyeli bir tüccar; Tamar'ın rakibi | 2. bölümde Tamar'a kendiliğinden yardım eder; 5. bölümde kendisi yardıma muhtaçtır; epilogda torunu ortaya çıkar |
| **Hananya** | Mecdelli bir Ferisi; komşu ve dürüst bir adam | 6. bölümde büyük oğulun sorusunu taşır; epilogda torunu yeniden belirir |
| **Hulda** | Tamar'ın annesi | 6. bölümde Natan için sofrayı kurar |
| **Sara** | Torun; çerçevenin dinleyicisi | Epilogda hikâyeyi nasıl taşıyacağı belirlenir |
| **Marta** | Kanonik; Beytanyalı. Tamar onunla ticaret yapar | Replik kilidi geçerlidir; kurgusal satırları kurul onayından geçer |

### 3.4 On bölümde Tamar: neden orada, ne kadar yakın?

"Forrest Gump etkisini" sınırlamak için her olaya bir **erişim düzeyi** atanır. *Doğrudan:* Tamar oradadır. *Kalabalıkta:* kalabalığın içindedir. *Aktarılmış:* başka birinin anlatısından dinler. *Anlatılan Sahne:* olay ayet metniyle birlikte bir okuma olarak verilir ve tanıklık iddiası taşımaz.

| # | Yaş | Neden orada? | Erişim | İç yolculuk |
|---|---|---|---|---|
| 1 | 9 | Çobanlardan birinin kızıdır (Luka 2:8) | Doğrudan; müneccimler ve kaçış tabloyla | Hayret, ardından kayıp |
| 2 | 41 | Tövbe vaftizi için Şeria'ya gelir, hacı kampında aşçılık yapar | Kalabalıkta; gökler ve denenme Anlatılan Sahne'de | Kırgınlık |
| 3 | 41 | Kana'daki düğüne aşçı ve hizmetli olarak tutulmuştur | Doğrudan (hizmet edenler arasında, 2:9) | Meryem'in yüzünü tanır |
| 4 | 42 | Kalabalıkta yardım eden kadınlardandır (Matta 14:21) | Kalabalıkta; fırtına Yoram'ın anlatısından (Aktarılmış) | Korku ve bırakmak |
| 5 | 42 | Yeruşalim'e giden yolda İsa'yı izleyen kalabalıktadır (Luka 9:51; 10:25) | Kalabalıkta; benzetme Anlatılan Sahne'de | "Komşum kim?" |
| 6 | 43 | Vergi görevlileri ve günahkârlarla birlikte dinler (Luka 15:1) | Kalabalıkta; benzetme Anlatılan Sahne'de | Kıskançlık ve lütuf |
| 7 | 43 | Marta'nın ticaret dostudur; hastalık haberini İsa'ya götürür (Yuhanna 11:3) | Doğrudan (yas tutan komşular arasında, 11:19) | Yas ve öfke |
| 8 | 44 | Üst odalı evde gündelikçi aşçıdır (Markos 14:14–15) | Doğrudan (mutfak, merdiven); sofra sözleri tabloyla; Getsemani uzaktan; avlunun içine girmez | Yakınlık ve utanç |
| 9 | 44 | Uzakta duran kadınlarla birliktedir (Luka 23:49) | Uzaktan | Sadakat ve yas |
| 10 | 44 | Baharatlarla mezara giden "öbür kadınlar"dandır (24:10); akşam toplananlar arasındadır (24:33) | Doğrudan | Tanıklık |

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
| 1 | 8 | 12 | 8 | 7 | 35 | Müneccimler ve kaçış iki tablo |
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
| **Ez / Karıştır** | Havan ve tokmakla çalışılır, oranlar dengelenir: hamur, acı otlar, baharat | Ez: sağ çubuk daire + RT; Karıştır: yalnızca daire / Ez: fare daire + sol tık; Karıştır: yalnızca fare dairesi | 8 | 8, 9 | 8: oran ve parti kararı → 9: güneş batmadan baharat, tek karar |
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
- **Ton:** Yas evlerinde ve kutsal anlarda söz toplanmaz. Yas evi, yasın sürdüğü evdir (7. bölümde Marta'nın evi, 9–10. bölümlerde Şabat evi). Yas evinde söz saklanmaz: pratik ihtiyaçlar ihtiyaç simgesi olarak görünür (7) ya da tanıklık sözleri halkaya bildirimsiz düşer (10). 7. bölümde Kavrayış yas tutanların gündelik ihtiyaçlarıyla sınırlı kalır (kimin suya, kimin yere ihtiyacı var).
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
4. **Girdi bir ifadedir, sınav değil.** Hız, sıra, süre ve "önce kime" bilgileri puanlanmadan `ifade_` bayraklarına kaydedilir ve sonradan diyaloglarda ve epilogda yankılanır (§8). Kutsal eşiklerde hiçbir şey kaydedilmez. Kutsal eşik, kontrollerin çekildiği kanonik an ile kontrol geri gelene kadarki süredir (ör. 2:9'daki tadış, horoz ve Petrus'un ağlayışı, 23:46). Bu sürede `kol_` verilmez, `tan_` yazılmaz, söz toplanmaz. `tan_` pencereleri eşik başlamadan kapanır ya da kontrol döndükten sonra açılır. Benzetmenin içindeki el işi girdisi kutsal eşik sayılmaz (5. bölümde `b05_ifade_sargi`).
5. **Dokunmama anları:** En kutsal anlarda kontroller usulca geri çekilir. Bakış seçimi, koleksiyon sayacı ya da "kazandın" bildirimi yoktur. Bazı anlarda tek bir girdi kalır: başını kaldırmak.

**Dokunmama anlarının listesi:** meleklerin müjdesi, yemlik (1) · İsa'nın sudan çıkışı (2) · şölen başkanının tadışı (3) · ekmeğin kutsanması (4) · babanın oğluna koşup sarılması ve 15:28b–32 (6) · "Lazar, dışarı çık!" (7) · ayak yıkama ve sofra sözleri (8) · İsa'nın son sözü, 23:46 (9; 23:34 ve 23:43 sırasında Kal açık kalır) · boş mezar ve "Size esenlik olsun" (10). 5. bölümde dokunmama anı yoktur.

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
| 9 | Kalmak (Kal tutuşu) | Çarmıh (silüet, ses); dokunmama yalnızca 23:46 | **Hiçbir şey** | Tamar diz çöker, gözlerini kapar; ses ve metin sürer |
| 10 | Kaldıraç ve ip hazırlamak; yolu aydınlatmak; koşmak ve uğramak | Taş yuvarlanmıştır; dirilmiş İsa (dokunmama) | `b10_ifade_kosu_ugrak` | 20 sn'de Şifra seslenir, 40 sn'de Tamar kendiliğinden yürür; kendiliğinden geçilen yuvalar ifadeye yazılmaz |

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
   - **Söz:** *Anlatan ↔ Kalbinde Saklayan.* Çobanlar gördüklerini herkese anlattı (Luka 2:17–18); Meryem yüreğinde sakladı (2:19). Boş mezar sabahında da iki uç kanoniktir: Luka 24:9 ve Markos 16:8.
   - **El:** *Veren ↔ Koruyan.* Ailesini korumak da meşru bir yoldur.
   - **Kalp:** *Açan ↔ Taşıyan.* Yası ve öfkeyi dürüstçe taşımak da bir yoldur.
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
| `b01_haber` | `koye` / `babaya` / `kalbinde` | 1, yankı | 2, 3, 10, ep | 2'de "Tanrı Kuzusu" anındaki iç ses; 3'te Meryem'i tanıma cümlesi; 10'daki ilk cümle |
| `b02_ekmek` | `boldu` / `sakladi` | 2 | 4, ep | 4'te aynı çocuk kalabalıkta Tamar'a yer açar ya da ondan uzak durur |
| `b02_tedarikci` | `dositeos` / `saray_adami` | 2 | 3, 5 | 3'te suç kime yüklenirse yüklensin tedarikçinin adı geçer; 5'te Dositeos'un ilk cümlesi |
| `b03_suc` | `ustlendi` / `tedarikciye` | 3 | 5, ep | Dositeos tedarikçiyse ilişki değişir; şölen ekibinden bir dost 10'da yeniden görünür |
| `b03_sir` | `damada` / `hizmetkarlarla` / `kalbinde` | 3 (2:10 sonrası) | 4, 10 | 4'te Tamar'a inanan hizmetkâr dostlar kalabalıkta ona yardım eder; 10'da koşu sırasında karşısına çıkarlar |
| `b04_yoram` | `kutsadi` / `yasakladi` / `erteledi` | 4 | 7, 8, 9, 10, ep | Yoram'ın 7'de Beytanya'da İsa'yla gelip gelmediği; 9'da nerede durduğu; epilogda teknede olup olmadığı |
| `b04_ifade_ilk_sepet` | `yaslilar` / `cocuklar` / `dislananlar` / `ailesi` | 4 | 9, ep | 9'daki uzaktaki yüzler; epilogdaki tek satır |
| `b05_dositeos` | `yuk_birakti` / `para_gonderdi` / `gecti` | 5 | 7, 9, ep | 7'de Dositeos'un kervanı Tamar'a eşek verir ve gece yolu kısalır (ya da vermez); 9'da kalabalıkta; epilogda kurtarıcı |
| `b06_esik` | `girdi` / `disarida_konustu` / `gitti` | 6 | 9, ep | 9'da Natan Tamar'ın yanındadır ya da değildir; epilogda torunları ya da mektubu |
| `b07_kalp` | `acti` / `tasidi` | 7 | 8, 9 | 8'de Marta'nın Yeruşalim pazarında Tamar'a selamı; 9'daki iç ses |
| `b07_ifade_cozme_hizi` | `yavas` / `olagan` | 7 | ep | Yaşlı Tamar'ın anlatımındaki bir cümle |
| `b08_yahuda` | `kandil_uzatti` / `sordu` / `sustu` / `geri_cekildi` | 8 | 9, ep | 9'daki Şabat odasında hatıra metni |
| `b08_kapi` | `itiraf` / `inkar` / `sessiz` | 8 | 10, ep | 10'daki ilk cümleler; epilogda Sara'ya anlatıp anlatmama seçimi |
| `b09_yoram_soz` | `umut` / `sessiz_yakinlik` / `ofke_paylasti` | 9 | 10, ep | 10'da Yoram koşuya katılır ya da evde bekler |
| `b10_tanik` | `anlatti` / `kalbinde` | 10 | ep | Son sahnenin biçimi (iki biçim de tam bir sondur) |
| `eks_soz`, `eks_el`, `eks_kalp` | −3…+3 | her bölüm | dokuma bandı, ep | Bant deseni ve yaşlı Tamar'ın tonu |
| `ilis_yoram`, `ilis_natan`, `ilis_dositeos`, `ilis_hananya`, `ilis_marta` | `uzak` / `temkinli` / `yakin` | çeşitli | çeşitli | Selamlaşma, yerleşim, kalabalıktaki yüzler |

### 8.5 Eşit tanıklık ilkesi: kapıdaki soru

8. bölümde şafak sökerken Tamar, ev sahibinin testi taşıyan uşağıyla birlikte haber almak için Kayafa'nın konağının *dış kapısına* gelir; avluya girmez. Kapıdaki muhafız sorar: "Sen de onlardan değil misin?"
- **İtiraf:** Muhafız Tamar'ı kapıdan sokağın köşesine iter.
- **İnkâr:** Tamar kapıda kalır.
- **Sessiz kal:** Muhafız omuz silker.

**Her üç durumda da** Tamar horozun ötüşünü duyar ve Petrus'un kapıdan çıkıp acı acı ağladığını görür (Luka 22:60–62). Değişen yalnızca mesafe (köşeden ya da kapıdan), Tamar'ın iç sesi ve 10. bölümde kurabildiği cümlelerin tonudur. İçerik ödülü yoktur.

### 8.6 Uzun yaylar (sahne farkı üretenler)

1. **Dositeos (2 → 5 → 7 → 9 → epilog):** Benzetmenin ters köşesi korunur. *Önce Samiriyeli Tamar'a komşu olur:* 2. bölümün açılışında Tamar'ın arabasının dingili kırılınca Dositeos kendiliğinden yardım eder ve Tamar bunu reddedemez. 5. bölümde İsa'nın "Git, sen de öyle yap" sözünden sonra sıra Tamar'a gelir; yardım etmenin gerçek bir bedeli vardır (bayram pazarına yetişmesi gereken yük). Epilogda yaşlı Tamar'ı her durumda bir Samiriyeli kurtarır: Dositeos'un torunu ya da Tamar'ın tanımadığı bir kayıkçı. Böylece "komşu"nun kim olduğunu Tamar her yolda anlar.
2. **Yoram (4 → 7 → 8 → 9 → 10 → epilog).**
3. **Natan (1 → 6 → 9 → epilog):** Natan, 1. bölümde kurtarılan bebektir.
4. **Kapıdaki soru (8 → 10 → epilog).**
5. **Hananya (6 → epilog):** Kısa bir yay.

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
| Natan | Torunları yükleri taşır / ondan kalan bir mektup okunur (Hananya'nın torunu okur) | `b06_esik` |
| Sara hikâyeyi nasıl taşır? | Tamar'ın sözlerini ezberler / Mezmur 23'ü mırıldanarak dinler | `eks_soz` |
| Kapıdaki soru | Tamar inkârı Sara'ya anlatır mı? (Yalnızca `inkar` yolunda son bir seçim) / itiraf hatırası / sessizlik hatırası | `b08_kapi` |
| Son halı | On bandın oyuncuya özel kompozisyonu | Tüm eksenler |

Kaçış gecesi her yolda güvenle biter, çünkü lütuf temasında ceza yoktur.

---

## 9. İlerleme, Koleksiyonlar ve Kodeks

Seviye, tecrübe puanı ya da yetenek ağacı yoktur. İlerleme fiillerin birikmesi, ilişkiler ve halıdır.

- **Heybe (alet çantası):** Değnek (1), testi (2), söz halkası (3), kandil (4), ip (5), havan (8). Aletler hikâyeyle gelir, satın alınmaz.
- **Hatıra nesneleri (`kol_`):** Her bölümde 3–4 tane, toplam yaklaşık 35 (sapan, düğün kadehinin kırığı, sepetten bir saz parçası...). Çerçevede yaşlı Tamar her biri için tek cümlelik bir anı anlatır. Kutsal eşiklerde nesne bulunmaz.
- **Tanıklık ayrıntıları (`tan_`):** Örneğin İsa'nın ekmeği kutsarken göğe bakması (Markos 6:41) ya da "İsa ağladı" (Yuhanna 11:35). Sayaç, bildirim ya da "kaçırdın" uyarısı yoktur. Hatıralar sekmesinde düzyazı olarak sessizce belirir.
- **Yan hikâyeler:** Her bölümde mevcut haritayı kullanan, 5–8 dakikalık isteğe bağlı bir hikâye vardır. Örnekler: yaşlı çobanın kör koyunu (1), Kana'da gelinin kardeşinin kayıp bileziği (3), Beytanya'da yas tutan bir çocuğa eşlik etmek (7).
- **Ezgiler:** Duyulan müziklerden oluşan bir galeri.
- **Kodeks (yaklaşık 120 girdi):**
  - *Dönem:* Roma ve Hirodes yönetimi, sikkeler (dinar, lepton), taş arınma küpleri, düğün haftası, tuzlu balık ticareti, yas ve gömme gelenekleri, kaya mezarlar, Fısıh. Arkeolojik dayanaklar: alt katında hayvan bölmesi bulunan köy evi ve dolu misafir odası (Luka 2:7), Sezariye'deki Pilatus yazıtı, Kayafa'nın kemik sandığı, Celile teknesi, sofraya yaslanarak oturma (Yuhanna 13:23).
  - *Kutsal Metin:* Karşılaşılan her alıntı ayet referansıyla; Müjdeler arası farklar tarafsız notlarla (§2.3).
  - *Yerler ve Kişiler.* Kodeks tarihçilerin ve kurulun denetiminden geçer.

---

## 10. Arayüz / UX

- **Ana menü bir dokuma tezgâhıdır.** Bölümler halının bantlarından seçilir. Oyun bittiğinde her bant, o bölümün seçim dallarını sade bir akış şeması olarak gösterir.
- **Heybe (duraklatma menüsü):** Sekmeleri Hatıralar, İnsanlar, Sözler, Kutsal Metin, Dönem ve Harita'dır. Bir arayüz metaforudur, oyun dünyasında yazılı bir nesne değildir. İnsanlar sekmesinde ilişkiler düzyazıyla anlatılır.
- **Diyalog:** Ekranın altında esnek yükseklikte bir kutu vardır. Ana kadronun 3–5 ifadeli piksel portreleri kullanılır. **İsa ve Meryem için portre yoktur.** İsa'nın sözleri ayrı bir serif piksel yazı tipiyle, köşede ayet etiketiyle (kapatılabilir) ve yumuşak bir tonla belirir. Benzetmelerde İsa'nın anlatımı ekranın üst kısmında satır satır akar.
- **Söz halkası:** Kavrayış için, karakterin çevresinde dünyanın içinde açılır.
- **Harita:** Dönem üslubunda elle çizilmiş bir Celile–Samiriye–Yahudiye haritasıdır. Tamar'ın hayat yolu haritaya bir iplikle işlenir. Hedefler görev oku olarak değil, Tamar'ın düşünceleri olarak yazılır: "Konuklar gelmeden tulumları saymalıyım."
- **HUD:** Sağlık çubuğu ya da sayaç yoktur. Yalnızca bağlama göre beliren tuş göstergeleri vardır. Kandil yağı, kandilin alevinin boyuyla gösterilir.
- **Bölüm sonu:** Önce dokuma bandı, ardından isteğe bağlı Diğer Yollar ekranı.

---

## 11. Sanat Yönü

### 11.1 Perspektif ve görsel kipler (en fazla üç)

1. **3/4 ana kip:** Keşif, bulmaca ve kalabalık sahneleri. Alan gerektiren sürü, kalabalık ve rota bulmacaları için en iyi okunurluğu sağlar.
2. **Yan görünüm set-piece'leri (en fazla 6):** Kana'da küpler ve kepçe · Yoram'ın fırtınası · Lazar'ın mezar taşı ve çözme · kayıp oğulun eve dönüşü (Anlatılan Sahne üslubunda) · Golgota silüeti · şafak koşusu. Geçiş kesintisiz bir kamera numarasıyla değil, **kurgu kesmesi ya da silme efektiyle** yapılır. Her biri elle düzenlenmiş, tek seferlik bir sahne betiğidir.
3. **Anlatılan Sahne:** Sıcak parşömen zemin üzerinde silüet ağırlıklı bir "kandil gölgesi" üslubu. Bu kip benzetmeleri, Tamar'ın görmediği olayları (denenme, vaftizde açılan gökler) ve tabloları taşır. Ayrı mozaik, papirüs ya da fresk kipleri yoktur.

**HD-2D'ye itiraz:** Octopath tarzı 3B ortamlar 7–8 kişilik bir ekip için fazla pahalı. Onun yerine normal haritalı 2B sprite'lar, dinamik ışık, çok katmanlı paralaks ve tam sayı adımlı kamera kullanıyoruz.

### 11.2 Teknik ölçüler

| Öğe | Değer |
|---|---|
| İç çözünürlük | **640×360**: 720p'ye 2×, 1080p'ye 3×, 1440p'ye 4×, 4K'ya 6× tam sayı ölçekleme (Switch el modu dahil) |
| Karo | 16×16 |
| Yetişkin karakter | Yaklaşık 24×40 px figür, 32×48 hücrede |
| Çocuk Tamar | Yaklaşık 20×30 px; daraltılmış fiil seti (yürü, güt, kandil taşı, diz çök) |
| Aksiyon hücresi | 64×64: kol kaldırma, başta testi taşıma, ip çekme |
| Yan görünüm büyük sprite | 64×96; yalnızca Tamar, İsa (yüzsüz) ve Yoram için |
| Yön | Tamar 8 yönlü; NPC'ler ve kısa süre oynanan roller 4 yönlü |
| Palet | 64 renklik ana palet; bölüm başına 32 renklik alt küme |
| Sinemaskop | 2:1 oran; üstte ve altta 20'şer piksel bant (360 satırdan 320'si görünür kalır) |

**Kurallar:** Farklı piksel yoğunluklarının karıştırılması (mixel) yasaktır: motor içinde sprite döndürülmez ve ölçeklenmez. Yuvarlanan taş elle çizilmiş karelerle canlandırılır. Gerçek yakınlaştırma da yoktur: yakın planlar önceden çizilir. Kamera kaydırmalarında alt piksel titremesi, sahnenin önce bir dokuya çizilmesiyle (render-to-texture) önlenir. **Asimetrik ekipman** (kandil, değnek, testi) ayrı bir katmanda ve kare başına bağlantı noktalarıyla çizilir. Tamar'da sağ ve sol yönler ayna kopyası alınmadan ayrı çizilir.

### 11.3 Bölüm paletleri

| Bölüm | Anahtar renkler | Işık anahtarı |
|---|---|---|
| 1 | Çivit gece, gümüş, yıldız altını, kandil turuncusu | Tek ve güçlü bir ışık kaynağı (müjde) |
| 2 | Çöl okru, kireç taşı, Şeria turkuazı | Sert öğle güneşi, uzun gölgeler |
| 3 | Safran, keten beyazı; vurgu olarak tek bir nar/şarap kırmızısı | Gündüzden kandil ışığına geçiş |
| 4 | Bahar yeşili (Markos 6:39), göl mavisi, arduvaz grisi rüzgâr | Bulutlu ay ışığı (şimşek yok) |
| 5 | Parşömen sepyası, tek bir vurgu rengi (Samiriyelinin örtüsü) | Kandil gölgesi |
| 6 | Uzak diyarda soğuk mor; baba evinde sıcak kehribar | Palet ikiye bölünür |
| 7 | Kireç taşı beyazı, zeytin gümüşü, yas mavisi-grisi | Mağara karanlığı ve kapı ışığı |
| 8 | Kandil altını, gece laciverdi, meşale | Çok sayıda küçük ışık kaynağı |
| 9 | Renkler solar. Öğle karanlığında ekran neredeyse tek renktir; **yalnızca kadınların örtüleri renkli kalır** (LUT ve palet maskesiyle) | Işık çekilir |
| 10 | Mordan pembeye, pembeden altına dönen şafak: **64 rengin tamamı ilk kez** | Doğan güneş |

### 11.4 Işık ve animasyon

- Çevre ve Tamar için normal haritalar elle çizilir. NPC'ler ve kalabalık için normal haritalar otomatik üretilir ya da yalnızca kenar ışığı kullanılır.
- **Switch bütçesi:** Ekranda en fazla 8 dinamik ışık ve tek geçişli aydınlatma gölgelendiricisi. Hacimsel ışık yalnızca set-piece'lerde kullanılır.
- Vakte göre değişen renkler LUT'larla verilir. Toz, kıvılcım ve su için parçacıklar vardır. Gölde bir su gölgelendiricisi kullanılır.
- Yürüyüş 8 karedir. Karakterler dururken nefes alır, kumaşlar ikincil hareketle salınır. Fiil başına 6–12 kare çizilir.
- İsa'nın hareketleri sakin ve ağırbaşlıdır.

### 11.5 Ara sahneler ve kalabalık

- Ara sahneler oyun motorunda, sinemaskop bantlarla ve tam sayı adımlı kamera hareketleriyle yapılır. FMV kullanılmaz.
- **Tam ekran tablolar en fazla 12 tanedir:** müneccimler ve yıldız; gece yola çıkan aile ve Rama'daki ağıt (Matta 2:18); denenme triptiği; Kayafa'nın kurulu (Yuhanna 11:47–53); sofra sözleri (Matta 26:26–28); Pilatus'un önünde (Luka 23); mezara konuluş (Luka 23:53) ve diğerleri. Animasyonlu ara sahnelerin yerini tutarlar.
- **Kalabalık üç katmanlıdır:** önde yaklaşık 150 ajan, ortada impostor (uzaktan grup görüntüsü) ve arkada paralaks kalabalık katmanları. Kalabalık kiti 12 gövde, 8 kafa ve palet varyasyonlarından oluşur.

### 11.6 İsa'nın tasvir kuralları (stil rehberi)

- Sprite ölçeğinde yüz bölgesine **göz pikseli konmaz**; yüz örtü gölgesiyle ve saçla tek ton bir alan olarak çizilir.
- Kompozisyonlar arkadan, 3/4 arkadan ya da uzak planda kurulur. Yakın plan, portre ve hale yoktur. Büyük yan görünüm sprite'ında da yüz, ışığa karşı bir silüet olarak çizilir.
- **Yedek kip:** Gerekirse İsa'nın yalnızca ışık ve gölge olarak temsil edildiği soyut bir kip hazır tutulur. Bu kural dikey dilimdeki ilk mucize sahnesinde danışmanlarla doğrulanır.

### 11.7 Arayüz sanatı

Dokuma motifli çerçeveler ve kandil biçimli ipucu simgeleri kullanılır. **Türkçe piksel yazı tipi** büyük İ, Ş, Ğ, Ç, Ö, Ü için üst ve alt işaret payı bırakır; ı ve i ayrı çizilir. Disleksi dostu, piksel olmayan bir yazı tipi seçeneği de vardır. Diyalog kutuları esnek yüksekliklidir; Türkçe ve İngilizce metin uzunlukları baştan test edilir.

---

## 12. Ses ve Müzik

- **Ana tema Mezmur 23'tür ("Rab çobanımdır").** Çoban babanın küçük Tamar'a söylediği ninnidir. Lazar'ın yasında, Golgota'da ve şafakta farklı biçimlerde geri döner. Hem Hristiyan hem de Zebur'u onurlandıran Müslüman oyuncular için çatışmasız bir seçimdir.
- **Çalgılar:** Kinnor (lir), nevel (arp), halil (çift kamışlı nefesli), tof (def) ve kaval; duygusal doruklarda ölçülü yaylılar. Şofar yalnızca dinsel bağlamda kullanılır. Döneme ait olmayan makam sistemlerinden kaçınılır.
- **İsa'nın motifi yoktur.** O sahnedeyken müzik geri çekilir, tek bir uzun ton kalır ve dünyanın sesleri netleşir.
- **Uyarlanabilir müzik:** Katmanlar vakte ve kandilin ışık yoğunluğuna bağlıdır. 10. bölümdeki koşuda ayrı bir koşu katmanı açılır.
- **Sahnenin içinden gelen müzik:** Düğün dansları; Markos 14:26'daki ilahi (Hallel geleneği; İbranice kayıt danışman onayıyla, *doğrulanmalı*).
- **Ortam sesleri:** Koyun çanları, göl, rüzgâr ve Aramice kaydedilmiş pazar uğultusu. Askerlerin çivili sandaletlerinin sesi bir gerilim motifidir.
- **9. bölüm:** Müzik geri çekilir; geriye rüzgâr, nefes ve uzak sesler kalır.
- **Seslendirme:** İsa'nın sözleri yalnızca metindir. Yalnızca yaşlı Tamar'ın anlatısı seslendirilir (önce Türkçe, sonra İngilizce). Kayıt **metin kilidinden sonra** yapılır. Diğer karakterler kısa ses tepkileri kullanır.
- **Dokunsal geri bildirim:** Suyun akışı, ipin gerginliği ve toynak sesleri titreşimle desteklenir; hepsi ayarlanabilir.

---

## 13. Erişilebilirlik

| Alan | Özellikler |
|---|---|
| Bilişsel | Hikâye Modu (bulmacaları otomatik çözme), Rahat ayarı, Üç Işık ipucu sistemi, süresiz seçimler, kayıtlı hedef düşünceleri |
| Motor | Tüm tuşlar yeniden atanabilir; tek el ön ayarı; her "basılı tut" için aç/kapa; dairesel girdi yerine ←/→ dönüşümlü basma; tüm el işlerinde "otomatik" seçeneği |
| Görsel | Hiçbir anlam yalnızca renkle verilmez (şekil, desen ve simge de kullanılır); renk körlüğü modları; yazı boyutu ayarı; disleksi dostu yazı tipi; yüksek kontrastlı kenar ışığı |
| İşitsel | Konuşanın adını gösteren altyazılar; Kulak için görsel yön göstergesi; mono ses; yön belirten ses ipuçları |
| Işığa duyarlılık | Işık patlamalarını yumuşatma (müjde, şafak); ekran sarsıntısı ve hareket azaltma; titreşim ayarı |
| İçerik | 1. ve 9. bölümler için içerik bilgilendirmesi; 9. bölüm için "daha uzak kamera" ve tablolarla anlatılan bir özet seçeneği |
| Okuma | Arayüz için metin okuma; ara sahneler için sesli betimleme (yaşlı Tamar'ın anlatısıyla bütünleşik) |

---

## 14. Bölüm Haritası

| # | Başlık | Oynanabilir | Mekânlar | Odak mekanik | Yeni mekanik | İmza bulmaca | Katılım anı | Seçim teması | Zorluk | Süre |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Yıldızın Altında | Çocuk Tamar (9) | Beytlehem kırları, ağıl, Beytlehem köyü | Güt, Bakış | Güt | Teraslı yamaçta gece sürüsünü ağıla indirmek | Müjde ve yemlik (dokunmama) | Anlatmak mı, saklamak mı? | 1 | 35 |
| 2 | Irmak ve Çöl | Tamar (41) | Şeria kıyısı, hacı kampı, çöl kenarı | Taşı/Dök, Bekleyiş | Taşı/Dök | Kırk günlük erzakı dört adıma bölmek | Vaftiz; başını kaldırmak | Vermek mi, korumak mı? | 2 | 40 |
| 3 | Altı Taş Küp | Tamar | Kana'da düğün evi: avlu, kiler, kuyu | Kavrayış, Taşı, Güt | Kulak ve Kavrayış | Hizmetkâr zinciriyle altı küp | Kepçeyi şölen başkanına taşımak | Suç ve sır | 2,5 | 40 |
| 4 | Ekmek ve Rüzgâr | Tamar; Yoram (anlatı) | Issız yamaç, Gennesaret kıyısı, tekne | Güt, Taşı, Kandil | Kandil | Kalabalığı yüzer ve ellişer kişilik gruplara oturtmak | Ekmek dağıtmak; Yoram'ın fırtınası | Oğlunu bırakmak | 3 | 55 |
| 5 | Yolda Biri | Tamar; benzetmede yaralı yolcu ve Samiriyeli | Yeruşalim yolu; Eriha yolu (yan şerit); han | El (Dök, Bağla), Taşı | Bağla/Çöz | Sargı sırası ve oranı; yük dengesi | Yaralının bakışı; "Git, sen de öyle yap" | Komşum kim? | 3 | 40 |
| 6 | Eşikte | Tamar; benzetmede küçük ve büyük oğul | Celile'de bir avlu; baba evi, uzak diyar; Mecdel | Kavrayış, Güt (tersine) | — | Miras paylaşımı ve domuzlar | Eve dönüş; konuşmanın kesilmesi | Kapıda durmak | 3,5 | 55 |
| 7 | Dördüncü Gün | Tamar (43) | Beytanya: Marta'nın evi, zeytin işliği, kaya mezar; gece yolu | Bakış, Kandil, Bekleyiş, Güt, Bağla | — | Yıldızlarla gece yolu; yas evinde dört gün | Taşı çekmek; yüz örtüsünü çözmek | Yası açmak mı, taşımak mı? | 4 | 50 |
| 8 | Gece İdi | Tamar (44) | Yeruşalim'de üst odalı ev, sokaklar, Kayafa'nın dış kapısı | Kandil, Kavrayış, Ez | Ez/Karıştır | Kandille maya araması; sofra düzeni | Leğen; merdivende Yahuda; kapıdaki soru | Sadakat ve korku | 4 | 55 |
| 9 | Uzaktan | Tamar | Çarmıh yolu, Golgota'ya bakan yamaç, mezar bahçesi, ev | Kal, Güt (tersine), Ez | — | Yok (bilinçli olarak) | Uzakta durmak; Şabat | Kalmak ve teselli | 1 | 35 |
| 10 | İlk Günün Şafağı | Tamar | Karanlık ev, kapalı sokaklar, mezar bahçesi, toplantı odası | Bağla, Kandil, Kavrayış | Koşu | Kaldıraç düzeneği; bahçeye yol | Boş mezar; "Size esenlik olsun" | Nasıl tanıklık edeceksin? | 3 | 45 |

### 14.1 Bölüm özetleri

**1. Yıldızın Altında** (Luka 2:1–20; Matta 2 tabloyla). Gece, teraslı bir yamaçta babası Tamar'a gütmeyi öğretir. Tamar meleme sesinin yönünü Bakış'la izler, kayıp kuzuyu bulur ve sürüyü ağıla indirir. Aha anı: koyunlar değneği değil, babasının kandilinin ışığını izler. Ardından müjde gelir: "Korkmayın!" (2:10). Işık patlar, kontroller usulca çekilir. Nüfus sayımıyla dolup taşan Beytlehem'de Tamar çevreyi okuyarak doğru kapıyı bulur: dolu misafir odaları, alt katında hayvan barındıran evler, taze saman izi. Yemlikte bebeğin başında dokunmama anı yaşanır. Yankı: Tamar gördüklerini köye mi, babasına mı anlatacak, yoksa kalbinde mi saklayacak? Bölüm iki tabloyla kapanır: müneccimler (yolu yıldız gösterir, Matta 2:9) ve gece yola çıkan aile. Sonra uzaktan gelen bir ağıt duyulur, ekrana Matta 2:18 yazılır ve Tamar'ın ailesi bebek Natan'la kaçar.

**2. Irmak ve Çöl** (Matta 3–4; Luka 3:10–14; Yuhanna 1:28–40). Otuz iki yıl geçmiştir. Açılışta Tamar'ın arabasının dingili kırılır ve Samiriyeli Dositeos kendiliğinden yardım eder. Tamar, Şeria'nın ötesindeki hacı kampında aşçıdır. Irmaktan kampa su taşır (Taşı/Dök) ve kıt erzakı dört "hafta" adımına böler (Bekleyiş). Kısıtlar ekranda görünür: un, su, hasta hacılar, gelecek kervan. Kalabalık Yahya'ya "Ne yapalım?" diye sorar (Luka 3:10). İsa vaftiz olur. Tamar'ın tek girdisi başını kaldırmaktır; çocukken yıldıza bakarken yaptığı hareketin aynısıdır. Gökler, güvercin ve ses, Yahya'nın tanıklığı olarak Anlatılan Sahne'de verilir. Denenme bir triptik tabloyla anlatılır (Matta 4:4, 7, 10); ayartıcı yalnızca gölge ve sestir. Doruk, "İşte Tanrı Kuzusu!" sözüdür (Yuhanna 1:36). Eski çoban kızı "kuzu" sözünde irkilir ve Andreas'ın İsa'nın ardından gidişini görür.

**3. Altı Taş Küp** (Yuhanna 2:1–11). Tamar düğün evine tutulmuştur. Kiler hesabı bir Kavrayış cümlesiyle çözülür: tulum sayısı, konuk sayısı ve düğünün kaçıncı günü olduğu. Tamar şarabın yetmeyeceğini önceden anlar, ama bunu fark edip İsa'ya söyleyen Meryem'dir (2:3). Tamar yalnızca oturma düzeniyle utancı geciktirebilir. Meryem: "O size ne derse onu yapın" (2:5). İsa: "Küpleri suyla doldurun" (2:7). İmza bulmaca burada başlar: uzak bir kuyu, üç boy testi, dans eden bir avlu ve hizmetkâr zinciri. Usta kısıtı en fazla 9 yolculuktur. Yan görünümde Tamar kepçeyi şölen başkanına taşır. Suyun rengi gösterilmez; başkan tadarken kontroller çekilir. Tamar'ın Meryem'i tanıması yalnızca bir iç sestir; aralarında konuşma geçmez. Yankı: şarap eksikliğinin suçunu üstlenmek ya da tedarikçiye yüklemek. Ardından, 2:10'dan sonra, sırrı damada söylemek, hizmetkârlarla paylaşmak ya da kalbinde saklamak.

**4. Ekmek ve Rüzgâr** (Matta 14:13–33; Markos 6:39–41; Yuhanna 6:5–13). Gündüz, yeşil yamaçta kalabalık yüzer ve ellişer kişilik gruplara oturtulur. Kısıtlar simgelerle görünür: bölünmeyecek aileler, gölgeye ihtiyacı olan yaşlılar, yola yakın oturması gereken hastalar. Bir grup doğru yerleşince oturma animasyonu ve onay simgesi belirir. Tamar, Kulak ile beş arpa ekmeği ve iki balığı olan çocuğu bulup Andreas'a ulaştırır. Ekmeğin kutsanması bir dokunmama anıdır. Dağıtımda ilk sepet kime uzatılır? Sepet boşalmaz ama bu bir efektle gösterilmez. Ardından on iki sepet artık toplanır. Gece Tamar Gennesaret kıyısında işaret kandilini rüzgâra karşı korur (Kandil tam sistemi; şimşek yok). Sabah Yoram gelir ve anlatır: **Yoram'ın Anlatısı** yan görünümde oynanır. Su boşaltılır, tekne dengede tutulur, su her durumda kazanır. Petrus'un yürüyüşü sabit bir sinematiktir. Oyuncunun tek girdisi "Ya Rab, kurtar beni!" çığlığına dönmektir. İsa tekneye binince rüzgâr diner (14:32). Teknedekilerin tanıklığı Yoram'ın aktardığı bir alıntıdır. Yankı: Yoram İsa'nın ardından gitmek ister. Tamar onu kutsayacak, yasaklayacak ya da kararı erteleyecektir.

**5. Yolda Biri** (Luka 10:25–37). Tamar Yeruşalim'e giden kalabalıktadır. Kutsal Yasa uzmanı soruyu sorar ve benzetme başlar: Anlatılan Sahne'de Eriha'ya inen yan şerit. Oyuncu önce yaralı yolcudur; hareket edemez, yalnızca bakabilir ve zayıfça seslenebilir. Kâhin ve Levili geçip gider. Arınma kaygıları alay edilmeden Kodeks'e bağlanır. Sonra oyuncu Samiriyeli olur. Yol yalnızca yaralıya çıkar, çünkü "geçip gitme" girdisi hiç yoktur. Yara şarapla temizlenir, yağla yatıştırılır ve sarılır (sıra ve oran kararı, Bağla/Çöz tanıtımı). Yaralı eşeğe dengeli biçimde yüklenir, virajlarda dengede tutulur ve handa iki dinar ödenir. Yasa uzmanı "Ona acıyan" yanıtını verir, İsa da "Git, sen de öyle yap" der. Yankı: dönüş yolunda, 2. bölümde Tamar'a yardım etmiş olan Dositeos yol kenarında ateşler içinde yatmaktadır ve arabasının dingili kırıktır. Seçenekler: yükü bırakmak, para ve haber göndermek ya da makul bir gerekçeyle geçip gitmek.

**6. Eşikte** (Luka 15). Bir avluda vergi görevlileri ve günahkârlar vardır. Tamar'ın yanında Ferisi komşusu Hananya durur ve söylenir (15:2); büyük oğulun sorusunu taşıyan, saygıyla yazılmış bir karakterdir. Kayıp koyun 30 saniyelik bir anıyla (1. bölümün varlıklarıyla) ve kayıp para kısa bir tabloyla geçilir. Kayıp oğul Anlatılan Sahne'de 3/4 görünümde oynanır; palet uzak diyarda soğuk, baba evinde sıcaktır. Miras paylaşımı bir bulmacadır: büyük oğula iki pay düşer (Yasanın Tekrarı 21:17) ve bölünemeyen mallar vardır. Uzak diyarda kıtlık gelir; domuzlar ıslığa uymaz (tersine Güt), keçiboynuzunun kokusuyla yönlendirilirler. Oğul "aklı başına gelince" (15:17) yolda babasına söyleyeceği sözleri Kavrayış cümlesiyle kurar. Baba koşup sarılır ve konuşma "beni gündelikçilerinden biri gibi kabul et" cümlesine gelmeden kesilir (15:19–22). Mekanik lütufla bozulur. Büyük oğul tarladan döner ve müziği duyar. Baba dışarı çıkar ve onunla konuşur. Benzetme 15:32'de babanın sözleriyle açık biter; bu sırada oyuncunun hiçbir girdisi yoktur. Yankı: Mecdel'de Natan dönmüştür ve annesi sofra kurmuştur. Tamar kapıdadır: içeri girebilir, dışarıda Natan'la konuşabilir ya da çekip gidebilir.

**7. Dördüncü Gün** (Yuhanna 11:1–53). Lazar hastadır. Tamar haberi gece vakti Şeria'nın ötesine (10:40), yani 2. bölümdeki ırmağa götürür. Yol, babasının 1. bölümde gösterdiği yıldızlarla bulunur ve kandil yağı sınırlıdır. Dositeos 5. bölümde yardım gördüyse onun kervanı Tamar'a bir eşek verir. Tamar "Bu hastalık ölümle sonuçlanmayacak" (11:4) sözüyle döner, ama Lazar ölmüştür. Yas evinde dört gün sınırlı su, ekmek ve yerle geçer (Bekleyiş). Tamar zeytin işliğinde taş itmeyi öğrenir. Marta İsa'yı karşılamaya koşar ve kanonik sözlerini söyler; ikrarı (11:27) Marta'nın alıntısı olarak duyulur. Marta her durumda Meryem'i çağırır. "Taşı kaldırın" (11:39), Marta itiraz eder ve ardından ip takımına ritim verilir (Güt ve Bağla). "Lazar, dışarı çık!" bir dokunmama anıdır. "Onu çözün" üzerine Tamar yüz örtüsünü sağ çubuğu yavaşça döndürerek açar. Yankı: Getirdiği umut sözü boşa çıkmış gibi görünürken yaşadığı öfkeyi ve yası Marta'ya açmak ya da içinde taşımak. Bölüm, Kayafa'nın kuruluna ait bir tabloyla kapanır (11:47–53).

**8. Gece İdi** (Markos 14:12–26; Yuhanna 13:1–30; Luka 22:54–62). Tamar üst odalı evde gündelikçi aşçıdır; testi taşıyan uşak (Markos 14:13) onun iş arkadaşıdır. Maya araması kandil ışığında yapılır: sözlerden ekmeğin nerede yendiği çıkarılır ve kırıntının gölgesi ancak kandil yere yakın tutulunca görünür. Mayasız hamur ve acı otlar hazırlanır (Ez/Karıştır tanıtımı). On üç kişilik sofra yaslanarak oturulacak biçimde düzenlenir ve leğenin yeri belirlenir. Hazırlık sırası vakitlere bölünür. Tamar leğeni ve havluyu kapıya getirir; hizmetkârın işini İsa üstlenir (13:4–5). Sofra sözleri bir tablodur. Merdivende kandille duran Tamar, dışarı çıkan Yahuda'yla karşılaşır: kandili uzatabilir, bir şey sorabilir, susabilir ya da geri çekilebilir. Yahuda her durumda gider. Damdan, Kidron'un ötesinde meşaleler uzak bir silüet olarak görünür. Şafakta kapıdaki soru sorulur (§8.5).

**9. Uzaktan** (Luka 23:26–56; Markos 15:21). Bilinçli olarak bulmaca yoktur. Kalabalık Tamar'ı sürükler (4. bölümün tersine). Yeruşalim kızları arasında Tamar, İsa'nın onlara dönüp söylediği sözleri duyar (23:28) ve Kireneli Simun'u görür. Golgota'da kadınlarla birlikte uzakta durur. Çarmıha germe anında kalabalık görüşü kapatır, ardından gökyüzüne karşı üç silüet belirir. Öğle karanlığında renkler çekilir; yalnızca kadınların örtüleri renkli kalır. Oyuncunun tek eylemi **Kal** tutuşudur. Tuşu bırakmanın cezası yoktur ve hiçbir şey kaydedilmez. İsa'nın son sözleri yalnızca metin olarak verilir, ardından yüzbaşının sözü gelir (23:47). Kalabalıktaki Yüzler önceki seçimleri yansıtır. Mezarın yeri görülür (23:55) ve güneş batmadan baharat dövülür (23:56). **Şabat:** iş yapmak yasaktır. Oyuncu yalnızca evin tek odasında Hatıra nesneleri arasında dolaşır; metinler seçimlere göre değişir. Yankı: "Her şey bitti" diyen Yoram'a umut, sessiz yakınlık ya da paylaşılan öfke.

**10. İlk Günün Şafağı** (Luka 24:1–43; Markos 16:3). Karanlıkta "Taşı kim yuvarlayacak?" sorusu sorulur. Tamar uyuyan evde sessizce 7. bölümdeki kaldıraç ve ip düzeneğini hazırlar: ip uzunluğu, destek noktası ve kaç kişi gerektiği. Kapıları kapalı sokaklarda kandil ve yıldızla bahçeye yol bulunur. Mezara varıldığında taş çoktan yuvarlanmıştır; öğrenilen beceri mucizenin önünde boşa çıkar. İki adam: "Neden diriyi ölüler arasında arıyorsunuz?" (24:5). **Koşu ilk kez açılır:** şafak koşusu oyunun ilk tam renkli anıdır. Yolda Kalabalıktaki Yüzler'e rastlanır. Kadınlar elçilere haber verir; elçiler inanmaz (24:11) ve Petrus mezara koşar. Tamar'ın kişisel tanıklığı seçime bağlıdır: anlatmak ya da kalbinde taşımak. İki yol da tam bir sondur. Akşam Tamar toplananlar arasındadır (24:33). İsa ortalarında belirir: "Size esenlik olsun!" (24:36). Oyuncunun tek girdisi başını kaldırmaktır. Ardından çerçevede Sara'yla son sahne ve epilog gelir.

---

## 15. Metin Kullanımı ve Yerelleştirme

### 15.1 İsa'nın sözleri nasıl verilir?

1. **Kaynak:** Öncelik *Kutsal Kitap Yeni Çeviri* (YC) metnidir. Kelimesi kelimesine alıntı yalnızca lisans alındıktan sonra yapılır.
2. **Lisans alınamazsa:** Kurulun onayladığı yakın aktarım kullanılır. Yakın aktarım YC'nin sözlüğünü korur, anlamı genişletmez ve Kodeks'te "yakın aktarım" diye işaretlenir.
3. **Referans:** Her satırın köşesinde bir ayet etiketi bulunur (kapatılabilir).
4. **Birleştirme yasağı:** Farklı Müjdelerden gelen cümleler tek bir replikte birleştirilmez.
5. **Sözlük tutarlılığı:** "şölen başkanı" (kâhya değil); "Kutsal Yasa uzmanı"; "bölge kralı Hirodes" (Antipas) ile "Kral Hirodes" (Büyük Hirodes) ayrımı; "Fısıh Bayramı", "Mayasız Ekmek Bayramı". Saatlerde YC'nin günümüz saati karşılıkları kullanılır.
6. **Alıntı denetimi:** Bu belgedeki bütün alıntılar tasarım referansıdır. Metin kilidinden önce her biri YC ile tek tek karşılaştırılmalıdır (*doğrulanmalı*; örneğin Yuhanna 13:30'un YC'deki tam ifadesi).

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
| Haritalar | 22–24 | Emmaus ve Antakya yok; çerçeve tek bir sabit sahne |
| Karo setleri | 6 | Yahudiye kırsalı; Celile köyü ve gölü; çöl ve ırmak; Yeruşalim; iç mekân kiti; Anlatılan Sahne |
| Adlandırılmış karakter | ~35, bunların ~22'si portreli | Konuşan öğrenci en fazla 6 |
| Kalabalık kiti | 12 gövde × 8 kafa × palet | 4 yönlü |
| Animasyon dizisi | **380–420, tavan 450** | Yetişkin Tamar ~90, çocuk Tamar ~25, İsa 12, Yoram ~20, büyük hücre ve yan görünüm ~45, NPC ve kalabalık ~200 |
| Yan görünüm set-piece | 6 | §11.1 |
| Tablo | ≤12 | |
| Portre | ~22 × 3–5 ifade | İsa ve Meryem için yok |
| Metin | 60–75 bin kelime | |
| Seslendirme | ~8 bin kelime anlatıcı (TR + EN) | Metin kilidinden sonra kayıt |
| Müzik | ~75 dk, ~30 parça | |
| Ses efekti | ~600 | |

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

Kalabalık ve NPC gövde paketi gerekirse dış kaynağa verilir.

### 16.3 Kilometre taşları

| Ay | Aşama | Çıktı |
|---|---|---|
| 0–4 | Ön üretim | Kurulun kurulması; YC lisans görüşmesi; stil rehberi (İsa tasvir kuralları dahil); normal harita hattı kararı; Kavrayış kâğıt prototipi; **2–3 haftalık teknik keşif:** fırtına (su gölgelendiricisi, yumuşatılabilir ışık, silüetler) ve 150 ajan + impostor stres testi |
| 5–9 | Dikey dilim | **Kana (3. bölüm), 25–35 dk:** tek mekân, tek kuyu, gündüzden kandil ışığına geçiş, ~30 ajanlık kalabalık, tek yan görünüm katılım anı (küpler ve kepçe), Kavrayış'ın hafif sürümü, tek sır seçimi. 1. ya da 4. bölümden cilalı bir vitrin eklenmez |
| 9 | Karar kapısı | Kurulun ve oyun testlerinin geri bildirimi; bölümsel yayın kararı |
| 10–20 | Kitap 1: *Celile* (1–4) | Çıkış ~20. ay |
| 20–27 | Kitap 2: *Yol* (5–7) | |
| 27–35 | Kitap 3: *Yeruşalim* (8–10) | Tam sürüm ve Switch |

Metin bölüm bölüm kilitlenir. Kurulun inceleme süresi bölüm başına 3 haftayla sınırlıdır ve kilitlenen metin sanat ve yerelleştirmeyle paralel ilerler. Böylece inceleme kritik yoldan çıkar.

### 16.4 Kesme listesi

| Öncelik | Kesilebilecekler |
|---|---|
| Önce | Yan hikâyeler 10 yerine 5; İbranice Hallel kaydı; İngilizce seslendirme (yalnızca altyazı) |
| Sonra | Yoram'ın fırtınası Anlatılan Sahne'ye çevrilir; 6. bölümdeki domuz bulmacası; tablolar 12 yerine 8; epilog yuvaları 6 yerine 4 |
| Dokunulmaz | §2 kontrol listesi; 10 bölüm; Kana ve Lazar set-piece'leri; 9. bölümün ölçülülüğü; erişilebilirlik çekirdeği |

### 16.5 Riskler

| Risk | Etki | Önlem |
|---|---|---|
| İsa'nın tasviri yüzünden kamuoyu tepkisi (özellikle Türkiye'de) | Yüksek | Yüzsüz temsil, soyut yedek kip, açıklanmış ve kapsayıcı bir kurul, saygılı pazarlama |
| YC lisansının gecikmesi ya da reddedilmesi | Yüksek | İlk ayda görüşme; yakın aktarım planı hazır |
| Ton (vaaz gibi ya da fazla oyunsu) | Orta | Yazım kılavuzu; farklı inançlardan oyuncularla karma test grupları |
| Kalabalık teknolojisi | Orta | Üç katmanlı sistem; ön üretimde stres testi |
| Animasyon bütçesinin aşılması | Yüksek | 450 dizi tavanı; tek oynanabilir yetişkin; aksiyon hücresi standardı |
| El işlerinin tekrara düşmesi | Orta | §5.4 kuralları; oyun testi metrikleri |
| Kavrayış'ın kaba kuvvetle çözülmesi | Orta | Tipli boşluklar ve toplu doğrulama; telemetriyle deneme sayısı ölçülür |
| İlahiyat incelemesinin takvimi tıkaması | Orta | Bölüm bazında metin kilidi ve sabit inceleme ritmi |
| Niş pazar | Orta | İnanç temalı kitle ile piksel/indie kitlesi birlikte hedeflenir; bölümsel yayın |

---

## 17. Açık Sorular (kullanıcının kararı)

1. **Ad:** *Kandil — Yıldızdan Şafağa* mı, yoksa *Yıldızdan Şafağa* ya da *Tanık* mı?
2. **Kahraman:** Tek bir kadın tanık (Tamar) yapısı onaylanıyor mu? Yoksa birden çok tanıklı bir antoloji mi tercih edilir?
3. **İsa'nın görsel temsili:** Yüzsüz sprite mı (öneri), yalnızca ışık ve gölge mi, yoksa hiç görünmemesi mi?
4. **Metin:** YC lisansı mı alınsın, yoksa baştan yakın aktarımla mı ilerlensin?
5. **Yaş derecelendirmesi:** PEGI 12 önerisi kabul ediliyor mu? Yoksa 7 için 1. ve 9. bölümlerin daha da yumuşatılması mı istenir?
6. **Bölümsel yayın:** Üç kitap mı, tek parça mı?
7. **Seslendirme:** Yalnızca yaşlı Tamar'ın anlatısı mı, hiç seslendirme olmaması mı?
8. **Danışma kurulu:** Hangi kişi ve kurumlarla temas kurulacak? Bütçesi ne kadar?
9. **Pazar:** Türkiye'de Müslüman oyunculara yönelik iletişim nasıl kurulacak? Açılış notunun son metni ne olacak?
10. **Hassas ayrıntılar:** Beytlehem'deki katliama yapılan ima yalnızca bir yas cümlesi olarak kalacak mı? Matta 27:25'in kullanılmaması ve Hallel'in İbranice söylenmesi onaylanıyor mu?
11. **Platform:** Switch ikinci dalgada mı? Mobil için dokunmatik girdi ön üretimde mi tasarlanmalı?
12. **Bütçe ve ekip:** 7–8 kişi ve 30–36 ay gerçekçi mi? Kalabalık ve NPC paketi dış kaynağa verilebilir mi?

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
| Sadakat | Kanonik kişilere uydurma söz yok; Emmaus somutlaştırılmaz; Meryem konuşması yok | §2.2-A/C, §14.1 (3) |
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
