import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";
import { GraphNode } from "common/src/GraphNode.ts";
import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createNodes } from "common/src/GraphCommon.ts";
import NodeDropdown from "./NodeDropdown.tsx";
import { PathAlgorithm, PathNodesObject } from "common/src/Path.ts";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PathAlgorithmDropdown from "./PathAlgorithmDropdown.tsx";
import CustomClearButtonSmall from "./CustomClearButtonSmall.tsx";
import LocationIcon from "@mui/icons-material/LocationOn";
import ButtonBlue from "./ButtonBlue.tsx";
import NavigationIcon from "@mui/icons-material/Navigation";

const initialState: PathNodesObject = {
  startNode: "",
  endNode: "",
};

const textFieldStyles = {
  width: "17vw",
};

const defaultPathAlgorithm: PathAlgorithm = "A-Star";

function NavigateCard(props: {
  onSubmit: FormEventHandler;
  pathNodeObject: PathNodesObject;
  setPathNodeObject: Dispatch<SetStateAction<PathNodesObject>>;
  onReset: FormEventHandler;
}) {
  // Populates selection menu from database
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [pathAlgorithm, setPathAlgorithm] =
    useState<string>(defaultPathAlgorithm);

  function getNodeID(value: string): string {
    const foundNode = nodes.find((node) => node.longName === value);
    return foundNode ? foundNode.nodeID : "";
  }

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

  function swapLocations() {
    const start = props.pathNodeObject.startNode;
    props.setPathNodeObject({
      startNode: props.pathNodeObject.endNode,
      endNode: start,
    });
  }
  function reset() {
    props.setPathNodeObject(initialState);
    setPathAlgorithm(defaultPathAlgorithm);
  }

  return (
    <div className="border-5 flex p-4 bg-white rounded-2xl shadow-xl">
      <form
        className="flex flex-row"
        noValidate
        onSubmit={props.onSubmit}
        onReset={props.onReset}
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 items-center">
            <MyLocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeDropdown
              value={props.pathNodeObject.startNode}
              sx={textFieldStyles}
              label="Start Location"
              onChange={(newValue: string) =>
                props.setPathNodeObject((currentPathNode) => ({
                  ...currentPathNode,
                  startNode: newValue,
                }))
              }
            />
            <input
              type="hidden"
              name={`${NavigateAttributes.startLocationKey}`}
              value={getNodeID(props.pathNodeObject.startNode)}
            />
          </div>
          <MoreVertIcon style={{ color: "#012D5A" }} />
          <div className="flex flex-row gap-1 items-center">
            <LocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeDropdown
              value={props.pathNodeObject.endNode}
              sx={textFieldStyles}
              label="End Location"
              onChange={(newValue: string) =>
                props.setPathNodeObject((currentPathNode) => ({
                  ...currentPathNode,
                  endNode: newValue,
                }))
              }
            />
            <input
              type="hidden"
              name={`${NavigateAttributes.endLocationKey}`}
              value={getNodeID(props.pathNodeObject.endNode)}
            />
          </div>
          <div className="ml-[2rem] flex flex-row mt-4 justify-between">
            <PathAlgorithmDropdown
              value={pathAlgorithm}
              sx={{ width: "10vw" }}
              label="Algorithm"
              onChange={setPathAlgorithm}
            ></PathAlgorithmDropdown>
            <input
              type="hidden"
              name={`${NavigateAttributes.algorithmKey}`}
              value={pathAlgorithm}
            />
            <ButtonBlue
              type="submit"
              className={"flex justify-end"}
              endIcon={<NavigationIcon />}
            >
              GO
            </ButtonBlue>
          </div>
        </div>

        <div className="flex flex-col ml-[0.2rem] items-center">
          <div className="flex-grow flex justify-center items-center">
            <IconButton onClick={swapLocations}>
              <SwapVertIcon />
            </IconButton>
          </div>
          <div className="flex justify-end mb-[-0.1rem]">
            <CustomClearButtonSmall onClick={reset} type="reset" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NavigateCard;
