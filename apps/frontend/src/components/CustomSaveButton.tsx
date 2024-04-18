import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ButtonProps } from "@mui/material/Button";

const styles = {
  backgroundColor: "#012D5A",
  width: "4vw",
  padding: ".5rem 3rem",
  "&:hover": {
    backgroundColor: "#013B96",
  },
} as const;

const CustomButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button variant="contained" sx={styles} endIcon={<CheckIcon />} {...props}>
      SAVE
    </Button>
  );
};

export default CustomButton;
