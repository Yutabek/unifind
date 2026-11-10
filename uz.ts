import type { LegalDoc } from "../types";

/**
 * LOYIHA MATNLARI. Bu hujjatlar saytning bugungi amaldagi ishini oddiy tilda
 * tasvirlaydi va yuridik maslahat emas. Haqiqiy maʼlumotlarni koʻp yigʻishdan
 * oldin Oʻzbekiston qonunchiligini biladigan yurist ularni koʻrib chiqib,
 * moslashtirsin (kompaniya rekvizitlari, saqlash muddati, amaldagi qonun,
 * vakolatli organ).
 */

export const privacyUz: LegalDoc = {
  title: "Maxfiylik siyosati",
  updated: "Oxirgi yangilanish: 2026-yil 10-noyabr",
  intro:
    "Ushbu hujjat {company} (“biz”) {brand} saytida siz qoldirgan maʼlumotlar bilan nima qilishini tushuntiradi. Biz juda kam maʼlumot yigʻamiz, shuning uchun hujjat qisqa.",
  sections: [
    {
      heading: "Biz kimmiz",
      paragraphs: [
        "{brand} xizmatini {company} yuritadi. Ushbu hujjatdagi har qanday masala boʻyicha {email} manziliga yozishingiz mumkin.",
      ],
    },
    {
      heading: "Nimalarni yigʻamiz",
      paragraphs: ["Erta kirishga yozilganingizda forma bizga quyidagilarni yuboradi:"],
      items: [
        "aloqa maʼlumotingiz: Telegram username, telefon raqam yoki email;",
        "kimligingiz (talaba, ota-ona yoki agentlik) va xohlasangiz, ismingiz;",
        "qiziqqan mamlakatlaringiz;",
        "agentliklar uchun: agentlik nomi va faol talabalar soni oraligʻi;",
        "sahifa tili, kelgan havolangizdagi kampaniya belgilari, shuningdek rozilik vaqti va versiyasi.",
      ],
    },
    {
      heading: "Nimalarni yigʻmaymiz",
      paragraphs: [
        "Pasport, baho, rasm, biometrik yoki genetik maʼlumotlarni soʻramaymiz va saytda reklama yoki tahlil kuzatuvchilarini ishlatmaymiz.",
      ],
    },
    {
      heading: "Nima uchun foydalanamiz",
      paragraphs: [
        "Aloqa maʼlumotingizdan erta kirish haqida yozish va yordamchi ishga tushgach, siz soʻragan eslatmalarni yuborish uchun foydalanamiz. Qolgan javoblardan qaysi mamlakatlar muhimroq ekanini tushunish uchun foydalanamiz. Asos — sizning rozilingiz; uni istalgan vaqtda qaytarib olishingiz mumkin.",
      ],
    },
    {
      heading: "Qayerda saqlanadi",
      paragraphs: [
        "Kutish roʻyxati Germaniyaning Frankfurt shahridagi (Yevropa Ittifoqi) serverda joylashgan maʼlumotlar bazasida saqlanadi. Sayt Vercel orqali taqdim etiladi. Ikkalasi ham bizning nomimizdan ishlaydi; server jurnallarida IP-manzilingiz qisqa muddat saqlanishi mumkin. Maʼlumotlaringizni sotmaymiz va reklama uchun boshqalarga bermaymiz.",
      ],
    },
    {
      heading: "Qancha saqlanadi",
      paragraphs: [
        "Rozilikni qaytarib olguningizcha yoki oʻchirishni soʻraguningizcha, har qanday holatda roʻyxatga yozilganingizdan keyin 24 oydan oshmaydi.",
      ],
    },
    {
      heading: "Huquqlaringiz",
      paragraphs: [
        "Biz saqlayotgan maʼlumotni koʻrsatishni, tuzatishni, oʻchirishni yoki ishlatishni toʻxtatishni soʻrashingiz mumkin. Qoldirgan aloqa vositangizdan {email} manziliga yozing, imkon qadar tez va 30 kun ichida javob beramiz. Shuningdek, Oʻzbekistonda shaxsga doir maʼlumotlarni himoya qilish uchun masʼul organga shikoyat qilishingiz mumkin.",
      ],
    },
    {
      heading: "Cookie fayllari",
      paragraphs: [
        "Sayt faqat tanlagan tilingizni eslab qolish uchun bitta kichik “hamroh_lang” cookie faylini oʻrnatadi. Reklama yoki tahlil cookie fayllari yoʻq.",
      ],
    },
    {
      heading: "Xavfsizlik",
      paragraphs: [
        "Maʼlumotlar shifrlangan ulanish orqali uzatiladi. Kutish roʻyxati jadvaliga faqat bizning serverimiz yozishi mumkin va u ochiq internetdan oʻqilmaydi.",
      ],
    },
    {
      heading: "Oʻzgarishlar",
      paragraphs: [
        "Bu hujjatni muhim tarzda oʻzgartirsak, yuqoridagi sanani yangilaymiz va imkon boʻlsa, qoldirgan aloqa vositangiz orqali xabar beramiz.",
      ],
    },
  ],
};

export const termsUz: LegalDoc = {
  title: "Foydalanish shartlari",
  updated: "Oxirgi yangilanish: 2026-yil 10-noyabr",
  intro:
    "Ushbu saytdan foydalanib, shu shartlarga rozilik bildirasiz. Ular ataylab qisqa. Biror narsa tushunarsiz boʻlsa, {email} manziliga yozing.",
  sections: [
    {
      heading: "{brand} nima",
      paragraphs: [
        "{brand} — chet elda oʻqishni rejalashtirayotganlar uchun axborot va taʼlim xizmati. U erta kirish bosqichida: saytda tasvirlangan ayrim imkoniyatlar hali ishlab chiqilmoqda. {brand} qabul agentligi, elchixona yoki stipendiya beruvchi emas.",
      ],
    },
    {
      heading: "Kafolatlar yoʻq",
      paragraphs: [
        "Biz rasmiy sahifalarga tayanamiz va har bir yozuv oxirgi marta qachon tekshirilganini koʻrsatamiz. “Kutilmoqda” deb belgilangan sanalar — taxmin, eʼlon emas. Harakat qilishdan oldin har doim rasmiy sahifada tasdiqlab oling. Qabul, stipendiya va vizani universitetlar, qoʻmitalar va elchixonalar hal qiladi; biz natijani hech qachon vaʼda qilmaymiz.",
      ],
    },
    {
      heading: "Saytdan foydalanish",
      paragraphs: [
        "Roʻyxatga yozilganda toʻgʻri maʼlumot bering. Saytdan notoʻgʻri foydalanmang: boshqalarga taʼsir qiladigan ommaviy avtomatik yigʻish, saytni buzish yoki ortiqcha yuklash urinishlari mumkin emas.",
      ],
    },
    {
      heading: "Erta kirish va toʻlovlar",
      paragraphs: [
        "Bugun hech narsa yechilmaydi. Koʻrsatilgan narxlar — erta kirish uchun taxminiy narxlar. Toʻlov ochilganda u oʻz xarid shartlari bilan keladi, jumladan narxlar boʻlimida koʻrsatilgan pulni qaytarish muddati.",
      ],
    },
    {
      heading: "Kontent va nomlar",
      paragraphs: [
        "Saytning dizayni, matni va kodi {company}ga tegishli. Dastur, hukumat va tashkilot nomlari oʻz egalariga tegishli va faqat ularni tavsiflash uchun ishlatiladi. Biz ular bilan bogʻliq emasmiz.",
      ],
    },
    {
      heading: "Boshqa saytlarga havolalar",
      paragraphs: [
        "Faktlarni oʻzingiz tekshira olishingiz uchun rasmiy sahifalarga havola beramiz. Bu saytlarni nazorat qilmaymiz va ularning mazmuni uchun javobgar emasmiz.",
      ],
    },
    {
      heading: "Javobgarlik",
      paragraphs: [
        "Qonun ruxsat bergan darajada, {company} faqat shu saytga asoslangan qarorlar yoki oʻtkazib yuborilgan yoki oʻzgargan muddat sabab koʻrilgan zarar uchun javobgar emas. Bizga bildirilgan xatolarni 24 soat ichida tuzatishga harakat qilamiz.",
      ],
    },
    {
      heading: "Oʻzgarishlar va amaldagi qonun",
      paragraphs: [
        "Shartlarni yangilashimiz mumkin va shunda yuqoridagi sanani oʻzgartiramiz. Ushbu shartlarga Oʻzbekiston Respublikasi qonunchiligi qoʻllaniladi.",
      ],
    },
  ],
};
