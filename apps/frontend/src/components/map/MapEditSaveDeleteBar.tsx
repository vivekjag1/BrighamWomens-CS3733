import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { DesignSystem } from "../../common/StylingCommon.ts";

interface MapEditSaveDeleteBarProps {
  onSave: () => void;
  deleteNode: () => void;
}
function MapEditSaveDeleteBar(props: MapEditSaveDeleteBarProps) {
  return (
    <ButtonGroup sx={buttonGroupStyles} variant="contained">
      <Button sx={buttonStyles} onClick={props.onSave}>
        <SaveAltIcon />
      </Button>
      <Button sx={buttonStyles} onClick={props.deleteNode}>
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  );
}

const buttonStyles = {
  backgroundColor: DesignSystem.primaryColor,
  width: "5vh",
  height: "5vh",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
} as const;

const buttonGroupStyles = {
  borderRadius: "10px",
} as const;
export default MapEditSaveDeleteBar;
