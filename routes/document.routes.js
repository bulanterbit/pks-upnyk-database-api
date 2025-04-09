import express from "express";
import { generateDocument } from "../controllers/document.controller";

const generateRouter = express.Router();

// Route untuk generate document
generateRouter.get("/", generateDocument);

export default generateRouter;
