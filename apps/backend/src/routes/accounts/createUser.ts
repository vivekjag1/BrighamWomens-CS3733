import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import axios from "axios";
import prisma from "../../bin/database-connection.ts";
import { user } from "common/src/userType.ts";
import { getManagementToken } from "./fetchManagementToken.ts";

router.get("/", async (req: Request, res: Response) => {
  // const employees = await prisma.employee.findMany();

  try {
    const employees = await prisma.employee.findMany();
    const makeUsers: user[] = [];
    for (let i = 0; i < employees.length; i++) {
      const thisUser: user = {
        name: employees[i].name,
        connection: "Username-Password-Authentication",
        email: employees[i].email,
        password: "Str0ngP@ssw0rd!",
      };
      makeUsers.push(thisUser);
    }

    const token = await getManagementToken();
    for (let i = 0; i < makeUsers.length; i++) {
      await axios.post(
        "https://dev-7eoh0ojk0tkfhypo.us.auth0.com/api/v2/users",
        makeUsers[i],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Audience: "https://dev-7eoh0ojk0tkfhypo.us.auth0.com/api/v2/",
          },
        },
      );
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});
export default router;
