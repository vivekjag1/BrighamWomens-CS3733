import { CSSProperties, FormEventHandler, SyntheticEvent } from "react";
import { Node } from "database";
import NodeDropdown from "./NodeDropdown.tsx";
import AlgorithmDropdown from "./AlgorithmDropdown.tsx";
import NavigationButton from "./NavigationButton.tsx";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOn from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton } from "@mui/material";
import { DesignSystem } from "../../common/StylingCommon.ts";

interface NavigationPaneProps {
  nodes: Node[];
  startNodeID: string;
  startNodeIDSetter: (id: string) => void;
  endNodeID: string;
  endNodeIDSetter: (id: string) => void;
  algorithm: string;
  algorithmSetter: (algorithm: string) => void;
  onSwap: () => void;
  onSubmit: FormEventHandler;
}

function NavigationPane(props: NavigationPaneProps) {
  return (
    <div>
      <form
        onSubmit={props.onSubmit}
        className="flex flex-col gap-5 border-5 p-4 bg-white rounded-2xl shadow-xl"
      >
        <div className="flex gap-4">
          <div className="flex flex-col text-[#012D5A] gap-1 mt-1">
            <MyLocationIcon sx={IconStyles} />
            <MoreVertIcon sx={IconStyles} />
            <LocationOn sx={IconStyles} />
          </div>
          <div className="flex flex-col gap-4">
            <NodeDropdown
              nodes={props.nodes}
              name="start"
              label="Start Location"
              sx={NodeDropdownStyles}
              value={props.startNodeID}
              onChange={(e, newValue) =>
                newValue && props.startNodeIDSetter(newValue!.id)
              }
            />
            <NodeDropdown
              nodes={props.nodes}
              name="end"
              label="End Location"
              sx={NodeDropdownStyles}
              value={props.endNodeID}
              onChange={(e, newValue) =>
                newValue && props.endNodeIDSetter(newValue!.id)
              }
            />
            <div className="flex justify-between">
              <div className="flex-grow">
                <AlgorithmDropdown
                  sx={AlgorithmDropdownStyles}
                  value={props.algorithm}
                  onChange={(e: SyntheticEvent<Element, Event>, newValue) =>
                    newValue && props.algorithmSetter(newValue)
                  }
                />
              </div>
              <NavigationButton />
            </div>
          </div>
          <div className="pt-[7%]">
            <IconButton className="h-[40px]" onClick={props.onSwap}>
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
  fontSize: "1.5rem",
} as const;

const NodeDropdownStyles = {
  width: "17vw",
  "& .MuiOutlinedInput-root": {
    fontFamily: DesignSystem.fontFamily,
    whiteSpace: "pre-wrap",
    fontSize: "0.8rem",
  },
  "&. MuiInputLabel-root": {
    whiteSpace: "pre-wrap",
    fontFamily: DesignSystem.fontFamily,
  },
} as CSSProperties;

const AlgorithmDropdownStyles = {
  width: "12vw",
  "& .MuiOutlinedInput-root": {
    fontFamily: DesignSystem.fontFamily,
    fontSize: "0.8rem",
  },
  "&. MuiInputLabel-root": {
    fontFamily: DesignSystem.fontFamily,
  },
} as CSSProperties;

export default NavigationPane;
