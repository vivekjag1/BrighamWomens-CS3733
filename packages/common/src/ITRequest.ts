import { ServiceRequest } from "./ServiceRequest.ts";

export type ITSupportObject = {
  TypeofProblem: string; //network down //softwarae issue //hardwareissue
  serviceRequest: ServiceRequest;
};
