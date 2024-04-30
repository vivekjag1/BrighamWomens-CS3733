import { SecurityRequestType } from "common/src/SecurityRequestType.ts";
import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: SecurityRequestType = req.body;

  try {
    const createdSecurityRequest = await client.securityService.create({
      data: {
        securityType: request.securityType,
        numberPeople: parseInt(request.numberPeople),
        serviceRequest: {
          create: {
            type: "SecurityService",
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
      message: "Service request created successfully",
      data: createdSecurityRequest,
    });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(400).json({ message: "Error creating service request" });
  }
});

export default router;
