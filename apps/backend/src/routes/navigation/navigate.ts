import express, { Router } from "express";
import { PrismaClient } from "database";
import { Graph, PathAlgorithm } from "../../fileInput/Graph.ts";
import { NavigateAttributes } from "common/src/APICommon.ts";

const router: Router = express.Router();
const prisma = new PrismaClient();

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

  const path = graph.getPath(
    startNode!.nodeID,
    endNode!.nodeID,
    PathAlgorithm.AStar,
  );

  const pathAsCoords: number[][] = [];
  for (let i = 0; i < path.length; i++) {
    const node = await prisma.node.findFirst({
      where: {
        nodeID: path[i],
      },
    });
    pathAsCoords.push([
      +node!.xcoord,
      +node!.ycoord,
      Graph.getNumFromFloor(node!.floor),
    ]);
  }
  console.log("testing" + pathAsCoords);

  res.status(200).json(pathAsCoords);
});

export default router;
