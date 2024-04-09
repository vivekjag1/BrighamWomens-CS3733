import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

const styles = {
  color: "#FFFFFF",
  width: "50px",
  height: "6.5vh",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  "&.Mui-selected": {
    backgroundColor: "#004ABE",
    color: "#FFFFFF",
  },
} as const;

function MapToggle(props: {
  activeFloor: number;
  onClick: (x: number) => void;
  nodes: number[][];
}) {
  const [activeMap, setActiveMap] = useState(0);

  function handleChange(e: React.MouseEvent<HTMLElement>, nextMap: number) {
    setActiveMap(nextMap);
  }

  // Determines which buttons to gray out
  const relevantFloors: number[] = [];
  for (let i = 0; i < props.nodes.length; i++) {
    if (!relevantFloors.includes(props.nodes[i][2])) {
      relevantFloors.push(props.nodes[i][2]);
    }
  }

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={activeMap}
      exclusive
      onChange={handleChange}
      sx={{ backgroundColor: "#013B96" }}
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

export default MapToggle;
