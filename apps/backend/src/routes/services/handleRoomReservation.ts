import prisma from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";

import { RoomReservationType } from "common/src/RoomReservationType.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: RoomReservationType = req.body;
  try {
    await prisma.roomScheduling.create({
      data: {
        reservationReason: request.reservationReason,
        endTime: request.endTime,
        //make the general service request entry
        serviceRequest: {
          create: {
            type: "RoomScheduling",
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
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

export default router;
