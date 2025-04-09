import multer from "multer";
import {
  uploadPdf,
  uploadImage,
  deleteFile,
} from "../middleware/upload.middleware.js";
import PKS from "../models/pks.model.js";
import path from "path";
import fs from "fs";

// Handler untuk upload dokumen PDF
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
      const updatedPKS = await PKS.findByIdAndUpdate(
        pksId,
        {
          "dokumen.fileUpload": {
            nama: req.file.originalname,
            tipe: req.file.mimetype,
            path: req.file.path,
          },
          ...(req.user && {
            diperbaraiOleh: req.user.name || req.user.id || req.user,
          }),
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
        path: req.file.path,
        pks: updatedPKS,
      });
    } catch (error) {
      console.error("Database update error:", error);
      return res.status(500).json({
        message: "File uploaded but failed to update database",
        error: error.message,
      });
    }
  });
};

// Handler untuk upload logo mitra (gambar)
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
      const updatedPKS = await PKS.findByIdAndUpdate(
        pksId,
        {
          "pihakKedua.fileLogo": {
            nama: req.file.originalname,
            tipe: req.file.mimetype,
            path: req.file.path,
          },
          ...(req.user && {
            diperbaraiOleh: req.user.name || req.user.id || req.user,
          }),
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
      return res.status(500).json({
        message: "Logo uploaded but failed to update database",
        error: error.message,
      });
    }
  });
};

// Handler untuk mendapatkan logo
export const getLogo = (req, res) => {
  const pksId = req.params.id;

  try {
    // Cari PKS berdasarkan ID untuk mendapatkan informasi path file logo
    PKS.findById(pksId)
      .then((pks) => {
        if (!pks || !pks.pihakKedua.fileLogo || !pks.pihakKedua.fileLogo.path) {
          return res.status(404).json({ message: "Logo not found" });
        }

        const logoPath = pks.pihakKedua.fileLogo.path;

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

// Handler untuk menghapus logo
export const deleteLogo = async (req, res) => {
  const pksId = req.params.id;

  try {
    // Cari PKS untuk mendapatkan informasi path file logo
    const pks = await PKS.findById(pksId);

    if (!pks || !pks.pihakKedua.fileLogo || !pks.pihakKedua.fileLogo.path) {
      return res.status(404).json({ message: "Logo not found" });
    }

    const logoPath = pks.pihakKedua.fileLogo.path;

    // Verifikasi file ada
    if (!fs.existsSync(logoPath)) {
      // Tetap update database meskipun file tidak ada
      console.warn("Logo file not found on server:", logoPath);
    } else {
      // Hapus file jika ada
      await deleteFile(logoPath);
    }

    // Update database - hapus referensi logo
    const updatedPKS = await PKS.findByIdAndUpdate(
      pksId,
      {
        $unset: { "pihakKedua.fileLogo": "" },
        ...(req.user && {
          diperbaraiOleh: req.user.name || req.user.id || req.user,
        }),
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
