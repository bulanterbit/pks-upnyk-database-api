import express from "express";
import {
  downloadFile,
  viewFiles,
  deleteFile,
} from "../controllers/file.controller.js";
import { checkFileExists } from "../middleware/file.middleware.js";

const fileRouter = express.Router();

// Route untuk download file
fileRouter.get("/:filename", checkFileExists, downloadFile);

// Route untuk melihat daftar file
fileRouter.get("/", viewFiles);

// Route untuk menghapus file
fileRouter.delete("/:filename", checkFileExists, deleteFile);

export default fileRouter;
