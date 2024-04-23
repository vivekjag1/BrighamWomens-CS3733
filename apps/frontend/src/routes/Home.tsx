import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { GraphNode } from "common/src/GraphNode.ts";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "../components/Map/Map.tsx";
import NavigationPane from "../components/Map/NavigationPane.tsx";
import ZoomControls from "../components/Map/ZoomControls.tsx";
import FloorSelector from "../components/Map/FloorSelector.tsx";
import { createNodes } from "common/src/GraphCommon.ts";
import { getFloorNumber } from "../common/PathUtilities.ts";

function Home() {
  const [activeFloor, setActiveFloor] = useState(DEFAULT_FLOOR);
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_PATH);
  const [path, setPath] = useState<GraphNode[]>(INITIAL_PATH);
  const [startNodeID, setStartNodeID] = useState(nodes[0].nodeID);
  const [endNodeID, setEndNodeID] = useState(nodes[0].nodeID);
  const [algorithm, setAlgorithm] = useState("A-Star");

  // Gets nodes from database to draw
  useEffect(() => {
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

  // Submits currentLocation and destination to backend and gets an iterable of nodes representing path
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page refresh
    const formData = new FormData();
    formData.append(NavigateAttributes.startLocationKey, startNodeID);
    formData.append(NavigateAttributes.endLocationKey, endNodeID);
    formData.append(NavigateAttributes.algorithmKey, algorithm);

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
    const url = new URL(APIEndpoints.navigationRequest, window.location.origin);
    url.search = params.toString();
    await axios
      .get(url.toString())
      .then(function (response) {
        setPath(response.data);
        setActiveFloor(getFloorNumber(response.data[0].floor));
      })
      .catch(console.error);
  }

  function handleClear(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setActiveFloor(DEFAULT_FLOOR);
    setPath(INITIAL_PATH);
    setStartNode("");
    setEndNodeID("");
    setAlgorithm("A-Star");
  }

  function setStartNode(id: string) {
    setStartNodeID(id);
  }

  function setEndNode(id: string) {
    setEndNodeID(id);
  }

  function setAlgo(algorithm: string) {
    setAlgorithm(algorithm);
  }

  function setFields(nodeID: string) {
    if (startNodeID === "0") {
      setStartNodeID(nodeID);
    } else {
      setEndNodeID(nodeID);
    }
  }

  return (
    <div className="relative bg-offwhite">
      <TransformWrapper
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        <div className="absolute bottom-[32%] right-[1.5%] z-10">
          <ZoomControls />
        </div>
        <TransformComponent
          wrapperStyle={wrapperStyles}
          contentStyle={contentStyles}
        >
          <Map
            activeFloor={activeFloor}
            nodes={nodes}
            path={path}
            setFields={setFields}
          />
        </TransformComponent>
      </TransformWrapper>
      <div className="absolute top-[1%] left-[1%]">
        <NavigationPane
          nodes={nodes}
          startNodeID={startNodeID}
          startNodeIDSetter={setStartNode}
          endNodeID={endNodeID}
          endNodeIDSetter={setEndNode}
          algorithm={algorithm}
          algorithmSetter={setAlgo}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </div>
      <div className="absolute bottom-[2%] right-[1.5%]">
        <FloorSelector
          activeFloor={activeFloor}
          path={path}
          onClick={(selectedFloor: number) => setActiveFloor(selectedFloor)}
        />
      </div>
    </div>
  );
}

const wrapperStyles = {
  width: "100%",
  height: "100%",
  paddingLeft: "5%",
} as const;

const contentStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
} as const;

const DEFAULT_FLOOR: number = 1;
const INITIAL_PATH: GraphNode[] = [
  new GraphNode("0", "0", "0", "L2", "", "", "", ""),
  new GraphNode("0", "0", "0", "L1", "", "", "", ""),
  new GraphNode("0", "0", "0", "1", "", "", "", ""),
  new GraphNode("0", "0", "0", "2", "", "", "", ""),
  new GraphNode("0", "0", "0", "3", "", "", "", ""),
];

export default Home;
