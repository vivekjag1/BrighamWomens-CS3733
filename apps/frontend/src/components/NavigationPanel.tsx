import { Button, TextField, Autocomplete } from "@mui/material";
import { APIEndpoints } from "common/src/APICommon.ts";
import React, { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { Graph } from "../../../backend/src/fileInput/Graph.ts";
import { GraphNode } from "../../../backend/src/fileInput/GraphNode.ts";

function NavigationPanel(props: {
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [startNode, setStartNode] = useState<string | null>(null);
  const [destinationNode, setDestinationNode] = useState<string | null>(null);

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
            {/*<select name="currentLocation" className="w-[15vw]">
              {nodes.map((node) => (
                <option key={node.nodeID} value={node.nodeID}>
                  {node.longName}
                </option>
              ))}
            </select>*/}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              //options={nodes.map((node) => ({ label: node.longName, value: node.nodeID}))}
              options={nodes}
              getOptionLabel={(option) => option.longName}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Current Location" />
              )}
              //isOptionEqualToValue={(option, value) => option.value === value.value}
              /*value={startNode ? { label: startNode.longName } : null}
                    onChange={(e) => {
                        setStartNode ({
                            ...startNode,
                            startNode: e.target.,
                        });

                    }}*/
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
            <p>Destination</p>
            {/*<select name="destination" className="w-[15vw]">
              {nodes.map((node) => (
                <option key={node.nodeID} value={node.nodeID}>
                  {node.longName}
                </option>
              ))}
            </select>*/}
            <Autocomplete
              disablePortal
              id="combo-box-demo-dest"
              options={nodes}
              getOptionLabel={(option) => option.longName}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Destination" />
              )}
              //isOptionEqualToValue={(option, value) => option.value === value.value}
              /*value={nodes.map((node) => ({ node: node}))}
                    onChange={(e) => {
                        setDestinationNode ({
                            ...destinationNode,
                            destinationNode: e.target.value,
                        });

                    }}*/
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
