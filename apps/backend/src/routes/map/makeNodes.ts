import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Node } from "database";

router.post("/", async (req, res) => {
  const node: Node = req.body;
  console.log(req.body);
  try {
    const createdNode = await prisma.node.createMany({ data: node });
    res.json({
      message: "Node has been created!",
      createdNode,
    });
  } catch (error) {
    console.error("Error creating node! ", error);
    res.status(400).json({ message: "Error creating node!" });
  }
});
export default router;
