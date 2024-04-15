import { ServiceRequest } from "./ServiceRequest.ts";

export type SecurityRequestType = {
  serviceRequest: ServiceRequest;
  securityType: string;
  numberPeople: string;
};
