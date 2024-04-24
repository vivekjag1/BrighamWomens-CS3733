import { useState } from "react";
import { ToggleButton } from "@mui/material";
/*import LayersIcon from '@mui/icons-material/Layers';*/
import { DesignSystem } from "../../common/StylingCommon";

interface mapTypeToggleProps {
  setMapType: () => void;
}
function MapTypeToggle(props: mapTypeToggleProps) {
  const [selected, setSelected] = useState(false);

  return (
    <ToggleButton
      value="3DYes"
      sx={toggleButtonStyles}
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      onClick={props.setMapType}
    >
      {/*<LayersIcon sx={iconStyles}/>*/}
      <label className="text-lg font-semibold">3D</label>
    </ToggleButton>
  );
}

const toggleButtonStyles = {
  width: "6vh",
  height: "6vh",
  backgroundColor: DesignSystem.primaryColor,
  color: DesignSystem.white,
  borderRadius: "8px",
  "&.MuiToggleButton-root:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
  "&.Mui-selected": {
    backgroundColor: DesignSystem.accentColor,
    color: DesignSystem.white,
  },
} as const;

/*
const iconStyles = {
  fontSize: "1.8rem"
} as const;
*/

export default MapTypeToggle;
