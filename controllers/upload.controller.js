import multer from "multer";
import { upload } from "../middleware/upload.middleware.js";

export const handleUpload = (req, res) => {
  const uploadSingle = upload.single("file");

  uploadSingle(req, res, (err) => {
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

    res.status(200).json({
      message: "PDF uploaded successfully",
      filename: req.file.filename,
      path: req.file.path,
    });
  });
};
