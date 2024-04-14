import MapPage from "../components/MapPage.tsx";
import { FormEvent, useState, useEffect } from "react";
import NavigationPanel from "../components/NavigationPanel.tsx";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";
import MapToggle from "../components/MapToggle.tsx";
import { GraphNode } from "common/src/GraphNode.ts";
import { createNodes } from "common/src/GraphCommon.ts";

function Home() {
  // Sets the floor number depending on which button user clicks
  const [activeFloor, setActiveFloor] = useState<number>(-1);
  function handleMapSwitch(x: number) {
    setActiveFloor(x);
  }

  // Retrieves path from current location to destination in the form of a list of a nodes
  const [path, setPath] = useState<number[][]>([
    [0, 0, -2],
    [0, 0, -1],
    [0, 0, 1],
    [0, 0, 2],
    [0, 0, 3],
  ]);

  const [nodes, setNodes] = useState<GraphNode[]>([]);

  useEffect(() => {
    //get the nodes from the db
    async function getNodesFromDb() {
      const rawNodes = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes = createNodes(rawNodes.data);
      graphNodes = graphNodes.filter((node) => node.nodeType != "HALL");
      graphNodes = graphNodes.sort((a, b) =>
        a.longName.localeCompare(b.longName),
      );
      setNodes(graphNodes);
      return graphNodes;
    }
    getNodesFromDb().then();
  }, []);

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page refresh

    // Access the form data
    const formData = new FormData(event.target as HTMLFormElement);
    //console.log(formData);
    const queryParams: Record<string, string> = {
      [NavigateAttributes.startLocationKey]: formData
        .get(NavigateAttributes.startLocationKey)!
        .toString(),
      [NavigateAttributes.endLocationKey]: formData
        .get(NavigateAttributes.endLocationKey)!
        .toString(),
    };
    //console.log(queryParams);

    const params: URLSearchParams = new URLSearchParams(queryParams);

    const url = new URL(APIEndpoints.navigationRequest, window.location.origin); // window.location.origin: path relative to current url
    url.search = params.toString();
    //console.log(url.toString());

    await axios
      .get(url.toString())
      .then(function (response) {
        setPath(response.data);
        //console.log(response.data);
        setActiveFloor(response.data[0][2]);
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="relative flex justify-evenly bg-[#F1F1E6]">
        <div className=" h-screen flex flex-col justify-center">
          <NavigationPanel onSubmit={handleForm} nodes={nodes} />
        </div>
        <div className="h-screen flex flex-col justify-center">
          <MapPage activeFloor={activeFloor} path={path} nodes={nodes} />
        </div>
        <div className="fixed right-[2%] bottom-[2%]">
          <MapToggle
            activeFloor={activeFloor}
            onClick={handleMapSwitch}
            nodes={path}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
