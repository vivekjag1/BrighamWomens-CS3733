import express, { Router, Request, Response } from "express";
import { foodDeliveryService } from "common/src/FoodDelivery.ts";
import client from "../../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: foodDeliveryService = req.body;

  try {
    const createdFoodDeliveryService = await client.foodDeliveryService.create({
      data: {
        //specific request
        protein: request.protein,
        side: request.side,
        serviceRequest: {
          //generic request
          create: {
            type: "FoodDeliveryService",
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
      message: "food delivery order service created successfully",
      data: createdFoodDeliveryService,
    });
  } catch (error) {
    console.error("Error creating food delivery service:", error);
    res.status(400).json({ message: "Error creating food delivery order" });
  }
});

export default router;
