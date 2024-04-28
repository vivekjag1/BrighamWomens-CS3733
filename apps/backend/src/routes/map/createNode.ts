import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
import { Node } from "database";
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const recNode: Node = req.body.nodes;

  try {
    const createdNode = await prisma.node.createMany({ data: recNode });
    res.status(200).json({ nodes: createdNode });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error creating node!" });
  }
});

export default router;
