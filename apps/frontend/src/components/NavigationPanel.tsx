import { Autocomplete, IconButton, TextField } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import PlaceIcon from "@mui/icons-material/Place";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { GraphNode } from "common/src/GraphNode.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { createNodes } from "common/src/GraphCommon.ts";
import { useEffect, useState } from "react";
import axios from "axios";

const textFieldStyles = {
  width: "17vw",
} as const;

const buttonStyles = {
  height: "8vh",
} as const;

function NavigationPanel() {
  // Populates selection menu from database
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [startNode, setStartNode] = useState<string | null>(null);
  const [destinationNode, setDestinationNode] = useState<string | null>(null);

  useEffect(() => {
    //get the nodes from the db
    async function getNodesFromDb() {
      const rawNodes = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes = createNodes(rawNodes.data);
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
      <div className="border-2 w-[25vw] flex justify-center gap-5 p-4 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center gap-3 ml-3">
          <NavigationIcon />
          <MoreVertIcon />
          <PlaceIcon />
        </div>
        <form className="flex flex-col gap-3">
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={nodes}
              getOptionLabel={(option) => option.longName}
              sx={textFieldStyles}
              renderInput={(params) => (
                <TextField {...params} label="Current Location" />
              )}
              onChange={(_, startNode) => {
                setStartNode(startNode ? startNode.nodeID : "");
              }}
            />
            <input
              type="hidden"
              name="currentLocation"
              value={startNode || ""}
            />
          </div>
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo-dest"
              options={nodes}
              getOptionLabel={(option) => option.longName}
              sx={textFieldStyles}
              renderInput={(params) => (
                <TextField {...params} label="Destination" />
              )}
              onChange={(_, destinationNode) => {
                setDestinationNode(
                  destinationNode ? destinationNode.nodeID : "",
                );
              }}
            />
            <input
              type="hidden"
              name="destination"
              value={destinationNode || ""}
            />
          </div>
        </form>
        <div className="min-h-full flex flex-col justify-center">
          <IconButton sx={buttonStyles}>
            <SwapVertIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default NavigationPanel;
