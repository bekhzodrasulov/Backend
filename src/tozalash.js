// Demo ma’lumotlarni boshlang‘ich holatga qaytarish: npm run reset
// Taqdimotdan oldin ishga tushirsangiz, hammasi toza holatda bo‘ladi.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fayl = path.join(__dirname, "..", "data", "baza.json");

if (fs.existsSync(fayl)) {
  fs.unlinkSync(fayl);
  console.log("Baza tozalandi. Server qayta ishga tushganda demo ma’lumotlar yangidan yoziladi.");
} else {
  console.log("Baza allaqachon toza.");
}
