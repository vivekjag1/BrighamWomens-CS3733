import express, { Router, Request, Response } from "express";
import multer from "multer";
//import { FileAttributes } from "common/src/APICommon.ts";
import { PrismaClient, Employee } from "database";
const prisma = new PrismaClient();
import { readEmployeeFile } from "../../utils/fileParser.ts";
import client from "../../bin/database-connection.ts";
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

router.post(
  "/",
  upload.fields([{ name: "Employees", maxCount: 1 }]),
  async (req: Request, res: Response) => {
    const files = req.files as UploadedFiles | undefined;
    if (files) {
      const employeeFile: Express.Multer.File[] = files["Employees"];
      if (validateInput(employeeFile[0], 6)) {
        await checkDBStatus();
        await populateDatabases(employeeFile[0]);
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

async function populateDatabases(employeeFile: Express.Multer.File) {
  await populateEmployeeDB(readEmployeeFile(employeeFile.buffer.toString()));
}

export async function checkDBStatus() {
  try {
    await prisma.employee.deleteMany();
  } catch {
    console.error("employee database empty");
  }
}

export async function populateEmployeeDB(employeeData: string[][]) {
  let i = 0;
  const employees = employeeData.map((data) => ({
    employeeID: i++,
    name: data[0],
    userName: data[1],
    position: data[2],
    role: data[3],
    profilePicture: data[4] || "default-photo",
    email: data[5],
  }));
  employees.pop();

  await prisma.employee.createMany({
    data: employees,
    skipDuplicates: true,
  });
  return employeeData;
}

export default router;
