import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/api.ts";
import { Node } from "database";
import { NodeDisplay } from "./NodeDisplay.tsx";

export function NodeGetter() {
  const [requestData, setRequestData] = useState<Node[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(APIEndpoints.mapGetNodes);
      setRequestData(res.data);
      console.log(res.data);
      console.log("successfully got data from get request");
    }
    fetchData().then();
  }, []);

  return (
    <tbody>
      {requestData != undefined ? (
        requestData.map((node) => {
          return <NodeDisplay nodeRequest={node}></NodeDisplay>;
        })
      ) : (
        <></>
      )}
    </tbody>
  );
}
