import Button, { ButtonProps } from "@mui/material/Button";
import { FormStyling } from "../common/StylingCommon.ts";

const styles = {
  color: "white",
  backgroundColor: FormStyling.clearColor,
  padding: ".5rem 3rem",
  "&:hover": {
    backgroundColor: FormStyling.clearHoverColor,
  },
  fontFamily: "Poppins, sans-serif",
} as const;

const CustomDeleteButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="contained" sx={styles} {...props}></Button>;
};

export default CustomDeleteButton;
