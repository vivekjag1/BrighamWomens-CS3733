import React, { useEffect, useState } from "react";
import axios from "axios";
import { EdgeDisplay } from "./EdgeDisplay.tsx";
import { APIEndpoints } from "common/src/api.ts";
import { Edge } from "../../../../packages/common/src/Edge.ts";

export function EdgeGetter() {
  const [requestData, setRequestData] = useState<Edge[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(APIEndpoints.mapGetEdges);
      setRequestData(res.data);
      console.log(res.data);
      console.log("successfully got data from get request");
    }
    fetchData().then();
  }, []);

  return (
    <tbody>
      {requestData != undefined ? (
        requestData.map((edge) => {
          return <EdgeDisplay edgeRequest={edge}></EdgeDisplay>;
        })
      ) : (
        <></>
      )}
    </tbody>
  );
}
