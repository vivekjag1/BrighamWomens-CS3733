import { ServiceRequest } from "./ServiceRequest.ts";

export type SanitationRequestObject = {
  sanitationType: string;
  necessaryEquipment: string;
  serviceRequest: ServiceRequest;
};
