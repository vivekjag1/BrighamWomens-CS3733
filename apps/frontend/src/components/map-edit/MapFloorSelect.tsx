import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { DesignSystem } from "../../common/StylingCommon.ts";

// const styles = {
//   color: "white",
//   width: "40px",
//   height: "35px",
//   fontWeight: "light",
//   borderRadius: "5px",
//   "&:hover": {
//     backgroundColor: ButtonStyling.blueButtonHover,
//   },
//   "&.Mui-selected, &.Mui-selected:hover": {
//     backgroundColor: ButtonStyling.blueButtonClicked,
//     color: "white",
//     fontWeight: "bold",
//   },
// } as const;

const ToggleButtonStyles = {
  color: DesignSystem.white,
  fontFamily: DesignSystem.fontFamily,
  fontSize: "1.10rem",
  fontWeight: "normal",
  height: "5.5vh",
  width: "5.5vh",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: DesignSystem.accentColor,
    color: "#FFFFFF",
  },
} as const;

const ToggleButtonGroupStyles = {
  backgroundColor: DesignSystem.primaryColor,
  borderRadius: "8px",
  width: "5.5vh",
} as const;

function MapFloorSelect(props: {
  activeFloor: number;
  onClick: (x: number) => void;
  path?: number[][];
}) {
  const [activeMap, setActiveMap] = useState(0);

  function handleChange(e: React.MouseEvent<HTMLElement>, nextMap: number) {
    setActiveMap(nextMap);
  }

  // Stores all floors found in path
  // If no path is supplied (for example MapEdit page, then contains all floors)
  let relevantFloors: number[] = [];
  if (props.path != undefined) {
    for (let i = 0; i < props.path.length; i++) {
      if (!relevantFloors.includes(props.path[i][2])) {
        relevantFloors.push(props.path[i][2]);
      }
    }
  } else {
    relevantFloors = [-2, -1, 1, 2, 3];
  }
  return (
    <div>
      <ToggleButtonGroup
        orientation="vertical"
        value={activeMap}
        exclusive
        onChange={handleChange}
        sx={ToggleButtonGroupStyles}
      >
        <ToggleButton
          onClick={() => props.onClick(3)}
          value="3"
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-middleButton": {
              borderTop: "1px solid #1565c0",
              borderBottom: "1px solid #1565c0",
            },
          }}
          selected={props.activeFloor === 3}
          disabled={!relevantFloors.includes(3)}
        >
          3
        </ToggleButton>
        <ToggleButton
          onClick={() => props.onClick(2)}
          value="2"
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-middleButton": {
              borderTop: "1px solid #1565c0",
              borderBottom: "1px solid #1565c0",
            },
          }}
          selected={props.activeFloor === 2}
          disabled={!relevantFloors.includes(2)}
        >
          2
        </ToggleButton>
        <ToggleButton
          onClick={() => props.onClick(1)}
          value="1"
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-middleButton": {
              borderTop: "1px solid #1565c0",
              borderBottom: "1px solid #1565c0",
            },
          }}
          selected={props.activeFloor === 1}
          disabled={!relevantFloors.includes(1)}
        >
          1
        </ToggleButton>
        <ToggleButton
          onClick={() => props.onClick(-1)}
          value="-1"
          sx={{
            ...ToggleButtonStyles,
            "&.MuiToggleButtonGroup-middleButton": {
              borderTop: "1px solid #1565c0",
              borderBottom: "1px solid #1565c0",
            },
          }}
          selected={props.activeFloor === -1}
          disabled={!relevantFloors.includes(-1)}
        >
          L1
        </ToggleButton>
        <ToggleButton
          onClick={() => props.onClick(-2)}
          value="-2"
          sx={ToggleButtonStyles}
          selected={props.activeFloor === -2}
          disabled={!relevantFloors.includes(-2)}
        >
          L2
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default MapFloorSelect;
