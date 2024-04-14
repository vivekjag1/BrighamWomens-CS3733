import Map from "../components/Map.tsx";
import { FormEvent, useState } from "react";
import NavigationPanel from "../components/NavigationPanel.tsx";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";
import MapToggle from "../components/MapToggle.tsx";

const initialState: number[][] = [
  [0, 0, -2],
  [0, 0, -1],
  [0, 0, 1],
  [0, 0, 2],
  [0, 0, 3],
];

function Home() {
  // Sets the floor number depending on which button user clicks
  const [activeFloor, setActiveFloor] = useState<number>(-1);
  function handleMapSwitch(x: number) {
    setActiveFloor(x);
  }

  // Retrieves path from current location to destination in the form of a list of a nodes
  const [nodes, setNodes] = useState<number[][]>(initialState);

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page refresh

    // Access the form data
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData);
    const startLocation = formData
      .get(NavigateAttributes.startLocationKey)
      ?.toString()
      .trim();
    const endLocation = formData
      .get(NavigateAttributes.endLocationKey)
      ?.toString()
      .trim();

    if (startLocation && endLocation) {
      const queryParams: Record<string, string> = {
        /*[NavigateAttributes.startLocationKey]: formData
                .get(NavigateAttributes.startLocationKey)!
                .toString(),
            [NavigateAttributes.endLocationKey]: formData
                .get(NavigateAttributes.endLocationKey)!
                .toString(),*/
        [NavigateAttributes.startLocationKey]: startLocation,
        [NavigateAttributes.endLocationKey]: endLocation,
      };
      console.log(queryParams);

      const params: URLSearchParams = new URLSearchParams(queryParams);

      const url = new URL(
        APIEndpoints.navigationRequest,
        window.location.origin,
      ); // window.location.origin: path relative to current url
      url.search = params.toString();
      console.log(url.toString());

      await axios
        .get(url.toString())
        .then(function (response) {
          setNodes(response.data);
          console.log(response.data);
          setActiveFloor(response.data[0][2]);
        })
        .catch(console.error);
    } else {
      setNodes(initialState);
    }
  }

  return (
    <div>
      <div className="relative flex justify-evenly bg-[#F1F1E6] ml-[5rem]">
        <div className=" h-screen flex flex-col justify-center">
          <NavigationPanel onSubmit={handleForm} />
        </div>
        <div className="h-screen flex flex-col justify-center">
          <Map activeFloor={activeFloor} nodes={nodes} />
        </div>
        <div className="fixed right-[2%] bottom-[2%]">
          <MapToggle
            activeFloor={activeFloor}
            onClick={handleMapSwitch}
            nodes={nodes}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
