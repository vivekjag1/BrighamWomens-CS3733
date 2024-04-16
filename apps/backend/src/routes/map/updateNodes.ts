import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();

router.patch("/", async (req, res) => {
  const { nodeID, ShortName, LongName, Type, Floor, xCoord, yCoord } = req.body;
  try {
    const updatedNodes = await prisma.node.update({
      where: { nodeID: nodeID },
      data: {
        shortName: ShortName,
        longName: LongName,
        nodeType: Type,
        floor: Floor,
        xcoord: xCoord,
        ycoord: yCoord,
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
