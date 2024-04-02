import client from "../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { ServiceRequest } from "database";

const router: Router = express.Router();

// router.post("/", function (req: Request, res: Response) {
//   const feedback = req.body;
//   res.status(200).json({
//     message: "hello world",
//     data: feedback,
//   });
//   //const request = req.body as
//   //database.push service request to db
//   //console.log(client.serviceRequest.findMany());
// });

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: MedicineDeliveryObject = req.body;
  console.log(req.body);
  try {
    await client.medicineDelivery.create({
      data: {
        medicineName: request.medicineName,
        dosage: request.dosage,
        patientName: request.patientName,
        userInstructions: request.userInstructions,
        serviceRequest: {
          create: {
            serviceID: 3,
            type: "MedicineDelivery",
            roomNum: +request.request.roomNum,
            deliveryInstructions: request.request.deliveryInstructions,
            requestingUsernmae: request.request.requestingUsername,
            location: request.request.location,
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

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const requests: ServiceRequest[] = await client.serviceRequest.findMany();
  res.json(requests);
});

export default router;
