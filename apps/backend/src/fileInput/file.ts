import { GraphNode } from "./GraphNode.ts";
import { GraphEdge } from "./GraphEdge.ts";
import { PrismaClient } from "database";
const prisma = new PrismaClient();

/**
 * reads in a csv file, then splits it twice to make a 2d string array
 * @param filePath
 */
// export async function readCSVFile(filePath: string) {
//   return new Promise<string[][]>((resolve, reject) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         const rows = data
//           .split("\r\n") // split on crlf, populate rows
//           .slice(1, -1) // remove header and blank last row
//           .map((row) => row.split(",")); // populate cols
//         resolve(rows);
//       }
//     });
//   });
// }
export function readCSVFile(contents: string) {
  const rows = contents
    .split("\r\n")
    .slice(1, -1)
    .map((row) => row.split(","));
  return rows;
}
export async function populateNodeDB(nodeData: string[][]) {
  const nodeArray: GraphNode[] = [];
  for (const node of nodeData) {
    nodeArray.push(
      new GraphNode(
        node[0],
        node[1],
        node[2],
        node[3],
        node[4],
        node[5],
        node[6],
        node[7],
      ),
    );
  }
  await prisma.node.createMany({ data: nodeArray, skipDuplicates: false });
  return nodeArray;
}

export async function populateEdgeDB(edgeData: string[][]) {
  const edgeArray: GraphEdge[] = [];
  let i = 1;
  for (const edge of edgeData) {
    edgeArray.push(new GraphEdge(i++, edge[0], edge[1]));
  }

  // console.log(edgeArray);
  await prisma.edge.createMany({ data: edgeArray, skipDuplicates: false });
  return edgeArray;
}
// export async function populateEdgeDB(data: string[][]) {
//   const edgeArray: GraphEdge[] = [];
//   let i = 1;
//   for (const edge of data) {
//     edgeArray.push(new GraphEdge(i++, edge[0], edge[1]));
//   }
//   for (const row of data) {
//     console.log(row);
//     await prisma.edge.create({
//       data: {
//         edgeID: i++,
//         startNodeID: row[0],
//         endNodeID: row[1],
//       },
//     });
//   }
// }
