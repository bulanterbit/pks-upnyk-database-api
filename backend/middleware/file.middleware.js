import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkFileExists = (req, res, next) => {
  const { filename } = req.params;

  // Coba cari file di beberapa lokasi potensial
  const possiblePaths = [
    path.join(__dirname, "..", "uploadedFile", filename),
    path.join(__dirname, "..", "uploadedFile", "pdf", filename),
    path.join(__dirname, "..", "uploadedFile", "images", filename),
  ];

  // Cari file di semua kemungkinan lokasi
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      req.filePath = filePath;
      return next(); // File ditemukan, lanjutkan
    }
  }

  // File tidak ditemukan di semua lokasi
  return res.status(404).json({
    success: false,
    message: "File tidak ditemukan",
  });
};

export { checkFileExists };
