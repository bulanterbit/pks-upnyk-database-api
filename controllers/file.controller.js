import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import PKS from "../models/pks.model.js";

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
  const baseDir = path.join(__dirname, "..", "uploadedFile");
  const directories = ["", "pdf", "images"]; // Base dir dan subdirectories

  // Buat direktori jika belum ada
  directories.forEach((subDir) => {
    const dirPath = path.join(baseDir, subDir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  // Kumpulkan semua file dari semua direktori
  const allFilePromises = directories.map((subDir) => {
    return new Promise((resolve) => {
      const dirPath = path.join(baseDir, subDir);
      fs.readdir(dirPath, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${dirPath}:`, err);
          return resolve([]); // Return empty array instead of rejecting
        }

        const fileInfoPromises = files.map((file) => {
          return new Promise((innerResolve, innerReject) => {
            const filePath = path.join(dirPath, file);
            fs.stat(filePath, (err, stats) => {
              if (err) {
                return innerReject(err);
              }
              innerResolve({
                filename: file,
                path: subDir ? `${subDir}/${file}` : file,
                size: stats.size,
                created: stats.birthtime,
              });
            });
          });
        });

        Promise.all(fileInfoPromises)
          .then((fileInfos) => resolve(fileInfos))
          .catch((error) => {
            console.error("Error loading file information:", error);
            resolve([]); // Return empty array instead of rejecting
          });
      });
    });
  });

  Promise.all(allFilePromises)
    .then((fileArrays) => {
      // Flatten arrays
      const allFiles = [].concat(...fileArrays);
      return res.status(200).json({
        success: true,
        data: allFiles,
      });
    })
    .catch((error) => {
      console.error("Error loading directories:", error);
      return res.status(500).json({
        success: false,
        message: `Gagal memuat informasi file: ${
          error.message || "Unknown error"
        }`,
      });
    });
};

// Controller untuk menghapus file
const deleteFile = async (req, res) => {
  // filePath sudah divalidasi oleh middleware checkFileExists
  const filePath = req.filePath;
  const { filename } = req.params;

  try {
    // Hapus file fisik
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Gagal menghapus file",
        });
      }

      // Cari dan update dokumen PKS berdasarkan nama file
      // Asumsi: format nama file adalah '{pksId}.pdf'
      const fileBaseName = path.basename(filename, path.extname(filename));

      // Cek apakah nama file sesuai dengan format ID MongoDB
      if (fileBaseName.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          // Update dokumen PKS untuk menghapus referensi file
          const updatedPKS = await PKS.findByIdAndUpdate(
            fileBaseName,
            {
              $unset: {
                "fileUpload.docName": "",
                "fileUpload.docPath": "",
              },
            },
            { new: true }
          );

          if (updatedPKS) {
            console.log(
              "Dokumen database berhasil diperbarui:",
              updatedPKS._id
            );
          } else {
            console.log(
              "PKS dengan ID tersebut tidak ditemukan:",
              fileBaseName
            );
          }
        } catch (dbError) {
          console.error("Error updating database:", dbError);
          // Tetap kirim respons sukses karena file fisik berhasil dihapus
        }
      }

      return res.status(200).json({
        success: true,
        message: "File berhasil dihapus",
      });
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({
      success: false,
      message: `Gagal menghapus file: ${error.message || "Unknown error"}`,
    });
  }
};

export { downloadFile, viewFiles, deleteFile };
