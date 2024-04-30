import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { Node } from "database";
import { NavigateAttributes } from "common/src/APICommon.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const { [NavigateAttributes.floorKey]: requestedFloor } = req.query;

  // floor query in url
  if (requestedFloor != undefined) {
    // get nodes on a specific floor
    const nodesInFloor: Node[] = await client.node.findMany({
      where: {
        floor: requestedFloor!.toString(),
      },
    });

    res.json(nodesInFloor);
  } else {
    // get all nodes
    const requests: Node[] = await client.node.findMany();
    res.json(requests);
  }
});

export default router;
