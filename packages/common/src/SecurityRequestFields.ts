import { ServiceRequest } from "./ServiceRequest.ts";

export type SecurityRequestFields = {
  request: ServiceRequest;
  securityType: string;
  numGuards: string;
};
