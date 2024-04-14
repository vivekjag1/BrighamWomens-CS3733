import { Button, TextField, Autocomplete } from "@mui/material";
import { GraphNode } from "common/src/GraphNode.ts";
import { FormEventHandler, useState } from "react";

function NavigationPanel(props: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  nodes: GraphNode[];
}) {
  // Populates selection menu from database
  const [startNode, setStartNode] = useState<string | null>(null);
  const [destinationNode, setDestinationNode] = useState<string | null>(null);
  const nodes = props.nodes;

  return (
    <div>
      <div className="w-[20vw] h-[98vh] p-5 bg-[#e5e7eb] rounded-lg shadow-[0_0_4px_2px_rgba(0,0,0,0.25)]">
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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={nodes}
              getOptionLabel={(option) => option.longName}
              sx={{ width: "1" }}
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
              sx={{ width: "1" }}
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
          <div>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#012D5A", width: "8rem" }}
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
