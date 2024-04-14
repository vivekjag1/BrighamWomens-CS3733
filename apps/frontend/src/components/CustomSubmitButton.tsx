import Button, { ButtonProps } from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

const CustomSubmitButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      className="justify-end"
      style={{ backgroundColor: "#012D5A", width: "8rem" }}
      {...props}
      endIcon={<CheckIcon />}
    >
      SUBMIT
    </Button>
  );
};

export default CustomSubmitButton;
