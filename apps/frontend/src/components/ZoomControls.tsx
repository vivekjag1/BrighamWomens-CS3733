import { useControls } from "react-zoom-pan-pinch";
import { Button, ButtonGroup } from "@mui/material";

function ZoomControls() {
  const styles = {
    color: "#FFFFFF",
    backgroundColor: "#012D5A",
    width: "3vw",
    height: "5vh",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.15)",
      //minWidth: "0vw",
    },
  } as const;

  const { zoomIn, zoomOut } = useControls();
  return (
    <div className="fixed top-[5%] right-[2%] z-10">
      <ButtonGroup
        sx={{ backgroundColor: "#013B96" }}
        orientation="vertical"
        variant="contained"
        aria-label="Basic button group"
      >
        <Button sx={styles} variant="contained" onClick={() => zoomIn()}>
          +
        </Button>
        {/*<Button*/}
        {/*  sx={styles}*/}
        {/*  variant="contained"*/}
        {/*  onClick={() => resetTransform()}*/}
        {/*>*/}
        {/*  =*/}
        {/*</Button>*/}
        <Button sx={styles} variant="contained" onClick={() => zoomOut()}>
          -
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ZoomControls;
