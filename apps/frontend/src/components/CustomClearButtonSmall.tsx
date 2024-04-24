import { ButtonProps } from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const CustomClearButtonSmall: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      style={{
        color: "gray",
        fontFamily: "Poppins, sans-serif",
      }}
      {...props}
    >
      <ClearIcon />
    </IconButton>
  );
};

export default CustomClearButtonSmall;
