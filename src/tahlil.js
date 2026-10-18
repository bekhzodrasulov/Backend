// Tahlil: o‘quvchilar javoblaridan o‘qituvchi va ota-ona uchun xulosa chiqarish.
// Bu yerda hech qanday “kiyim”, “kechikish” yoki “davomat” ustuni yo‘q — ataylab.

import { darslar, DEMO_OQUVCHI } from "./data/darslar.js";

export const DARAJALAR = ["tushundim", "qisman", "tushunmadim"];

// ["A", "B", "C"] → "A, B va C"
function joinUz(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} va ${items.at(-1)}`;
}

export function countLevels(pulslar, darsId) {
  const sonlar = { tushundim: 0, qisman: 0, tushunmadim: 0 };
  for (const puls of pulslar) {
    if (puls.darsId === darsId) sonlar[puls.daraja] += 1;
  }
  const jami = sonlar.tushundim + sonlar.qisman + sonlar.tushunmadim;
  return { ...sonlar, jami };
}

// Foizlarni yig‘indisi aniq 100 chiqadigan qilib yaxlitlaymiz (eng katta qoldiq usuli)
export function toPercents(sonlar) {
  const { jami } = sonlar;
  if (!jami) return { tushundim: 0, qisman: 0, tushunmadim: 0 };

  const raw = DARAJALAR.map((d) => ({ d, qiymat: (sonlar[d] / jami) * 100 }));
  const result = Object.fromEntries(raw.map(({ d, qiymat }) => [d, Math.floor(qiymat)]));
  let qoldiq = 100 - Object.values(result).reduce((a, b) => a + b, 0);

  raw
    .sort((a, b) => (b.qiymat % 1) - (a.qiymat % 1))
    .forEach(({ d }) => {
      if (qoldiq > 0) {
        result[d] += 1;
        qoldiq -= 1;
      }
    });
  return result;
}

export function topQuestions(savollar, darsId, limit = 3) {
  return savollar
    .filter((s) => s.darsId === darsId)
    .sort((a, b) => b.ovozlar - a.ovozlar || new Date(b.vaqt) - new Date(a.vaqt))
    .slice(0, limit)
    .map(({ id, matn, ovozlar }) => ({ id, matn, ovozlar }));
}

// O‘qituvchiga ertangi dars uchun aniq tavsiya
export function recommend(foiz, jami, engKopSavol) {
  if (!jami) {
    return { holat: "kutilmoqda", tavsiya: "Hali javoblar yo‘q. Dars tugagach, o‘quvchilar 10 soniyada javob beradi." };
  }
  const savolQismi = engKopSavol ? ` Eng ko‘p so‘ralgan savol: «${engKopSavol.matn}»` : "";

  if (foiz.tushunmadim >= 35) {
    return {
      holat: "diqqat",
      tavsiya: `Ertangi darsni shu mavzudan boshlang: 10 daqiqa qayta tushuntirish kerak.${savolQismi}`,
    };
  }
  if (foiz.tushunmadim + foiz.qisman >= 50) {
    return {
      holat: "mashq",
      tavsiya: `Sinfning yarmidan ko‘pi hali ishonch hosil qilmagan. 3–4 ta misolni juftlikda ishlash foydali bo‘ladi.${savolQismi}`,
    };
  }
  return {
    holat: "yaxshi",
    tavsiya: "Sinf mavzuni yaxshi o‘zlashtirgan. Keyingi mavzuga o‘tish mumkin.",
  };
}

export function buildTeacherPanel(db) {
  const panel = darslar.map((dars) => {
    const sonlar = countLevels(db.pulslar, dars.id);
    const foiz = toPercents(sonlar);
    const savollar = topQuestions(db.savollar, dars.id);
    const { holat, tavsiya } = recommend(foiz, sonlar.jami, savollar[0]);
    const oxirgi = db.pulslar
      .filter((p) => p.darsId === dars.id)
      .reduce((max, p) => Math.max(max, new Date(p.vaqt).getTime()), 0);
    return {
      id: dars.id,
      fan: dars.fan,
      mavzu: dars.mavzu,
      oqituvchi: dars.oqituvchi,
      vaqt: dars.vaqt,
      sonlar,
      foiz,
      holat,
      tavsiya,
      savollar,
      yetibOlganlar: new Set(
        db.yetibOlishlar.filter((y) => y.darsId === dars.id && y.togri === y.jami).map((y) => y.oquvchiId),
      ).size,
      // Oxirgi bir daqiqada javob kelgan bo‘lsa, panelda “yangi javob” belgisi chiqadi
      yangiJavob: Date.now() - oxirgi < 60_000,
    };
  });

  return {
    jamiJavoblar: db.pulslar.length,
    jamiSavollar: db.savollar.length,
    diqqatTalab: panel.filter((d) => d.holat === "diqqat").length,
    darslar: panel,
  };
}

// Bitta o‘quvchining har bir dars bo‘yicha holati.
// Mavzu “yopilgan” hisoblanadi: darsda tushungan bo‘lsa yoki keyin testni to‘liq yechgan bo‘lsa.
export function studentLessonStates(db, oquvchiId = DEMO_OQUVCHI.id) {
  return darslar.map((dars) => {
    const puls = db.pulslar.find((p) => p.darsId === dars.id && p.oquvchiId === oquvchiId);
    const urinishlar = db.yetibOlishlar.filter((y) => y.darsId === dars.id && y.oquvchiId === oquvchiId);
    const engYaxshi = [...urinishlar].sort((a, b) => b.togri - a.togri)[0] ?? null;
    const testYopildi = Boolean(engYaxshi && engYaxshi.togri === engYaxshi.jami);

    let holat;
    if (puls?.daraja === "tushundim") holat = "organdi";
    else if (testYopildi) holat = "yopdi";
    else if (puls) holat = "takrorlash";
    else holat = "javobsiz";

    return { dars, puls, engYaxshi, holat };
  });
}

// Ota-ona uchun kunlik hisobot: baho va tanbeh emas, nimani o‘rgangani va qayerda yordam kerakligi
export function buildParentReport(db) {
  const ism = DEMO_OQUVCHI.ism.split(" ")[0];
  const holatlar = studentLessonStates(db);
  const asosiy = ({ dars }) => ({ id: dars.id, fan: dars.fan, mavzu: dars.mavzu });

  const organdi = holatlar.filter((h) => h.holat === "organdi").map(asosiy);
  const oziYopdi = holatlar
    .filter((h) => h.holat === "yopdi")
    .map((h) => ({
      ...asosiy(h),
      togri: h.engYaxshi.togri,
      jami: h.engYaxshi.jami,
      darsdaBor: Boolean(h.puls),
    }));
  const yordamKerak = holatlar
    .filter((h) => h.holat === "takrorlash")
    .map((h) => ({
      ...asosiy(h),
      daraja: h.puls.daraja,
      uydaSavol: h.dars.uydaSavol,
      urinish: h.engYaxshi && `${h.engYaxshi.togri}/${h.engYaxshi.jami}`,
    }));
  const javobBermagan = holatlar.filter((h) => h.holat === "javobsiz").map(asosiy);

  const ozlashtirildi = organdi.length + oziYopdi.length;
  let xulosa = `${ism} bugun ${darslar.length} ta mavzudan ${ozlashtirildi} tasini o‘zlashtirdi.`;
  if (yordamKerak.length) {
    xulosa += ` ${joinUz(yordamKerak.map((d) => d.fan))} bo‘yicha biroz yordam kerak — quyida uyda so‘rash mumkin bo‘lgan savollar bor.`;
  } else {
    xulosa += " Bugun alohida yordam kerak bo‘lgan mavzu yo‘q.";
  }

  return { oquvchi: DEMO_OQUVCHI, xulosa, organdi, oziYopdi, yordamKerak, javobBermagan };
}

// O‘quvchining shaxsiy rejasi: hamma bir xil tezlikda o‘qimaydi.
// Reja o‘quvchining o‘z javoblari va test natijalaridan tuziladi — alohida “daraja testi” kerak emas.
const DAQIQA = 5;

export function buildStudentPlan(db) {
  const holatlar = studentLessonStates(db);

  const qadamlar = holatlar.map(({ dars, puls, engYaxshi, holat }) => {
    const urinish = engYaxshi ? ` Oxirgi urinish: ${engYaxshi.togri}/${engYaxshi.jami}.` : "";
    let sabab;
    if (holat === "organdi") sabab = "Darsda tushundingiz.";
    else if (holat === "yopdi")
      sabab = puls
        ? `Darsda qiynalgan edingiz, keyin o‘zingiz takrorlab ${engYaxshi.togri}/${engYaxshi.jami} oldingiz.`
        : `Darsda yo‘q edingiz, mavzuni o‘zingiz o‘rganib ${engYaxshi.togri}/${engYaxshi.jami} oldingiz.`;
    else if (holat === "takrorlash")
      sabab = `Darsda «${puls.daraja === "qisman" ? "qisman" : "tushunmadim"}» dedingiz.${urinish}`;
    else sabab = `Bu darsga hali javob bermadingiz.${urinish}`;

    return {
      id: dars.id,
      fan: dars.fan,
      mavzu: dars.mavzu,
      holat,
      sabab,
      tayyor: holat === "organdi" || holat === "yopdi",
      // Avval “tushunmadim”, keyin “qisman”, keyin javobsiz darslar
      navbat: holat === "takrorlash" ? (puls.daraja === "tushunmadim" ? 0 : 1) : holat === "javobsiz" ? 2 : 3,
    };
  });

  qadamlar.sort((a, b) => a.navbat - b.navbat);
  const yopilgan = qadamlar.filter((q) => q.tayyor).length;
  const qolgan = qadamlar.length - yopilgan;

  return {
    oquvchi: DEMO_OQUVCHI,
    jami: qadamlar.length,
    yopilgan,
    daqiqa: qolgan * DAQIQA,
    xulosa: qolgan
      ? `${qadamlar.length} ta mavzudan ${yopilgan} tasi yopildi. Qolganiga taxminan ${qolgan * DAQIQA} daqiqa kerak.`
      : "Bugungi barcha mavzular yopildi. Zo‘r ish!",
    qadamlar: qadamlar.map(({ navbat, ...q }) => q),
  };
}
