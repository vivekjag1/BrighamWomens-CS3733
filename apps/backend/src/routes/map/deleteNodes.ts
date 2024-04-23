import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const nodeID: string = req.body.nodeID;
  console.log(nodeID);
  try {
    await prisma.edge.deleteMany({
      where: {
        OR: [{ startNodeID: nodeID }, { endNodeID: nodeID }],
      },
    });
    const createdNode = await prisma.node.delete({
      where: {
        nodeID: nodeID,
      },
    });
    res.json({
      message: "Node has been deleted!",
      createdNode,
    });
  } catch (error) {
    console.error("Error deleting node! ", error);
    res.status(400).json({ message: "Error deleting node!" });
  }
});
export default router;
