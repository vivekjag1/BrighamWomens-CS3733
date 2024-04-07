import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { ServiceRequest } from "database";

const statusOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];
export function ServiceRequestGetter() {
  const [requestData, setRequestData] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(APIEndpoints.serviceGetRequests);
        setRequestData(res.data);
        console.log("Successfully got data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    }
    fetchData();
  }, []);

  function truncateString(str: string, num: number) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    serviceID: number,
  ) {
    const newStatus = event.target.value;

    const updatedRequests = requestData.map((request) => {
      if (request.serviceID === serviceID) {
        return { ...request, status: newStatus };
      }
      return request;
    });

    setRequestData(updatedRequests);

    const updateData = {
      serviceID: serviceID,
      status: newStatus,
    };

    try {
      const response = await axios.patch(
        APIEndpoints.servicePutRequests,
        updateData,
      );
      console.log("Status updated successfully", response.data);
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status. Please try again.");
    }
  }

  return (
    <tbody>
      {requestData.map((request) => (
        <tr className="bg-white border-b" key={request.serviceID}>
          <td className="px-6 py-4">{request.serviceID}</td>
          <td className="px-6 py-4">{truncateString(request.type, 20)}</td>
          <td className="px-6 py-4">
            <select
              value={request.status}
              onChange={(e) => handleStatusChange(e, request.serviceID)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </td>
          <td className="px-6 py-4">{truncateString(request.priority, 10)}</td>
          <td className="px-6 py-4">
            {truncateString(request.requestingUsername, 15)}
          </td>
          <td className="px-6 py-4">{truncateString(request.location, 15)}</td>
          <td className="px-6 py-4">
            {request.description && request.description.trim() !== ""
              ? truncateString(request.description, 20)
              : "N/A"}
          </td>
          <td className="px-6 py-4">
            {truncateString(request.assignedTo, 15)}
          </td>
          <td className="px-6 py-4">
            {truncateString(request.enteredTime.toString(), 20)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
