import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create absolute path to upload directory
const uploadDir = path.join(__dirname, "..", "uploadedFile");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Menggunakan id sebagai nama file + ekstensi asli file
    const id = req.params.id || req.body.id;
    cb(null, id + path.extname(file.originalname));
  },
});

// Filter hanya file PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Terima file
  } else {
    cb(new Error("Only PDF files are allowed!"), false); // Tolak file
  }
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const upload = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_SIZE,
  },
});
