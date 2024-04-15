import { ServiceRequest } from "./ServiceRequest.ts";

export type GiftDeliveryRequestObject = {
  sanitationTypeGift: string;
  requiredEquipmentGift: string;
  serviceRequest: ServiceRequest;
};
