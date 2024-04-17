import Button, { ButtonProps } from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const NavigateButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      className="justify-end"
      style={{ backgroundColor: "#012D5A" }}
      {...props}
      endIcon={<EditIcon />}
    >
      EDIT
    </Button>
  );
};

export default NavigateButton;
