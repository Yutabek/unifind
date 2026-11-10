# Hamroh — veb-sayt (Next.js + Supabase + Vercel)

Chet elda o'qishni rejalashtirayotgan O'zbekistonlik talabalar va ota-onalar uchun AI-yordamchi loyihasining sayti: asosiy sahifa, muddatlar xaritasi, narxlar, agentliklar uchun blok, **erta kirish ro'yxati (waitlist)** va maxfiylik/shartlar sahifalari. Uch tilda: **o'zbekcha (asosiy)**, ruscha, inglizcha.

> **"Hamroh" — ishchi nom (placeholder).** Brend nomini `src/lib/site.ts` ichida bir joyda almashtirasiz — sarlavha, footer, metadata, huquqiy sahifalar va ijtimoiy tarmoq rasmi o'zi yangilanadi.

---

## ⚠️ Ishga tushirishdan oldin bilishingiz shart

1. **Huquqiy matnlar — QORALAMA.** `Maxfiylik siyosati` va `Foydalanish shartlari` saytning bugungi ishini oddiy tilda tasvirlaydi, lekin yuridik maslahat emas. Haqiqiy ma'lumot yig'ishdan oldin O'zbekiston qonunchiligini biladigan yurist ko'rib chiqsin.
   - **Alohida savol yuristga:** O'zbekistonda shaxsga doir ma'lumotlarni O'zbekiston hududidagi serverlarda saqlash (lokalizatsiya) va bazani ro'yxatdan o'tkazish talabi bor. 2026-yil mart oyida chegaradan tashqarida saqlash/qayta ishlashni yengillashtiruvchi o'zgartirish imzolangan, lekin uning tafsilotlarini men tekshirmadim. Bu loyiha ma'lumotlarni **Frankfurt (EU)** dagi Supabase'da saqlaydi — bu sizga to'g'ri keladimi yoki yo'qmi, buni yurist aytadi. Agar kerak bo'lsa, ma'lumotlar bazasi qatlami uchta faylda ajratilgan (`src/app/actions/waitlist.ts`, `src/lib/supabase/admin.ts`, `src/lib/waitlist-count.ts`) va boshqa saqlash joyiga almashtirish oson.
2. **Reestrdagi sanalar rasmiy emas.** `src/data/registry.ts` dagi "expected" (kutilmoqda) statusli sanalar o'tgan yilgi sikldan taxmin qilingan, rasmiy e'lon emas. Reestr 2026-11-10 kuni tekshirilgan. **Saytni e'lon qilishdan oldin har bir yozuvni rasmiy sahifadan qayta tekshiring** va `verifiedOn` ni yangilang.
3. **Placeholderlar saytda ko'rinadi:** "Your Company LLC" va `hello@example.uz`. Haqiqiy qiymatlarni env o'zgaruvchilarida bering (pastda jadval).
4. **Narxlar bo'limi — "erta kirish, hozircha pul olinmaydi" matni.** To'lov integratsiyasi yo'q.
5. **Telegram-bot bu yetkazib berishga kirmaydi.** Sayt faqat ixtiyoriy Telegram havolasini ko'rsatadi (`NEXT_PUBLIC_TELEGRAM_URL`).

---

## Nimalar ichida

| Qism | Texnologiya |
|---|---|
| Freymvork | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Stil | Tailwind CSS v4, o'z dizayn tizimi "Reestr" (faqat yorug' mavzu) |
| Shriftlar | Onest + Sofia Sans Condensed, o'zingiz hosting qilasiz (`public/fonts`, OFL litsenziya) |
| Ma'lumotlar bazasi | Supabase (Postgres), faqat server tomonidan yoziladi |
| Joylash | Vercel (`vercel.json`: region `fra1`) |
| Tillar | `/uz` (asosiy), `/ru`, `/en`; `/` foydalanuvchini cookie yoki brauzer tiliga qarab yo'naltiradi |

Sahifalar: bosh sahifa (Hero → Muammo → Muddatlar xaritasi → Qanday ishlaydi → Yo'nalishlar → Ishonch → Narxlar → Agentliklar → FAQ → Erta kirish → Footer), `/privacy`, `/terms`, 404, `sitemap.xml`, `robots.txt`, har til uchun OG-rasm (1200×630).

---

## Lokal ishga tushirish

Kerak: Node.js 20.9+ (tavsiya: 22, `.nvmrc` bor).

```bash
npm install
cp .env.example .env.local      # keyin qiymatlarni to'ldiring
npm run dev                     # http://localhost:3000
```

- Supabase kalitlarisiz ham ishlaydi: **dev rejimida** forma "muvaffaqiyatli" ko'rsatadi, lekin hech narsa saqlamaydi (demo rejim). **Production'da** esa kalit bo'lmasa forma "xizmat vaqtincha mavjud emas" deydi — ma'lumot jimgina yo'qolib qolmasligi uchun.
- Tekshirish: `npm run typecheck` va `npm run build`.

---

## 1-qadam. Supabase

1. [supabase.com](https://supabase.com) → **New project**. Region: **Central EU (Frankfurt) — eu-central-1** (Vercel funksiyalari ham `fra1` da, ular yaqin bo'ladi).
2. **SQL Editor → New query** → `supabase/migrations/0001_waitlist.sql` faylining hammasini joylab **Run** bosing. Bu `public.waitlist` jadvalini yaratadi.
   - Jadvalda **Row Level Security yoqilgan va hech qanday policy yo'q**, `anon`/`authenticated` rollaridan barcha huquqlar olingan. Ya'ni brauzerdagi (publishable) kalit bu jadvalni **o'qiy ham, yoza ham olmaydi**. Yozishni faqat serverdagi *secret key* qiladi.
3. **Project Settings** ichidagi API bo'limlaridan ikki narsa oling (Supabase panel nomlari vaqti-vaqti bilan o'zgaradi):
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Secret key** (`sb_secret_…` bilan boshlanadi) → `SUPABASE_SECRET_KEY`
4. 🔒 **Secret key'ni hech qachon `NEXT_PUBLIC_` bilan boshlamang, hech qachon GitHub'ga yuklamang, chatga yoki skrinshotga qo'ymang.** U jadvaldagi RLS'ni chetlab o'tadi. Agar oshkor bo'lib qolsa — Supabase'da darhol yangisini yarating (rotate).

> Eski loyihalarda `service_role` kaliti ishlatiladi: u ham qo'llab-quvvatlanadi (`SUPABASE_SERVICE_ROLE_KEY`), lekin yangi `sb_secret_…` ma'qul.

---

## 2-qadam. GitHub → Vercel

1. Kodni GitHub'ga yuklang (**private** repo tavsiya etiladi). `.env*` fayllari `.gitignore` da — ular yuklanmaydi.
2. [vercel.com](https://vercel.com) → **Add New → Project** → repo'ni tanlang. Framework avtomatik "Next.js" bo'ladi; build sozlamalariga tegmang.
3. **Environment Variables** bo'limiga quyidagilarni qo'shing, so'ng **Deploy**.
4. Domen: **Settings → Domains** orqali ulang, keyin `NEXT_PUBLIC_SITE_URL` ni shu domenga o'zgartirib, **Redeploy** qiling.

> **Env o'zgargandan keyin har doim Redeploy kerak.** `NEXT_PUBLIC_*` qiymatlari build vaqtida kodga joylanadi, shuning uchun ularni faqat o'zgartirish yetarli emas.

### Env o'zgaruvchilari

| Nomi | Majburiy | Nima uchun |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ha | Supabase Project URL (`SUPABASE_URL` ham qabul qilinadi) |
| `SUPABASE_SECRET_KEY` | ha | Serverdagi yozuv kaliti (`sb_secret_…`). **Hech qachon `NEXT_PUBLIC_` emas** |
| `NEXT_PUBLIC_SITE_URL` | tavsiya | Saytning rasmiy manzili, oxirida `/` yo'q. Canonical, sitemap va ijtimoiy tarmoq ko'rinishi uchun. Berilmasa Vercel'ning production domeni olinadi |
| `NEXT_PUBLIC_COMPANY_NAME` | ha | Yuridik shaxs nomi (footer va huquqiy sahifalarda) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ha | Aloqa email'i (footer va huquqiy sahifalarda) |
| `NEXT_PUBLIC_TELEGRAM_URL` | yo'q | Masalan `https://t.me/kanal_nomi`; berilsa footer va "ro'yxatdasiz" ekranida chiqadi |
| `WAITLIST_COUNT_MIN` | yo'q | "N kishi allaqachon yozilgan" yozuvi shu songa yetgandan keyingina chiqadi (standart: 50) |

### Reja haqida

- **Vercel Hobby — faqat notijorat foydalanish uchun.** Tijorat loyiha (startap) uchun **Pro** reja kerak.
- **Supabase Free — 7 kun faolsiz turgan loyihani to'xtatib qo'yadi (pause).** Sayt ishlayveradi, lekin forma xato beradi. Jonli sayt uchun **Pro** tavsiya etiladi (yoki hech bo'lmaganda panelda loyihani qayta yoqing).

---

## Kontentni o'zgartirish

| Nimani | Qayerda |
|---|---|
| Brend nomi, aloqa, til cookie'si | `src/lib/site.ts` |
| Barcha matnlar (3 til) | `src/content/uz.ts`, `ru.ts`, `en.ts` |
| Matn tuzilmasi (turlar) | `src/content/types.ts` |
| Huquqiy matnlar (qoralama) | `src/content/legal/uz.ts`, `ru.ts`, `en.ts` |
| Narx rejalari | har bir tilda `pricing.plans` |
| Ranglar, radiuslar, soyalar | `src/app/globals.css` (`@theme` bloki) |
| Logotip / favicon | `src/components/ui/Logo.tsx`, `src/app/icon.svg` |
| Muddatlar reestri | `src/data/registry.ts` |

- **Har uch tilda bir xil kalitlar bo'lishi shart.** Biror tilda kalit yetishmasa, `npm run build` xato beradi — sahifada bo'sh joy qolmaydi.
- Matnlarning istalgan joyida `{brand}`, `{company}`, `{email}` yozsangiz, ular `site.ts`/env qiymatlari bilan almashadi.
- **Maxfiylik matnini o'zgartirsangiz, `src/lib/site.ts` dagi `consentVersion` ni yangilang.** U har bir rozilik bilan birga bazaga yoziladi (kim qaysi versiyaga rozi bo'lgani ko'rinadi).
- O'zbekcha apostroflar: o‘ va g‘ uchun `ʻ` (U+02BB), tutuq belgisi uchun `ʼ` (U+02BC). Sarlavha shriftida `ʻ` glifi juda katta chiqardi, shuning uchun uni kichik patch shrifti to'g'rilaydi (`scripts/make-okina-patch.py`, OFL litsenziyasi asosida).

### Muddatlar reestrini yangilash

`src/data/registry.ts` — sayt sanalarni faqat shu yerdan oladi. Har bir yozuv:

```ts
{
  id: "sh",                         // dasturning identifikatori
  corridor: "hungary",              // yo'nalish
  levels: ["bachelor", "master", "phd"],
  status: "expected",               // confirmed | expected | rolling | unconfirmed | closed
  opens: "2026-11-17",              // YYYY-MM-DD (ixtiyoriy)
  deadline: "2027-01-15",           // YYYY-MM-DD (ixtiyoriy)
  deadlineTime: "14:00 CET",        // ixtiyoriy
  verifiedOn: "2026-11-10",         // rasmiy sahifani oxirgi tekshirgan kuningiz
  source: { host: "...", url: "https://..." },
}
```

Qoidalar:

- **`confirmed`** faqat rasmiy sahifa sanani e'lon qilgan bo'lsagina. O'tgan yildan taxmin qilingan sana — **`expected`**. Sayt ikkalasini turlicha chizadi (to'liq/shtrixlangan), shuning uchun foydalanuvchi aldanmaydi.
- `verifiedOn` dan **21 kun** o'tsa, sayt o'zi "qayta tekshiruv kutilmoqda" deb ko'rsatadi.
- Dasturning **nomi va izohi** `src/content/*.ts` dagi `registry` bo'limida, `id` bo'yicha turadi (3 tilda).
- Yangi dastur qo'shish: `registry.ts` dagi `ProgramId` turiga va `PROGRAMS` ro'yxatiga qo'shing, so'ng 3 tildagi `registry` ga nom/izoh yozing — TypeScript nima yetishmayotganini o'zi aytadi.
- Reestr kodda turadi, shuning uchun o'zgarish **commit → push → Vercel avtomatik qayta joylaydi**. "Necha kun qoldi" hisobi esa har 5 daqiqada o'zi yangilanadi (ISR), qayta joylash shart emas.

---

## Waitlist ma'lumotlari bilan ishlash

Jadvalni **Supabase → Table Editor → `waitlist`** da ko'rasiz, **Export** orqali CSV yuklab olasiz. `status` ustuni (`new`, `contacted`, `invited`, `unsubscribed`) va `notes` — o'z ish jarayoningiz uchun.

Foydali so'rovlar (SQL Editor):

```sql
-- jami
select count(*) from public.waitlist;

-- rol bo'yicha (talaba / ota-ona / agentlik)
select role, count(*) from public.waitlist group by role order by 2 desc;

-- til bo'yicha
select locale, count(*) from public.waitlist group by locale order by 2 desc;

-- qaysi manbadan kelishmoqda (utm_source)
select coalesce(source, '(to''g''ridan-to''g''ri)') as source, count(*)
from public.waitlist group by 1 order by 2 desc;

-- qaysi yo'nalishlar qiziqtiradi
select i as interest, count(*) from public.waitlist, unnest(interests) as i
group by i order by 2 desc;

-- oxirgi 20 ta ariza
select created_at, role, contact, full_name, org_name, students_band, interests, locale, source
from public.waitlist order by created_at desc limit 20;

-- bog'langan deb belgilash
update public.waitlist set status = 'contacted' where contact = '@username';

-- o'chirish talabi bo'yicha (shaxsning huquqi)
delete from public.waitlist where contact = '@username';
```

Kontakt formati bazaga normallashtirib yoziladi: `@telegram` (kichik harf), `+998…` telefon yoki kichik harfli email. Bir xil kontakt ikki marta yozilsa, ikkinchi qator qo'shilmaydi — foydalanuvchiga "allaqachon ro'yxatdasiz" deyiladi.

**Kampaniyalarni kuzatish:** havolaga `?utm_source=instagram&utm_medium=bio&utm_campaign=launch` qo'shing — qiymatlar `source / medium / campaign` ustunlariga yoziladi va til yo'naltirishdan keyin ham saqlanadi.

---

## Spamdan himoya

Formada quyidagilar bor:

- yashirin tuzoq maydon (`website`) — botlar to'ldiradi, odamlar ko'rmaydi;
- 2 soniyadan tez yuborish rad etiladi (jimgina "muvaffaqiyat" qaytaradi);
- IP bo'yicha daqiqada 5 ta urinish chegarasi — **bu har bir server nusxasi uchun alohida, xotirada turadi, shuning uchun faqat yengil himoya**;
- server tomonidagi tekshiruv va uzunlik cheklovlari; bazada `contact` bo'yicha unikal cheklov.

Jiddiy hujum bo'lsa: Vercel panelida **Firewall** orqali POST so'rovlar uchun rate-limit qoidasi qo'shing yoki formaga Cloudflare Turnstile ulang.

---

## Ishga tushirishdan oldingi ro'yxat

- [ ] Brend nomi tayyormi (domen, tovar belgisi tekshiruvi)? `src/lib/site.ts`
- [ ] `NEXT_PUBLIC_COMPANY_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` — haqiqiy qiymatlar
- [ ] Huquqiy matnlarni yurist ko'rib chiqdi (lokalizatsiya masalasi bilan birga)
- [ ] Reestrdagi har bir yozuv rasmiy sahifadan qayta tekshirildi, `verifiedOn` yangilandi
- [ ] Supabase: migratsiya bajarilgan, jadvalda RLS yoqilgan (Table Editor'da ko'rinadi)
- [ ] Vercel: env'lar kiritilgan va **Redeploy** qilingan
- [ ] Jonli saytda 3 tilning har birida formani to'ldirib sinab ko'rdingiz va qator Supabase'da paydo bo'ldi
- [ ] `https://domeningiz/sitemap.xml` va `/robots.txt` ochiladi; havolani Telegram'ga tashlab, ko'rinish (OG-rasm) tekshirildi
- [ ] Vercel Pro va Supabase Pro (yoki ongli ravishda Free)

---

## Muammolar va yechimlar

| Alomat | Sabab |
|---|---|
| Forma production'da "xizmat vaqtincha mavjud emas" deydi | `NEXT_PUBLIC_SUPABASE_URL` yoki `SUPABASE_SECRET_KEY` yo'q/xato, yoki env'dan keyin Redeploy qilinmagan |
| Forma "muvaffaqiyat" deydi, lekin jadval bo'sh | Siz dev (demo) rejimdasiz — env to'ldirilmagan |
| Qatorlar tushmayapti | Migratsiya bajarilmagan; `publishable` kalit qo'yilgan (kerak: `sb_secret_…`); jadval nomi `public.waitlist` emas |
| Ijtimoiy tarmoqda `localhost` ko'rinadi | `NEXT_PUBLIC_SITE_URL` berilmagan; bering va Redeploy qiling |
| Supabase loyihasi "paused" | Free reja; panelda **Restore** bosing yoki Pro'ga o'ting |
| Build: "Property … is missing in type" | Bir tilda matn kaliti yetishmayapti — `src/content/types.ts` bilan solishtiring |

---

## Loyiha tuzilmasi

```
.
├── assets/og/                  # OG-rasm uchun shriftlar (woff)
├── public/fonts/               # Onest, Sofia Sans Condensed (woff2) + litsenziyalar
├── scripts/make-okina-patch.py # ʻ glifi uchun shrift patchi
├── supabase/migrations/        # 0001_waitlist.sql
├── src/
│   ├── app/
│   │   ├── [locale]/           # layout, bosh sahifa, privacy, terms, 404, OG-rasm
│   │   ├── actions/waitlist.ts # forma qabul qiluvchi server action
│   │   ├── globals.css         # dizayn tokenlari va komponent stillari
│   │   ├── fonts.css           # @font-face
│   │   ├── robots.ts, sitemap.ts, icon.svg
│   ├── components/
│   │   ├── sections/           # Hero, DeadlineMap, Pricing, Waitlist, ...
│   │   ├── site/               # Header, Footer, LanguageSwitcher, JsonLd, ...
│   │   └── ui/                 # Logo, StatusStamp, EntryFacts, PrefillLink
│   ├── content/                # uz.ts, ru.ts, en.ts, types.ts, legal/
│   ├── data/registry.ts        # muddatlar reestri
│   └── lib/                    # site, i18n, dates, validation, rate-limit, supabase/admin, seo ...
├── next.config.ts              # yo'naltirish, xavfsizlik sarlavhalari
├── vercel.json                 # region: fra1
└── .env.example
```

---

## Nima tekshirilgan va nima tekshirilmagan

**Tekshirilgan:** `typecheck` va `build` xatosiz; barcha sahifalar va til yo'naltirishlari; 45 ta avtomatik xatti-harakat tekshiruvi (muddatlar xaritasi filtrlari, forma validatsiyasi va fokus, rozilik, takroriy kontakt, spam tuzoqlari, agentlik maydonlari, til almashtirish, mobil menyu, skip-link); `axe-core` bo'yicha qulaylik tekshiruvi (9 ta holat, 0 ta buzilish); 320–1440px oralig'ida gorizontal skroll yo'qligi (3 til × 7 sahifa × 9 kenglik); muddatlar o'qidagi oy yozuvlari tor ekranlarda bir-biriga tegmasligi; production build'da Supabase kalitlarisiz forma "xizmat vaqtincha mavjud emas" deyishi; secret kalit brauzer paketlariga tushmagani; ZIP'ni toza papkaga ochib `npm ci` + `typecheck` + `build` qilinishi.

**Tekshirilmagan:** haqiqiy Supabase va haqiqiy Vercel'ga joylash (lokalda faqat soxta PostgREST server bilan sinalgan); Safari/Firefox va haqiqiy telefonlar (faqat Chromium); Lighthouse/tezlik ballari; huquqiy matnlarning yuridik to'g'riligi.
