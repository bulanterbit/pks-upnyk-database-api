import express from "express";
import {
  handlePdfUpload,
  handleLogoUpload,
  getLogo,
  deleteLogo,
} from "../controllers/upload.controller.js";

const uploadRouter = express.Router();

// Route untuk upload PDF dokumen
uploadRouter.post("/pdf/:id", handlePdfUpload);

// Routes untuk logo mitra
uploadRouter.post("/logo/:id", handleLogoUpload);
uploadRouter.get("/logo/:id", getLogo);
uploadRouter.delete("/logo/:id", deleteLogo);

export default uploadRouter;
