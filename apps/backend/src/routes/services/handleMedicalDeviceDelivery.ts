import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { MedicalDeviceDelivery } from "common/src/MedicalDeviceDelivery.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: MedicalDeviceDelivery = req.body;

  try {
    const createdMedicalDeviceDelivery = await client.deviceDelivery.create({
      data: {
        deviceType: request.deviceType,
        quantity: request.quantity,
        serviceRequest: {
          create: {
            type: "DeviceDelivery",
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
      message: "Medical device delivery created successfully",
      data: createdMedicalDeviceDelivery,
    });
  } catch (error) {
    console.error("Error created medical device delivery:", error);
    res.status(400).json({ message: "Error creating medicine delivery " });
  }
});

export default router;
