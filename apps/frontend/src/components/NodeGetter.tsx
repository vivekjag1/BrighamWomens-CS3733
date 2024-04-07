import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Node } from "database";

export function NodeGetter() {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(APIEndpoints.mapGetNodes);
        setNodes(res.data);
        console.log("Successfully got node data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching node data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <tbody>
      {nodes.map((node) => (
        <tr className="bg-white border-b" key={node.nodeID}>
          <td className="px-6 py-4">{node.nodeID}</td>
          <td className="px-6 py-4">{node.xcoord}</td>
          <td className="px-6 py-4">{node.ycoord}</td>
          <td className="px-6 py-4">{node.floor}</td>
          <td className="px-6 py-4">{node.building}</td>
          <td className="px-6 py-4">{node.nodeType}</td>
          <td className="px-6 py-4">{node.longName}</td>
          <td className="px-6 py-4">{node.shortName}</td>
        </tr>
      ))}
    </tbody>
  );
}
