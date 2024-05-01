import { ButtonGroup, Button, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { ButtonStyling } from "../../common/StylingCommon.ts";

interface saveRevertAllButtonsProps {
  saveAll: () => void;
  revertAll: () => void;
}

function SaveRevertAllButtons(props: saveRevertAllButtonsProps) {
  return (
    <ButtonGroup variant="contained">
      <Tooltip title="Save All" placement="top" arrow>
        <Button sx={saveStyle} onClick={props.saveAll}>
          <SaveIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Revert All" placement="top" arrow>
        <Button sx={revertStyle} onClick={props.revertAll}>
          <SettingsBackupRestoreIcon />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

const saveStyle = {
  backgroundColor: ButtonStyling.blueButton,
  borderRadius: "6px",
  border: "none",
  height: "5.5vh",
  width: "5.5vh",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
} as const;

const revertStyle = {
  backgroundColor: ButtonStyling.blueButton,
  borderRadius: "6px",
  border: "none",
  height: "5.5vh",
  width: "5.5vh",
  "&:hover": {
    backgroundColor: ButtonStyling.redButton,
  },
} as const;

export default SaveRevertAllButtons;
