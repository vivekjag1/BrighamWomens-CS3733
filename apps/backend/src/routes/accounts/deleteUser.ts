import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import axios from "axios";
import { PrismaClient } from "database";
import { getManagementToken } from "./fetchManagementToken.ts";
const prisma = new PrismaClient();
// import { useAuth0 } from "@auth0/auth0-react";
console.log("calling delete users");

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("i hate everything!");
    const token = await getManagementToken();
    console.log(token);
    console.log("making delete request");
    console.log(req.body.user);
    const sentEmail = req.body.email;
    console.log(sentEmail);
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

    console.log(user.data[0]);
    const userID = user.data[0].user_id;
    console.log(userID.user_id);
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
    console.log("that user was deleted", deleteUser.data);
    res.json({ numLeft: deleteUser.headers["x-ratelimit-remaining"] });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

export default router;
