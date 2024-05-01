import express, { Router } from "express";

import { PrismaClient } from "database";
const prisma = new PrismaClient();

const router: Router = express.Router();

router.post("/", async (req, res) => {
  const userName = req.body.userName;
  try {
    const fetchUser = await prisma.employee.findFirst({
      where: {
        name: userName,
      },
    });
    res.status(200).json(fetchUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "cannot find user!" });
  }
});

export default router;
