import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    register,
    uploadAvatar,
    updateAvatar,
    removeAvatar,    
    login,
    logout
} from "../controllers/auth.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // File upload middleware

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar); // Upload new avatar
router.patch("/avatar", authMiddleware, upload.single("avatar"), updateAvatar); // Update avatar
router.delete("/avatar", authMiddleware, removeAvatar); // Remove avatar

export default router;
