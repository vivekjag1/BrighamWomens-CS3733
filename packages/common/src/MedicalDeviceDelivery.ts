import { ServiceRequest } from "./ServiceRequest.ts";

export type MedicalDeviceDelivery = {
  deviceType: string;
  quantity: number;
  serviceRequest: ServiceRequest;
};
