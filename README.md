# Kandil — Yıldızdan Şafağa

İncil'deki on olayı birinci yüzyıl Celile'si ve Yahudiye'sinde yaşamış kurgusal bir tanığın, **Tamar**'ın gözünden anlatan; modern ve detaylı piksel sanatlı, bulmaca ve seçim odaklı bir anlatı oyunu ("story game").

> **Durum:** Tasarım aşaması. Bu depoda henüz kod yok; yalnızca tasarım belgeleri var.

## Tek cümlede

Beytlehem kırlarında meleklerin müjdesini duyan dokuz yaşındaki çoban kızı Tamar, otuz yıl sonra işten işe koşan bir gündelikçidir. Küpleri dolduran, sepetleri taşıyan, mezar taşının ipini çeken eller onunkidir; mucizeyi yapan ise asla o değildir. Oyuncu tarihi değiştirmez, bir kadının kalbini değiştirir.

## Tasarımın temel kuralları

- **Oyuncu İsa'yı yönetmez**, O'nun sözlerini ya da eylemlerini seçmez. İsa'nın sözleri yalnızca İncil metninden, ayet referansıyla verilir.
- **Kanon değişmez.** Seçimler Tamar'ın iç dünyasını, ilişkilerini ve tanıklığını şekillendirir; İncil'deki olayların sonucunu değil.
- **Mucize hiçbir zaman bulmaca olmaz.** Oyuncu insanın işini yapar: sürü güder, su taşır, ip bağlar, kandili rüzgâra karşı korur, duyduklarını birleştirip sonuca varır.
- **Az fiil, derin bileşim:** beş temel sistem (Bakış, Güt, El, Kulak ve Kavrayış, Kandil ve Vakit) on bölüm boyunca derinleşir.
- **Karma çubuğu yok:** Söz, El ve Kalp eksenlerinin iki ucu da metinden meşruiyet alır; "Sessiz kal" her diyalogda geçerli bir seçenektir.
- **Ölçülülük ve herkese saygı:** farklı Hristiyan gelenekleri ve Müslüman oyuncular gözetilir; çarmıh silüet, ses ve tepkilerle anlatılır (hedef PEGI 12).

## Belgeler

| Belge | İçerik |
|---|---|
| [`docs/GDD.md`](docs/GDD.md) | Ana oyun tasarım belgesi: ilkeler, sadakat ve hassasiyet kontrol listesi, mekanikler, kontroller, bulmaca ve ipucu sistemi, seçim/bayrak modeli, sanat yönü, ses, erişilebilirlik, üretim planı, açık sorular |
| [`docs/bolumler/`](docs/bolumler/) | Bölüm başına ayrıntılı tasarım: sahne akışı, çözümleriyle bulmacalar, katılım anları, seçimler ve sonuçları, diyalog örnekleri, mekânlar ve piksel sanat notları, Kodeks girdileri, üretim notları |

### Bölümler

| # | Bölüm | Kaynak (öncü) | Tamar | Süre |
|---|---|---|---|---|
| 1 | [Yıldızın Altında](docs/bolumler/01-yildizin-altinda.md) | Luka 2:1–20 | 9 yaşında çoban kızı | ~35 dk |
| 2 | [Irmak ve Çöl](docs/bolumler/02-irmak-ve-col.md) | Matta 3:1–4:11 | 41, dul, kampta aşçı | ~40 dk |
| 3 | [Altı Taş Küp](docs/bolumler/03-alti-tas-kup.md) | Yuhanna 2:1–11 | Düğün evinde aşçı | ~40 dk |
| 4 | [Ekmek ve Rüzgâr](docs/bolumler/04-ekmek-ve-ruzgar.md) | Matta 14:13–33 | Kalabalıkta yardım eden kadın | ~55 dk |
| 5 | [Yolda Biri](docs/bolumler/05-yolda-biri.md) | Luka 10:25–37 | Benzetmede yaralı yolcu ve Samiriyeli | ~39 dk |
| 6 | [Eşikte](docs/bolumler/06-esikte.md) | Luka 15:1–32 | Benzetmede küçük ve büyük oğul | ~55 dk |
| 7 | [Dördüncü Gün](docs/bolumler/07-dorduncu-gun.md) | Yuhanna 11:1–53 | Marta'nın ticaret dostu | ~50 dk |
| 8 | [Gece İdi](docs/bolumler/08-gece-idi.md) | Markos 14:12–26 | Üst odalı evde aşçı | ~52 dk |
| 9 | [Uzaktan](docs/bolumler/09-uzaktan.md) | Luka 23:26–56 | Uzakta duran kadınlardan | ~35 dk |
| 10 | [İlk Günün Şafağı](docs/bolumler/10-ilk-gunun-safagi.md) | Luka 24:1–43 | Mezara giden kadınlardan | ~45 dk |

Ana yol toplamı yaklaşık **7,5 saat**; isteğe bağlı yan hikâyelerle yaklaşık 8,5 saat.

## Belgeler nasıl hazırlandı?

1. **Konsept paneli:** Üç bağımsız konsept yazıldı (tek tanık, topluluk/antoloji, sistem odaklı). Her biri oynanış, kaynağa sadakat ve hassasiyet, üretim ve sanat açılarından puanlandı.
2. **Sentez:** En yüksek puanı alan sistem odaklı konsept temel alındı; diğerlerinden kahraman (Tamar), sadakat kuralları ve katılım fikirleri aşılanarak GDD yazıldı.
3. **Bölüm tasarımı:** Her bölüm ayrı yazıldı, ardından iki bağımsız denetimden geçti: (a) İncil metnine, tarihe ve hassasiyete sadakat, (b) oynanış, bulmaca çözülebilirliği ve sistem tutarlılığı. Bulgular bölümlere işlendi.
4. **Çapraz tutarlılık:** Tüm bölümler birlikte; bayraklar, kontroller, zorluk ve süre, zaman çizelgesi, karakter kadrosu, sözlük ve varlık bütçesi açısından denetlendi ve GDD ile bölümler eşitlendi.

## Sıradaki adımlar

- **Açık sorular** ([GDD §17](docs/GDD.md)): oyun adı, İsa'nın görsel temsili, Kutsal Kitap çevirisi lisansı, yaş hedefi, bölümsel yayın, seslendirme, danışma kurulu.
- **Dikey dilim:** 3. bölüm (Altı Taş Küp) — Kavrayış, Güt ve Taşı/Dök sistemlerini ve ilk set-piece'i birlikte sınar.
- **Teknik keşif:** fırtına set-piece'i ve kalabalık sistemi; ardından motor seçimi ve prototip.
