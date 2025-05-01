import { Router } from "express";
import {
  getAllPKS,
  getSinglePKS,
  insertPKS,
  updatePKS,
  deletePKS,
} from "../controllers/pks.controller.js";
import { sendPksDocumentEmail } from "../controllers/pks.controller.js";

const pksRouter = Router();

pksRouter.get("/", getAllPKS);

pksRouter.get("/:id", getSinglePKS);

pksRouter.post("/", insertPKS);

pksRouter.put("/:id", updatePKS);

pksRouter.post("/update/:id", updatePKS);

pksRouter.post("/:id/send-email", sendPksDocumentEmail);

// Add the new delete route
pksRouter.delete("/:id", deletePKS);

export default pksRouter;
