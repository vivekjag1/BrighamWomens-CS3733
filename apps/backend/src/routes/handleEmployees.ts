import express, { Router, Request, Response } from "express";
import multer from "multer";
//import { FileAttributes } from "common/src/APICommon.ts";
import { PrismaClient } from "database";
const prisma = new PrismaClient();
// import { readCSVFile } from "../fileInput/file.ts";
import { EmployeeType } from "common/src/EmployeeType.ts";

const router: Router = express.Router();

const upload = multer();

// Explicitly define types for files
interface UploadedFiles {
  [fileKey: string]: Express.Multer.File[];
}

// Handles incoming map data files
router.post(
  "/",
  upload.fields([{ name: "Employees", maxCount: 1 }]),
  async (req: Request, res: Response) => {
    console.log("File: ");
    const files = req.files as UploadedFiles | undefined;
    if (files) {
      console.log("inside if");
      const employeeFile: Express.Multer.File[] = files["Employees"];
      if (validateInput(employeeFile[0], 6)) {
        await checkDBStatus();
        console.log("checkDBStatus done");
        await populateDatabases(employeeFile[0]);
        console.log("Database populated");
        res.sendStatus(200);
      } else {
        console.log("did not work");
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
  console.log("testing", rows[0].length);
  return rows[0].length == numExpected;
}

async function populateDatabases(employeeFile: Express.Multer.File) {
  console.log(employeeFile.buffer.toString());
  // await populateEmployeeDB(readCSVFile(employeeFile.buffer.toString()));
  console.log("employees populated");
}

export async function checkDBStatus() {
  await prisma.employee.deleteMany();
  console.log("deleted employees");
}

export async function populateEmployeeDB(employeeData: EmployeeType[]) {
  await prisma.employee.createMany({
    data: employeeData,
    skipDuplicates: false,
  });
  return employeeData;
}

export default router;
