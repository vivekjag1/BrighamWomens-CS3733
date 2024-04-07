import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Edge } from "database";

export function EdgeGetter() {
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(APIEndpoints.mapGetEdges);
        setEdges(res.data);
        console.log("Successfully got edge data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching edge data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <tbody>
      {edges.map((edge) => (
        <tr className="bg-white border-b" key={edge.edgeID}>
          <td className="px-6 py-4">{edge.edgeID}</td>
          <td className="px-6 py-4">{edge.startNodeID}</td>
          <td className="px-6 py-4">{edge.endNodeID}</td>
        </tr>
      ))}
    </tbody>
  );
}
