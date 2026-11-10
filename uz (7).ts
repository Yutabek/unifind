import type { Dict } from "./types";
import { privacyUz, termsUz } from "./legal/uz";

/**
 * Oʻzbek (lotin). Yozuv qoidasi: oʻ va gʻ uchun ʻ (U+02BB), tutuq belgisi
 * uchun ʼ (U+02BC). Sonlarda minglik guruhlar orasida boʻlinmas probel.
 */
export const uz: Dict = {
  meta: {
    title: "{brand}: manbali stipendiya muddatlari, Telegramda",
    description:
      "Oʻzbekistonlik talabalar uchun chet elda oʻqish yordamchisi. Har bir muddat rasmiy sahifasi va oxirgi tekshirilgan kuni bilan koʻrsatiladi. Vengriya, Türkiye, Janubiy Koreya va Germaniya.",
    ogTagline: "Tekshirish mumkin boʻlgan stipendiya muddatlari.",
  },

  common: {
    skip: "Asosiy mazmunga oʻtish",
    menuOpen: "Menyuni ochish",
    menuClose: "Menyuni yopish",
    language: "Til",
    external: "yangi oynada ochiladi",
    back: "Bosh sahifaga qaytish",
  },

  dates: {
    monthsGen: [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentabr",
      "oktabr",
      "noyabr",
      "dekabr",
    ],
    monthsShort: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"],
    full: "{y}-yil {d}-{m}",
    day: "{d}-{m}",
    abbr: "{d}-{ms}",
  },

  status: {
    confirmed: "Tasdiqlangan",
    expected: "Kutilmoqda",
    rolling: "Turlicha",
    unconfirmed: "Tasdiqlanmagan",
    closed: "Yopilgan",
  },
  statusHelp: {
    confirmed: "Bu sanani rasmiy sahifa koʻrsatgan.",
    expected: "Oldingi davrga asoslangan taxmin. Hali rasmiy emas.",
    rolling: "Sanalar dastur yoki universitetga qarab farq qiladi.",
    unconfirmed: "Manbalar bir-biriga zid. Rasmiy eʼlonni kuting.",
    closed: "Bu muddat oʻtib ketgan.",
  },
  legend: {
    confirmed: "Rasmiy sahifada koʻrsatilgan",
    expected: "Kutilmoqda, hali rasmiy emas",
    rolling: "Dasturga qarab turlicha",
    unconfirmed: "Manbalar bir-biriga zid",
    closed: "Muddat oʻtgan",
  },
  levels: { bachelor: "Bakalavr", master: "Magistratura", phd: "Doktorantura" },
  corridors: {
    hungary: "Vengriya",
    turkiye: "Türkiye",
    korea: "Janubiy Koreya",
    germany: "Germaniya",
  },

  nav: {
    windows: "Muddatlar",
    how: "Qanday ishlaydi",
    trust: "Qoidalarimiz",
    pricing: "Narx",
    agencies: "Agentliklar",
    faq: "Savollar",
    cta: "Erta kirishga yozilish",
  },

  hero: {
    badge: "Erta kirish ochiq",
    q: "Stipendiya qachon ochiladi?",
    a: "Javob — manbasi bilan.",
    lead: "{brand} — oʻzbekistonlik talabalar uchun Telegramdagi yordamchi. U Vengriya, Türkiye, Janubiy Koreya va Germaniya boʻyicha rasmiy sahifalardan javob beradi, har bir sana oxirgi marta qachon tekshirilganini koʻrsatadi va sana faqat kutilayotgan boʻlsa, buni ochiq aytadi.",
    ctaPrimary: "Erta kirishga yozilish",
    ctaSecondary: "Muddatlarni koʻrish",
    note: "Muddatlar xaritasi hozir ishlaydi. Telegram yordamchi avval kutish roʻyxatidagilarga ochiladi.",
    chat: {
      title: "{brand} Telegramda",
      user: "{name} qachon ochiladi?",
      typing: "Yozmoqda",
      reply: {
        expected:
          "Reyestrimda bu sana kutilmoqda, tasdiqlanmagan: u oldingi davrga asoslangan. Mana yozuv.",
        confirmed: "Rasmiy sahifada tasdiqlangan. Mana yozuv.",
        rolling: "Bu dasturga qarab turlicha. Mana yozuv.",
        unconfirmed: "Bu boʻyicha manbalar bir-biriga zid, shuning uchun taxmin qilmayman. Mana yozuv.",
        closed: "Bu muddat yopilgan. Mana yozuv.",
      },
    },
  },

  entry: {
    route: "Toshkentdan {place}ga yoʻnalish",
    opens: "Ochiladi",
    deadline: "Oxirgi muddat",
    checked: "Tekshirilgan",
    source: "Rasmiy sahifa",
    noDate: "Eʼlon qilinmagan",
    phase: {
      upcoming: {
        one: "{n} kundan keyin",
        few: "{n} kundan keyin",
        many: "{n} kundan keyin",
        other: "{n} kundan keyin",
      },
      open: { one: "{n} kun qoldi", few: "{n} kun qoldi", many: "{n} kun qoldi", other: "{n} kun qoldi" },
      ended: "Muddat tugagan",
      closed: "Yopilgan",
      varies: "Sanalar turlicha",
    },
    stale: "Qayta tekshirish kutilmoqda",
    staleHelp: "Bu yozuv {n} kundan ortiq tekshirilmagan. Rasmiy sahifadan tasdiqlab oling.",
  },

  windows: {
    title: "Muddatlar — bugungi bilimimiz boʻyicha",
    lead: "Toʻliq chiziqlar — rasmiy sahifa koʻrsatgan sanalar. Shtrixlangan chiziqlar — kutilmoqda: oldingi davrga asoslangan taxmin, eʼlon emas. Xaritani qisqartirish uchun daraja yoki mamlakatni tanlang.",
    mapLabel: "Muddatlar xaritasi",
    listLabel: "Dasturlar",
    filters: { level: "Daraja", destination: "Mamlakat", all: "Hammasi", clear: "Filtrlarni tozalash" },
    today: "Bugun",
    detail: {
      whatNow: "Hozir nima qilish kerak",
      remind: "Bu haqda eslatma olish",
      official: "Rasmiy sahifani ochish",
    },
    next: {
      confirmed:
        "Rasmiy sahifada talablarni tekshiring va hujjatlarni yigʻishni boshlang. Muddatni kalendaringizga yozib qoʻying.",
      expected:
        "Hujjatlarni hozirdan tayyorlang: pasport muddati, nusxalar, til imtihoni rejasi. Kutilgan sanada rasmiy sahifani ochib, sanalarni tasdiqlab oling, keyin ularga tayaning.",
      rolling:
        "Sanalar dastur va universitetga qarab farq qiladi. Siz tanlagan dastur sahifasini ochib, uning oʻz muddatini yozib oling.",
      unconfirmed:
        "Manbalar bir-biriga zid, shuning uchun hozircha rejalashtirishga asos yoʻq. Harakat qilishdan oldin rasmiy sahifani yana tekshiring.",
      closed: "Bu muddat oʻtib ketgan. Keyingi muddat qachon boʻlishini aniqlang va oʻshanga tayyorlaning.",
    },
    empty: "Bu filtrlarga mos dastur yoʻq.",
    footnote:
      "Oxirgi tekshiruv: {date}. Rasmiy sahifa biz bilan farq qilsa, rasmiy sahifaga ishoning va bizga {email} manziliga yozing. Xatolarni 24 soat ichida tuzatishni maqsad qilamiz.",
  },

  registry: {
    sh: {
      name: "Stipendium Hungaricum 2027/28",
      note: "Vengriya hukumatining stipendiya dasturi. Ariza bir necha kanal orqali topshiriladi, shuning uchun muddat ochilishidan oldin rasmiy qadamlarni oʻqib chiqing.",
    },
    tb: {
      name: "Türkiye Bursları 2027",
      note: "Turkiya hukumatining stipendiya dasturi. Koʻrsatilgan muddat oldingi davrga asoslangan.",
    },
    "gks-u-embassy": {
      name: "GKS bakalavr 2027, elchixona yoʻli",
      note: "Bu qabul uchun elchixona yoʻli yopilgan. Quyidagi universitet yoʻli hali ochiq boʻlishi mumkin.",
    },
    "gks-u-university": {
      name: "GKS bakalavr 2027, universitet yoʻli",
      note: "Har bir universitet sanalarni oʻzi belgilaydi. Siz tanlagan universitetlar sahifalarini tekshiring.",
    },
    "gks-g": {
      name: "GKS magistratura va doktorantura",
      note: "Eʼlon qilingan manbalar muddat boʻyicha bir-biriga zid, shuning uchun sana koʻrsatmaymiz.",
    },
    daad: {
      name: "DAAD stipendiyalari",
      note: "DAAD koʻplab dasturlarni yuritadi, har birining oʻz chaqiruvi va muddati bor. Kerakli dasturni oching.",
    },
  },

  problem: {
    title: "Maʼlumot koʻp. Ishonchli maʼlumot kam.",
    items: [
      {
        lead: "2025-yilda 28 954 kishi oʻqish uchun chet elga ketgan.",
        body: "Bu 2024-yilga nisbatan 19,3% kam. Oʻtkazib yuborilgan sana yoki xato hujjat hali ham butun bir yilga tushishi mumkin.",
      },
      {
        lead: "Bir sahifada ikki xil sana.",
        body: "Tadqiqot paytida 2027-yil stipendiyalari haqidagi sahifalarda kutilgan va tasdiqlangan sanalar aralash berilganini, kamida bittasida esa yil xato koʻrsatilganini topdik. Tekshirib boʻlmaydigan sanaga tayanib boʻlmaydi.",
      },
      {
        lead: "Yordam 4,0 mln soʻmdan boshlanadi.",
        body: "Agentliklar eʼlon qilgan standart paketlar taxminan 4,0 dan 10,7 mln soʻmgacha — bu oʻrtacha oylik ish haqining 55–148%i. Baʼzilari qabul yoki vizani kafolatlaydi. Buni hech kim kafolatlay olmaydi.",
      },
    ],
    sources:
      "Manbalar: Milliy statistika qoʻmitasi, Kun.uz orqali (2026-yil 12-fevral); Statistika agentligi, 2026-yil yanvar–sentabrda oʻrtacha oylik ish haqi 7,27 mln soʻm; agentliklarning narx sahifalari, 2026-yil noyabr (dollardagi narxlar Markaziy bankning 11 941,65 soʻmlik kursi, 2026-yil 3-noyabr, boʻyicha oʻgirilgan).",
  },

  how: {
    title: "Savoldan rejagacha",
    lead: "Har bir mamlakat uchun bir xil toʻrt qadam.",
    steps: [
      {
        title: "Holatingizni ayting",
        body: "Oʻn ikki savol: daraja, mamlakatlar, til imtihonlari, byudjet, qachon boshlamoqchisiz. Taxminan besh daqiqa.",
      },
      {
        title: "Manbali tavsiyalarni oling",
        body: "Sizga mos uchtagacha mamlakat va dastur — har birining rasmiy sahifasi va tekshirilgan kuni bilan.",
      },
      {
        title: "Kalendaringizni oling",
        body: "Muddatlar kalendari va Telegramdagi eslatmalar. Kutilgan sanalar rasmiy sahifa tasdiqlamaguncha “kutilmoqda” deb belgilanadi.",
      },
      {
        title: "Hujjatlarni tayyorlang",
        body: "Har bir dastur uchun roʻyxatlar va hujjatlaringiz boʻyicha fikr-mulohaza. Yozasiz — siz, koʻrib chiqamiz — biz.",
      },
    ],
    note: "Birinchi ikki qadam va 14 kunlik kalendar bepul. Toʻliq reja, eslatmalar va hujjatlar boʻyicha fikr-mulohaza Application Pass tarkibida.",
  },

  routes: {
    title: "Toshkentdan toʻrt yoʻnalish",
    lead: "Biz oʻzbekistonlik talabalar koʻp boradigan va rasmiy stipendiyalar mavjud joylardan boshlaymiz. Buyuk Britaniya va AQSh ishga tushgandan keyin qoʻshiladi.",
    from: "Toshkentdan (TAS)",
    items: {
      hungary: {
        tagline: "Stipendium Hungaricum",
        body: "Vengriya hukumatining stipendiyasi. Uning ochilish sanasini va ariza qadamlarini kuzatamiz.",
      },
      turkiye: {
        tagline: "Türkiye Bursları",
        body: "Turkiya hukumatining stipendiyasi. Yiliga bitta asosiy muddat: rasmiy sahifa tasdiqlaguncha uni oldingi davr asosida kuzatamiz.",
      },
      korea: {
        tagline: "GKS",
        body: "Janubiy Koreya hukumati stipendiyalarida elchixona yoʻli va universitet yoʻli bor, sanalari har xil. Ikkalasini alohida koʻrsatamiz.",
      },
      germany: {
        tagline: "DAAD",
        body: "Germaniyada stipendiyalar koʻp dasturlarga boʻlingan. Har birini oʻz chaqiruvi va muddati bilan keltiramiz.",
      },
    },
    studentsLabel: "2025-yilda oʻqishga ketganlar",
    students: { hungary: "", turkiye: "2 496", korea: "3 513", germany: "391" },
    sourceNote:
      "2025-yilda oʻqish maqsadida ketganlar: Milliy statistika qoʻmitasi, Kun.uz va Dunyo IA orqali. Vengriya boʻyicha alohida eʼlon qilingan raqam topa olmadik.",
  },

  trust: {
    title: "Oʻzimizga qoʻygan qoidalar",
    lead: "Chet elda oʻqish yordamchisi faqat unga ishonish mumkin boʻlsagina foydali. Mahsulot shu qoidalar ustiga qurilgan.",
    items: [
      {
        title: "Har bir fakt manbali",
        body: "Muddat va talablar reyestrdan olinadi: har bir yozuvda rasmiy sahifa va oxirgi tekshirilgan kun koʻrsatilgan.",
      },
      {
        title: "Kutilgan — tasdiqlangan emas",
        body: "Taxmin taxmin deb belgilanadi. Yozuv uch hafta tekshirilmasa, sahifaning oʻzi buni aytadi.",
      },
      {
        title: "Yoʻl koʻrsatamiz, oʻrningizga yozmaymiz",
        body: "Savol beramiz, boʻshliqlarni koʻrsatamiz, fikr bildiramiz. Insho va xatlaringiz oʻzingiznikiligicha qoladi.",
      },
      {
        title: "Qabul yoki vizaga vaʼda yoʻq",
        body: "Buni qoʻmita va elchixonadan boshqa hech kim vaʼda qila olmaydi. Biz ham qilmaymiz.",
      },
      {
        title: "Pul evaziga tavsiya yoʻq",
        body: "Hech bir agentlik, universitet yoki dastur tavsiya etilish uchun toʻlay olmaydi. Odatda agentliklarni umuman tavsiya qilmaymiz.",
      },
      {
        title: "Xatolar tez tuzatiladi",
        body: "Nimadir notoʻgʻri boʻlsa, ayting: 24 soat ichida tuzatishni yoki nega tuzatmaganimizni tushuntirishni maqsad qilamiz.",
      },
    ],
  },

  pricing: {
    title: "Bitta narx, obunasiz",
    lead: "Erta kirish narxlari. Bugun hech narsa yechilmaydi: Payme va Click orqali toʻlov ishga tushganda ochiladi.",
    plans: [
      {
        name: "Diagnostika",
        price: "Bepul",
        usd: "",
        tagline: "Holatingizni koʻring.",
        features: [
          "12 savollik profil",
          "Uchta eng mos variant, har biri manbasi bilan",
          "14 kunlik muddatlar kalendari",
        ],
        cta: "Erta kirishga yozilish",
      },
      {
        name: "Application Pass",
        price: "490 000 soʻm",
        usd: "taxminan $41",
        tagline: "Bir ariza mavsumi uchun hammasi.",
        features: [
          "12 oy davomida foydalanish",
          "10 tagacha dasturdan iborat tanlov",
          "Shaxsiy reja va Telegram eslatmalari",
          "Har bir dastur uchun hujjatlar roʻyxati",
          "3 ta hujjatni koʻrib chiqish",
          "Qoʻllab-quvvatlanadigan mamlakatlar uchun viza roʻyxati",
          "7 kun ichida pulni qaytarish",
        ],
        cta: "Erta kirishga yozilish",
      },
      {
        name: "Pass+",
        price: "990 000 soʻm",
        usd: "taxminan $83",
        tagline: "Koʻproq fikr-mulohaza, oila ham jarayondan xabardor.",
        features: [
          "Application Passdagi hamma narsa",
          "15 tagacha hujjatni koʻrib chiqish",
          "Matnli mock-suhbat",
          "Bitta yozma ekspert xulosasi",
          "Oila uchun holat sahifasi",
          "Ustuvor yordam",
        ],
        cta: "Erta kirishga yozilish",
      },
    ],
    usdNote: "Dollar summalari Markaziy bankning 11 941,65 soʻm/USD kursi (2026-yil 3-noyabr) boʻyicha.",
    guarantee: "Hech bir tarif qabul, stipendiya yoki vizani kafolatlamaydi.",
    groupNote: "Maktab va IELTS markazlari: guruh litsenziyasi haqida soʻrang.",
  },

  agencies: {
    title: "Agentliklar uchun: koʻproq ish, bir xil sifat",
    lead: "Maslahatchilar hujjatlar, ota-onalarning holat haqidagi savollari va muddatlar tirbandligiga soatlab vaqt sarflaydi. {brand} takrorlanadigan qismini oladi, maslahatni sizga qoldiradi.",
    points: [
      {
        title: "Maslahatchiga koʻproq faol ish",
        body: "Roʻyxatlar, eslatmalar va hujjatlarni dastlabki tekshirish oʻzi ishlaydi.",
      },
      {
        title: "Qoʻngʻiroqsiz ota-ona xabarlari",
        body: "Oilalar har bir ariza qayerda ekanini koʻradi, hech kim soʻrashi shart emas.",
      },
      {
        title: "Andozalar va umumiy reyestr",
        body: "Jamoangiz va talabalaringiz bir xil manbali muddatlarni koʻradi.",
      },
      {
        title: "Murojaatdan arizagacha tahlil",
        body: "Qaysi kanal va yoʻnalish haqiqatan ariza topshiradigan talabalarni olib kelishini koʻring.",
      },
    ],
    pilot: {
      title: "Pilot: 30 kun, bepul",
      body: "10 tagacha faol talaba. Sozlashni siz bilan birga qilamiz, evaziga ochiq fikringizni soʻraymiz.",
      cta: "Pilotga ariza berish",
    },
    policy:
      "Talabalarga odatda agentliklarni tavsiya qilmaymiz va pullik joylashtirish yoʻq. Pilotdagi agentliklar oʻz xohishi bilan yoʻnaltirilgan murojaatlarni olishi mumkin; ular aniq “yoʻnaltirilgan” deb belgilanadi.",
  },

  faq: {
    title: "Koʻp beriladigan savollar",
    items: [
      {
        q: "{brand} nima va bugun nima ishlaydi?",
        a: "{brand} — oʻzbekistonlik talabalar uchun rasmiy sahifalardan javob beradigan chet elda oʻqish yordamchisi. Bugun shu sahifadagi muddatlar xaritasi ishlaydi. Telegram yordamchi bosqichma-bosqich ochilmoqda, kutish roʻyxatidagilar birinchi boʻlib kiradi.",
      },
      {
        q: "Qabul yoki vizani kafolatlaysizmi?",
        a: "Yoʻq. Qabulni universitet yoki stipendiya qoʻmitasi, vizani elchixona hal qiladi. Biz tayyorlanishga va jarayonni kuzatishga yordam beramiz. Natijani hech qachon vaʼda qilmaymiz.",
      },
      {
        q: "Insho yoki motivatsion xatni siz yozib berasizmi?",
        a: "Yoʻq. Savol beramiz, zaif joylarni koʻrsatamiz va qoralamalaringizga fikr bildiramiz. Matn sizniki qoladi, qoʻmitalar ham shuni kutadi.",
      },
      {
        q: "Sanalar qayerdan olinadi va qanchalik yangi?",
        a: "Rasmiy sahifalardan. Reyestrdagi har bir yozuvda manba va oxirgi tekshirilgan kun koʻrsatilgan. Sana faqat taxmin boʻlsa, “Kutilmoqda” deb belgilanadi. Yozuv uch hafta tekshirilmasa, sahifaning oʻzi buni aytadi.",
      },
      {
        q: "Narxi qancha va pulni qaytarib olsa boʻladimi?",
        a: "Diagnostika bepul. Application Pass bir martalik 490 000 soʻm, 7 kun ichida pulni qaytarish bilan. Ishga tushguncha hech narsa yechilmaydi, shundan keyin Payme va Click orqali toʻlov ochiladi.",
      },
      {
        q: "Maʼlumotlarim bilan nima boʻladi?",
        a: "Siz qoldirgan aloqa maʼlumoti va tanlagan javoblaringiz Germaniyaning Frankfurt shahridagi serverlarda saqlanadi. Biometrik maʼlumot yigʻmaymiz. Hammasini oʻchirishni {email} manziliga yozib soʻrashingiz mumkin. Tafsilotlar maxfiylik siyosatida.",
      },
      {
        q: "Qaysi mamlakatlarni qamrab olasiz?",
        a: "Avval Vengriya, Türkiye, Janubiy Koreya va Germaniya. Buyuk Britaniya va AQSh ishga tushgandan keyin.",
      },
      {
        q: "Men agentlik rahbariman. Qanday qatnashamiz?",
        a: "30 kunlik pilotga ariza bering. 10 tagacha faol talaba uchun birga sozlaymiz, nima ishlashini esa siz aytasiz.",
      },
      {
        q: "Qaysi tillarda ishlaydi?",
        a: "Oʻzbek, rus va ingliz tillarida — ham sayt, ham yordamchi.",
      },
    ],
  },

  waitlist: {
    title: "Erta kirishga yoziling",
    lead: "Bitta aloqa maʼlumotini qoldiring. Yoʻnalishingiz ochilganda yozamiz, yordamchi ishga tushgach esa eslatmalar yuboramiz.",
    roleLabel: "Men",
    roles: { student: "Talabaman", parent: "Ota-onaman", agency: "Agentlikman" },
    contactLabel: "Telegram username, telefon yoki email",
    contactHint: "Faqat {brand} haqida siz bilan bogʻlanish uchun ishlatamiz.",
    contactPlaceholder: "@username yoki +998 90 123 45 67",
    nameLabel: "Ismingiz",
    optional: "ixtiyoriy",
    interestsLabel: "Qiziqtiradi",
    interests: {
      hungary: "Vengriya",
      turkiye: "Türkiye",
      korea: "Janubiy Koreya",
      germany: "Germaniya",
      unsure: "Hali bilmayman",
    },
    orgLabel: "Agentlik nomi",
    studentsLabel: "Hozir faol talabalar soni",
    studentsOptions: ["1–10", "11–30", "31–100", "100 dan ortiq"],
    consent:
      "Maxfiylik siyosati bilan tanishdim va {company} aloqa maʼlumotimni {brand} haqida yozish uchun saqlashiga roziman.",
    privacyLink: "Maxfiylik siyosati",
    submit: "Erta kirishga yozilish",
    submitting: "Yuborilmoqda…",
    success: {
      title: "Roʻyxatdasiz.",
      body: "Yoʻnalishingiz ochilganda sizga yozamiz. Shu vaqtgacha yuqoridagi muddatlar xaritasi yangilanib turadi.",
      already: "Bu aloqa maʼlumoti roʻyxatda allaqachon bor. Boshqa hech narsa qilish shart emas.",
      telegram: "Telegramimizni ochish",
    },
    errors: {
      required: "Buni toʻldiring.",
      contact: "Telegram username, davlat kodi bilan telefon raqam yoki email kiriting.",
      consent: "Davom etish uchun tasdiqlang.",
      role: "Kim ekanligingizni tanlang.",
      org: "Agentlik nomini kiriting.",
      generic: "Bizning tomonda xatolik boʻldi. Bir daqiqadan keyin qayta urinib koʻring.",
      unavailable: "Roʻyxat vaqtincha ishlamayapti. Birozdan keyin qayta urinib koʻring.",
      rate: "Urinishlar juda koʻp. Bir daqiqa kutib, qayta urinib koʻring.",
    },
    count: "Roʻyxatda hozir {n} kishi bor",
  },

  footer: {
    tagline: "Tekshirish mumkin boʻlgan stipendiya muddatlari.",
    disclaimer:
      "{brand} — mustaqil xizmat. U Vengriya, Turkiya, Koreya yoki Germaniya hukumatlari, DAAD yoki biror universitet bilan bogʻliq emas va ularning nomidan ish yuritmaydi.",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanish shartlari",
    registryChecked: "Reyestr oxirgi marta tekshirilgan: {date}",
    rights: "© {year} {company}",
    contact: "Aloqa",
  },

  notFound: {
    title: "Bunday sahifa yoʻq",
    body: "Havola eskirgan yoki xato yozilgan boʻlishi mumkin.",
    cta: "Bosh sahifaga oʻtish",
  },

  legal: { privacy: privacyUz, terms: termsUz },
};
