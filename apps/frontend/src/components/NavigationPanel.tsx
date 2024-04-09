import { Button } from "@mui/material";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Graph } from "../../../backend/src/fileInput/Graph.ts";
import { GraphNode } from "../../../backend/src/fileInput/GraphNode.ts";

function NavigationPanel() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  useEffect(() => {
    //get the nodes from the db
    async function getNodesFromDb() {
      const rawNodes = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes = Graph.createNodes(rawNodes.data);
      graphNodes = graphNodes.filter((node) => node.nodeType != "HALL");
      graphNodes = graphNodes.sort((a, b) =>
        a.longName.localeCompare(b.longName),
      );
      setNodes(graphNodes);
      return graphNodes;
    }
    getNodesFromDb().then();
  }, []);

  return (
    <div>
      <div className="w-[17.5vw] h-[98vh] p-5 bg-[#D9D9D9] rounded-lg shadow-[0_0_4px_2px_rgba(0,0,0,0.25)]">
        <form className="flex flex-col justify-start gap-6">
          <h2 className="text-4xl font-bold text-secondary">Navigation</h2>
          <p className="text-l font-normal text-black">
            Please enter your current location and destination to figure out
            where to go.
          </p>
          <div>
            <p className="text-l font-normal">Current Location</p>
            <select name="currentLocation">
              {nodes.map((node) => (
                <option value={node.nodeID}>{node.longName}</option>
              ))}
            </select>
          </div>
          <div>
            <p>Destination</p>
            <select name="destination">
              {nodes.map((node) => (
                <option value={node.nodeID}>{node.longName}</option>
              ))}
            </select>
          </div>
          <div>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NavigationPanel;
