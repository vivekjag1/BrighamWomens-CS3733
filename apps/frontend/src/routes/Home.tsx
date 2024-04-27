import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Node } from "database";
import { Directions, TripStat } from "common/src/Path.ts";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { getSegments } from "../common/PathUtilities.ts";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "../components/map/Map.tsx";
import NavigationPane from "../components/map/NavigationPane.tsx";
import ZoomControls from "../components/map/ZoomControls.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import MapTypeToggle from "../components/map/MapTypeToggle.tsx";
import { getFloorNumber } from "../common/PathUtilities.ts";
import StackedMaps from "../components/map/StackedMaps.tsx";
import "../components/map/styles/StackedMaps.css";
import PathTrail from "../components/breadcrumb/PathTrail.tsx";
import QRCodeInsert from "../components/QRCodeInsert.tsx";
import QRCodeButton from "../components/map/QRCodeButton.tsx";
/*import PathTrail from "../components/breadcrumb/PathTrail.tsx";*/

function Home() {
  const [activeFloor, setActiveFloor] = useState(DEFAULT_FLOOR);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_PATH);
  const [path, setPath] = useState<Node[]>(INITIAL_PATH);
  const [startNodeID, setStartNodeID] = useState(INITIAL_PATH[0].nodeID);
  const [endNodeID, setEndNodeID] = useState(INITIAL_PATH[0].nodeID);
  const [algorithm, setAlgorithm] = useState("A-Star");
  const [glowSequence, setGlowSequence] = useState<number[]>([]);
  const [floorSequence, setFloorSequence] = useState<number[]>([]);
  const [mapType, setMapType] = useState("2D");
  const [hasPath, setHasPath] = useState<boolean>(false);
  const [displayQRCode, setDisplayQRCode] = useState<boolean>(false);
  const [directions, setDirections] = useState<Directions[]>([]);
  const [tripStats, setTripStats] = useState<TripStat[]>([]);

  // Gets nodes from database to populate dropdowns and draw on map
  useEffect(() => {
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
        setPath(response.data.path);
        setActiveFloor(getFloorNumber(response.data.path[0].floor));
        setDirections(response.data.directions);
        setTripStats(response.data.tripStats);
        setGlowSequence(getFloorSequence(response.data.path).slice(1));
        setFloorSequence(getFloorSequence(response.data.path));
        setHasPath(true);
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

  function handleReset() {
    setActiveFloor(DEFAULT_FLOOR);
    setPath(INITIAL_PATH);
    setStartNode(INITIAL_PATH[0].nodeID);
    setEndNodeID(INITIAL_PATH[0].nodeID);
    setGlowSequence([]);
    setAlgorithm("A-Star");
    setHasPath(false);
    setDisplayQRCode(false);
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

  function handleMapChange() {
    if (mapType == "2D") setMapType("3D");
    else setMapType("2D");
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

  const mapElement =
    mapType == "3D" ? (
      <div>
        <div className="flexMap">
          <StackedMaps path={path} />
        </div>
        <div className="h-screen flex flex-col justify-center text-center text-secondary font-extrabold text-[2vw] absolute bottom-0 right-[13%]">
          <h2 className="relative top-[-27%]">3</h2>
          <h2 className="relative top-[-13%]">2</h2>
          <h2>1</h2>
          <h2 className="relative top-[12%]">L1</h2>
          <h2 className="relative top-[27%]">L2</h2>
        </div>
      </div>
    ) : (
      <Map
        activeFloor={activeFloor}
        nodes={nodes}
        path={path}
        onNodeClick={handleNodeClick}
        onClick={(selectedFloor: number) => {
          setActiveFloor(selectedFloor);
        }}
        updateGlowSequence={updateGlowSequence}
      />
    );

  const zoomControlsElement =
    mapType == "3D" ? (
      <></>
    ) : (
      <div className="absolute bottom-[31%] right-[1.5%] z-10">
        <ZoomControls />
      </div>
    );

  const floorSelectorElement =
    mapType == "3D" ? (
      <></>
    ) : (
      <div className="absolute bottom-[2%] right-[1.5%]">
        <FloorSelector
          activeFloor={activeFloor}
          path={path}
          onClick={(selectedFloor: number) => setActiveFloor(selectedFloor)}
          updateGlowSequence={updateGlowSequence}
          glowSequence={glowSequence}
        />
      </div>
    );

  const QRCodeElement = displayQRCode ? (
    <div className="absolute bottom-[3.5%] right-[8%] z-40">
      <QRCodeInsert
        hasPath={hasPath}
        startNodeID={startNodeID}
        endNodeID={endNodeID}
        algorithm={algorithm}
        setDisplayQRCode={setDisplayQRCode}
      />
    </div>
  ) : (
    <div className="absolute top-[10%] right-[1.5%] z-40">
      <QRCodeButton setDisplayQRCode={setDisplayQRCode} />
    </div>
  );

  const pathTrailElement =
    mapType == "3D" || path[0].nodeID == "" || areOnSameFloor(path) ? (
      <></>
    ) : (
      <div className="absolute top-[1%] left-[50%]">
        <PathTrail
          activeFloor={activeFloor}
          floorSequence={floorSequence}
          onClick={(selectedFloor: number) => setActiveFloor(selectedFloor)}
          updateGlowSequence={updateGlowSequence}
        />
      </div>
    );

  return (
    <div className="relative bg-offwhite z-0">
      <div
        className="z-10"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "12%",
          height: "100%",
          background:
            "linear-gradient(to left, rgba(234,234,234,0) 0%, rgba(234,234,234,1) 100%)",
          pointerEvents: "none", // Ensures the overlay doesn't intercept mouse events
        }}
      ></div>
      <TransformWrapper
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        {zoomControlsElement}
        <TransformComponent
          wrapperStyle={wrapperStyles}
          contentStyle={contentStyles}
        >
          {mapElement}
        </TransformComponent>
        <div className="absolute top-[1%] left-[1%] z-40">
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
            onReset={handleReset}
            hasPath={hasPath}
            directions={directions}
            tripStats={tripStats}
          />
        </div>
        {hasPath ? QRCodeElement : <></>}
      </TransformWrapper>
      {floorSelectorElement}
      <div className="absolute top-[2%] right-[1.5%]">
        <MapTypeToggle mapType={mapType} setMapType={handleMapChange} />
      </div>
      {pathTrailElement}
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

// Determines whether all the nodes along the path are on the same floor
function areOnSameFloor(path: Node[]): boolean {
  let onSameFloor: boolean = true;
  const currentFloor = path[0].floor;
  for (let i = 0, length = path.length; i < length; i++) {
    if (currentFloor != path[i].floor) {
      onSameFloor = false;
      return onSameFloor;
    }
  }
  return onSameFloor;
}
// Gets sequence of floors one must traverse through along a path
function getFloorSequence(path: Node[]) {
  const floorSequence: number[] = [];
  const segments: Node[][] = getSegments(path);
  for (let i = 0, length = segments.length; i < length; i++) {
    floorSequence.push(getFloorNumber(segments[i][0].floor));
  }
  return floorSequence;
}

const DEFAULT_FLOOR: number = 1;
const INITIAL_PATH: Node[] = [
  {
    nodeID: "",
    xcoord: 0,
    ycoord: 0,
    floor: "L2",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: 0,
    ycoord: 0,
    floor: "L1",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: 0,
    ycoord: 0,
    floor: "1",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: 0,
    ycoord: 0,
    floor: "2",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
  {
    nodeID: "",
    xcoord: 0,
    ycoord: 0,
    floor: "3",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
  },
];

export default Home;
