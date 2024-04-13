import { ServiceRequest } from "./ServiceRequest.ts";

export type RoomReservationType = {
  reservationReason: string;
  endTime: string;
  serviceRequest: ServiceRequest;
};
