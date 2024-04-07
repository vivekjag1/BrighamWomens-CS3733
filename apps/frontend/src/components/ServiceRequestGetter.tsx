import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { ServiceRequest } from "database";

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

  return (
    <tbody>
      {requestData.map((request) => (
        <tr className="bg-white border-b" key={request.serviceID}>
          <td className="px-6 py-4">{request.serviceID}</td>
          <td className="px-6 py-4">{request.type}</td>
          <td className="px-6 py-4">{request.location}</td>
          <td className="px-6 py-4">
            {request.description && request.description.trim() !== ""
              ? request.description
              : "N/A"}
          </td>
          <td className="px-6 py-4">{request.requestingUsername}</td>
          <td className="px-6 py-4">{request.enteredTime.toString()}</td>
          <td className="px-6 py-4">{request.location}</td>
        </tr>
      ))}
    </tbody>
  );
}
