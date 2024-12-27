import express from "express";
import { createApplication, getApplication, updateApplicationStatus } from "../controllers/application.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createApplication); // Create a new application
router.get("/details", authMiddleware, getApplication); // Fetch application details
router.patch("/status", authMiddleware, updateApplicationStatus); // Update application status

export default router;

