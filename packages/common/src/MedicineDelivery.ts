import { ServiceRequest } from "./ServiceRequest.ts";

export type MedicineDeliveryObject = {
  medicineName: string;
  dosage: string;
  patientName: string;
  serviceRequest: ServiceRequest;
};
