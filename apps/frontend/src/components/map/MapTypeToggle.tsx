import { useState } from "react";
import { ToggleButton } from "@mui/material";
import { DesignSystem } from "../../common/StylingCommon";
import { useControls } from "react-zoom-pan-pinch";

interface mapTypeToggleProps {
  mapType: string;
  setMapType: () => void;
}
function MapTypeToggle(props: mapTypeToggleProps) {
  const [selected, setSelected] = useState(false);
  const { resetTransform } = useControls();

  function swap() {
    resetTransform();

    setTimeout(() => {
      props.setMapType();
      setSelected(!selected);
    }, 250);
  }

  return (
    <div onClick={swap}>
      <ToggleButton value="3DYes" sx={toggleButtonStyles} selected={selected}>
        <label className="text-lg font-bold" style={{ cursor: "pointer" }}>
          {props.mapType == "3D" ? "2D" : "3D"}
        </label>
      </ToggleButton>
    </div>
  );
}

const toggleButtonStyles = {
  width: "6vh",
  height: "6vh",
  backgroundColor: DesignSystem.primaryColor,
  color: DesignSystem.white,
  borderRadius: "6px",
  transition: "transform 0.1s linear",
  "&.MuiToggleButton-root:hover": {
    backgroundColor: DesignSystem.accentColor,
    transform: "scale(1.1)",
  },
  "&.MuiToggleButton-root:active": {
    transform: "scale(0.8)",
  },
  "&.Mui-selected": {
    backgroundColor: DesignSystem.primaryColor,
    color: DesignSystem.white,
  },
} as const;

export default MapTypeToggle;
