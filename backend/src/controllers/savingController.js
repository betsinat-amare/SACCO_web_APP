import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Deposit savings
export const depositSavings = async (req, res) => {
  try {
    const { memberId, amount } = req.body;

    if (!memberId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid memberId or amount" });
    }

    const saving = await prisma.saving.create({
      data: { memberId, amount },
    });

    res.status(201).json({ message: "Deposit successful", saving });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all savings for a member
export const getMemberSavings = async (req, res) => {
  try {
    const { memberId } = req.params;

    const savings = await prisma.saving.findMany({
      where: { memberId },
    });

    res.json({ savings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
