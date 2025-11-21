import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // ✔ named import

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✔ fixed: correct import + correct route
router.get("/me", authMiddleware, getCurrentUser);

export default router;
