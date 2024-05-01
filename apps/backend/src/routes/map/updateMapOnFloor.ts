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
  for (let i = 0; i < edges.length; i++) {
    const startNode = await prisma.node.findMany({
      where: {
        nodeID: edges[i].startNodeID,
      },
    });
    const endNode = await prisma.node.findMany({
      where: {
        nodeID: edges[i].endNodeID,
      },
    });
    if (startNode.length != 0 && endNode.length != 0) {
      await prisma.edge.create({
        data: {
          edgeID: edges[i].edgeID,
          startNodeID: edges[i].startNodeID,
          endNodeID: edges[i].endNodeID,
        },
      });
    }
  }
}

export default router;
