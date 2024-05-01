import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import axios from "axios";
import { PrismaClient } from "database";
import { getManagementToken } from "./fetchManagementToken.ts";
const prisma = new PrismaClient();
// import { useAuth0 } from "@auth0/auth0-react";

router.post("/", async (req: Request, res: Response) => {
  try {
    const token = await getManagementToken();
    const userName = req.body.userName;
    const sentEmail = req.body.email;
    await prisma.employee.deleteMany({
      where: {
        name: userName,
      },
    });
    const user = await axios.get(
      "https://dev-7eoh0ojk0tkfhypo.us.auth0.com/api/v2/users-by-email",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          email: sentEmail.toLowerCase(),
        },
      },
    );

    const userID = user.data[0].user_id;
    await prisma.employee.deleteMany({
      where: {
        email: sentEmail,
      },
    });
    const deleteUser = await axios.delete(
      `https://dev-7eoh0ojk0tkfhypo.us.auth0.com/api/v2/users/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Audience: "https://dev-7eoh0ojk0tkfhypo.us.auth0.com/api/v2/",
        },
      },
    );
    res.json({ numLeft: deleteUser.headers["x-ratelimit-remaining"] });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

export default router;
