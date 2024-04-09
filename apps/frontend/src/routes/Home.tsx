import Map from "../components/Map.tsx";
import { Button, ButtonGroup } from "@mui/material";
import { FormEvent, useState } from "react";
import NavigationPanel from "../components/NavigationPanel.tsx";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";

function Home() {
  // Sets the floor number depending on which button user clicks
  const [floor, setFloor] = useState<number>(-1);
  function handleMapSwitch(x: number) {
    setFloor(x);
  }

  // Retrieves path from current location to destination in the form of a list of a nodes
  const [coords, setCoords] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);

  async function formHandler(event: FormEvent<HTMLFormElement>) {
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
    url.search = params.toString();

    await axios
      .get(url.toString())
      .then(function (response) {
        setCoords(response.data);
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="relative flex gap-4 bg-[#F1F1E6]">
        <div className="h-screen ml-4 flex flex-col justify-center">
          <NavigationPanel onSubmit={formHandler} />
        </div>
        <div className="h-screen flex flex-col justify-center ">
          <Map floor={floor} coords={coords} />
        </div>
        <div className="absolute left-[95%] top-[74%]">
          <ButtonGroup orientation="vertical" variant="contained">
            <Button
              onClick={() => handleMapSwitch(3)}
              sx={{ backgroundColor: "rgb(1,70,177)" }}
            >
              3
            </Button>
            <Button
              onClick={() => handleMapSwitch(2)}
              sx={{ backgroundColor: "rgb(1,70,177)" }}
            >
              2
            </Button>
            <Button
              onClick={() => handleMapSwitch(1)}
              sx={{ backgroundColor: "rgb(1,70,177)" }}
            >
              1
            </Button>
            <Button
              onClick={() => handleMapSwitch(-1)}
              sx={{ backgroundColor: "rgb(1,70,177)" }}
            >
              L1
            </Button>
            <Button
              onClick={() => handleMapSwitch(-2)}
              sx={{ backgroundColor: "rgb(1,70,177)" }}
            >
              L2
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default Home;
