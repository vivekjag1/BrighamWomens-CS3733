import express, { Router } from "express";
const router: Router = express.Router();
import { getEmployeesFromDB } from "../../fileInput/file.ts";
//const prisma = new PrismaClient();

// Handles incoming map data files
router.get("/", async (req, res) => {
  const employeeString = await getEmployeesFromDB();
  res.send(employeeString);
});

export default router;
