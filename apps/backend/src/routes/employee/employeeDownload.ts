import express, { Router } from "express";
import { Employee, PrismaClient } from "database";

const prisma = new PrismaClient();
const router: Router = express.Router();

export async function getEmployeesFromDB() {
  const employeesFromDb = await prisma.employee.findMany();
  let employeesString = "";

  employeesFromDb.forEach(
    (employee: Employee) =>
      (employeesString += Object.values(employee).join(",") + "\r\n"),
  );
  return employeesString;
}

router.get("/", async (req, res) => {
  const employeeString = await getEmployeesFromDB();
  res.send(employeeString);
});

export default router;
