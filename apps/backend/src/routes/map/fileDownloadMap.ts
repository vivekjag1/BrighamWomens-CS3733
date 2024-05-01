import express, { Router } from "express";
const router: Router = express.Router();

import { PrismaClient } from "database";
const prisma = new PrismaClient();

// Handles incoming map data files
router.get("/", async (req, res) => {
  const nodeString = await getAllNodesStr(); //get nodes string from db
  const edgeString = await getAllEdgesStr(); //get edges string from db

  res.send([edgeString, nodeString]); // send as string array
});

export default router;

export async function getAllNodesStr() {
  const nodesFromDb = await prisma.node.findMany();
  let nodesString = "";

  nodesFromDb.forEach(
    (node) => (nodesString += Object.values(node).join(",") + "\r\n"),
  );

  return nodesString;
}

export async function getAllEdgesStr() {
  const edgesFromDb = await prisma.edge.findMany();
  let edgesString = "";

  edgesFromDb.forEach(
    (edge) => (edgesString += Object.values(edge).join(",") + "\r\n"),
  );

  return edgesString;
}
