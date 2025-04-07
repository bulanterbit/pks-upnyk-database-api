import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Dapatkan __dirname equivalent untuk ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller untuk download file
const downloadFile = (req, res) => {
  const { filename } = req.params;
  // filePath sudah divalidasi oleh middleware checkFileExists
  const filePath = req.filePath;

  // Download file
  res.download(filePath, filename, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengunduh file",
      });
    }
  });
};

// Controller untuk melihat daftar file
const viewFiles = (req, res) => {
  const directoryPath = path.join(__dirname, "..", "uploadedFile");

  // Buat direktori jika belum ada
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal membaca direktori",
      });
    }

    // Ambil informasi file
    const fileInfoPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(directoryPath, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            return reject(err);
          }
          resolve({
            filename: file,
            size: stats.size,
            created: stats.birthtime,
          });
        });
      });
    });

    Promise.all(fileInfoPromises)
      .then((fileInfos) => {
        return res.status(200).json({
          success: true,
          data: fileInfos,
        });
      })
      .catch((error) => {
        console.error("Error loading file information:", error);
        return res.status(500).json({
          success: false,
          message: `Gagal memuat informasi file: ${
            error.message || "Unknown error"
          }`,
        });
      });
  });
};

// Controller untuk menghapus file
const deleteFile = (req, res) => {
  // filePath sudah divalidasi oleh middleware checkFileExists
  const filePath = req.filePath;

  // Hapus file
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menghapus file",
      });
    }

    return res.status(200).json({
      success: true,
      message: "File berhasil dihapus",
    });
  });
};

export { downloadFile, viewFiles, deleteFile };
