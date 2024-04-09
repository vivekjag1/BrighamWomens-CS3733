import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();

//const prisma = new PrismaClient();

// Handles incoming map data files
router.get("/", async (req, res) => {
  const nodeString = await getNodesFromDB(); //get nodes string from db
  const edgeString = await getEdgesFromDB(); //get edges string from db
  const sendToFrontEnd: string[] = [edgeString, nodeString]; //send as 2d string array
  res.send(sendToFrontEnd);
});

export async function getNodesFromDB() {
  const nodesFromDb = await prisma.node.findMany();
  let nodesString = "";

  nodesFromDb.forEach(
    (node) => (nodesString += Object.values(node).join(",") + "\r\n"),
  ); // crlf

  // console.log("Nodes:");
  // console.log(nodesFromDb);

  return nodesString;
}
export async function getEdgesFromDB() {
  const edgesFromDb = await prisma.edge.findMany();
  let edgesString = "";

  edgesFromDb.forEach(
    (edge) => (edgesString += edge.startNodeID + "," + edge.endNodeID + "\r\n"),
  );

  return edgesString;
}

export default router;
