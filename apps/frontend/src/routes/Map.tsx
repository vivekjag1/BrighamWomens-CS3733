import { FormEvent, useState, useEffect } from "react";
import NavigateCard from "../components/NavigateCard.tsx";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";
import MapFloorSelect from "../components/MapFloorSelect.tsx";
import { GraphNode } from "common/src/GraphNode.ts";
import { createNodes } from "common/src/GraphCommon.ts";
import { PathNodesObject } from "common/src/Path.ts";
import Wayfinder from "../components/Map/Wayfinder.tsx";

function Map() {
  const [pathNodeObject, setPathNodeObject] =
    useState<PathNodesObject>(initialState);
  // const { getAccessTokenSilently } = useAuth0();

  // Sets the floor number depending on which button user clicks
  const [activeFloor, setActiveFloor] = useState<number>(defaultFloor);

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
    setPathNodeObject(initialState);
    setActiveFloor(defaultFloor);
  }

  async function handleForm(event: FormEvent<HTMLFormElement>) {
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
    console.log(nodes);
  }

  return (
    <div className="relative bg-offwhite pl-[200px]">
      <Wayfinder />
      <div className="absolute left-[1%] top-[2%]">
        <NavigateCard
          onSubmit={handleForm}
          pathNodeObject={pathNodeObject}
          setPathNodeObject={setPathNodeObject}
          onReset={resetNavigation}
        />
      </div>
      <div className="fixed right-[2%] bottom-[2%] hidden">
        <MapFloorSelect
          activeFloor={activeFloor}
          onClick={setActiveFloor}
          path={path}
        />
      </div>
    </div>
  );
}

const pathInitialState: number[][] = [
  [0, 0, -2],
  [0, 0, -1],
  [0, 0, 1],
  [0, 0, 2],
  [0, 0, 3],
];

const defaultFloor: number = 1;

const initialState: PathNodesObject = {
  startNode: "",
  endNode: "",
};

export default Map;
