import express from "express";
import {
  downloadFile,
  viewFiles,
  deleteFile,
} from "../controllers/file.controller.js";
import { checkFileExists } from "../middleware/file.middleware.js";

const generateRouter = express.Router();

// Route untuk generate document
generateRouter.get("/", generateCDocument);

export default generateRouter;
