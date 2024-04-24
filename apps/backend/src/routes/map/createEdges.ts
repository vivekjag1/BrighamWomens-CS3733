import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Edge } from "database";

router.post("/", async (req, res) => {
  try {
    const edgesFromFrontEnd: Edge[] = req.body.edges;
    console.log(edgesFromFrontEnd);
    const createdEdge = await prisma.edge.createMany({
      data: edgesFromFrontEnd,
    });
    res.status(200).json({ edge: createdEdge });
  } catch {
    res.status(400).json({ message: "Edge cannot be created!" });
  }
});
export default router;
