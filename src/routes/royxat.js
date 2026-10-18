import { randomUUID } from "node:crypto";
import { Router } from "express";
import { baza } from "../baza.js";

const router = Router();

const ROLLAR = {
  oquvchi: "O‘quvchi",
  oqituvchi: "O‘qituvchi",
  "ota-ona": "Ota-ona",
  maktab: "Maktab rahbariyati",
};

// Maktabni Nova’ga ulash uchun ariza
router.post("/", (req, res) => {
  const ism = String(req.body?.ism ?? "").trim();
  const rol = String(req.body?.rol ?? "");
  const maktab = String(req.body?.maktab ?? "").trim();

  if (ism.length < 2 || ism.length > 60) {
    return res.status(400).json({ xato: "Ismingizni kiriting (kamida 2 ta harf)." });
  }
  if (!ROLLAR[rol]) {
    return res.status(400).json({ xato: "Kim ekaningizni tanlang." });
  }
  if (maktab.length > 80) {
    return res.status(400).json({ xato: "Maktab nomi 80 belgidan oshmasin." });
  }

  const db = baza.get();
  const ariza = { id: randomUUID(), ism, rol, maktab, vaqt: new Date().toISOString() };
  db.royxat.push(ariza);
  baza.save();

  res.status(201).json({
    xabar: `${ism}, arizangiz qabul qilindi.`,
    raqam: db.royxat.length,
    rol: ROLLAR[rol],
  });
});

export default router;
