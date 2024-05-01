import { PrismaClient, Node, Edge } from "database";
const prisma = new PrismaClient();

export async function createNodesInDB(nodeData: string[][]) {
  const nodeArray: Node[] = [];

  for (const node of nodeData) {
    nodeArray.push({
      nodeID: node[0],
      xcoord: parseInt(node[1]),
      ycoord: parseInt(node[2]),
      floor: node[3],
      building: node[4],
      nodeType: node[5],
      longName: node[6],
      shortName: node[7],
    });
  }

  await prisma.node.createMany({ data: nodeArray, skipDuplicates: false });
  return nodeArray;
}

export async function createEdgesInDB(edgeData: string[][]) {
  const edgeArray: Edge[] = [];

  for (const edge of edgeData) {
    edgeArray.push({
      edgeID: edge[0],
      startNodeID: edge[1],
      endNodeID: edge[2],
    });
  }

  await prisma.edge.createMany({ data: edgeArray, skipDuplicates: false });
  return edgeArray;
}
