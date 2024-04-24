import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
import { Node } from "database";
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const recNodes: Node[] = req.body.nodes;
  try {
    console.log(recNodes);
    const createdNode = await prisma.node.createMany({ data: recNodes });
    res.status(200).json({ nodes: createdNode });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error creating node!" });
  }
});

export default router;
