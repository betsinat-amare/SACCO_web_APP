import express from "express";
import { depositSavings, getMemberSavings } from "../controllers/savingController.js";
import { applyLoan, getMemberLoans } from "../controllers/loanController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Savings routes
router.post("/deposit", authMiddleware, depositSavings);
router.get("/savings/:memberId", authMiddleware, getMemberSavings);

// Loans routes
router.post("/loan", authMiddleware, applyLoan);
router.get("/loans/:memberId", authMiddleware, getMemberLoans);

export default router;
