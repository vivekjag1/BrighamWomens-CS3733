import express, { Router, Request, Response } from "express";
import multer from "multer";
//import { FileAttributes } from "common/src/APICommon.ts";
import { PrismaClient, Employee } from "database";
const prisma = new PrismaClient();
import { readEmployeeFile } from "../fileInput/file.ts";
import client from "../bin/database-connection.ts";
// import { EmployeeType } from "common/src/EmployeeType.ts";

const router: Router = express.Router();

const upload = multer();

// Explicitly define types for files
interface UploadedFiles {
  [fileKey: string]: Express.Multer.File[];
}

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const requests: Employee[] = await client.employee.findMany();
  res.json(requests);
});

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
  await populateEmployeeDB(readEmployeeFile(employeeFile.buffer.toString()));
  console.log("employees populated");
}

export async function checkDBStatus() {
  try {
    await prisma.employee.deleteMany();
    console.log("deleted employees");
  } catch {
    console.log("employee database empty");
  }
}

export async function populateEmployeeDB(employeeData: string[][]) {
  const employees = employeeData.map((data) => ({
    name: data[0],
    userName: data[1],
    password: data[2],
    position: data[3],
    role: data[4],
    profilePicture: data[5],
  }));

  await prisma.employee.createMany({
    data: employees,
    skipDuplicates: true,
  });
  return employeeData;
}

export default router;
