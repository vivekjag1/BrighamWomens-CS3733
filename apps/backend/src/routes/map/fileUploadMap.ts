import express, { Router, Request, Response } from "express";
import multer from "multer";
import { FileAttributes } from "common/src/APICommon.ts";
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { readMapDataFile } from "../../utils/fileParser.ts";
import { createNodesInDB, createEdgesInDB } from "./common.ts";

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
    { name: FileAttributes.nodeKey, maxCount: 1 },
    { name: FileAttributes.edgeKey, maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    const files = req.files as UploadedFiles | undefined;
    if (files) {
      const nodeFile: Express.Multer.File[] = files[FileAttributes.nodeKey];
      const edgeFile: Express.Multer.File[] = files[FileAttributes.edgeKey];
      if (validateInput(nodeFile[0], 8) && validateInput(edgeFile[0], 3)) {
        await deleteAllFromDB();
        await populateDatabases(nodeFile[0], edgeFile[0]);
        res.sendStatus(200);
      } else {
        res.sendStatus(202);
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
  await createNodesInDB(readMapDataFile(nodeFile.buffer.toString()));
  await createEdgesInDB(readMapDataFile(edgeFile.buffer.toString()));
}

export async function deleteAllFromDB() {
  await prisma.edge.deleteMany();
  await prisma.node.deleteMany();
}

export default router;
