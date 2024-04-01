import client from "../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { ServiceRequest } from "database";

const router: Router = express.Router();

router.post("/", function (req: Request, res: Response) {
  const feedback = req.body;
  res.status(200).json({
    message: "hello world",
    data: feedback,
  });
  //const request = req.body as
  //database.push service request to db
  //console.log(client.serviceRequest.findMany());
});

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const requests: ServiceRequest[] = await client.serviceRequest.findMany();
  res.json(requests);
});

export default router;
