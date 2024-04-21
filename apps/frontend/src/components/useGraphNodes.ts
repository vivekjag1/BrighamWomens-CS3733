import { useState, useEffect } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { createNodes } from "common/src/GraphCommon.ts";
import { GraphNode } from "common/src/GraphNode.ts";

export const useGraphNodes = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);

  useEffect(() => {
    async function fetchNodes() {
      const response = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes = createNodes(response.data);
      graphNodes = graphNodes.filter((node) => node.nodeType !== "HALL");
      graphNodes.sort((a, b) => a.longName.localeCompare(b.longName));
      setNodes(graphNodes);
    }
    // console.log("nodes called");
    fetchNodes();
  }, []);

  return nodes;
};
