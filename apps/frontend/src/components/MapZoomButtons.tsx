import { useControls } from "react-zoom-pan-pinch";
import { ButtonGroup } from "@mui/material";
import { ButtonStyling } from "../common/StylingCommon.ts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

function MapZoomButtons() {
  const styles = {
    color: "white",
    width: "40px",
    height: "35px",
    fontWeight: "light",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: ButtonStyling.blueButtonHover,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: ButtonStyling.blueButtonClicked,
      color: "white",
      fontWeight: "bold",
    },
  } as const;

  const { zoomIn, zoomOut } = useControls();

  return (
    <div
      className="fixed right-[2%] z-10"
      style={{ bottom: "calc(2% + 175px)" }}
    >
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        aria-label="Zoom"
        sx={{ backgroundColor: ButtonStyling.blueButton, borderRadius: "5px" }}
      >
        <IconButton
          sx={styles}
          // variant="contained"
          onClick={() => zoomIn()}
          // endIcon={}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          sx={styles}
          // variant="contained"
          onClick={() => zoomOut()}
        >
          <RemoveIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}

export default MapZoomButtons;
