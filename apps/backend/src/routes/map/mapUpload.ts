import express, { Router, Request, Response } from "express";
import multer from "multer";
import { mapAttributes } from "common/src/api.ts";
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import {
  readCSVFile,
  populateNodeDB,
  populateEdgeDB,
} from "../../fileInput/file.ts";

const router: Router = express.Router();

const upload = multer();

// Explicitly define types for files
interface UploadedFiles {
  [fileKey: string]: Express.Multer.File[];
}

// Handles incoming map data files
router.post(
  "/",
  upload.fields([
    { name: mapAttributes.nodeMulterKey, maxCount: 1 },
    { name: mapAttributes.edgeMulterKey, maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    const files = req.files as UploadedFiles | undefined;
    if (files) {
      const nodeFile: Express.Multer.File[] =
        files[mapAttributes.nodeMulterKey];
      const edgeFile: Express.Multer.File[] =
        files[mapAttributes.edgeMulterKey];
      if (validateInput(nodeFile[0], 8) && validateInput(edgeFile[0], 2)) {
        await checkDBStatus();
        console.log("checkDBStatus done");
        await populateDatabases(nodeFile[0], edgeFile[0]);
        console.log("Database populated");
        res.sendStatus(200);
        //
        // .then(() => populateDatabases(nodeFile[0], edgeFile[0]).then()
        //     .catch(console.error))
        // .then(() => res.status(200));
      } else {
        console.log("did not work");
        res.status(400);
      }
    } else {
      res.status(404).send("Files missing from upload");
    }
  },
);
function validateInput(
  aFile: Express.Multer.File,
  numExpected: number,
): boolean {
  const data = aFile.buffer.toString();
  const rows = data.split("\r\n").map((row) => row.split(","));
  return rows[0].length == numExpected;
}

async function populateDatabases(
  nodeFile: Express.Multer.File,
  edgeFile: Express.Multer.File,
) {
  await populateNodeDB(readCSVFile(nodeFile.buffer.toString()));
  console.log("nodes populated");
  await populateEdgeDB(readCSVFile(edgeFile.buffer.toString()));
  console.log("edges populated");
}

export async function checkDBStatus() {
  await prisma.edge.deleteMany();
  console.log("deleted edges");
  await prisma.node.deleteMany();
  console.log("deleted nodes");
  // const nodes = await prisma.node.findMany();
  //   console.log("nodes recieved");
  //
  //   const edges = await prisma.edge.findMany();
  //   console.log("edges recieved");
  // if (edges.length !== 0) {
  //   await prisma.edge.deleteMany();
  // }
  // if (nodes.length !== 0) {
  //   await prisma.node.deleteMany();
  // }
}

export default router;
