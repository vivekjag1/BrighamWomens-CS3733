import IconButton from "@mui/material/IconButton";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { ButtonProps } from "@mui/material/Button";

const NavigationClearButton: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      onClick={props.onClick}
      style={{
        color: "gray",
        width: "2.5vw",
      }}
      {...props}
    >
      <RestartAltRoundedIcon />
    </IconButton>
  );
};

export default NavigationClearButton;
