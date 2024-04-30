import { ButtonGroup, Button, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { ButtonStyling, DesignSystem } from "../../common/StylingCommon.ts";

interface saveRevertAllButtonsProps {
  saveAll: () => void;
  revertAll: () => void;
}

function SaveRevertAllButtons(props: saveRevertAllButtonsProps) {
  return (
    <ButtonGroup variant="contained">
      <Tooltip title="Apply all" placement="top" arrow>
        <Button sx={buttonStyles} onClick={props.saveAll}>
          <SaveIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Undo all" placement="top" arrow>
        <Button sx={buttonStyles} onClick={props.revertAll}>
          <SettingsBackupRestoreIcon />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

const buttonStyles = {
  backgroundColor: DesignSystem.primaryColor,
  border: "none",
  height: "5.5vh",
  width: "5.5vh",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
} as const;

export default SaveRevertAllButtons;
