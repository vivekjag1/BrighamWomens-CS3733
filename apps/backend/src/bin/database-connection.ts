import { PrismaClient } from "database";
// import {
//   populateEdgeDB,
//   populateNodeDB,
//   readCSVFile,
// } from "../utils/fileParser.ts";

// Create the prisma client, this automatically connects to the database
const client = new PrismaClient();

// Export the client
export default client;

// Prisma automatically closes on shutdown

// TODO: try catch if db populated
// async function main() {
//     await readCSVFile("../backend/data/L1Nodes.csv")
//         .then(populateNodeDB)
//         .catch(console.error);
//     await readCSVFile("../backend/data/L1Edges.csv")
//         .then(populateEdgeDB)
//         .catch(console.error);
// }
