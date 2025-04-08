import multer from "multer";
import { upload } from "../middleware/upload.middleware.js";
import PKS from "../models/pks.model.js";

export const handleUpload = (req, res) => {
  const uploadSingle = upload.single("file");
  const pksId = req.params.id; // Mendapatkan ID dari parameter URL

  uploadSingle(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Error karena Multer (misal file terlalu besar)
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(413)
          .json({ message: "File too large. Max 5MB allowed." });
      }
      return res
        .status(500)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      // Error umum lainnya (misal bukan PDF)
      return res
        .status(400)
        .json({ message: "Upload failed", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Cari PKS berdasarkan ID dan update informasi fileUpload
      const updatedPKS = await PKS.findByIdAndUpdate(
        pksId,
        {
          "dokumen.fileUpload": {
            nama: req.file.originalname,
            tipe: req.file.mimetype,
            path: req.file.path,
          },
          // Tambahkan informasi who updated jika tersedia
          ...(req.user && {
            diperbaraiOleh: req.user.name || req.user.id || req.user,
          }),
        },
        { new: true, runValidators: true }
      );

      if (!updatedPKS) {
        // Hapus file yang sudah terupload jika PKS tidak ditemukan
        // Note: Anda perlu menambahkan fungsi untuk menghapus file jika diperlukan
        return res.status(404).json({ message: "PKS not found" });
      }

      res.status(200).json({
        message: "PDF uploaded successfully and PKS updated",
        filename: req.file.filename,
        path: req.file.path,
        pks: updatedPKS,
      });
    } catch (error) {
      // Jika terjadi error saat update database
      console.error("Database update error:", error);
      return res.status(500).json({
        message: "File uploaded but failed to update database",
        error: error.message,
      });
    }
  });
};
