import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to generate random 8-digit account number
const generateAccountNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Create new member
export const createMember = async (req, res) => {
  try {
    const { fullName, nationalId, phoneNumber, email } = req.body;

    // Check if nationalId or email exists
    const existing = await prisma.member.findFirst({
      where: {
        OR: [{ nationalId }, { email }],
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Member with this nationalId or email already exists" });
    }

    const accountNumber = generateAccountNumber();

    const newMember = await prisma.member.create({
      data: {
        fullName,
        nationalId,
        phoneNumber,
        email,
        accountNumber,
      },
    });

    res.status(201).json({ message: "Member created successfully", member: newMember });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// List all members
export const listMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    res.json({ members });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single member by accountNumber
export const getMember = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const member = await prisma.member.findUnique({
      where: { accountNumber },
    });

    if (!member) return res.status(404).json({ message: "Member not found" });

    res.json({ member });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
