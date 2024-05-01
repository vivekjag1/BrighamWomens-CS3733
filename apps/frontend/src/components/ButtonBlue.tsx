import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { ButtonStyling } from "../common/StylingCommon.ts";
import React from "react";

const styles = {
  color: "white",
  backgroundColor: ButtonStyling.blueButton,
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
  fontFamily: "Poppins, sans-serif",
} as const;

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="contained" sx={styles} {...props}></Button>;
};

export default CustomButton;
