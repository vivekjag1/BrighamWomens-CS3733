import express, { Router } from "express";
const router: Router = express.Router();
import { getEdgesFromDB, getNodesFromDB } from "../../fileInput/file.ts";
//const prisma = new PrismaClient();

// Handles incoming map data files
router.get("/", async (req, res) => {
  console.log("hello workd");
  const nodeString = await getNodesFromDB(); //get nodes string from db
  const edgeString = await getEdgesFromDB(); //get edges string from db
  const sendToFrontEnd: string[] = [edgeString, nodeString]; //send as 2d string array
  res.send(sendToFrontEnd);
});

export default router;
