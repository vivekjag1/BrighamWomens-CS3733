import { GiftDeliveryObject } from "common/src/GiftDelivery.ts";
import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: GiftDeliveryObject = req.body;

  try {
    const createdSecurityRequest = await client.giftDelivery.create({
      data: {
        //Specific request
        giftType: request.giftType,
        senderNote: request.senderNote,
        //Generic request
        serviceRequest: {
          create: {
            type: "GiftDelivery",
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
      message: "Gift delivery request created successfully",
      data: createdSecurityRequest,
    });
  } catch (error) {
    console.error("Error creating gift delivery:", error);
    res.status(400).json({ message: "Error creating gift delivery" });
  }
});

export default router;
