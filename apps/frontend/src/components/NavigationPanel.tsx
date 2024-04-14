import { GraphNode } from "common/src/GraphNode.ts";
import { FormEventHandler, useState } from "react";
import NodeDropdown from "./NodeDropdown.tsx";
import { PathNodesObject } from "common/src/Path.ts";
import CustomClearButton from "./CustomClearButton.tsx";
import CustomSubmitButton from "./CustomSubmitButton.tsx";

const initialState: PathNodesObject = {
  startNode: "",
  endNode: "",
};

function NavigationPanel(props: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  nodes: GraphNode[];
}) {
  const nodes = props.nodes;
  const [pathNodeObject, setPathNodeObject] =
    useState<PathNodesObject>(initialState);

  function getNodeID(value: string): string {
    const foundNode = nodes.find((node) => node.longName === value);
    return foundNode ? foundNode.nodeID : "";
  }

  function clear() {
    setPathNodeObject(initialState);
  }

  return (
    <div>
      <div className="w-[20vw] h-[98vh] p-5 bg-[#e5e7eb] rounded-lg shadow-[0_0_4px_2px_rgba(0,0,0,0.25)]">
        <form
          className="flex flex-col justify-start gap-6"
          noValidate
          onSubmit={props.onSubmit}
          onReset={props.onSubmit}
        >
          <h2 className="text-4xl font-bold text-secondary">Navigation</h2>
          <p className="text-l font-normal text-black">
            Please enter your current location and destination to figure out
            where to go.
          </p>
          <div>
            <NodeDropdown
              value={pathNodeObject.startNode}
              sx={{ width: "19rem", padding: 0 }}
              label="Starting Location"
              onChange={(newValue: string) =>
                setPathNodeObject((currentPathNode) => ({
                  ...currentPathNode,
                  startNode: newValue,
                }))
              }
            />
            <input
              type="hidden"
              name="currentLocation"
              value={getNodeID(pathNodeObject.startNode)}
            />
          </div>
          <div>
            <NodeDropdown
              value={pathNodeObject.endNode}
              sx={{ width: "19rem", padding: 0 }}
              label="Destination"
              onChange={(newValue: string) =>
                setPathNodeObject((currentPathNode) => ({
                  ...currentPathNode,
                  endNode: newValue,
                }))
              }
            />
            <input
              type="hidden"
              name="destination"
              value={getNodeID(pathNodeObject.endNode)}
            />
          </div>
          <div className="flex justify-between w-full mt-4">
            <CustomClearButton type="reset" onClick={clear}>
              Clear
            </CustomClearButton>
            <CustomSubmitButton type="submit">Submit</CustomSubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NavigationPanel;
