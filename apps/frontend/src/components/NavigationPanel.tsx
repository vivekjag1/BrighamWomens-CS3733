import { Button } from "@mui/material";
import { APIEndpoints } from "common/src/APICommon.ts";
import axios from "axios";
import { Graph } from "../../../backend/src/fileInput/Graph.ts";
import { GraphNode } from "../../../backend/src/fileInput/GraphNode.ts";
import { FormEventHandler, useEffect, useState } from "react";

function NavigationPanel(props: {
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  // Populates selection menu from database
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
      <div className="w-[20vw] h-[98vh] p-5 bg-[#D9D9D9] rounded-lg shadow-[0_0_4px_2px_rgba(0,0,0,0.25)]">
        <form
          className="flex flex-col justify-start gap-6"
          onSubmit={props.onSubmit}
        >
          <h2 className="text-4xl font-bold text-secondary">Navigation</h2>
          <p className="text-l font-normal text-black">
            Please enter your current location and destination to figure out
            where to go.
          </p>
          <div>
            <p className="text-l font-normal">Current Location</p>
            <select name="currentLocation" className="w-[15vw]">
              {nodes.map((node) => (
                <option key={node.nodeID} value={node.nodeID}>
                  {node.longName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Destination</p>
            <select name="destination" className="w-[15vw]">
              {nodes.map((node) => (
                <option key={node.nodeID} value={node.nodeID}>
                  {node.longName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "rgb(1,70,177)" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NavigationPanel;
