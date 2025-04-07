import express from "express";
import {
  downloadFile,
  viewFiles,
  deleteFile,
} from "../controllers/upload.controller.js";
import { checkFileExists } from "../middleware/upload.middleware.js";

const fileRouter = express.Router();

// Route untuk download file
fileRouter.get("/download/:id", checkFileExists, downloadFile);

// Route untuk melihat daftar file
fileRouter.get("/", viewFiles);

// Route untuk menghapus file
fileRouter.delete("/delete/:id", checkFileExists, deleteFile);

export default fileRouter;
