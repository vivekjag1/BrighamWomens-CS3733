import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Node } from "database";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { getFloorsInPath } from "../common/PathUtilities.ts";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "../components/Map/Map.tsx";
import NavigationPane from "../components/Map/NavigationPane.tsx";
import ZoomControls from "../components/Map/ZoomControls.tsx";
import FloorSelector from "../components/Map/FloorSelector.tsx";
import { createNodes } from "common/src/GraphCommon.ts";
import { getFloorNumber } from "../common/PathUtilities.ts";
import ResetButton from "../components/Map/ResetButton.tsx";

function Home() {
  const [activeFloor, setActiveFloor] = useState(DEFAULT_FLOOR);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_PATH);
  const [path, setPath] = useState<Node[]>(INITIAL_PATH);
  const [startNodeID, setStartNodeID] = useState(INITIAL_PATH[0].nodeID);
  const [endNodeID, setEndNodeID] = useState(INITIAL_PATH[0].nodeID);
  const [algorithm, setAlgorithm] = useState("A-Star");
  const [glowSequence, setGlowSequence] = useState<number[]>([]);

  // Gets nodes from database to populate dropdowns and draw on map
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

  // Submits start and end to backend and gets an iterable of nodes representing path
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
        setGlowSequence(getFloorsInPath(response.data).slice(1));
      })
      .catch(console.error);
  }

  // Sequences an animation on floor selector based on the sequence of floors a user must go through
  function updateGlowSequence(selectedFloor: number) {
    if (glowSequence[0] == selectedFloor) {
      const updatedGlowingFloors = glowSequence;
      updatedGlowingFloors.shift();
      setGlowSequence(updatedGlowingFloors);
    }
  }

  // Resets pathfinding page
  function handleReset() {
    setActiveFloor(DEFAULT_FLOOR);
    setPath(INITIAL_PATH);
    setStartNode(INITIAL_PATH[0].nodeID);
    setEndNodeID(INITIAL_PATH[0].nodeID);
    setAlgorithm("A-Star");
  }

  // Swaps the start and end locations in navigation pane
  function handleSwap() {
    const prevStartNodeID = startNodeID;
    setStartNodeID(endNodeID);
    setEndNodeID(prevStartNodeID);
  }

  function handleNodeClick(nodeID: string) {
    if (startNodeID === "") {
      setStartNodeID(nodeID);
    } else {
      setEndNodeID(nodeID);
    }
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

  return (
    <div className="relative bg-offwhite">
      <TransformWrapper
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        <div className="absolute top-[2%] right-[1.5%] z-10">
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
            onNodeClick={handleNodeClick}
            onClick={(selectedFloor: number) => setActiveFloor(selectedFloor)}
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
          onSwap={handleSwap}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="absolute bottom-[2%] right-[1.5%]">
        <FloorSelector
          activeFloor={activeFloor}
          path={path}
          onClick={(selectedFloor: number) => setActiveFloor(selectedFloor)}
          updateGlowSequence={updateGlowSequence}
          glowSequence={glowSequence}
        />
      </div>
      <div className="absolute bottom-[2%] left-[1.5%]">
        <ResetButton onClick={handleReset} />
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
const INITIAL_PATH: Node[] = [
  {
    nodeID: "",
    xcoord: "0",
    ycoord: "0",
    floor: "L2",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: "0",
    ycoord: "0",
    floor: "L1",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: "0",
    ycoord: "0",
    floor: "1",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: "0",
    ycoord: "0",
    floor: "2",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: "0",
    ycoord: "0",
    floor: "3",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
];

export default Home;
