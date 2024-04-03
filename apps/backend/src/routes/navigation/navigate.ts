import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Graph } from "../../fileInput/Graph.ts";

// Handles incoming path requests
router.post("/", async (req, res) => {
  const nodes = await prisma.node.findMany(); //get nodes string from db
  const edges = await prisma.edge.findMany(); //get edges string from db
  const graph = new Graph(nodes, edges);
  res.send(graph);
});

export default router;
