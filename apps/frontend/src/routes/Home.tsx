import Map from "../components/Map.tsx";
import LocationSelector from "../components/LocationSelector.tsx";
import { IconButton } from "@mui/material";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";

function Home() {
  const [panelToggled, setPanelToggled] = useState(false);
  const [coords, setCoords] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);
  function clickHandler() {
    setPanelToggled(!panelToggled);
  }

  async function formHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page refresh

    // Access the form data
    const formData = new FormData(event.target as HTMLFormElement);

    const queryParams: Record<string, string> = {
      [NavigateAttributes.startLocationKey]: formData
        .get(NavigateAttributes.startLocationKey)!
        .toString(),
      [NavigateAttributes.endLocationKey]: formData
        .get(NavigateAttributes.endLocationKey)!
        .toString(),
    };

    const params: URLSearchParams = new URLSearchParams(queryParams);

    const url = new URL(APIEndpoints.navigationRequest, window.location.origin); // window.location.origin: path relative to current url
    // console.log(url.toString());
    url.search = params.toString();

    await axios
      .get(url.toString())
      .then(function (response) {
        // console.log(response.data);
        setCoords(response.data);
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="relative">
        <Map coords={coords} />
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
          {panelToggled && <LocationSelector onSubmit={formHandler} />}
        </div>
      </div>
    </div>
  );
}

export default Home;
