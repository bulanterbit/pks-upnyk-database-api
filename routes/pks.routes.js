import { Router } from "express";
import {
  getAllPKS,
  getSinglePKS,
  insertPKS,
  updatePKS,
  deletePKS,
} from "../controllers/pks.controller.js";

const pksRouter = Router();

pksRouter.get("/", getAllPKS);

pksRouter.get("/:id", getSinglePKS);

pksRouter.post("/", insertPKS);

pksRouter.put("/:id", updatePKS);

pksRouter.post("/update/:id", updatePKS);

// Add the new delete route
pksRouter.delete("/:id", deletePKS);

export default pksRouter;
