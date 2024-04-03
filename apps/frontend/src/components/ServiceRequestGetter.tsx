import React, { useEffect, useState } from "react";
import { ServiceRequest } from "../../../../packages/common/src/ServiceRequest.ts";
import axios from "axios";
import { ServiceRequestDisplay } from "./ServiceRequestDisplay.tsx";
import { APIEndpoints } from "common/src/APICommon.ts";

export function ServiceRequestGetter() {
  const [requestData, setRequestData] = useState<ServiceRequest[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(APIEndpoints.serviceGetRequests);
      setRequestData(res.data);
      console.log(res.data);
      console.log("successfully got data from get request");
    }
    fetchData().then();
  }, []);

  return (
    <tbody>
      {requestData != undefined ? (
        requestData.map((request) => {
          return (
            <ServiceRequestDisplay request={request}></ServiceRequestDisplay>
          );
        })
      ) : (
        <></>
      )}
    </tbody>
  );
}
