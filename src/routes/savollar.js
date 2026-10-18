import { Router } from "express";
import { baza } from "../baza.js";

const router = Router();

// “Menda ham shu savol bor” — anonim savolni qo‘llab-quvvatlash.
// Shunday qilib o‘qituvchi qaysi savol ko‘pchilikni qiynayotganini ko‘radi.
router.post("/:id/menda-ham", (req, res) => {
  const db = baza.get();
  const savol = db.savollar.find((s) => s.id === req.params.id);
  if (!savol) return res.status(404).json({ xato: "Savol topilmadi." });

  savol.ovozlar += 1;
  baza.save();
  res.json({ id: savol.id, matn: savol.matn, ovozlar: savol.ovozlar });
});

export default router;
