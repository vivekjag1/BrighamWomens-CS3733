import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { Edge } from "database";
const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const requests: Edge[] = await client.edge.findMany();
  res.json(requests);
});

export default router;
