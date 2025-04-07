import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Dapatkan __dirname equivalent untuk ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware untuk memeriksa keberadaan file
const checkFileExists = (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "..", "uploadedFile", filename);

  // Periksa apakah file ada
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File tidak ditemukan",
    });
  }

  // Tambahkan path file ke request untuk digunakan controller
  req.filePath = filePath;
  next();
};

export { checkFileExists };
