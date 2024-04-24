import {
  CSSProperties,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from "react";
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
import { useControls } from "react-zoom-pan-pinch";
import CustomClearButtonSmall from "../../components/CustomClearButtonSmall.tsx";
import DirectionsCard from "../DirectionsCard.tsx";
import CollapseImg from "../../../assets/collapse-white.svg";

import {
  Directions,
  // DirectionType,
  // StatUnit,
  TripStat,
} from "common/src/Path.ts";

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
  onReset: FormEventHandler;
  hasPath: boolean;
  directions: Directions[];
  tripStats: TripStat[];
}

function NavigationPane(props: NavigationPaneProps) {
  const { resetTransform } = useControls();

  function reset() {
    resetTransform();
  }

  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div className="w-[22.5vw] max-w-[22.5vw]">
      <form
        onSubmit={props.onSubmit}
        onReset={props.onReset}
        className="flex flex-col border-5 p-4 bg-white rounded-2xl shadow-xl min-w-[25vw] max-w-[25vw]"
      >
        <div className="flex gap-4">
          <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-4 items-center">
              <MyLocationIcon sx={IconStyles} />
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
            </div>
            <MoreVertIcon sx={IconStyles} />
            <div className="flex flex-row gap-4 items-center">
              <LocationOn sx={IconStyles} />
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
            </div>

            <div className="flex justify-between mt-4 ml-10">
              <div className="flex-grow ">
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
          <div className="flex flex-col ml-[-0.8rem] items-center">
            <div className="flex-grow flex justify-center items-center mt-[-0.5rem]">
              <IconButton className="h-[40px]" onClick={props.onSwap}>
                <SwapVertIcon />
              </IconButton>
            </div>
            <div className="flex justify-end mb-[-0.1rem]">
              <CustomClearButtonSmall onClick={reset} type="reset" />
            </div>
          </div>
        </div>
        <div id="DirectionsCard">
          <DirectionsCard
            directions={props.directions}
            stats={props.tripStats}
            isCollapsed={collapsed}
            setIsCollapsed={setCollapsed}
            hasPath={props.hasPath}
          />
        </div>
      </form>
      <div
        className={`absolute bottom-0 transform -translate-y-1/2 right-1/2 mb-[-26px] mr-[-12px]  ${props.hasPath ? "" : "hidden"}`}
      >
        <img
          src={CollapseImg}
          className={`cursor-pointer w-7 duration-500 ${collapsed ? "rotate-90" : "-rotate-90"}`}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
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
  width: "9vw",
  "& .MuiOutlinedInput-root": {
    fontFamily: DesignSystem.fontFamily,
    fontSize: "0.8rem",
  },
  "&. MuiInputLabel-root": {
    fontFamily: DesignSystem.fontFamily,
  },
  "& .MuiSelect-icon": {
    display: "none", // Hide the close icon
  },
} as CSSProperties;

export default NavigationPane;
