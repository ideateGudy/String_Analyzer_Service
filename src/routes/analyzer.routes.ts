import { Router } from "express";
import { createStringController, deleteStringController, filterByNaturalLanguageController, getAllStringsController, getStringController } from "../controllers/analyzer.controller.ts";

const router = Router();

router.post("/strings", createStringController); // Endpoint to create/analyze a string
router.get("/strings/filter-by-natural-language", filterByNaturalLanguageController); // Endpoint to filter strings by natural language
router.get("/strings", getAllStringsController); // Endpoint to get all strings with filtering
router.get("/strings/:stringValue", getStringController); // Endpoint to get a specific string
router.delete("/strings/:stringValue", deleteStringController); // Endpoint to delete a specific string

export default router;