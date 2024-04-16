import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

const styles = {
  color: "#FFFFFF",
  width: "3vw",
  height: "5vh",
  "&:hover": {
    backgroundColor: "#013B96",
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#013B96",
    color: "#FFFFFF",
  },
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
    <ToggleButtonGroup
      orientation="vertical"
      value={activeMap}
      exclusive
      onChange={handleChange}
      sx={{ backgroundColor: "#012D5A", height: "100%" }}
    >
      <ToggleButton
        onClick={() => props.onClick(3)}
        value="3"
        sx={styles}
        selected={props.activeFloor === 3}
        disabled={!relevantFloors.includes(3)}
      >
        3
      </ToggleButton>
      <ToggleButton
        onClick={() => props.onClick(2)}
        value="2"
        sx={styles}
        selected={props.activeFloor === 2}
        disabled={!relevantFloors.includes(2)}
      >
        2
      </ToggleButton>
      <ToggleButton
        onClick={() => props.onClick(1)}
        value="1"
        sx={styles}
        selected={props.activeFloor === 1}
        disabled={!relevantFloors.includes(1)}
      >
        1
      </ToggleButton>
      <ToggleButton
        onClick={() => props.onClick(-1)}
        value="-1"
        sx={styles}
        selected={props.activeFloor === -1}
        disabled={!relevantFloors.includes(-1)}
      >
        L1
      </ToggleButton>
      <ToggleButton
        onClick={() => props.onClick(-2)}
        value="-2"
        sx={styles}
        selected={props.activeFloor === -2}
        disabled={!relevantFloors.includes(-2)}
      >
        L2
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default MapFloorSelect;
