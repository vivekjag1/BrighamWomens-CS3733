/*import { CSSProperties, FormEventHandler, useState } from "react";*/
import { GraphNode } from "common/src/GraphNode.ts";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOn from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton } from "@mui/material";
/*import NodeDropdown from "./NodeDropdown.tsx";
import AlgorithmDropdown from "./AlgorithmDropdown.tsx";*/
/*import NavigateButton from "../NavigateButton.tsx";*/
import { DesignSystem } from "../../common/StylingCommon.ts";
import { FormEventHandler } from "react";
/*import { nodeOption } from "../../common/NodeOption.ts";*/

interface NavigationPaneProps {
  nodes: GraphNode[];
  onSubmit: FormEventHandler;
}

function NavigationPane(props: NavigationPaneProps) {
  /*  const [startNode, setStartNode] = useState<nodeOption>({ id: "", label: "" });
  const [endNode, setEndNode] = useState<nodeOption>({ id: "", label: "" });
  const [algorithm, setAlgorithm] = useState("A-Star");*/

  return (
    <div>
      <form
        onSubmit={props.onSubmit}
        className="flex flex-col gap-5 border-5 p-4 bg-white rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-extralight text-secondary">Navigate</h2>
        <div className="flex gap-4">
          <div className="flex flex-col text-[#012D5A]">
            <MyLocationIcon sx={IconStyles} />
            <MoreVertIcon sx={IconStyles} />
            <LocationOn sx={IconStyles} />
          </div>
          <div className="flex flex-col gap-6">
            {/*<NodeDropdown
              nodes={props.nodes}
              name="start"
              label="Start Location"
              sx={NodeDropdownStyles}
              value={startNode}
              onChange={(e, newValue) => newValue && setStartNode(newValue)}
            />
            <NodeDropdown
              nodes={props.nodes}
              name="end"
              label="End Location"
              sx={NodeDropdownStyles}
              value={endNode}
              onChange={(e, newValue) => newValue && setEndNode(newValue)}
            />*/}
            <div className="flex justify-between">
              {/*<AlgorithmDropdown
                sx={AlgorithmDropdownStyles}
                value={algorithm}
                onChange={(e, newValue) => newValue && setAlgorithm(newValue)}
              />*/}
            </div>
          </div>
          <div className="pt-[7%]">
            <IconButton className="h-[40px]">
              <SwapVertIcon />
            </IconButton>
          </div>
        </div>
      </form>
    </div>
  );
}

const IconStyles = {
  color: DesignSystem.primaryColor,
  fontSize: "xx-large",
} as const;

/*
const NodeDropdownStyles = {
  width: "17vw",
  "& .MuiOutlinedInput-root": {
    fontFamily: DesignSystem.fontFamily,
    fontSize: "0.9rem",
  },
} as CSSProperties;

const AlgorithmDropdownStyles = {
  width: "8vw",
  "& .MuiOutlinedInput-root": {
    fontFamily: DesignSystem.fontFamily,
    fontSize: "0.9rem",
  },
} as CSSProperties;
*/

export default NavigationPane;
