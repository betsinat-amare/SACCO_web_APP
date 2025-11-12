import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Apply for a loan
export const applyLoan = async (req, res) => {
  try {
    const { memberId, amount } = req.body;

    if (!memberId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid memberId or amount" });
    }

    const loan = await prisma.loan.create({
      data: { memberId, amount },
    });

    res.status(201).json({ message: "Loan application submitted", loan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all loans for a member
export const getMemberLoans = async (req, res) => {
  try {
    const { memberId } = req.params;

    const loans = await prisma.loan.findMany({
      where: { memberId },
    });

    res.json({ loans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
