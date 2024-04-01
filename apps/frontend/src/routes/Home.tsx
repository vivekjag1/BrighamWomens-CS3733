import lowerLevel1 from "../../assets/00_thelowerlevel1.svg";
import LocationSelector from "../components/LocationSelector.tsx";
import { IconButton } from "@mui/material";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { useState } from "react";

function Home() {
  const [panelToggled, setPanelToggled] = useState(false);
  function clickHandler() {
    alert("Button Clicked");
    setPanelToggled(!panelToggled);
  }

  return (
    <div>
      <div className="relative">
        <img src={lowerLevel1} alt="Lower level 1 floor map" />
        <div className="absolute top-4 left-4">
          <IconButton
            onClick={clickHandler}
            size="large"
            sx={{
              backgroundColor: "#f6f8fa",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#a1a1a1",
              },
              width: "50px",
              height: "50px",
              marginBottom: "10px",
            }}
          >
            <EditLocationIcon
              sx={{
                width: "35px",
                height: "35px",
                color: "#3b4146",
              }}
            />
          </IconButton>
          {panelToggled && <LocationSelector />}
        </div>
      </div>
    </div>
  );
}

export default Home;
