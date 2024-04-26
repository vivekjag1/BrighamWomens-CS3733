import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
import IconButton from "@mui/material/IconButton";
import { DesignSystem } from "../../common/StylingCommon";

interface resetButtonProps {
  onClick: () => void;
}

function ResetButton(props: resetButtonProps) {
  return (
    <IconButton onClick={props.onClick} sx={IconButtonStyles}>
      <RestartAltSharpIcon sx={IconStyles} />
    </IconButton>
  );
}

const IconButtonStyles = {
  borderRadius: "8px",
  height: "5vh",
  width: "5vh",
  backgroundColor: DesignSystem.primaryColor,
  "&:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
} as const;

const IconStyles = {
  color: DesignSystem.white,
} as const;
export default ResetButton;
