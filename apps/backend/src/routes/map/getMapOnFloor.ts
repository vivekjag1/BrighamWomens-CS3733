import express, { Router } from "express";
import { PrismaClient } from "database";
import { NavigateAttributes } from "common/src/APICommon.ts";
const prisma = new PrismaClient();
const router: Router = express.Router();

// Get map data on one floor
router.get("/", async (req, res) => {
  try {
    const { [NavigateAttributes.floorKey]: floorQuery } = req.query;
    const floor = floorQuery!.toString();

    const nodes = await prisma.node.findMany({
      where: {
        floor: floor,
      },
    });

    const edges = await prisma.edge.findMany({
      where: {
        AND: [{ startNode: { floor: floor } }, { endNode: { floor: floor } }],
      },
    });

    res.status(200).json({ nodes: nodes, edges: edges });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error fetching map floor data" });
  }
});

export default router;
