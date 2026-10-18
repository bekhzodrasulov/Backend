import { randomUUID } from "node:crypto";
import { Router } from "express";
import { baza } from "../baza.js";
import { findLesson, DEMO_OQUVCHI } from "../data/darslar.js";
import { DARAJALAR, countLevels, toPercents } from "../tahlil.js";

const router = Router();

// “Dars pulsi”: dars tugagach o‘quvchi 10 soniyada qanchalik tushunganini belgilaydi.
// O‘qituvchi ismni ko‘rmaydi — faqat sinf manzarasini ko‘radi.
router.post("/", (req, res) => {
  const { darsId, daraja } = req.body ?? {};
  const savolMatni = typeof req.body?.savol === "string" ? req.body.savol.trim() : "";

  const dars = findLesson(darsId);
  if (!dars) return res.status(404).json({ xato: "Bunday dars topilmadi." });
  if (!DARAJALAR.includes(daraja)) {
    return res.status(400).json({ xato: "Javob turini tanlang: tushundim, qisman yoki tushunmadim." });
  }
  if (savolMatni && (savolMatni.length < 3 || savolMatni.length > 200)) {
    return res.status(400).json({ xato: "Savol 3 tadan 200 tagacha belgidan iborat bo‘lsin." });
  }

  const db = baza.get();
  const vaqt = new Date().toISOString();

  // Bir o‘quvchi bir darsga bitta javob beradi — qayta yuborsa, javobi yangilanadi
  const mavjud = db.pulslar.find((p) => p.darsId === dars.id && p.oquvchiId === DEMO_OQUVCHI.id);
  if (mavjud) {
    mavjud.daraja = daraja;
    mavjud.vaqt = vaqt;
  } else {
    db.pulslar.push({ id: randomUUID(), darsId: dars.id, daraja, oquvchiId: DEMO_OQUVCHI.id, vaqt });
  }

  let savol = null;
  if (savolMatni) {
    savol = { id: randomUUID(), darsId: dars.id, matn: savolMatni, ovozlar: 1, vaqt };
    db.savollar.push(savol);
  }

  baza.save();

  const sonlar = countLevels(db.pulslar, dars.id);
  res.status(201).json({
    xabar: mavjud ? "Javobingiz yangilandi." : "Javobingiz qabul qilindi.",
    sinf: { sonlar, foiz: toPercents(sonlar) },
    savol: savol && { id: savol.id, matn: savol.matn, ovozlar: savol.ovozlar },
  });
});

export default router;
