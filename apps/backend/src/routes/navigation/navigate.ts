import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Graph } from "../../fileInput/Graph.ts";
import { NavigateAttributes } from "common/src/APICommon.ts";

// Handles incoming path requests
router.get("/", async (req, res) => {
  // destructuring to use our predefined start and end keys
  const {
    [NavigateAttributes.startLocationKey]: startName,
    [NavigateAttributes.endLocationKey]: endName,
  } = req.query;

  const startNode = await prisma.node.findFirst({
    where: {
      longName: startName!.toString(),
    },
  });

  const endNode = await prisma.node.findFirst({
    where: {
      longName: endName!.toString(),
    },
  });

  // make graph of all nodes and edges
  const graph = new Graph(
    await prisma.node.findMany(),
    await prisma.edge.findMany(),
  );

  const coords = graph.getPath(startNode!.nodeID, endNode!.nodeID, "A*");
  res.status(200).json(coords);
});

export default router;
