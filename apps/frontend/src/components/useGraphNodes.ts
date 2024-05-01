import { useState, useEffect } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import type { Node } from "database";

export const useGraphNodes = () => {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    async function fetchNodes() {
      const response = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes: Node[] = response.data;
      graphNodes = graphNodes.filter((node) => node.nodeType !== "HALL");
      graphNodes.sort((a, b) => a.longName.localeCompare(b.longName));
      setNodes(graphNodes);
    }
    fetchNodes();
  }, []);

  return nodes;
};
