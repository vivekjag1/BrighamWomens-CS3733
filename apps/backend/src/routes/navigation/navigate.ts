import express, { Router } from "express";
import { PrismaClient } from "database";
import { Graph } from "../../pathfinding/Graph.ts";
import { NavigateAttributes } from "common/src/APICommon.ts";
import { PathAlgorithm } from "common/src/Path.ts";
import { getDirections, getTripStats } from "./TextualDirections.ts";

const router: Router = express.Router();
const prisma = new PrismaClient();

// Handles incoming path requests
router.get("/", async (req, res) => {
  // destructuring to use our predefined start and end keys
  const {
    [NavigateAttributes.startLocationKey]: startName,
    [NavigateAttributes.endLocationKey]: endName,
    [NavigateAttributes.algorithmKey]: algorithm,
  } = req.query;

  const startNode = await prisma.node.findFirst({
    where: {
      nodeID: startName!.toString(),
    },
  });

  const endNode = await prisma.node.findFirst({
    where: {
      nodeID: endName!.toString(),
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
    algorithm as PathAlgorithm,
  );

  const directions = getDirections(path);
  const tripStats = getTripStats(path);

  const responseData = {
    path: path,
    directions: directions,
    tripStats: tripStats,
  };

  res.status(200).json(responseData);
});

export default router;
