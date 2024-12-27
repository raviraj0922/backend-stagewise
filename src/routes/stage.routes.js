import express from "express";
import multer from "multer";
import {
  submitStage,
  getStageData,
  getAllStages,
  updateStage,
  deleteStage,
} from "../controllers/stage.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

// User routes
router.post("/submit", authMiddleware, upload.single("file"), submitStage);
router.get("/:stageNumber", authMiddleware, getStageData);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, getAllStages); // Get all stages
router.patch("/:stageId", authMiddleware, adminMiddleware, updateStage); // Update a stage
router.delete("/:stageId", authMiddleware, adminMiddleware, deleteStage); // Delete a stage

export default router;
