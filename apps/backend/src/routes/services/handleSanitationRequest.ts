import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { SanitationRequestObject } from "common/src/SanitationRequest.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: SanitationRequestObject = req.body;

  try {
    const createdSanitationService = await client.sanitationService.create({
      data: {
        //specific request
        sanitationType: request.sanitationType,
        requiredEquipment: request.requiredEquipment,
        serviceRequest: {
          //generic request
          create: {
            type: "SanitationService",
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
      message: "Sanitation service created successfully",
      data: createdSanitationService,
    });
  } catch (error) {
    console.error("Error creating Sanitation service:", error);
    res.status(400).json({ message: "Error creating sanitation delivery" });
  }
});

export default router;
