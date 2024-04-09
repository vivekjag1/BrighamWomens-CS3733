import client from "../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { Node } from "database";
import { NavigateAttributes } from "common/src/APICommon.ts";
//import { APIEndpoints } from "common/src/APICommon.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response): Promise<void> {
  if (req.query) {
    const { [NavigateAttributes.floorKey]: requestedFloor } = req.query;

    const nodesInFloor: Node[] = await client.node.findMany({
      where: {
        floor: requestedFloor!.toString(),
      },
    });

    res.json(nodesInFloor);
    return;
  }

  const requests: Node[] = await client.node.findMany();
  res.json(requests);
});

export default router;
