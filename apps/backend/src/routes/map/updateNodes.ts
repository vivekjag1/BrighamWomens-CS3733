import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Node } from "database";

router.patch("/", async (req, res) => {
  const node: Node = req.body;
  console.log(req.body);
  try {
    const updatedNodes = await prisma.node.update({
      where: { nodeID: node.nodeID },
      data: {
        xcoord: node.xcoord,
        ycoord: node.ycoord,
        shortName: node.shortName,
        longName: node.longName,
      },
    });
    res.json({
      message: "Node has been updated!",
      updatedNodes,
    });
  } catch (error) {
    console.error("Error updating node! ", error);
    res.status(400).json({ message: "Error updating node!" });
  }
});
export default router;
