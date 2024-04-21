import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { FormStyling } from "../common/StylingCommon.ts";

const styles = {
  color: "white",
  backgroundColor: FormStyling.submitColor,
  padding: ".5rem 3rem",
  "&:hover": {
    backgroundColor: FormStyling.submitHoverColor,
  },
  fontFamily: "Poppins, sans-serif",
} as const;

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="contained" sx={styles} {...props}></Button>;
};

export default CustomButton;
