import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import axios from "axios";

import { getManagementToken } from "./fetchManagementToken.ts";

router.post("/", async (req: Request, res: Response) => {
  try {
    const newPassword = req.body.newPass;
    const userID = req.body.userID;
    const token = await getManagementToken();
    await axios.patch(
      `https://dev-7eoh0ojk0tkfhypo.us.auth0.com/api/v2/users/${userID}`,
      { password: newPassword, connection: "Username-Password-Authentication" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    res.status(200).json({ message: "password updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "password could not be updated" });
  }
});
export default router;
