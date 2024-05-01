import { FormEvent, useState, useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import axios from "axios";
import { Node } from "database";
import { MapType, Directions, TripStat } from "common/src/Path.ts";
import { getFloorNumber, getSegments } from "../common/PathUtilities.ts";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import NavigationPane from "../components/map/NavigationPane.tsx";
import Map from "../components/map/Map.tsx";
import MapBlur from "../components/map/MapBlur.tsx";
import ZoomControls from "../components/map/ZoomControls.tsx";
import FloorSelector from "../components/map/FloorSelector.tsx";
import MapTypeToggle from "../components/map/MapTypeToggle.tsx";
import StackedMaps from "../components/map/StackedMaps.tsx";
import PathBreadcrumb from "../components/breadcrumb/PathBreadcrumb.tsx";
import QRCodeInsert from "../components/QRCodeInsert.tsx";
import QRCodeButton from "../components/map/QRCodeButton.tsx";
import "../components/map/styles/StackedMaps.css";
import "../animations/hover-grow-press-shrink.css";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";

function Home() {
  const [activeFloor, setActiveFloor] = useState(DEFAULT_FLOOR);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_PATH);
  const [path, setPath] = useState<Node[]>(INITIAL_PATH);
  const [startNodeID, setStartNodeID] = useState(INITIAL_PATH[0].nodeID);
  const [endNodeID, setEndNodeID] = useState(INITIAL_PATH[0].nodeID);
  const [algorithm, setAlgorithm] = useState("A-Star");
  const [glowSequence, setGlowSequence] = useState<number[]>([]);
  const [floorSequence, setFloorSequence] = useState<number[]>([]);
  const [mapType, setMapType] = useState(MapType.TwoDimensional);
  const [hasPath, setHasPath] = useState<boolean>(false);
  const [directions, setDirections] = useState<Directions[]>([]);
  const [tripStats, setTripStats] = useState<TripStat[]>([]);
  const [displayQRCode, setDisplayQRCode] = useState<boolean>(false);

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

  // @ts-expect-error missing type
  function combineDirections(floors) {
    const processedFloors = [];

    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      const newDirections = [];
      let sum = 0;
      let accumulating = false;

      for (let j = 0; j < floor.directions.length; j++) {
        const currentDirection = floor.directions[j];

        if (currentDirection.type === 2) {
          const feet = parseInt(currentDirection.msg.match(/(\d+)ft/)[1]);
          sum += feet;
          accumulating = true;

          if (
            j === floor.directions.length - 1 ||
            (floor.directions[j + 1] && floor.directions[j + 1].type !== 2)
          ) {
            newDirections.push({
              type: 2,
              msg: `Continue and proceed for ${sum}ft`,
            });
            sum = 0;
            accumulating = false;
          }
        } else {
          if (accumulating) {
            sum = 0;
            accumulating = false;
          }

          newDirections.push(currentDirection);
        }
      }

      processedFloors.push({
        ...floor,
        directions: newDirections,
      });
    }

    return processedFloors;
  }

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
    const url = new URL(APIEndpoints.navigation, window.location.origin);

    url.search = params.toString();
    await axios
      .get(url.toString())
      .then(function (response) {
        setPath(response.data.path);

        setActiveFloor(getFloorNumber(response.data.path[0].floor));
        setDirections(combineDirections(response.data.directions));
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

  // Switches between 2D and 3D maps
  function handleMapSwitch() {
    if (mapType == MapType.TwoDimensional) {
      setMapType(MapType.ThreeDimensional);
      setDisplayQRCode(false);
    } else setMapType(MapType.TwoDimensional);
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

  // Sets start location
  function setStartNode(id: string) {
    setStartNodeID(id);
  }

  // Sets end location
  function setEndNode(id: string) {
    setEndNodeID(id);
  }

  // Sets pathfinding algorithm
  function setAlgo(algorithm: string) {
    setAlgorithm(algorithm);
  }

  const mapElement =
    mapType == MapType.ThreeDimensional ? (
      <div>
        <div className="transform-3d">
          <StackedMaps path={path} />
        </div>
        <div className="h-screen flex flex-col justify-center text-center text-secondary font-extrabold text-[2vw] absolute bottom-0 right-[13%]">
          <h2
            className="relative top-[-27%] hover-grow-press-shrink cursor-pointer"
            onClick={() => {
              setMapType(MapType.TwoDimensional);
              setActiveFloor(3);
            }}
          >
            3
          </h2>
          <h2
            className="relative top-[-13%] hover-grow-press-shrink cursor-pointer"
            onClick={() => {
              setMapType(MapType.TwoDimensional);
              setActiveFloor(2);
            }}
          >
            2
          </h2>
          <h2
            className="hover-grow-press-shrink cursor-pointer"
            onClick={() => {
              setMapType(MapType.TwoDimensional);
              setActiveFloor(1);
            }}
          >
            1
          </h2>
          <h2
            className="relative top-[12%] hover-grow-press-shrink cursor-pointer"
            onClick={() => {
              setMapType(MapType.TwoDimensional);
              setActiveFloor(-1);
            }}
          >
            L1
          </h2>
          <h2
            className="relative top-[27%] hover-grow-press-shrink cursor-pointer"
            onClick={() => {
              setMapType(MapType.TwoDimensional);
              setActiveFloor(-2);
            }}
          >
            L2
          </h2>
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
        onReset={handleReset}
      />
    );

  const zoomControlsElement = mapType == MapType.TwoDimensional && (
    <div className="absolute bottom-[31%] right-[1.5%] z-10">
      <ZoomControls />
    </div>
  );

  const floorSelectorElement = mapType == MapType.TwoDimensional && (
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

  const pathBreadcrumbElement = mapType == MapType.TwoDimensional &&
    path.length != 0 &&
    path[0].nodeID != "" &&
    !areOnSameFloor(path) && (
      <div className="absolute top-[1%] left-[50%] translate-x-[-50%]">
        <PathBreadcrumb
          activeFloor={activeFloor}
          floorSequence={floorSequence}
          onClick={(selectedFloor: number) => setActiveFloor(selectedFloor)}
          updateGlowSequence={updateGlowSequence}
        />
      </div>
    );

  const QRCodeToggleElement = mapType == MapType.TwoDimensional && hasPath && (
    <Tooltip
      TransitionComponent={Zoom}
      title="Mobile Directions"
      placement="left"
      arrow
    >
      <div className="absolute top-[10%] right-[1.5%] z-40">
        <QRCodeButton
          displayQrCode={displayQRCode}
          setDisplayQRCode={setDisplayQRCode}
        />
      </div>
    </Tooltip>
  );

  const QRCodeElement = displayQRCode && (
    <div className="absolute bottom-[2.8%] right-[8%] z-40">
      <QRCodeInsert
        hasPath={hasPath}
        startNodeID={startNodeID}
        endNodeID={endNodeID}
        algorithm={algorithm}
        setDisplayQRCode={setDisplayQRCode}
      />
    </div>
  );

  return (
    <div className="relative bg-offwhite z-0">
      <MapBlur />
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
        {QRCodeToggleElement}
        {QRCodeElement}
        <Tooltip
          TransitionComponent={Zoom}
          title="Map View"
          placement="left"
          arrow
        >
          <div className="absolute top-[2%] right-[1.5%]">
            <MapTypeToggle mapType={mapType} setMapType={handleMapSwitch} />
          </div>
        </Tooltip>
      </TransformWrapper>
      {floorSelectorElement}
      {pathBreadcrumbElement}
    </div>
  );
}

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
