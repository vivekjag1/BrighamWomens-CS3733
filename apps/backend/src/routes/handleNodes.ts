import client from "../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { Node } from "database";
//import { APIEndpoints } from "common/src/api.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const requests: Node[] = await client.node.findMany();
  res.json(requests);
});

export default router;
