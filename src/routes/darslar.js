import { randomUUID } from "node:crypto";
import { Router } from "express";
import { baza } from "../baza.js";
import { darslar, findLesson, DEMO_OQUVCHI } from "../data/darslar.js";
import { countLevels, toPercents, topQuestions } from "../tahlil.js";

const router = Router();

// Bugungi darslar ro‘yxati (demo o‘quvchi nuqtai nazaridan)
router.get("/", (req, res) => {
  const db = baza.get();
  const royxat = darslar.map((dars) => {
    const meniki = db.pulslar.find((p) => p.darsId === dars.id && p.oquvchiId === DEMO_OQUVCHI.id);
    const urinishlar = db.yetibOlishlar.filter((y) => y.darsId === dars.id && y.oquvchiId === DEMO_OQUVCHI.id);
    return {
      id: dars.id,
      fan: dars.fan,
      mavzu: dars.mavzu,
      oqituvchi: dars.oqituvchi,
      vaqt: dars.vaqt,
      menikiDaraja: meniki?.daraja ?? null,
      yetibOlgan: urinishlar.length > 0,
      // Test to‘liq yechilgan bo‘lsa, mavzu yopilgan hisoblanadi
      yopildi: urinishlar.some((y) => y.togri === y.jami),
    };
  });
  res.json({ oquvchi: DEMO_OQUVCHI, darslar: royxat });
});

// Bitta dars: “yetib olish” uchun qisqa mazmun va test (to‘g‘ri javoblarsiz)
router.get("/:id", (req, res) => {
  const dars = findLesson(req.params.id);
  if (!dars) return res.status(404).json({ xato: "Bunday dars topilmadi." });

  const { test, ...qolgani } = dars;
  res.json({
    ...qolgani,
    test: test.map(({ id, savol, variantlar }) => ({ id, savol, variantlar })),
  });
});

// Sinf natijasi va anonim savollar
router.get("/:id/sinf", (req, res) => {
  const dars = findLesson(req.params.id);
  if (!dars) return res.status(404).json({ xato: "Bunday dars topilmadi." });

  const db = baza.get();
  const sonlar = countLevels(db.pulslar, dars.id);
  res.json({ sonlar, foiz: toPercents(sonlar), savollar: topQuestions(db.savollar, dars.id, 6) });
});

// Testni tekshirish — javoblar serverda solishtiriladi
router.post("/:id/tekshirish", (req, res) => {
  const dars = findLesson(req.params.id);
  if (!dars) return res.status(404).json({ xato: "Bunday dars topilmadi." });

  const javoblar = req.body?.javoblar ?? {};
  const natijalar = dars.test.map((t) => {
    const tanlangan = Number.isInteger(javoblar[t.id]) ? javoblar[t.id] : null;
    return {
      id: t.id,
      tanlangan,
      togriJavob: t.javob,
      togri: tanlangan === t.javob,
      izoh: t.izoh,
    };
  });

  if (natijalar.some((n) => n.tanlangan === null)) {
    return res.status(400).json({ xato: "Iltimos, barcha savollarga javob bering." });
  }

  const togri = natijalar.filter((n) => n.togri).length;
  const jami = natijalar.length;

  const db = baza.get();
  db.yetibOlishlar.push({
    id: randomUUID(),
    darsId: dars.id,
    oquvchiId: DEMO_OQUVCHI.id,
    togri,
    jami,
    vaqt: new Date().toISOString(),
  });
  baza.save();

  const xabar =
    togri === jami
      ? "Zo‘r! Mavzuni to‘liq yopdingiz. Sinfdoshlaringiz bilan bir qatordasiz."
      : togri >= jami - 1
        ? "Yaxshi natija. Xato qilgan savolingiz izohini o‘qib chiqing."
        : "Mavzuni yana bir bor o‘qib chiqing — bu normal holat, xato ham o‘rganishning bir qismi.";

  res.json({ togri, jami, natijalar, xabar });
});

export default router;
