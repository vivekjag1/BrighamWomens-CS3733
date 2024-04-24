/*
import { FormEvent, useState, useEffect } from "react";
import NavigateCard from "../components/NavigateCard.tsx";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";
import MapFloorSelect from "../components/MapFloorSelect.tsx";
import type { Node } from "database";
import { PathNodesObject } from "common/src/Path.ts";
import StackedMaps from "../components/Map/StackedMaps.tsx";
import MapImage from "../components/MapImage.tsx";

function Map() {
  const [activeFloor, setActiveFloor] = useState<number>(DEFAULT_FLOOR);

  const [pathNodeObject, setPathNodeObject] =
    useState<PathNodesObject>(initialState);

  // Retrieves path from current location to destination in the form of a list of a nodes
  const [path, setPath] = useState<number[][]>(pathInitialState);

  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    //get the nodes from the db
    async function getNodesFromDb() {
      const rawNodes = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes: Node[] = rawNodes.data;
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
    setActiveFloor(DEFAULT_FLOOR);
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
  /!*const mapToBeRendered =
    activeFloor === DEFAULT_FLOOR ? (
      <StackedMaps onClick={setActiveFloor} />
    ) : (
      <MapImage
        activeFloor={activeFloor}
        path={path}
        nodes={nodes}
        setPathNodeObject={setPathNodeObject}
        pathNodeObject={pathNodeObject}
        setActiveFloor={setActiveFloor}
      />
    );*!/

  return (
    <div className="relative bg-offwhite pl-[200px]">
      {mapToBeRendered}
      <div className="absolute left-[1%] top-[2%] z-[60]">
        <NavigateCard
          onSubmit={handleForm}
          pathNodeObject={pathNodeObject}
          setPathNodeObject={setPathNodeObject}
          onReset={resetNavigation}
        />
      </div>
      <div className="fixed right-[2%] bottom-[2%]">
        {activeFloor == 0 ? (
          <></>
        ) : (
          <MapFloorSelect
            activeFloor={activeFloor}
            onClick={setActiveFloor}
            path={path}
          />
        )}
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

const DEFAULT_FLOOR: number = 0;

const initialState: PathNodesObject = {
  startNode: "",
  endNode: "",
};

export default Map;
*/
