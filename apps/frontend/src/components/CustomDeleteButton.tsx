import Button, { ButtonProps } from "@mui/material/Button";
import { ButtonStyling } from "../common/StylingCommon.ts";

const styles = {
  color: "white",
  backgroundColor: ButtonStyling.redButton,
  padding: ".5rem 3rem",
  "&:hover": {
    backgroundColor: ButtonStyling.redButtonHover,
  },
  fontFamily: "Poppins, sans-serif",
} as const;

const CustomDeleteButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="contained" sx={styles} {...props}></Button>;
};

export default CustomDeleteButton;
