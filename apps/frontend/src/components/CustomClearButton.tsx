import Button, { ButtonProps } from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";

const CustomClearButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "#EA422D",
        color: "white",
        width: "8rem",
        fontFamily: "Poppins, sans-serif",
      }}
      endIcon={<ClearIcon />}
      {...props}
    >
      CLEAR
    </Button>
  );
};

export default CustomClearButton;
