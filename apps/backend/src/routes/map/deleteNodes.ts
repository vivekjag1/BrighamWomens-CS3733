import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { GraphNode } from "common/src/GraphNode.ts";

router.post("/", async (req, res) => {
  const node: GraphNode = req.body;
  console.log(req.body);
  try {
    const createdNode = await prisma.node.delete({
      where: {
        nodeID: node.nodeID,
      },
    });
    res.json({
      message: "Node has been deleted!",
      createdNode,
    });
  } catch (error) {
    console.error("Error creating node! ", error);
    res.status(400).json({ message: "Error creating node!" });
  }
});
export default router;
