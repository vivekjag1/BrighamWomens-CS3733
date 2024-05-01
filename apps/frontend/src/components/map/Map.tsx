import { Node } from "database";
import { getFloorNumber } from "../../common/PathUtilities.ts";
import DashedPolyline from "./DashedPolyline.tsx";
import ClickableCircle from "./ClickableCircle.tsx";
import lowerLevel2 from "../../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../../assets/maps/03_thethirdfloor.png";
import LocationMarker from "./LocationMarker.tsx";
import FloorMarkers from "./FloorMarkers.tsx";
import { useToast } from "../useToast.tsx";
import { MapStyles } from "../../common/StylingCommon.ts";
// import {isFirstRun} from "vitest";
interface mapProps {
  activeFloor: number;
  nodes: Node[];
  path: Node[];
  onNodeClick: (nodeID: string) => void;
  onClick: (x: number) => void;
  updateGlowSequence: (selectedFloor: number) => void;
  onReset: () => void;
}

function Map(props: mapProps) {
  const map = getFloorMap(props.activeFloor);
  const nodes: Node[] = filterNodes(props.nodes, props.activeFloor);
  let polylines: string[] = [];
  let startNode: {
    nodeID: string;
    xcoord?: number;
    ycoord?: number;
    floor?: string;
  };
  let endNode: {
    nodeID: string;
    xcoord?: number;
    ycoord?: number;
    floor?: string;
  };

  const lastIndex = props.path.length - 1;
  const { showToast } = useToast();
  if (props.path.length == 0) {
    showToast("There is no path between the two given locations", "warning");
    props.onReset();
  } else {
    polylines = getPolylines(props.path, props.activeFloor);

    startNode = {
      nodeID: props.path[0].nodeID,
      xcoord: props.path[0].xcoord,
      ycoord: props.path[0].ycoord,
      floor: props.path[0].floor,
    };

    endNode = {
      nodeID: props.path[lastIndex].nodeID,
      xcoord: props.path[lastIndex].xcoord,
      ycoord: props.path[lastIndex].ycoord,
      floor: props.path[lastIndex].floor,
    };
  }

  function isPathNode(node: Node): boolean {
    return props.path.some((pathNode) => pathNode.nodeID === node.nodeID);
  }

  function isStartNode(node: Node): boolean {
    return node.nodeID == startNode.nodeID;
  }

  function isEndNode(node: Node): boolean {
    return node.nodeID == endNode.nodeID;
  }

  const polylineElements = polylines.map((polyline) => (
    <DashedPolyline points={polyline} width={MapStyles.edgeWidth} />
  ));

  const nodeElements = nodes.map((node) =>
    node.xcoord != 0 &&
    node.ycoord != 0 &&
    (!isPathNode(node) || isStartNode(node) || isEndNode(node)) ? (
      <ClickableCircle
        x={node.xcoord}
        y={node.ycoord}
        name={node.shortName}
        id={node.nodeID}
        onClick={() => props.onNodeClick(node.nodeID)}
      />
    ) : (
      <></>
    ),
  );

  const startMarkerElement = (() => {
    if (props.path.length == 0) {
      return <></>;
    }
    return getFloorNumber(props.path[0].floor) === props.activeFloor ? (
      <LocationMarker
        x={props.path[0].xcoord}
        y={props.path[0].ycoord}
        color="green"
      />
    ) : (
      <></>
    );
  })();

  const endMarkerElement = (() => {
    if (props.path.length == 0) {
      return <></>;
    }
    return getFloorNumber(props.path[lastIndex].floor) === props.activeFloor ? (
      <LocationMarker
        x={props.path[lastIndex].xcoord}
        y={props.path[lastIndex].ycoord}
        color="red"
      />
    ) : (
      <></>
    );
  })();

  const segments: Node[][] = getFloorSegments(props.path, props.activeFloor);
  const allTransitionMarkers = segments.map((segment) => {
    const elements: JSX.Element[] = [];
    let xcoord: number = 0;
    let ycoord: number = 0;
    if (!isStartNode(segment[0])) {
      xcoord = segment[0].xcoord;
      ycoord = segment[0].ycoord;
      const indexSegmentStart: number = props.path.indexOf(segment[0]);
      const nextFloor: string = props.path[indexSegmentStart - 1].floor;
      elements.push(
        <FloorMarkers
          x={xcoord}
          y={ycoord}
          floor={nextFloor}
          onClick={props.onClick}
          updateGlowSequence={props.updateGlowSequence}
        />,
      );
    }
    if (!isEndNode(segment[segment.length - 1])) {
      xcoord = segment[segment.length - 1].xcoord;
      ycoord = segment[segment.length - 1].ycoord;
      const indexSegmentEnd: number = props.path.indexOf(
        segment[segment.length - 1],
      );
      const nextFloor = props.path[indexSegmentEnd + 1].floor;
      elements.push(
        <FloorMarkers
          x={xcoord}
          y={ycoord}
          floor={nextFloor}
          onClick={props.onClick}
          updateGlowSequence={props.updateGlowSequence}
        />,
      );
    }
    return elements;
  });

  return (
    <svg viewBox="0 0 5000 3400" height="100vh">
      <filter id="shadow">
        <feDropShadow dx="15" dy="15" floodOpacity="0.2" />
      </filter>
      <image href={map} filter="url(#shadow)" />
      {polylineElements}
      {nodeElements}
      {startMarkerElement}
      {endMarkerElement}
      {allTransitionMarkers}
    </svg>
  );
}

// Filters out nodes that do not apply to the current floor
function filterNodes(nodes: Node[], activeFloor: number): Node[] {
  return nodes.filter((node) => getFloorNumber(node.floor) === activeFloor);
}

// Return an array of strings, where each string represents the list of points needed to draw one segment of a path
function getPolylines(path: Node[], activeFloor: number): string[] {
  if (path.length == 0) {
    return [];
  }

  const segments: Node[][] = getFloorSegments(path, activeFloor);

  // Generate instructions to draw polyline(s) corresponding to the active floor
  const polylineInstructions: string[] = [];
  for (let i = 0, length1 = segments.length; i < length1; i++) {
    let polylineInstruction = "";
    for (let j = 0, length2 = segments[i].length; j < length2; j++) {
      polylineInstruction +=
        segments[i][j].xcoord + "," + segments[i][j].ycoord + " ";
    }
    polylineInstructions.push(polylineInstruction);
  }

  return polylineInstructions;
}

// Groups nodes along the same segment and filters out nodes that do not apply to the current floor map
function getFloorSegments(path: Node[], activeFloor: number) {
  return filterSegments(getSegments(path), activeFloor);
}

// Groups nodes along the same segment
function getSegments(path: Node[]): Node[][] {
  // Split the array into sub-arrays, where each sub-array holds nodes of the same floor
  const splitPaths: Node[][] = [];
  let startIndex: number = 0,
    endIndex: number = 0;
  for (let i = 0, length = path.length; i < length - 1; i++) {
    if (path[i].floor != path[i + 1].floor) {
      endIndex = i + 1;
      splitPaths.push(path.slice(startIndex, endIndex));
      startIndex = i + 1;
    }
  }
  splitPaths.push(path.slice(startIndex));
  return splitPaths;
}

// Filters out nodes that do not apply to the current floor map
function filterSegments(segments: Node[][], activeFloor: number): Node[][] {
  if (segments[0].length == 0) {
    return [];
  }
  return segments.filter(
    (segment: Node[]) => getFloorNumber(segment[0].floor) === activeFloor,
  );
}

// Returns the corresponding map, given a floor number
function getFloorMap(activeFloor: number) {
  switch (activeFloor) {
    case -2:
      return lowerLevel2;
    case -1:
      return lowerLevel1;
    case 1:
      return firstFloor;
    case 2:
      return secondFloor;
    case 3:
      return thirdFloor;
  }
}
export default Map;
