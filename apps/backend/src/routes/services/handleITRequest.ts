import { ITSupportObject } from "common/src/ITRequest.ts";
import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: ITSupportObject = req.body;

  try {
    const createdITRequest = await client.iTRequest.create({
      data: {
        //Specific request
        problemType: request.TypeofProblem,
        //Generic request
        serviceRequest: {
          create: {
            type: "ITRequest",
            requestingUsername: request.serviceRequest.requestingUsername,
            location: request.serviceRequest.location,
            description: request.serviceRequest.description,
            priority: request.serviceRequest.priority,
            status: request.serviceRequest.status,
            requestedTime: request.serviceRequest.requestedTime,
            assignedTo: request.serviceRequest.assignedTo,
          },
        },
      },
    });

    res.status(200).json({
      message: "IT request created successfully",
      data: createdITRequest,
    });
  } catch (error) {
    console.error("Error creating IT Request:", error);
    res.status(400).json({ message: "Error creating IT Request" });
  }
});

export default router;
