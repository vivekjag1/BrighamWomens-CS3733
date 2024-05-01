import React, { useState } from "react";
import { getFloorNumber } from "../../common/PathUtilities.ts";
import { Node } from "database";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { ButtonStyling, DesignSystem } from "../../common/StylingCommon";
import "./styles/FloorSelector.css";

interface floorSelectorProps {
  onClick: (x: number) => void;
  activeFloor: number;
  path: Node[];
  updateGlowSequence: (x: number) => void;
  glowSequence: number[];
}

function FloorSelector(props: floorSelectorProps) {
  const relevantFloors = getFloorsInPath(props.path);
  const [activeMap, setActiveMap] = useState(0);

  return (
    <div>
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
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-firstButton": {
              borderBottom: "1px solid #1565c0",
            },
          }}
          value="3"
          disabled={!relevantFloors.includes(3)}
          selected={props.activeFloor == 3}
          onClick={() => {
            props.onClick(3);
            props.updateGlowSequence(3);
          }}
          className={props.glowSequence[0] == 3 ? "pulseAnimation" : ""}
        >
          3
        </ToggleButton>
        <ToggleButton
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-middleButton": {
              borderTop: "1px solid #1565c0",
              borderBottom: "1px solid #1565c0",
            },
          }}
          value="2"
          disabled={!relevantFloors.includes(2)}
          selected={props.activeFloor == 2}
          onClick={() => {
            props.onClick(2);
            props.updateGlowSequence(2);
          }}
          className={props.glowSequence[0] == 2 ? "pulseAnimation" : ""}
        >
          2
        </ToggleButton>
        <ToggleButton
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-middleButton": {
              borderTop: "1px solid #1565c0",
              borderBottom: "1px solid #1565c0",
            },
          }}
          value="1"
          disabled={!relevantFloors.includes(1)}
          selected={props.activeFloor == 1}
          onClick={() => {
            props.onClick(1);
            props.updateGlowSequence(1);
          }}
          className={props.glowSequence[0] == 1 ? "pulseAnimation" : ""}
        >
          1
        </ToggleButton>
        <ToggleButton
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-middleButton": {
              borderTop: "1px solid #1565c0",
              borderBottom: "1px solid #1565c0",
            },
          }}
          value="-1"
          disabled={!relevantFloors.includes(-1)}
          selected={props.activeFloor == -1}
          onClick={() => {
            props.onClick(-1);
            props.updateGlowSequence(-1);
          }}
          className={props.glowSequence[0] == -1 ? "pulseAnimation" : ""}
        >
          L1
        </ToggleButton>
        <ToggleButton
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-lastButton": {
              borderTop: "1px solid #1565c0",
            },
          }}
          value="-2"
          disabled={!relevantFloors.includes(-2)}
          selected={props.activeFloor == -2}
          onClick={() => {
            props.onClick(-2);
            props.updateGlowSequence(-2);
          }}
          className={props.glowSequence[0] == -2 ? "pulseAnimation" : ""}
        >
          L2
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

const ToggleButtonGroupStyles = {
  backgroundColor: DesignSystem.primaryColor,
  borderRadius: "6px",
  width: "5.5vh",
} as const;

const ToggleButtonStyles = {
  color: DesignSystem.white,
  fontFamily: DesignSystem.fontFamily,
  fontSize: "1.25rem",
  fontWeight: "light",
  height: "5.5vh",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: ButtonStyling.blueButtonClicked,
    color: "white",
    fontWeight: "medium",
  },
} as const;

// Gets the floors involved in a path
function getFloorsInPath(path: Node[]): number[] {
  const relevantFloors: number[] = [];
  for (let i = 0, length = path.length; i < length; i++) {
    const currentFloorNumber: number = getFloorNumber(path[i].floor);
    if (!relevantFloors.includes(currentFloorNumber))
      relevantFloors.push(currentFloorNumber);
  }
  return relevantFloors;
}
export default FloorSelector;
