export type ServiceRequest = {
  serviceID: string;
  requestingUsername: string;
  location: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  status: "Unassigned" | "Assigned" | "InProgress" | "Closed";
  description: string;
};
