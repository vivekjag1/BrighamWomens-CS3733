import Button, { ButtonProps } from "@mui/material/Button";
import NavigationIcon from "@mui/icons-material/Navigation";

const NavigateButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      className="justify-end"
      style={{ backgroundColor: "#012D5A" }}
      {...props}
      endIcon={<NavigationIcon />}
    >
      GO
    </Button>
  );
};

export default NavigateButton;
