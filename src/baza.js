// Oddiy JSON fayl asosidagi baza.
// Hakatonda tez ishga tushirish uchun yetarli: ma’lumotlar xotirada turadi
// va har bir o‘zgarishdan keyin data/baza.json fayliga yoziladi.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createSeed } from "./data/boshlangich.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Vercel’da faqat /tmp papkasiga yozish mumkin (u yerda ma’lumotlar vaqtinchalik saqlanadi)
export const BAZA_FAYLI = process.env.VERCEL
  ? path.join("/tmp", "nova", "baza.json")
  : path.join(__dirname, "..", "data", "baza.json");

function load() {
  try {
    const raw = fs.readFileSync(BAZA_FAYLI, "utf8");
    return JSON.parse(raw);
  } catch {
    // Fayl yo‘q yoki buzilgan — demo ma’lumotlar bilan boshlaymiz
    const seed = createSeed();
    persist(seed);
    return seed;
  }
}

function persist(data) {
  fs.mkdirSync(path.dirname(BAZA_FAYLI), { recursive: true });
  // Avval vaqtinchalik faylga yozib, keyin almashtiramiz — fayl yarim yozilib qolmasligi uchun
  const tmp = `${BAZA_FAYLI}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, BAZA_FAYLI);
}

const db = load();

export const baza = {
  get: () => db,
  save: () => persist(db),
};
