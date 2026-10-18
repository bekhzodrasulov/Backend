// Nova — kelajak ta’limi
// Express.js server: darslar, dars pulsi, o‘qituvchi paneli, ota-ona hisoboti.

import express from "express";
import cors from "cors";
import { baza } from "./src/baza.js";
import { buildTeacherPanel, buildParentReport, buildStudentPlan } from "./src/tahlil.js";
import darslarRouter from "./src/routes/darslar.js";
import pulsRouter from "./src/routes/puls.js";
import savollarRouter from "./src/routes/savollar.js";
import royxatRouter from "./src/routes/royxat.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "20kb" }));

// Server holatini tekshirish
app.get("/", (req, res) => {
  res.json({
    nomi: "Nova API",
    shior: "Kelajak ta’limi",
    holat: "ishlayapti",
    manzillar: [
      "GET  /api/darslar",
      "GET  /api/darslar/:id",
      "GET  /api/darslar/:id/sinf",
      "POST /api/darslar/:id/tekshirish",
      "POST /api/puls",
      "POST /api/savollar/:id/menda-ham",
      "GET  /api/panel",
      "GET  /api/ota-ona",
      "GET  /api/reja",
      "POST /api/royxat",
      "GET  /api/statistika",
    ],
  });
});

app.use("/api/darslar", darslarRouter);
app.use("/api/puls", pulsRouter);
app.use("/api/savollar", savollarRouter);
app.use("/api/royxat", royxatRouter);

// O‘qituvchi paneli: sinf nimani tushundi, nimani tushunmadi
app.get("/api/panel", (req, res) => {
  res.json(buildTeacherPanel(baza.get()));
});

// Ota-ona uchun kunlik hisobot
app.get("/api/ota-ona", (req, res) => {
  res.json(buildParentReport(baza.get()));
});

// O‘quvchining shaxsiy rejasi
app.get("/api/reja", (req, res) => {
  res.json(buildStudentPlan(baza.get()));
});

// Bosh sahifadagi jonli raqamlar
app.get("/api/statistika", (req, res) => {
  const db = baza.get();
  res.json({
    javoblar: db.pulslar.length,
    savollar: db.savollar.length,
    yetibOlishlar: db.yetibOlishlar.length,
    arizalar: db.royxat.length,
  });
});

// Topilmagan manzil
app.use((req, res) => {
  res.status(404).json({ xato: "Bunday manzil yo‘q." });
});

// Kutilmagan xatolar
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ xato: "So‘rov noto‘g‘ri formatda yuborildi." });
  }
  console.error(err);
  res.status(500).json({ xato: "Serverda xatolik yuz berdi. Birozdan keyin qayta urinib ko‘ring." });
});

// Vercel serverni o‘zi ishga tushiradi, unga faqat app kerak
export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, (err) => {
    if (err) {
      console.error(
        err.code === "EADDRINUSE"
          ? `${PORT}-port band. Boshqa oynada server allaqachon ishlayotgan bo‘lishi mumkin.`
          : `Server ishga tushmadi: ${err.message}`,
      );
      process.exit(1);
    }
    console.log(`Nova serveri ishga tushdi: http://localhost:${PORT}`);
  });
}
