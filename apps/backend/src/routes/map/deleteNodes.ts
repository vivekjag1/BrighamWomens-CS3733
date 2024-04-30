import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
// import { Node } from "database";

router.post("/", async (req, res) => {
  const nodeIDs: string[] = req.body.nodes;
  try {
    for (let i = 0; i < nodeIDs.length; i++) {
      const numEdges = await prisma.edge.findMany({
        where: {
          OR: [{ startNodeID: nodeIDs[i] }, { endNodeID: nodeIDs[i] }],
        },
      });
      if (numEdges.length != 0) {
        await prisma.edge.deleteMany({
          where: {
            OR: [{ startNodeID: nodeIDs[i] }, { endNodeID: nodeIDs[i] }],
          },
        });
      }
      const findNode = await prisma.node.findMany({
        where: {
          nodeID: nodeIDs[i],
        },
      });
      if (findNode.length != 0) {
        await prisma.node.delete({
          where: {
            nodeID: nodeIDs[i],
          },
        });
      }
    }
    res.json({
      message: "Node has been deleted!",
    });
  } catch (error) {
    console.error("Error deleting node! ", error);
    res.status(400).json({ message: "Error deleting node!" });
  }
});
export default router;
