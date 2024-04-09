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

function MapToggle(props: { onClick: (x: number) => void }) {
  const [activeMap, setActiveMap] = useState(0);

  function handleChange(e: React.MouseEvent<HTMLElement>, nextMap: number) {
    setActiveMap(nextMap);
  }
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={activeMap}
      exclusive
      onChange={handleChange}
      sx={{ backgroundColor: "#013B96" }}
    >
      <ToggleButton onClick={() => props.onClick(3)} value="3" sx={styles}>
        3
      </ToggleButton>
      <ToggleButton onClick={() => props.onClick(2)} value="2" sx={styles}>
        2
      </ToggleButton>
      <ToggleButton onClick={() => props.onClick(1)} value="1" sx={styles}>
        1
      </ToggleButton>
      <ToggleButton onClick={() => props.onClick(-1)} value="-1" sx={styles}>
        L1
      </ToggleButton>
      <ToggleButton onClick={() => props.onClick(-2)} value="-2" sx={styles}>
        L2
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default MapToggle;
