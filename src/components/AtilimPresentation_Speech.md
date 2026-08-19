# YAPAY ZEKANIN ÇAĞINDA OLMAK — Sunum Planı ve Konuşma Metni

**Toplam süre:** ~35 dakika (35 dk konuşma + 5–10 dk Soru/Cevap)
**Hedef kitle:** Atılım Üniversitesi Bilgisayar Mühendisliği öğrencileri
**Ton:** Teknik ama akademik değil, motive edici, bol görsel ve etkileşim

---

## GENEL PLAN

| Bölüm | Slayt | Süre | İçerik |
|-------|-------|------|--------|
| **0. Açılış** | 1 | 1 dk | Başlık + tanışma |
| **1. Giriş & AI'nın Tarihi** | 2–4 | 8 dk | Hook → Tarih şeridi → AI kışları |
| **2. İlerleme & SOTA** | 5–10 | 15 dk | Transformer → Scaling → Modeller → Multimodal → Agents → Benchmarklar |
| **3. Değişen Dinamikler** | 11–13 | 7 dk | Yazılımcı için ne değişiyor → Yeni beceriler → Sen ne yapmalısın |
| **4. Gelecek Öngörüleri** | 14–15 | 5 dk | Liderlerden alıntılar → 2030 vizyonu |
| **5. Kapanış** | 16 | — | Soru/Cevap |

---

## ETKİLEŞİM STRATEJİSİ (sunum boyunca)

Her ~5 dakikada bir interaktif moment olmalı. Önerilen sorular:

- **Slayt 2:** "Sizce AI terimi ilk kez hangi yılda kullanıldı?" *(1956 — Dartmouth)*
- **Slayt 5:** "GPT-2'nin parametre sayısı kaçtır sizce?" *(1.5 milyar)*
- **Slayt 7:** "Şu an cebinizdeki telefon, 2020'deki en büyük süper bilgisayardan kaç kat daha güçlü AI çalıştırabiliyor sizce?" *(şaşırtıcı şekilde yakın — distile modeller sayesinde)*
- **Slayt 8:** "El kaldırın — son bir haftada ChatGPT, Claude veya Gemini kullanan?" → "Şimdi sadece kod için kullanan?"
- **Slayt 10:** "SWE-bench Verified'da en yeni modeller %70'i geçti. Sizce bu sayı 1 yıl önce neydi?" *(~%2)*
- **Slayt 13:** "Mezun olduğunuzda hangi pozisyonda olmak istersiniz? Düşünün..."

---

## SLAYT YAPISI ÖNERİLERİ (görsel-ağırlıklı)

Mevcut sunum metin yoğun. Yeni öneriler:

- **Slayt 3 (Tarih şeridi):** Yatay zaman çizelgesi — 1950'den 2025'e, dönüm noktaları ikonlarla.
- **Slayt 4 (AI Kışları):** "AI Hype Cycle" çizimi — ilgi/yatırım grafiği zaman içinde.
- **Slayt 6 (Scaling):** Logaritmik parametre büyümesi grafiği (GPT-1 → GPT-4o).
- **Slayt 7 (Model arenası):** Benchmark karşılaştırma tablosu (MMLU, HumanEval, ARC-AGI).
- **Slayt 10 (Yetenekler):** SWE-bench progress grafiği — bir yılda %2'den %70'e.
- **Slayt 14 (Quotes):** Dario Amodei, Demis Hassabis, Sam Altman, Yann LeCun fotoğrafları + alıntıları.

---

# KONUŞMA METNİ

---

## SLAYT 1 — Açılış (1 dakika)

**[Sahne: Başlık ekranda. Mikrofon kontrolü, gülümseme.]**

> Merhaba arkadaşlar. Bugün burada olmak benim için gerçekten heyecan verici. Çünkü konuşacağımız konu — yapay zeka — sizin önümüzdeki on yılınızı tanımlayacak. Bu cümleyi hafife almıyorum: doktor olacaklarınız, mühendis olacaklarınız, girişimci olacaklarınız… hepiniz, kariyerinizin ilk gününden son gününe kadar, AI ile birlikte çalışacaksınız.
>
> Ben de bir bilgisayar mühendisiyim ve son birkaç yıldır bu alanda hem profesyonel hem de kişisel olarak çok yoğun zaman geçiriyorum. Bugün size bu deneyimden süzdüklerimi anlatmaya çalışacağım.
>
> Sunum üç bölümden oluşuyor: önce kısaca AI'nın nereden geldiğine bakacağız. Sonra bugün nerede olduğumuza — yani **state of the art** dediğimiz şeye. Ardından bu ilerlemenin sizin için ne anlama geldiğini konuşacağız. Ve son olarak: peki, gelecek nasıl şekillenecek?
>
> Lütfen rahat olun. Sorularınızı sonuna saklamak zorunda değilsiniz; aklınıza geldiğinde sorabilirsiniz. Bu bir konferans değil, sohbet.

---

# BÖLÜM 1 — GİRİŞ VE AI'NIN KISA TARİHİ (8 dakika)

---

## SLAYT 2 — Hook: "Bu oda 10 yıl sonra nasıl görünecek?" (2 dakika)

**[İstatistikler ekranda. Yavaş konuş. Soru sor.]**

> Bir soruyla başlamak istiyorum. **Bu oda, on yıl sonra nasıl görünecek?**
>
> Düşünün: on yıl önce, 2015'te, bu odada otursaydık, ne konuşurduk? Belki "deep learning"in ImageNet yarışmasını kazanmasından. Ama hiçbirimiz, on yıl sonra cebimizdeki bir uygulamanın bizimle akıcı Türkçe konuşacağını, kod yazacağını, video üreteceğini söyleyemezdik.
>
> Şimdi şu rakamlara bakalım. **ChatGPT** — Kasım 2022'de çıktı. Bir milyon kullanıcıya ulaşması ne kadar sürdü dersiniz? Beş gün. Beş. Karşılaştırma için: Instagram'ın iki buçuk ay, Facebook'un on ay sürmüştü.
>
> **GPT-3** 2020'de çıktığında 175 milyar parametresi vardı. O zaman bu sayı insanları şaşırtıyordu. Bugün GPT-4'ün tahminen 1.8 trilyon parametresi olduğunu biliyoruz — yani dört yılda yaklaşık on kat büyüme.
>
> Ve bugün ChatGPT'nin haftalık aktif kullanıcı sayısı 300 milyonu geçti. Türkiye'nin nüfusunun üç buçuk katı, *her hafta*, bu uygulamayı kullanıyor.
>
> **[Etkileşim — soru sor:]**
> *"Sizce AI terimi ilk kez hangi yılda kullanıldı? Tahmin edin."*
>
> **[Cevapları al, sonra geç.]**
>
> Cevap: 1956. Yani neredeyse 70 yıl. Bu kadar yıllık bir alanın neden ancak şimdi patladığını anlamak için kısa bir tarih turu yapacağız.

---

## SLAYT 3 — AI'nın Zaman Çizelgesi (3 dakika)

**[Görsel öneri: Yatay timeline — 1956, 1969, 1986, 1997, 2012, 2017, 2020, 2022, 2024]**

> Yapay zeka kavramı 1956'da, **Dartmouth Konferansı'nda** ortaya çıktı. John McCarthy bu terimi icat etti. O zamanlar inanılmaz iyimserdi insanlar — "20 yıl içinde insanların yapabildiği her şeyi yapacak makineler" diye yazılar vardı. Bunlar 1960'larda yazıldı.
>
> Ama gerçeklik farklıydı. **1969'da** Marvin Minsky'nin yazdığı *Perceptrons* kitabı, sinir ağlarının basit bir XOR problemini bile çözemediğini gösterdi. Yatırımlar kesildi. Buna sonra **"Birinci AI Kışı"** denecekti.
>
> **1986'da** "backpropagation" tekrar keşfedildi — Rumelhart, Hinton, Williams. Bu, derin ağları eğitmenin matematiksel temeliydi. Ama o zamanlar bilgisayarlar yetersizdi.
>
> **1997** — IBM'in Deep Blue'su Garry Kasparov'u yendi. Satrançta. Bu sembolik bir andı ama bugünkü AI'dan çok farklıydı: kuralları sert kodlanmıştı.
>
> Sonra **2012**. Bu çok önemli bir yıl. AlexNet — Toronto Üniversitesi'nden — ImageNet yarışmasını, ikinci sıradakini *farkla* geride bırakarak kazandı. Üstelik GPU kullanarak. Bu, "deep learning patlamasının" başlangıcıdır.
>
> **2017** — bugünkü her şeyin temeli olan makale yayınlandı: **"Attention is All You Need"**. Google'dan sekiz araştırmacı. **Transformer** mimarisini tanıttılar. Bu mimari olmasaydı, ChatGPT olmazdı.
>
> **2020** — GPT-3. İlk kez bir model, *fine-tuning* olmadan, sadece **few-shot prompting** ile birçok görevi yapabildi.
>
> **2022 Kasım** — ChatGPT. Halka açık. Dünya değişti.
>
> Ve **2024–2025** — şu anda yaşadığımız dönem. Multimodal modeller, ajan sistemleri, açık kaynak yarışı.
>
> Bu zaman çizelgesinde dikkat etmenizi istediğim şey: **ilerleme doğrusal değil, üstel.** Son üç yılda, önceki otuz yıldan daha fazla ilerleme oldu.

---

## SLAYT 4 — AI Kışları ve Mevcut Yaz (3 dakika)

**[Görsel öneri: Hype cycle benzeri grafik — yatay eksende yıllar, dikey eksende "ilgi/yatırım", iki vadi (kışlar) ve şu anki tepe noktası]**

> AI'nın tarihi düz değildi. **İki büyük "AI Kışı"** yaşandı.
>
> **Birinci kış (1974–1980):** Erken vaatler tutmadı. ABD ve İngiltere hükümetleri fonu kesti. Lighthill Raporu — İngiliz hükümetine yazılmış — AI'ı "tam bir başarısızlık" ilan etti.
>
> **İkinci kış (1987–1993):** "Expert systems" denilen şey ticarileşemedi. LISP makineleri çöktü. Birçok AI şirketi battı.
>
> Şimdi soru şu: **Şu an yaşadığımız üçüncü bir kış mı, yoksa kalıcı bir yaz mı?**
>
> Bu sorunun cevabı net değil. Ama farklı olan üç şey var:
>
> Birincisi, **hesaplama gücü**. Bugün bir öğrencinin laptop'ı, 2010'daki en büyük süper bilgisayardan daha güçlü.
>
> İkincisi, **veri**. İnternet 30 yılda devasa bir eğitim seti üretti. GPT-3 yaklaşık 500 milyar token üzerinde eğitildi. Bu rakam neredeyse insan-yazılı tüm İngilizce metnin önemli bir kısmı.
>
> Üçüncüsü, **mimari**. Transformer, paralel eğitilebilen ve ölçeklendikçe gelişen bir yapı. Önceki mimariler (RNN, LSTM) bu özelliklere sahip değildi.
>
> Yani bu sefer farklı. Ama bu, hiç sorun olmayacak demek değil. Birazdan göreceğiz.

---

# BÖLÜM 2 — İLERLEME VE SOTA (15 dakika)

---

## SLAYT 5 — Transformer: Her Şeyin Başladığı Nokta (3 dakika)

**[Görsel öneri: Self-attention mekanizmasının basit bir görsel temsili — bir cümlede her kelimenin diğerlerine "baktığı" oklar]**

> Şimdi modern AI'ın temeline iniyoruz: **Transformer**.
>
> 2017'de Google Brain'den çıkan bu mimarinin özü tek bir mekanizmaydı: **self-attention**. Yani her kelime, cümledeki diğer tüm kelimelere "bakabiliyor" ve onlardan kendine en alakalı olanlara odaklanabiliyor.
>
> Önceki yöntemler — RNN, LSTM — bunu sıralı yapıyordu. Bir kelime okuyor, hatırlıyor, sonraki kelimeye geçiyordu. Bu hem yavaştı hem de uzun cümlelerde "unutuyordu". Transformer ise her şeye aynı anda bakıyor.
>
> Üç şeyi mümkün kıldı:
>
> Birincisi: **paralel eğitim.** GPU'ları tam kapasite kullanabiliyorsunuz. Bu, devasa modelleri eğitilebilir kıldı.
>
> İkincisi: **uzun bağlam.** Şu anki modeller 200.000 token'a kadar bağlam tutabiliyor. Yani bir kitabın tamamını bir kerede okuyabiliyorlar.
>
> Üçüncüsü ve belki en önemlisi: **emergent yetenekler.** Model yeterince büyüdüğünde, hiç eğitilmediği görevleri yapmaya başlıyor. Bu, kimsenin tam olarak açıklayamadığı bir fenomen.
>
> **[Etkileşim — soru sor:]**
> *"Şimdi tahmin edin: GPT-2 — 2019'da OpenAI tarafından çıkarıldı. Kaç parametresi vardı sizce?"*
>
> **[Tahminleri al — genelde "milyar" diyenler olur. Sonra söyle:]**
>
> Cevap: **1.5 milyar**. O zaman bu çok büyüktü. OpenAI hatta "tehlikeli" diyerek modeli ilk başta açıklamadı bile.
>
> Bugün? 1.5 milyar parametre, açık kaynak modeller arasında *küçük* bir model sayılıyor. Telefonunuzda çalıştırabiliyorsunuz.

---

## SLAYT 6 — Scaling Laws: Büyüklük Önemli (2 dakika)

**[Görsel öneri: Logaritmik grafik — yıllar bazında parametre sayısı: GPT-1 (117M, 2018) → GPT-2 (1.5B) → GPT-3 (175B) → GPT-4 (~1.8T)]**

> 2020'de OpenAI çok önemli bir paper yayınladı: **"Scaling Laws for Neural Language Models"**. Özetle şunu söylediler: model performansı, üç şeyle tahmin edilebilir bir ilişki içinde — model büyüklüğü, veri miktarı, hesap gücü.
>
> Yani: daha büyük model + daha çok veri + daha çok GPU = daha iyi performans. Ve bu ilişki *öngörülebilir*. Sürpriz yok.
>
> Bu keşif, milyar dolarlık AI yatırımlarının temelidir. Microsoft'un OpenAI'a 13 milyar dolar yatırması, Anthropic'in 8 milyar dolar değerlemesi, Google'ın Gemini için harcadığı milyarlar — hepsi bu fikre dayanıyor.
>
> Grafiğe bakın: **2018'de GPT-1, 117 milyon parametre. 2024'te GPT-4o, tahmini 1.8 trilyon. Altı yılda 15.000 kat büyüme.**
>
> Ama bir şey daha: 2024'te sınırlara mı dayandık? Bazı araştırmacılar (özellikle Yann LeCun) "scaling sonuna geldi" diyor. Diğerleri (Sam Altman, Dario Amodei) "daha çok yer var" diyor. Bu tartışmaya geleceğiz.

---

## SLAYT 7 — 2024–2025 Model Arenası (3 dakika)

**[Görsel öneri: Logo'larla model karşılaştırma tablosu, benchmark skorları yan yana]**

> Şimdi mevcut duruma bakalım. **2025 itibariyle, en güçlü modeller hangileri?**
>
> Beş büyük oyuncu var:
>
> **OpenAI — GPT-4o, GPT-4.5, o1/o3 serisi.** Reasoning'de — yani çok adımlı düşünmede — şu an lider. o3 modeli ARC-AGI testinde yüzde 87 puan aldı; bu test özellikle "AI'ın çözemediği" görevler için tasarlanmıştı.
>
> **Anthropic — Claude 3.5 Sonnet, Claude 3.7.** Kod yazma ve uzun bağlam anlayışında çok güçlü. Birçok geliştirici "kod için en iyi" diyor.
>
> **Google — Gemini 1.5 Pro, Gemini 2.0.** Multimodal'da — görüntü, video, ses — entegrasyon en gelişmiş olanı. 2 milyon token bağlam.
>
> **Meta — LLaMA 3, LLaMA 4.** Açık kaynak. Yani modeli indirip kendi sunucunuzda çalıştırabiliyorsunuz. Bu büyük bir fark.
>
> **Çin'den — DeepSeek, Qwen.** DeepSeek özellikle 2025 başında dikkat çekti — çok daha az hesap gücüyle GPT-4 seviyesine yaklaştı.
>
> **Açık kaynak vs kapalı kaynak gerilimi** burada önemli. Kapalı modeller (OpenAI, Anthropic) daha güçlü olabilir, ama açık modeller daha hızlı yayılıyor, daha şeffaf, daha özelleştirilebilir.
>
> **[Etkileşim — el kaldırın:]**
> *"Son bir haftada bu modellerden birini kullanan kaç kişi var?"*
> *"Şimdi: kod için kullanan?"*
> *"Şimdi: Google Search yerine kullanan?"*
>
> Görüyorsunuz — bu artık niş bir araç değil, **temel bir altyapı**.

---

## SLAYT 8 — Multimodal: Sadece Metin Değil (2 dakika)

**[Görsel öneri: Dört kutu — görüntü, video, ses, kod — örneklerle]**

> 2023'e kadar AI dediğimiz şey çoğunlukla metindi. Şimdi her şey değişti.
>
> **Görüntü:** DALL-E 3, Midjourney v6, Stable Diffusion 3. Bir cümleyle profesyonel kalitede görüntü üretiliyor. Reklam sektörü, illüstrasyon sektörü çoktan dönüştü.
>
> **Video:** **OpenAI'ın Sora**'sı ve Google'ın Veo'su, bir paragraflık metinden bir dakikalık tutarlı video üretebiliyor. Hollywood ürküyor — ve haklı.
>
> **Ses:** ElevenLabs ile birinin sesini birkaç saniye dinleyerek klonlamak mümkün. Bu hem inanılmaz hem de **güvenlik açısından alarm verici**. Deepfake çağındayız.
>
> **Kod:** GitHub Copilot, Cursor, Claude Code… Bu sektör — sizin sektörünüz — belki en çok dönüşen alan. Birazdan ayrıntılı konuşacağız.
>
> Önemli olan: bu modeller artık **modaliteler arası geçiş** yapabiliyor. Bir görüntüyü gösterip "bunda ne yanlış?" diye sorabilirsiniz, kodla cevap alabilirsiniz. Yani AI artık sadece okumuyor — **görüyor, dinliyor, üretiyor**.

---

## SLAYT 9 — Chatbot'tan Agent'a: Büyük Sıçrama (2 dakika)

**[Görsel öneri: Solda "Chatbot" — pasif, sağda "Agent" — aktif, ok ile geçiş]**

> Belki son iki yıldaki en önemli değişiklik bu: **chatbot'tan agent'a geçiş.**
>
> **Chatbot ne yapıyordu?** Soru soruyorsunuz, cevap veriyor. Tek seferlik. Bilgisi var ama eylemsiz. Pasif.
>
> **Agent ne yapıyor?** Hedef veriyorsunuz, plan yapıyor, araçlar çağırıyor — web'i tarıyor, kod çalıştırıyor, dosya açıyor — sonuçları gözlemliyor, gerekirse planını güncelliyor. **Yani çalışıyor.**
>
> Buna **"ReAct" pattern**'i deniyor: Reason + Act. Düşün, eyle, gözle, tekrarla.
>
> Pratik örnekler:
> - **Cursor / Claude Code** — yazılım geliştirme ajanları. Size proje boyunca dosya açıp düzenliyor, test çalıştırıyor.
> - **Devin** — "tam otonom yazılım mühendisi" iddiasıyla geldi. Tartışmalı ama yön net.
> - **Manus, AutoGPT, AgentGPT** — genel amaçlı ajanlar.
>
> Önemli olan şu: **AI artık "soru cevap makinesi" değil, "iş yapan asistan".**
>
> Ve bu, sizin için ne demek? Birkaç slayt sonra konuşacağız.

---

## SLAYT 10 — Yetenekler: Sayılarla Konuşalım (3 dakika)

**[Görsel öneri: Bir benchmark progress grafiği — SWE-bench Verified zaman içinde, %2'den %70'e]**

> Hype çok, ama somut sayılara bakalım. AI gerçekten ne yapıyor?
>
> **MMLU** — geniş bilgi testi, 57 farklı konu. İnsan uzman: ~%90. GPT-4o, Claude 3.5 Sonnet: ~%88. Yani yüksek lisans seviyesinde genel bilgi.
>
> **HumanEval** — Python kodlama. Modeller artık %95'ten fazla geçiyor. Bu test artık **doygun**, yani ayırt edici değil.
>
> **SWE-bench Verified** — gerçek GitHub issue'larını çözme testi. Bakın bu çarpıcı:
>
> - **2023 başı:** %2
> - **2024 başı:** %20
> - **2024 sonu:** %50
> - **2025:** %70+
>
> Bir yılda %2'den %70'e. Bu sektörünüzün geleceği için bir sinyal.
>
> **ARC-AGI** — François Chollet'nin tasarladığı, "akıllı makineler için zor" olan test. Yıllarca AI'lar burada %5 alıyordu. **OpenAI o3 modeli %87 aldı.** Test geliştiricisi bile şaşırdı.
>
> **Matematik (FrontierMath)** — uzman matematikçilerin tasarladığı çok zor problemler. 2024'te modeller %2'deydi. Şu an %25'i geçtiler.
>
> **[Etkileşim:]**
> *"Bu sayılar size ne söylüyor? Bir yılda %2'den %70'e çıkan bir sistem... beş yıl sonra ne yapıyor olacak?"*
>
> Bu sorunun cevabı kimsede yok. Ama trendi görmezden gelemeyiz.

---

# BÖLÜM 3 — DEĞİŞEN DİNAMİKLER (7 dakika)

---

## SLAYT 11 — Yazılımcı İçin Ne Değişiyor? (3 dakika)

**[Görsel öneri: "Önce — Sonra" karşılaştırma; veya yazılım geliştirme döngüsünün hangi aşamalarına AI girdi]**

> Şimdi en önemli soruya geliyoruz: **siz, bilgisayar mühendisliği öğrencileri olarak, bu çağda nasıl bir mesleğe hazırlanıyorsunuz?**
>
> Önce şunu netleştirelim: korkulan şey "yazılımcılar işsiz kalacak" cümlesi. Ben buna katılmıyorum, ama "iş aynı kalacak" demiyorum. **İş değişiyor.**
>
> Ne değişiyor:
>
> **Boilerplate, rutin kod, syntax** — bunları artık AI yapıyor. Bir for döngüsü yazmak, bir REST endpoint hazırlamak, bir SQL query'si — bunlar 30 saniyelik işler.
>
> **Debug ve refactor** — AI ile ortaklık. Bir hata mesajını yapıştırıyorsunuz, çoğu zaman doğru tanı koyuyor.
>
> **Test yazma** — coverage'ı yüzde 30'dan yüzde 80'e çıkarmak artık bir öğleden sonralık iş.
>
> **Code review** — AI önce bakıyor, sonra siz bakıyorsunuz.
>
> Ne değişmiyor:
>
> **Mimari kararlar.** "Bu sistem nasıl ölçeklenecek?", "Bu veriyi nasıl modellemeli?" — hâlâ insan işi.
>
> **Problemi formüle etmek.** "Müşteri ne istiyor?", "Gerçek sorun nedir?" — AI çözmek istediği problemi *anlamıyor*, sadece tarif ettiğinizi yapıyor.
>
> **Yargı, etik, hesap verebilirlik.** Bir AI'ın yazdığı kodu prodüksiyona koyduğunuzda, sorumluluk sizin.
>
> **GitHub'ın araştırması:** Copilot kullanan geliştiriciler ortalama **%55 daha hızlı** ve görevlerinin **%88'ini başarıyla tamamlıyor**, kullanmayanlara göre.
>
> Yani sonuç: AI sizi *değiştirmiyor*, ama sizi *yükseltiyor*. AI kullanan bir yazılımcı, kullanmayan bir yazılımcının önüne geçiyor.

---

## SLAYT 12 — Yeni Beceriler: Ne Öğrenmeli? (2 dakika)

**[Görsel öneri: 5 sütunlu radar chart — temel bilgi, AI tooling, ürün düşüncesi, iletişim, alan derinliği]**

> Peki **ne öğrenmeli?**
>
> **Birincisi — temel bilgi hâlâ kritik.** Veri yapıları, algoritmalar, sistem tasarımı, network, OS… Bu kafanızdaki **modeli** kuruyor. AI'a sorduğunuz sorunun kalitesi, sizin temel bilginize bağlı. "Garbage in, garbage out" — soruyu kötü sorarsanız, kötü cevap alırsınız.
>
> **İkincisi — AI tooling**. Cursor'ı, Copilot'ı, Claude Code'u, ChatGPT API'sini *gerçekten* kullanmayı öğrenin. Prompt engineering temel bir beceri haline geldi. Daha ileri: LangChain, LlamaIndex, vector database'ler, RAG mimarileri.
>
> **Üçüncüsü — ürün düşüncesi**. Kod artık ucuz. Hangi kodu yazacağınıza karar vermek pahalı. Müşteri sorunlarını anlamak, MVP tasarlamak, metrikleri ölçmek… Bunlar geleceğin mühendisinin işi.
>
> **Dördüncüsü — iletişim**. AI ile çalışırken bile, asıl iş insanlarla. Stakeholder'ı ikna etmek, ekibinizi yönetmek, bir dökümanı net yazmak.
>
> **Beşincisi — alan derinliği**. Hangi sektörde, hangi probleme çözeceksiniz? Sağlık AI'ı? Fintech? Robotik? Eğitim? Bir alan seçin ve oraya yatırım yapın. AI'ı uzmanlığınızla birleştirenler kazanacak.

---

## SLAYT 13 — "Sen Bu Dönemde Ne Yapacaksın?" (2 dakika)

**[Görsel öneri: 5 maddelik somut eylem listesi]**

> Şimdi kişisel kısma geliyoruz. Eğer bu sunumdan tek bir slayt'ı hatırlayacaksanız, bu olsun.
>
> **Beş somut eylem:**
>
> **1. Temel al.** Lineer cebir, olasılık, optimizasyon. Sonra Transformer mimarisini gerçekten anlayın. *Andrej Karpathy*'nin YouTube'daki "Let's build GPT" videosunu izleyin — üç saatlik altın değerinde içerik.
>
> **2. Uygula.** Hugging Face'de bir model fine-tune edin. LangChain ile bir agent yazın. OpenAI API'yle bir tarafta projeniz olsun. **Ellenmemiş bilgi unutulur.**
>
> **3. Araştır.** Haftada en az bir paper okuyun. arXiv'de cs.CL ve cs.LG bölümleri. *Papers With Code*. Anlayamadığınız %80 olur — sorun değil. Devam edin.
>
> **4. Katıl.** Kaggle yarışmaları, açık kaynak katkıları, hackathon'lar. Bir GitHub profiliniz olsun, içinde gerçek projeler olsun. CV'den çok daha değerli.
>
> **5. Odaklan.** Her şeye dağılmayın. Bir alt alan seçin — NLP, computer vision, agents, robotics, RL — ve **derinleşin**. T-shaped olun: bir konuda çok derin, geri kalanda yeterli.
>
> **[Etkileşim — düşündürücü an:]**
> *"Şimdi bir saniye düşünün. Mezun olduğunuzda nerede olmak istiyorsunuz? Hangi şirkette, hangi pozisyonda, hangi problemi çözüyor olarak? Bu vizyon ne kadar net, o kadar yola çıkmanız kolay."*
>
> Cevabı şimdi söylemenize gerek yok. Ama akşam yatağa girerken düşünün.

---

# BÖLÜM 4 — GELECEK ÖNGÖRÜLERİ (5 dakika)

---

## SLAYT 14 — Liderler Ne Diyor? (3 dakika)

**[Görsel öneri: 4 kişinin fotoğrafı + altlarında alıntılar — Hassabis, Amodei, Altman, LeCun]**

> Geleceği tahmin etmek tehlikelidir, özellikle bu hızda. Ama alanın liderlerinin ne dediğine kulak verelim. Önemli olan şu: **bu insanlar birbiriyle anlaşmıyor**. Yani gelecek belirsiz.
>
> **Demis Hassabis — DeepMind CEO, Nobel Kimya Ödülü sahibi (2024):**
> > *"AGI'ye, insan seviyesi yapay zekaya, önümüzdeki 5 ila 10 yıl içinde ulaşacağımıza inanıyorum."*
>
> Hassabis ihtiyatlıdır. "5–10 yıl" demek, onun ağzından, çok güçlü bir iddia.
>
> **Dario Amodei — Anthropic CEO:**
> > *"2026 ya da 2027'ye kadar, Nobel ödülü kazanan bilim insanlarından daha akıllı AI sistemlerimiz olacak."*
>
> Amodei en agresif tahminleri yapan kişi. "Machines of Loving Grace" adlı yazısında, AI'ın kanseri 5–10 yıl içinde büyük oranda çözebileceğini yazdı.
>
> **Sam Altman — OpenAI CEO:**
> > *"Süperzeka birkaç bin gün uzakta olabilir."*
>
> Birkaç bin gün — yani 5 ile 15 yıl arası. Bu da çok güçlü bir iddia.
>
> **Yann LeCun — Meta Baş AI Bilimcisi, Turing Ödülü sahibi:**
> > *"LLM'ler bir çıkmaz sokak. Otoregresyonlu kelime tahmini bir kediye bile ulaşamaz, insan seviyesi bir yana."*
>
> LeCun'un duruşu çok farklı. Ona göre AGI için tamamen yeni bir mimari gerekiyor — "world models" diyor. Bu vizyona göre belki 10+ yıl.
>
> **Bu uyumsuzluk önemli.** Çünkü hiç kimse — gerçekten *hiç kimse* — gelecek 5 yılı kesinlikle bilmiyor. Hazırlıklı olmak için tek yol: **temelleri sağlam, esnek ve sürekli öğrenen** olmak.

---

## SLAYT 15 — 2030 Vizyonu (2 dakika)

**[Görsel öneri: Yıl bazlı timeline — 2025–26, 2027–28, 2029–30, 2030+]**

> Sunumu kapatmadan önce, bir vizyon paylaşmak istiyorum. Bunlar tahmin — kesinlik yok.
>
> **2025–2026: Agent dönemi olgunlaşıyor.** Çok adımlı görevleri otonom yürüten sistemler standart hale geliyor. Her geliştiricinin, bir veya iki ajanı sürekli arka planda çalışıyor.
>
> **2027–2028: Fiziksel AI.** Robotik + dil modelleri entegre oluyor. Ev robotları artık niş değil. Otomotiv, lojistik, tarım — büyük dönüşüm.
>
> **2029–2030: Bilim motoru olarak AI.** AlphaFold sadece bir başlangıçtı. AI destekli ilaç keşfi, malzeme bilimi, iklim modelleri — bilimin hızı kökten artıyor. Hassabis'in dediği gibi: "AI'ın AI'ı."
>
> **2030+: AGI tartışması.** Belki ulaşmış oluruz, belki yeni bir kış. **Belirsizlik bu işin doğası.**
>
> Burada size güvendirici bir şey söylemeyeceğim: kimse bilmiyor. Ama şunu söyleyeceğim: **belirsizlikte fırsat var**. Bu çağda, bir öğrenci olarak doğmak — ne mutlu size. Çünkü kuralları siz yazacaksınız.

---

## SLAYT 16 — Kapanış ve Soru/Cevap (1 dakika + Q&A)

**[Görsel: "Soru & Cevap" başlığı]**

> Bitirmeden önce tek bir cümle:
>
> AI alanı, **kapı açılmış bir alandır**. Otuz yıl önce bu alana girmek isteseniz, doktora yapmanız gerekiyordu. Bugün, bir laptop'ınız ve internet erişiminiz varsa, dünyanın en güçlü modelleriyle deney yapabilirsiniz. Hugging Face'den ücretsiz model indirebilirsiniz. arXiv'den günde 100 paper okuyabilirsiniz. OpenAI API'sine 5 dolarla başlayabilirsiniz.
>
> **Bu fırsat herkese eşit dağıtılmıyor — onu sadece *alanlar* alıyor**. Umarım siz alanlardan olursunuz.
>
> Beni dinlediğiniz için teşekkür ederim. Şimdi sorularınızı bekliyorum.
>
> **[Q&A — 5–10 dakika]**

---

# YEDEK / DERİNLEŞTİRME İÇERİKLERİ (zaman kalırsa)

Bu içerikler ilgi yoğunluğuna göre eklenebilir veya soru-cevapta kullanılabilir:

- **AI güvenliği:** alignment problemi, RLHF, anayasal AI (Anthropic).
- **Türkiye'nin AI haritası:** TÜBA, TEKNOFEST, AIHUB, Türkçe NLP fırsatları.
- **Etik:** deepfake, telif hakkı, iş gücü dönüşümü.
- **Açık kaynak vs kapalı kaynak:** Meta'nın LLaMA stratejisi, DeepSeek vakası.
- **Compute savaşı:** NVIDIA H100 kısıtlamaları, ABD-Çin gerilimi, TSMC bağımlılığı.

---

## SUNUM ÖNCESİ HAZIRLIK NOTLARI

- **5 dk önce:** Su, mikrofon test, slaytları test et.
- **Açılışta gözlerini bul:** Salonun farklı bölgelerinden 3–4 kişiyle göz teması kur.
- **Hızı kontrol et:** Slayt başına 2–3 dk hedefi varsa, saati orta ekrana koy.
- **Sahnede dolaş:** Tek bir noktada durma, ama gereksiz gezme. Önemli noktalarda dur.
- **Etkileşim soruları:** El kaldıranların sayısını yüksek sesle saymaya değer — enerji yükselir.
- **Yedek alıntı/anekdot:** Beklenmedik teknik sorun olursa, kişisel bir hikaye anlatılacak hazırda olsun.
