import express from "express";
import { generateDocument } from "../controllers/document.controller.js";

const documentRouter = express.Router();

// Route untuk generate dokumen
documentRouter.get("/:id", generateDocument);

export default documentRouter;
