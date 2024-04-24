import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Edge } from "database";
router.post("/", async (req, res) => {
  try {
    const edgesFromFrontEnd: Edge[] = req.body.edges;
    for (let i = 0; i < edgesFromFrontEnd.length; i++) {
      const sameEdgeId = await prisma.edge.findMany({
        where: {
          edgeID: edgesFromFrontEnd[i].edgeID,
        },
      });
      // if(sameEdgeId.length == 0){
      //    await prisma.edge.create({
      //     data: edgesFromFrontEnd[i],
      //   });
      // }
      const startNode = await prisma.node.findMany({
        where: {
          nodeID: edgesFromFrontEnd[i].startNodeID,
        },
      });
      const endNode = await prisma.node.findMany({
        where: {
          nodeID: edgesFromFrontEnd[i].endNodeID,
        },
      });
      if (
        startNode.length > 0 &&
        endNode.length > 0 &&
        sameEdgeId.length == 0
      ) {
        await prisma.edge.create({
          data: edgesFromFrontEnd[i],
        });
      }
    }
    console.log("edges from frontend", edgesFromFrontEnd);
    res.status(200).json({ message: "edges created!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Edge cannot be created!" });
  }
});
export default router;
