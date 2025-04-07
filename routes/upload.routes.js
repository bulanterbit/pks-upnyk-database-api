import express from "express";
import { handleUpload } from "../controllers/upload.controller.js";

const uploadRouter = express.Router();

// Route dengan id sebagai parameter URL
uploadRouter.post("/:id", handleUpload);

export default uploadRouter;
