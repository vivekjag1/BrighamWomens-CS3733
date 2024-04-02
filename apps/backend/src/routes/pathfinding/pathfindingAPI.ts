import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Graph } from "../../fileInput/Graph.ts";
//const prisma = new PrismaClient();

// Handles incoming map data files
router.post("/", async (req, res) => {
  const nodes = await prisma.node.findMany(); //get nodes string from db
  const edges = await prisma.edge.findMany(); //get edges string from db
  const graphExport = new Graph(nodes, edges);
  res.send(graphExport);
});

export default router;
