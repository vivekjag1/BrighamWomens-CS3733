import React, { useState } from "react";
import { getFloorNumber } from "../../common/PathUtilities.ts";
import { GraphNode } from "common/src/GraphNode.ts";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { DesignSystem } from "../../common/StylingCommon";
import "../../styles/FloorSelector.css";

interface floorSelectorProps {
  onClick: (x: number) => void;
  activeFloor: number;
  path: GraphNode[];
}

function FloorSelector(props: floorSelectorProps) {
  const [activeMap, setActiveMap] = useState(0);

  const relevantFloors = getFloorsInPath(props.path);

  return (
    <ToggleButtonGroup
      orientation="vertical"
      exclusive
      sx={ToggleButtonGroupStyles}
      value={activeMap}
      onChange={(e: React.MouseEvent<HTMLElement>, nextActiveMap: number) =>
        setActiveMap(nextActiveMap)
      }
    >
      <ToggleButton
        sx={ToggleButtonStyles}
        value="3"
        disabled={!relevantFloors.includes(3)}
        selected={props.activeFloor === 3}
        onClick={() => props.onClick(3)}
      >
        3
      </ToggleButton>
      <ToggleButton
        sx={ToggleButtonStyles}
        value="2"
        disabled={!relevantFloors.includes(2)}
        selected={props.activeFloor === 2}
        onClick={() => props.onClick(2)}
      >
        2
      </ToggleButton>
      <ToggleButton
        sx={ToggleButtonStyles}
        value="1"
        disabled={!relevantFloors.includes(1)}
        selected={props.activeFloor === 1}
        onClick={() => props.onClick(1)}
      >
        1
      </ToggleButton>
      <ToggleButton
        sx={ToggleButtonStyles}
        value="-1"
        disabled={!relevantFloors.includes(-1)}
        selected={props.activeFloor === -1}
        onClick={() => props.onClick(-1)}
      >
        L1
      </ToggleButton>
      <ToggleButton
        sx={ToggleButtonStyles}
        value="-2"
        disabled={!relevantFloors.includes(-2)}
        selected={props.activeFloor === -2}
        onClick={() => props.onClick(-2)}
      >
        L2
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

// Gets the floors involved in a path
function getFloorsInPath(path: GraphNode[]): number[] {
  const relevantFloors: number[] = [];
  for (let i = 0, length = path.length; i < length; i++) {
    const currentFloorNumber: number = getFloorNumber(path[i].floor);
    if (!relevantFloors.includes(currentFloorNumber))
      relevantFloors.push(currentFloorNumber);
  }
  return relevantFloors;
}
const ToggleButtonGroupStyles = {
  backgroundColor: DesignSystem.primaryColor,
  borderRadius: "8px",
  width: "5.5vh",
} as const;

const ToggleButtonStyles = {
  color: DesignSystem.white,
  fontFamily: DesignSystem.fontFamily,
  fontSize: "1.10rem",
  fontWeight: "light",
  height: "5.5vh",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: DesignSystem.accentColor,
    color: "#FFFFFF",
  },
} as const;

export default FloorSelector;
