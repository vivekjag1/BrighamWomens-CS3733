import { ServiceRequest } from "./ServiceRequest.ts";

export type SanitationRequestObject = {
  sanitationType: string;
  requiredEquipment: string;
  serviceRequest: ServiceRequest;
};
