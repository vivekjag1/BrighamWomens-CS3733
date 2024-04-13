import { useControls } from "react-zoom-pan-pinch";
import { Button, ButtonGroup } from "@mui/material";

function ZoomControls() {
  const styles = {
    color: "#FFFFFF",
    backgroundColor: "#012D5A",
    width: "1vw",
    height: "5vh",
    minWidth: "1vw",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.15)",
      minWidth: "0vw",
    },
  } as const;

  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="fixed bottom-[30%] right-[2%] z-10">
      <ButtonGroup
        sx={{ backgroundColor: "#013B96", height: "100%", minWidth: "0px" }}
        orientation="vertical"
        variant="contained"
        aria-label="Basic button group"
      >
        <Button sx={styles} variant="contained" onClick={() => zoomIn()}>
          +
        </Button>
        <Button
          sx={styles}
          variant="contained"
          onClick={() => resetTransform()}
        >
          =
        </Button>
        <Button sx={styles} variant="contained" onClick={() => zoomOut()}>
          -
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ZoomControls;
