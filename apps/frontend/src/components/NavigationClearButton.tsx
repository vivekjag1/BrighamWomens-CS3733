import IconButton from "@mui/material/IconButton";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { ButtonProps } from "@mui/material/Button";

const NavigationClearButton: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      onClick={props.onClick}
      style={{
        border: "1px solid gray",
        color: "gray",
        width: "2.6rem",
        alignSelf: "left",
      }}
      {...props}
    >
      <RestartAltRoundedIcon />
    </IconButton>
  );
};

export default NavigationClearButton;
