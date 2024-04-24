import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Node } from "database";

router.patch("/", async (req, res) => {
  const node: Node[] = req.body.nodes;
  console.log(req.body);
  try {
    for (let i = 0; i < node.length; i++) {
      await prisma.node.update({
        where: { nodeID: node[i].nodeID },
        data: {
          xcoord: node[i].xcoord,
          ycoord: node[i].ycoord,
          shortName: node[i].shortName,
          longName: node[i].longName,
        },
      });
    }
    res.json({
      message: "Node has been updated!",
    });
  } catch (error) {
    console.error("Error updating node! ", error);
    res.status(400).json({ message: "Error updating node!" });
  }
});
export default router;
