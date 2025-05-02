import multer from "multer";
import {
  uploadPdf,
  uploadImage,
  deleteFile,
  pdfUploadDir,
  getImagePath,
} from "../middleware/upload.middleware.js";
import PKS from "../models/pks.model.js";
import path from "path";
import fs from "fs";

// Handler untuk upload dokumen PDF
// Handler untuk upload dokumen PDF yang sudah disesuaikan
export const handlePdfUpload = (req, res) => {
  const uploadSingle = uploadPdf.single("file");
  const pksId = req.params.id;

  uploadSingle(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(413)
          .json({ message: "File too large. Max 5MB allowed." });
      }
      return res
        .status(500)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "Upload failed", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Nama file sudah diformat ${id}.pdf oleh middleware upload
      // Path akan terlihat seperti C:\Users\Jaconiah\Documents\Projek\pks-upnyk-database-api\uploadedFile\pdf\{id}.pdf
      const fileName = `${pksId}.pdf`;
      const fullPath = path.join(pdfUploadDir, fileName);

      const docPath = fullPath.toString();
      console.log("Saving path to database:", docPath);

      const updatedPKS = await PKS.findByIdAndUpdate(
        pksId,
        {
          "fileUpload.docName": fileName,
          "fileUpload.docPath": docPath,
          // Update status to "menunggu review" after successful document upload
          "properties.status": "menunggu review",
          "properties.uploadDate": new Date(),
        },
        { new: true, runValidators: true }
      );

      if (!updatedPKS) {
        // Hapus file jika PKS tidak ditemukan
        await deleteFile(req.file.path);
        return res.status(404).json({ message: "PKS not found" });
      }

      res.status(200).json({
        message: "PDF uploaded successfully and PKS updated",
        filename: req.file.filename,
        path: fullPath,
        pks: updatedPKS,
      });
    } catch (error) {
      console.error("Database update error:", error);
      // Hapus file jika update database gagal
      await deleteFile(req.file.path).catch((err) =>
        console.error("Error deleting file:", err)
      );
      return res.status(500).json({
        message: "File uploaded but failed to update database",
        error: error.message,
      });
    }
  });
};

// Handler untuk upload logo (gambar) yang sudah disesuaikan
export const handleLogoUpload = (req, res) => {
  const uploadSingle = uploadImage.single("logo");
  const pksId = req.params.id;

  uploadSingle(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(413)
          .json({ message: "File too large. Max 2MB allowed." });
      }
      return res
        .status(500)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "Upload failed", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No logo image uploaded" });
    }

    try {
      const extension = path.extname(req.file.originalname);
      const fullPath = getImagePath(pksId, extension);
      // Format nama file logo sudah dihandle oleh middleware upload
      const updatedPKS = await PKS.findByIdAndUpdate(
        pksId,
        {
          "fileUpload.logoName": `${pksId}${extension}`,
          "fileUpload.logoPath": fullPath,
        },
        { new: true, runValidators: true }
      );

      if (!updatedPKS) {
        // Hapus file jika PKS tidak ditemukan
        await deleteFile(req.file.path);
        return res.status(404).json({ message: "PKS not found" });
      }

      res.status(200).json({
        message: "Logo uploaded successfully and PKS updated",
        filename: req.file.filename,
        path: req.file.path,
        pks: updatedPKS,
      });
    } catch (error) {
      console.error("Database update error:", error);
      // Hapus file jika update database gagal
      await deleteFile(req.file.path).catch((err) =>
        console.error("Error deleting file:", err)
      );
      return res.status(500).json({
        message: "Logo uploaded but failed to update database",
        error: error.message,
      });
    }
  });
};

// Method untuk mendapatkan logo juga perlu diperbarui
// Method untuk mendapatkan logo yang diperbarui
export const getLogo = (req, res) => {
  const pksId = req.params.id;

  try {
    // Cari PKS berdasarkan ID
    PKS.findById(pksId)
      .then((pks) => {
        if (!pks || !pks.fileUpload || !pks.fileUpload.logoPath) {
          return res.status(404).json({ message: "Logo not found" });
        }

        const logoPath = pks.fileUpload.logoPath;

        // Verifikasi file ada
        if (!fs.existsSync(logoPath)) {
          return res
            .status(404)
            .json({ message: "Logo file not found on server" });
        }

        // Kirim file logo sebagai respons
        res.sendFile(path.resolve(logoPath));
      })
      .catch((error) => {
        console.error("Error finding PKS:", error);
        res.status(500).json({
          message: "Failed to find PKS",
          error: error.message,
        });
      });
  } catch (error) {
    console.error("Error getting logo:", error);
    res.status(500).json({
      message: "Failed to retrieve logo",
      error: error.message,
    });
  }
};

// Method untuk menghapus logo yang diperbarui
export const deleteLogo = async (req, res) => {
  const pksId = req.params.id;

  try {
    // Cari PKS
    const pks = await PKS.findById(pksId);

    if (!pks || !pks.fileUpload || !pks.fileUpload.logoPath) {
      return res.status(404).json({ message: "Logo not found" });
    }

    const logoPath = pks.fileUpload.logoPath;

    // Verifikasi file ada
    if (!fs.existsSync(logoPath)) {
      console.warn("Logo file not found on server:", logoPath);
    } else {
      // Hapus file jika ada
      await deleteFile(logoPath);
    }

    // Update database - hapus referensi logo
    const updatedPKS = await PKS.findByIdAndUpdate(
      pksId,
      {
        $unset: {
          "fileUpload.logoName": "",
          "fileUpload.logoPath": "",
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Logo deleted successfully",
      pks: updatedPKS,
    });
  } catch (error) {
    console.error("Error deleting logo:", error);
    res.status(500).json({
      message: "Failed to delete logo",
      error: error.message,
    });
  }
};
