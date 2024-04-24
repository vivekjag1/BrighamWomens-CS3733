import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const edgeFromFrontEnd = req.body.edge;
    const createdEdge = await prisma.edge.createMany({
      data: edgeFromFrontEnd,
    });
    res.status(200).json({ edge: createdEdge });
  } catch {
    res.status(400).json({ message: "Edge cannot be created!" });
  }
});
export default router;
