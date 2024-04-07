import client from "../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
// import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { ServiceRequest } from "database";
//import { APIEndpoints } from "common/src/APICommon.ts";

const router: Router = express.Router();

// router.post("/", async function (req: Request, res: Response): Promise<void> {
//   const request: MedicineDeliveryObject = req.body;
//
//   try {
//     const createdMedicineDelivery = await client.medicineDelivery.create({
//       data: {
//         medicineName: request.medicineName,
//         dosage: request.dosage,
//         patientName: request.patientName,
//         serviceRequest: {
//           create: {
//             type: "MedicineDelivery",
//             requestingUsername: request.serviceRequest.requestingUsername,
//             location: request.serviceRequest.location,
//             // priority: request.serviceRequest.priority,
//             // status: request.serviceRequest.status,
//             // description: request.serviceRequest.description,
//           },
//         },
//       },
//     });
//
//     res.status(200).json({
//       message: "Medicine delivery created successfully",
//       data: createdMedicineDelivery,
//     });
//   } catch (error) {
//     console.error("Error creating medicine delivery:", error);
//     res.status(400).json({ message: "Error creating medicine delivery" });
//   }
// });

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const requests: ServiceRequest[] = await client.serviceRequest.findMany();
  res.json(requests);
});

router.patch(
  "/:id",
  async function (req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { medicineName, dosage, patientName, serviceRequestUpdate } =
      req.body;

    try {
      const updatedMedicineDelivery = await client.$transaction(
        async (prisma) => {
          const serviceRequestData = serviceRequestUpdate;
          const updatedServiceRequest = await prisma.serviceRequest.update({
            where: { serviceID: Number(id) },
            data: serviceRequestData,
          });

          const updatedMedicine = await prisma.medicineDelivery.update({
            where: { medicineRequestID: Number(id) },
            data: {
              medicineName,
              dosage,
              patientName,
            },
          });

          return { updatedMedicine, updatedServiceRequest };
        },
      );

      res.json({
        message: "Medicine delivery and service request updated successfully",
        updatedMedicineDelivery,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Error updating medicine delivery and service request",
      });
    }
  },
);

export default router;
