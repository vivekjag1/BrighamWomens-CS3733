import MapImage from "../components/MapImage.tsx";
import { FormEvent, useState, useEffect } from "react";
import NavigateCard from "../components/NavigateCard.tsx";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";
import MapToggle from "../components/MapToggle.tsx";
import { GraphNode } from "common/src/GraphNode.ts";
import { createNodes } from "common/src/GraphCommon.ts";
// import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
// import { useAuth0 } from "@auth0/auth0-react";

const pathInitialState: number[][] = [
  [0, 0, -2],
  [0, 0, -1],
  [0, 0, 1],
  [0, 0, 2],
  [0, 0, 3],
];

function Home() {
  // const { getAccessTokenSilently } = useAuth0();

  // Sets the floor number depending on which button user clicks
  const [activeFloor, setActiveFloor] = useState<number>(-1);
  function handleMapSwitch(x: number) {
    setActiveFloor(x);
  }

  // Retrieves path from current location to destination in the form of a list of a nodes
  const [path, setPath] = useState<number[][]>(pathInitialState);

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

  function resetNavigation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPath(pathInitialState);
    setActiveFloor(-1);
  }

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    console.log("HELLO WORLD");
    //const token = await getAccessTokenSilently();

    event.preventDefault(); // prevent page refresh

    // Access the form data
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData);

    const queryParams: Record<string, string> = {
      [NavigateAttributes.startLocationKey]: formData
        .get(NavigateAttributes.startLocationKey)!
        .toString(),
      [NavigateAttributes.endLocationKey]: formData
        .get(NavigateAttributes.endLocationKey)!
        .toString(),
      [NavigateAttributes.algorithmKey]: formData
        .get(NavigateAttributes.algorithmKey)!
        .toString(),
    };

    const params: URLSearchParams = new URLSearchParams(queryParams);

    // window.location.origin: path relative to current url
    const url = new URL(APIEndpoints.navigationRequest, window.location.origin);
    url.search = params.toString();
    await axios
      .get(url.toString())
      .then(function (response) {
        setPath(response.data);
        setActiveFloor(response.data[0][2]);
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="relative bg-offwhite">
        <MapImage activeFloor={activeFloor} path={path} nodes={nodes} />
        <div className="absolute left-[1%] top-[2%]">
          <NavigateCard onSubmit={handleForm} onReset={resetNavigation} />
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
