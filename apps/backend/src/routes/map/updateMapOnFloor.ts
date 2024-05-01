import express, { Router } from "express";
import { Node, Edge, PrismaClient } from "database";
const prisma = new PrismaClient();

const router: Router = express.Router();

// Handles map updates from map edit page
router.post("/", async (req, res) => {
  try {
    const floor = req.body.floor.toString();

    // Delete all edges on floor
    await prisma.edge.deleteMany({
      where: {
        AND: [{ startNode: { floor: floor } }, { endNode: { floor: floor } }],
      },
    });

    // Since users aren't allowed to add stairs or elevators,
    // And removing them would break a fkey constraint
    await prisma.node.deleteMany({
      where: {
        floor: floor,
        NOT: [{ nodeType: "ELEV" }, { nodeType: "STAI" }],
      },
    });

    // Push requested nodes and edges on floor to DB
    await createNodes(req.body.nodes);
    await createEdges(req.body.edges);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error updating map floor data" });
  }
});

export async function createNodes(nodes: Node[]) {
  // Remove all stairs and elevators on floor (these aren't easily editable due to FK/Prisma reasons)
  nodes = nodes.filter(
    (node: Node) => node.nodeType != "ELEV" && node.nodeType != "STAI",
  );

  await prisma.node.createMany({ data: nodes, skipDuplicates: true });
}

export async function createEdges(edges: Edge[]) {
  await prisma.edge.createMany({ data: edges, skipDuplicates: true });
}

export default router;
