import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const numNodes = await prisma.node.count();
    res.status(200).json({ numNodes: numNodes });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error!" });
  }
});

export default router;
