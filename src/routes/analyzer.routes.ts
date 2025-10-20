import { Router } from "express";
import { createStringController, deleteStringController, filterStringsByNaturalLanguageController, getAllStringsController, getStringController } from "../controllers/analyzer.controller.ts";

const router = Router();

router.post("/strings", createStringController);
router.get("/strings/:stringValue", getStringController);
router.get("/strings", getAllStringsController);
router.get("/strings/filter-by-natural-language", filterStringsByNaturalLanguageController);
router.delete("/strings/:stringValue", deleteStringController);

export default router;