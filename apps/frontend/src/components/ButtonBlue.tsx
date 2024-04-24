import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { DesignSystem } from "../common/StylingCommon.ts";
import React from "react";

const ToggleButtonStyles = {
  backgroundColor: DesignSystem.primaryColor,
  color: DesignSystem.white,
  fontFamily: DesignSystem.fontFamily,
  fontSize: "1.10rem",
  fontWeight: "normal",
  height: "6vh",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: DesignSystem.accentColor,
    color: "#FFFFFF",
  },
} as const;

const CustomButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button variant="contained" sx={ToggleButtonStyles} {...props}></Button>
  );
};

export default CustomButton;
