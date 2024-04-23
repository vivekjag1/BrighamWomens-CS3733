import type { Node, Edge } from "database";
import { PrismaClient } from "database";
import fs from "fs";
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

export function readEmployeeFile(csvData: string) {
  const rows = csvData.split("\r\n");
  const result = rows.map((row) => row.split(","));
  return result;
}

export async function populateNodeDB(nodeData: string[][]) {
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

export async function populateEdgeDB(edgeData: string[][]) {
  const edgeArray: Edge[] = [];
  // let i = 1;
  for (const edge of edgeData) {
    edgeArray.push({
      edgeID: edge[0],
      startNodeID: edge[1],
      endNodeID: edge[2],
    });
  }

  // console.log(edgeArray);
  await prisma.edge.createMany({ data: edgeArray, skipDuplicates: false });
  return edgeArray;
}
export async function writeFile(filePath: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
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
    (edge) => (edgesString += Object.values(edge).join(",") + "\r\n"),
  );
  return edgesString;
}

export async function getEmployeesFromDB() {
  const employeesFromDb = await prisma.employee.findMany();
  let employeesString = "";

  employeesFromDb.forEach(
    (employee) =>
      (employeesString += Object.values(employee).join(",") + "\r\n"),
  );
  console.log(employeesString);
  return employeesString;
}
