// Demo sinf (9-B) uchun bugungi darslar.
// Har bir darsda: qisqacha mazmun, asosiy fikrlar, misol, hayotiy vazifa, uyda beriladigan savol va 3 ta test.
// Testlarning to‘g‘ri javoblari faqat serverda saqlanadi — brauzerga yuborilmaydi.

export const SINF = "9-B";

export const DEMO_OQUVCHI = {
  id: "aziza",
  ism: "Aziza Rahimova",
  sinf: SINF,
};

export const darslar = [
  {
    id: "algebra",
    fan: "Algebra",
    mavzu: "Kvadrat tenglamalar va diskriminant",
    oqituvchi: "Dilnoza Karimova",
    vaqt: "08:30",
    qisqacha:
      "Kvadrat tenglama — ax² + bx + c = 0 ko‘rinishidagi tenglama (a ≠ 0). Uning nechta ildizi borligini diskriminant aytib beradi.",
    asosiy: [
      "Diskriminant formulasi: D = b² − 4ac.",
      "D > 0 bo‘lsa — ikkita ildiz, D = 0 bo‘lsa — bitta ildiz, D < 0 bo‘lsa — haqiqiy ildiz yo‘q.",
      "Ildizlar formulasi: x = (−b ± √D) / 2a.",
    ],
    misol: {
      sarlavha: "x² − 5x + 6 = 0",
      qadamlar: ["a = 1, b = −5, c = 6", "D = 25 − 24 = 1", "x₁ = (5 + 1) / 2 = 3, x₂ = (5 − 1) / 2 = 2"],
    },
    uydaSavol: "Diskriminant nima uchun kerakligini menga oddiy so‘zlar bilan tushuntirib berasanmi?",
    amaliyot: {
      vazifa:
        "Tomorqada to‘g‘ri to‘rtburchak shaklidagi gulzor qilmoqchisiz. Uning bo‘yi enidan 3 m uzun, yuzi esa 40 m². Gulzorning tomonlari necha metr?",
      maslahat: "Enini x deb oling: x · (x + 3) = 40. Bu — kvadrat tenglama.",
      javob: "x² + 3x − 40 = 0, D = 9 + 160 = 169, x = (−3 + 13) / 2 = 5. Gulzor 5 m × 8 m.",
    },
    test: [
      {
        id: "q1",
        savol: "x² − 7x + 10 = 0 tenglamaning ildizlari qaysi?",
        variantlar: ["2 va 5", "−2 va −5", "1 va 10", "Ildizi yo‘q"],
        javob: 0,
        izoh: "D = 49 − 40 = 9, x = (7 ± 3) / 2, ya’ni 5 va 2.",
      },
      {
        id: "q2",
        savol: "x² + 2x + 5 = 0 uchun diskriminant nechaga teng?",
        variantlar: ["24", "−16", "16", "0"],
        javob: 1,
        izoh: "D = 2² − 4 · 1 · 5 = 4 − 20 = −16. Demak, haqiqiy ildiz yo‘q.",
      },
      {
        id: "q3",
        savol: "Agar D = 0 bo‘lsa, tenglama nechta ildizga ega?",
        variantlar: ["Ikkita", "Bitta", "Ildizi yo‘q", "Cheksiz ko‘p"],
        javob: 1,
        izoh: "D = 0 bo‘lsa, ikkala ildiz ustma-ust tushadi: x = −b / 2a.",
      },
    ],
  },
  {
    id: "fizika",
    fan: "Fizika",
    mavzu: "Nyutonning ikkinchi qonuni",
    oqituvchi: "Jasur Toshmatov",
    vaqt: "09:20",
    qisqacha:
      "Jismga ta’sir etuvchi kuch qancha katta bo‘lsa, u shuncha tez tezlashadi. Massa esa bu o‘zgarishga qarshilik qiladi.",
    asosiy: [
      "Formula: F = m · a (kuch = massa × tezlanish).",
      "Kuch birligi — nyuton (N): 1 N = 1 kg · m/s².",
      "Bir xil kuchda massasi kattaroq jism sekinroq tezlashadi.",
    ],
    misol: {
      sarlavha: "4 kg aravachaga 12 N kuch ta’sir qilmoqda",
      qadamlar: ["m = 4 kg, F = 12 N", "a = F / m", "a = 12 / 4 = 3 m/s²"],
    },
    uydaSavol: "Nima uchun bo‘sh aravachani itarish to‘la aravachani itarishdan osonroq?",
    amaliyot: {
      vazifa:
        "Siz (50 kg) velosipedda (15 kg) joyidan qo‘zg‘alib, 1,2 m/s² tezlanish oldingiz. Velosipedni shunday tezlashtirish uchun qancha kuch kerak? Ishqalanishni hisobga olmang.",
      maslahat: "Massalarni qo‘shing: siz va velosiped birga harakatlanasiz.",
      javob: "m = 50 + 15 = 65 kg, F = m · a = 65 · 1,2 = 78 N.",
    },
    test: [
      {
        id: "q1",
        savol: "Massasi 2 kg bo‘lgan jism 3 m/s² tezlanish oldi. Unga qancha kuch ta’sir qilgan?",
        variantlar: ["1,5 N", "5 N", "6 N", "9 N"],
        javob: 2,
        izoh: "F = m · a = 2 · 3 = 6 N.",
      },
      {
        id: "q2",
        savol: "Massa o‘zgarmasa-yu, kuch 2 marta oshsa, tezlanish qanday o‘zgaradi?",
        variantlar: ["2 marta kamayadi", "O‘zgarmaydi", "2 marta oshadi", "4 marta oshadi"],
        javob: 2,
        izoh: "a = F / m: kuch ikki barobar bo‘lsa, tezlanish ham ikki barobar bo‘ladi.",
      },
      {
        id: "q3",
        savol: "1 nyuton nimaga teng?",
        variantlar: ["1 kg · m/s²", "1 kg · m/s", "1 m/s²", "1 kg / s"],
        javob: 0,
        izoh: "1 N — 1 kg massali jismga 1 m/s² tezlanish beradigan kuch.",
      },
    ],
  },
  {
    id: "tarix",
    fan: "Tarix",
    mavzu: "Amir Temur davlatining tashkil topishi",
    oqituvchi: "Malika Yusupova",
    vaqt: "10:10",
    qisqacha:
      "XIV asr o‘rtalarida Movarounnahr mayda bo‘laklarga bo‘linib ketgan edi. Amir Temur ularni birlashtirib, poytaxti Samarqand bo‘lgan kuchli davlat tuzdi.",
    asosiy: [
      "Amir Temur 1336-yilda Kesh (hozirgi Shahrisabz) yaqinidagi Xo‘ja Ilg‘or qishlog‘ida tug‘ilgan.",
      "1370-yilda Balxdagi qurultoyda Movarounnahr hukmdori deb e’lon qilindi.",
      "Davlat poytaxti — Samarqand. U yerda Bibixonim masjidi kabi mashhur inshootlar qurildi.",
      "Davlatni boshqarish tartibi «Temur tuzuklari» asarida bayon etilgan.",
    ],
    misol: {
      sarlavha: "Yodda saqlash uchun uchta sana",
      qadamlar: ["1336 — tug‘ilgan", "1370 — hukmdor deb e’lon qilingan", "1405 — vafot etgan"],
    },
    uydaSavol: "Agar sen hukmdor bo‘lganingda, davlatni qanday qoidalar bilan boshqarar eding?",
    amaliyot: {
      vazifa:
        "Uyda kattalardan so‘rang: ular Amir Temur haqida qaysi rivoyat yoki hikoyani bilishadi? Uni darsdagi faktlar bilan solishtiring — qaysi qismi tarixiy, qaysi qismi rivoyat?",
      maslahat: "Sana, joy va ism bor qismlarni darslikdagi ma’lumot bilan tekshiring.",
      javob: null,
    },
    test: [
      {
        id: "q1",
        savol: "Amir Temur davlatining poytaxti qaysi shahar edi?",
        variantlar: ["Buxoro", "Samarqand", "Xiva", "Toshkent"],
        javob: 1,
        izoh: "Samarqand Temur davlatining poytaxti bo‘lgan va o‘sha davrda katta qurilishlar olib borilgan.",
      },
      {
        id: "q2",
        savol: "Amir Temur qaysi yilda Movarounnahr hukmdori deb e’lon qilingan?",
        variantlar: ["1336", "1370", "1405", "1220"],
        javob: 1,
        izoh: "1370-yilda Balxda o‘tgan qurultoyda.",
      },
      {
        id: "q3",
        savol: "Davlatni boshqarish qoidalari qaysi asarda yozilgan?",
        variantlar: ["«Boburnoma»", "«Temur tuzuklari»", "«Qutadg‘u bilig»", "«Xamsa»"],
        javob: 1,
        izoh: "«Temur tuzuklari»da davlat boshqaruvi, qo‘shin va adolat haqidagi qoidalar bayon etilgan.",
      },
    ],
  },
  {
    id: "ingliz",
    fan: "Ingliz tili",
    mavzu: "Present Perfect zamoni",
    oqituvchi: "Sardor Aliyev",
    vaqt: "11:10",
    qisqacha:
      "Present Perfect o‘tmishda bo‘lgan, lekin natijasi hozir ham muhim bo‘lgan ish-harakatni bildiradi.",
    asosiy: [
      "Tuzilishi: have / has + fe’lning 3-shakli (V3). Masalan: I have finished.",
      "He, she, it bilan has ishlatiladi: She has visited Samarkand.",
      "Ko‘p uchraydigan so‘zlar: already, yet, just, ever, never.",
      "Aniq vaqt aytilsa (yesterday, in 2020), Past Simple ishlatiladi.",
    ],
    misol: {
      sarlavha: "I have lost my key.",
      qadamlar: ["Kalitimni yo‘qotib qo‘ydim.", "Ish o‘tmishda bo‘lgan, lekin kalit hozir ham yo‘q.", "Shuning uchun Present Perfect."],
    },
    uydaSavol: "Ingliz tilida “Men allaqachon uy vazifamni qildim” qanday bo‘ladi?",
    amaliyot: {
      vazifa:
        "Samarqandga kelgan sayyohga 3 gapdan iborat xabar yozing: shahar haqida nimalarni ko‘rgansiz va qilgansiz. Har bir gapda Present Perfect bo‘lsin.",
      maslahat: "Have / has + V3: visit → visited, see → seen, try → tried.",
      javob: "Masalan: I have visited the Registan. I have seen Bibi-Khanym Mosque. I have tried Samarkand bread.",
    },
    test: [
      {
        id: "q1",
        savol: "She ___ her homework already.",
        variantlar: ["have finished", "has finished", "finished yet", "has finish"],
        javob: 1,
        izoh: "She bilan has ishlatiladi, undan keyin fe’lning 3-shakli: has finished.",
      },
      {
        id: "q2",
        savol: "I have never ___ to London.",
        variantlar: ["be", "was", "been", "being"],
        javob: 2,
        izoh: "Be fe’lining 3-shakli — been.",
      },
      {
        id: "q3",
        savol: "Qaysi gapda Present Perfect to‘g‘ri ishlatilgan?",
        variantlar: ["I have seen him yesterday.", "Have you ever tried plov?", "He has went home.", "They has done it."],
        javob: 1,
        izoh: "Ever bilan tajriba haqida so‘ralmoqda. «Yesterday» esa aniq vaqt, u Past Simple talab qiladi.",
      },
    ],
  },
  {
    id: "biologiya",
    fan: "Biologiya",
    mavzu: "Fotosintez",
    oqituvchi: "Nodira Xasanova",
    vaqt: "12:00",
    qisqacha:
      "Fotosintez — o‘simliklar yorug‘lik yordamida karbonat angidrid va suvdan glyukoza hosil qilishi. Bu jarayonda havoga kislorod chiqadi.",
    asosiy: [
      "Jarayon barglardagi xloroplastlarda kechadi.",
      "Yorug‘likni xlorofill degan yashil pigment yutadi.",
      "Kerak bo‘ladi: yorug‘lik, suv va karbonat angidrid (CO₂).",
      "Natija: glyukoza va kislorod (O₂).",
    ],
    misol: {
      sarlavha: "Umumiy tenglama",
      qadamlar: ["6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "Jarayon faqat yorug‘lik ta’sirida boradi."],
    },
    uydaSavol: "Xonadagi gullar bizga qanday foyda keltiradi?",
    amaliyot: {
      vazifa:
        "Uydagi bir xil gulning ikkita shoxchasini suvga soling: birini derazaga, ikkinchisini qorong‘i javonga qo‘ying. 5 kundan keyin barglarini solishtiring.",
      maslahat: "Qaysi biri fotosintez qila oladi? Unga nima yetishmaydi?",
      javob: "Qorong‘idagi shoxcha sarg‘ayib, so‘na boshlaydi: yorug‘lik bo‘lmasa, fotosintez bo‘lmaydi va o‘simlik oziqlana olmaydi.",
    },
    test: [
      {
        id: "q1",
        savol: "Fotosintez hujayraning qaysi qismida kechadi?",
        variantlar: ["Yadroda", "Mitoxondriyada", "Xloroplastda", "Ribosomada"],
        javob: 2,
        izoh: "Xloroplastlarda xlorofill bor, u yorug‘likni yutadi.",
      },
      {
        id: "q2",
        savol: "Fotosintez natijasida havoga qaysi gaz chiqadi?",
        variantlar: ["Kislorod", "Azot", "Karbonat angidrid", "Vodorod"],
        javob: 0,
        izoh: "O‘simlik CO₂ ni yutadi va kislorod chiqaradi.",
      },
      {
        id: "q3",
        savol: "Quyidagilardan qaysi biri fotosintez uchun kerak emas?",
        variantlar: ["Yorug‘lik", "Suv", "Karbonat angidrid", "Kislorod"],
        javob: 3,
        izoh: "Kislorod fotosintezga kerak emas — u jarayon natijasida ajralib chiqadi.",
      },
    ],
  },
  {
    id: "informatika",
    fan: "Informatika",
    mavzu: "Algoritm va blok-sxemalar",
    oqituvchi: "Bekzod Ergashev",
    vaqt: "12:50",
    qisqacha:
      "Algoritm — maqsadga olib boradigan aniq va tartibli qadamlar ketma-ketligi. Blok-sxema esa algoritmni shakllar yordamida chizib ko‘rsatadi.",
    asosiy: [
      "Algoritm turlari: chiziqli, tarmoqlanuvchi va takrorlanuvchi.",
      "Oval — boshlanish va tugash.",
      "To‘g‘ri to‘rtburchak — amal bajarish, parallelogramm — ma’lumot kiritish yoki chiqarish.",
      "Romb — shart tekshirish: «ha» yoki «yo‘q» yo‘nalishi tanlanadi.",
    ],
    misol: {
      sarlavha: "Choy damlash algoritmi",
      qadamlar: ["Suvni qaynat", "Choynakka choy sol va suv quy", "5 daqiqa kut", "Bu — chiziqli algoritm"],
    },
    uydaSavol: "Ertalabki tayyorgarligingni algoritm qilib yozib ko‘ramizmi?",
    amaliyot: {
      vazifa:
        "Ertalabki tayyorgarligingizni blok-sxema qilib chizing. Unda kamida bitta shart bo‘lsin, masalan: «Yomg‘ir yog‘yaptimi?» — ha bo‘lsa, soyabon olasiz.",
      maslahat: "Oval bilan boshlang, shartni romb bilan chizing va oval bilan tugating.",
      javob: null,
    },
    test: [
      {
        id: "q1",
        savol: "Blok-sxemada shart qaysi shakl bilan belgilanadi?",
        variantlar: ["Oval", "Romb", "To‘g‘ri to‘rtburchak", "Parallelogramm"],
        javob: 1,
        izoh: "Romb — shart tekshiriladigan joy, undan «ha» va «yo‘q» yo‘llari chiqadi.",
      },
      {
        id: "q2",
        savol: "Bir amal bir necha marta qaytariladigan algoritm qanday ataladi?",
        variantlar: ["Chiziqli", "Tarmoqlanuvchi", "Takrorlanuvchi", "Tasodifiy"],
        javob: 2,
        izoh: "Takrorlanuvchi (sikl) algoritmda amal shart bajarilguncha qaytariladi.",
      },
      {
        id: "q3",
        savol: "Algoritmning boshlanishi va tugashi qaysi shakl bilan chiziladi?",
        variantlar: ["Oval", "Romb", "Uchburchak", "Parallelogramm"],
        javob: 0,
        izoh: "Oval — «Boshlash» va «Tugatish» bloklari.",
      },
    ],
  },
];

export function findLesson(id) {
  return darslar.find((dars) => dars.id === id);
}
