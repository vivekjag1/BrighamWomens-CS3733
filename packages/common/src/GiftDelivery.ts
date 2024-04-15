import { ServiceRequest } from "./ServiceRequest.ts";

export type GiftDeliveryObject = {
  giftType: string;
  senderNote: string;
  serviceRequest: ServiceRequest;
};
