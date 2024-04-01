import React, { useEffect, useState } from "react";
import { ServiceRequest } from "../../../../packages/common/src/ServiceRequest.ts";
import axios from "axios";
import { ServiceRequestDisplay } from "./ServiceRequestDisplay.tsx";

export function ServiceRequestGetter() {
  const [feedBackData, setFeedBackData] = useState<ServiceRequest[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/service");
      setFeedBackData(res.data);
      console.log(res.data);
      console.log("successfully got data from get request");
    }
    fetchData().then();
  }, []);

  return (
    <tbody>
      {feedBackData != undefined ? (
        feedBackData.map((feedback) => {
          return (
            <ServiceRequestDisplay feedback={feedback}></ServiceRequestDisplay>
          );
        })
      ) : (
        <></>
      )}
    </tbody>
  );
}
