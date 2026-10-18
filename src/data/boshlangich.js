// Birinchi ishga tushirishda bazaga yoziladigan demo ma’lumotlar.
// Raqamlar 9-B sinfidagi bugungi darslar uchun o‘ylab topilgan — bu haqiqiy statistika emas.

import { DEMO_OQUVCHI } from "./darslar.js";

// Har bir dars bo‘yicha sinf javoblari: [tushundim, qisman, tushunmadim]
const SINF_JAVOBLARI = {
  algebra: [9, 7, 12],
  fizika: [14, 8, 4],
  tarix: [18, 5, 2],
  ingliz: [10, 11, 6],
  biologiya: [20, 4, 1],
  informatika: [15, 6, 3],
};

// Demo o‘quvchi (Aziza) ning o‘z javoblari. Tarix darsida u bo‘lmagan,
// informatika darsi esa hozirgina tugagan — unga demo paytida javob beriladi.
const AZIZA_JAVOBLARI = {
  algebra: "qisman",
  fizika: "tushundim",
  ingliz: "tushunmadim",
  biologiya: "tushundim",
};

const SAVOLLAR = [
  ["algebra", "Diskriminant manfiy chiqsa, javob umuman yo‘qmi?", 8],
  ["algebra", "Formulada nega aynan 2a ga bo‘lamiz?", 5],
  ["algebra", "a = 0 bo‘lsa ham kvadrat tenglama bo‘ladimi?", 2],
  ["fizika", "Og‘irlik va massa bir narsami?", 6],
  ["fizika", "Ishqalanish kuchi ham shu formulaga kiradimi?", 4],
  ["tarix", "«Temur tuzuklari»ni Temurning o‘zi yozganmi?", 5],
  ["ingliz", "Present Perfect bilan Past Simple farqini qanday eslab qolsam bo‘ladi?", 9],
  ["ingliz", "«Been» va «gone» ning farqi nima?", 4],
  ["biologiya", "Kechasi o‘simliklar ham kislorod chiqaradimi?", 3],
  ["informatika", "Takrorlanuvchi algoritm qachon to‘xtaydi?", 2],
];

const DARAJALAR = ["tushundim", "qisman", "tushunmadim"];

export function createSeed() {
  const now = new Date();
  // Javoblar dars tugaganidan keyingi bir necha daqiqaga tarqatiladi
  const minutesAgo = (n) => new Date(now.getTime() - n * 60_000).toISOString();

  const pulslar = [];
  let counter = 0;

  for (const [darsId, sonlar] of Object.entries(SINF_JAVOBLARI)) {
    sonlar.forEach((soni, index) => {
      const daraja = DARAJALAR[index];
      // Aziza javobi shu sonning ichida hisoblanadi, shuning uchun bittasini ayiramiz
      const azizaniki = AZIZA_JAVOBLARI[darsId] === daraja ? 1 : 0;
      for (let i = 0; i < soni - azizaniki; i++) {
        counter += 1;
        pulslar.push({
          id: `p${counter}`,
          darsId,
          daraja,
          oquvchiId: null,
          vaqt: minutesAgo(30 + counter),
        });
      }
    });
  }

  for (const [darsId, daraja] of Object.entries(AZIZA_JAVOBLARI)) {
    counter += 1;
    pulslar.push({ id: `p${counter}`, darsId, daraja, oquvchiId: DEMO_OQUVCHI.id, vaqt: minutesAgo(20) });
  }

  const savollar = SAVOLLAR.map(([darsId, matn, ovozlar], index) => ({
    id: `s${index + 1}`,
    darsId,
    matn,
    ovozlar,
    vaqt: minutesAgo(25 + index),
  }));

  // Aziza tarix darsiga kela olmagan, lekin mavzuni Nova orqali o‘zi yopgan
  const yetibOlishlar = [
    { id: "y1", darsId: "tarix", oquvchiId: DEMO_OQUVCHI.id, togri: 3, jami: 3, vaqt: minutesAgo(15) },
  ];

  return { pulslar, savollar, yetibOlishlar, royxat: [] };
}
