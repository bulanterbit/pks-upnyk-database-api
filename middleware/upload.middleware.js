import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create absolute paths to upload directories
const pdfUploadDir = path.join(__dirname, "..", "uploadedFile", "pdf");
const imageUploadDir = path.join(__dirname, "..", "uploadedFile", "images");

// Ensure the directories exist
if (!fs.existsSync(pdfUploadDir)) {
  fs.mkdirSync(pdfUploadDir, { recursive: true });
}
if (!fs.existsSync(imageUploadDir)) {
  fs.mkdirSync(imageUploadDir, { recursive: true });
}

// Storage engine for PDF files
const pdfStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfUploadDir);
  },
  filename: (req, file, cb) => {
    const id = req.params.id || req.body.id;
    cb(null, id + path.extname(file.originalname));
  },
});

// Storage engine for image files
const imageStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageUploadDir);
  },
  filename: (req, file, cb) => {
    const id = req.params.id || req.body.id;
    cb(null, id + path.extname(file.originalname));
  },
});

// Filter untuk file PDF
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Filter untuk file gambar
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export const uploadPdf = multer({
  storage: pdfStorageEngine,
  fileFilter: pdfFilter,
  limits: {
    fileSize: MAX_PDF_SIZE,
  },
});

export const uploadImage = multer({
  storage: imageStorageEngine,
  fileFilter: imageFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
});

// Fungsi untuk menghapus file
export const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// Helpers untuk mendapatkan path file berdasarkan id
export const getPdfPath = (id) => {
  return path.join(pdfUploadDir, id + ".pdf");
};

export const getImagePath = (id, extension) => {
  // Jika extension tidak disediakan, cari file dengan id di directory
  if (!extension) {
    const files = fs.readdirSync(imageUploadDir);
    const imageFile = files.find((file) => file.startsWith(id + "."));
    return imageFile ? path.join(imageUploadDir, imageFile) : null;
  }
  return path.join(imageUploadDir, id + extension);
};
