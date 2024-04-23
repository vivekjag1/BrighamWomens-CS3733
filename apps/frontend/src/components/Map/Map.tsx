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

interface mapProps {
  activeFloor: number;
  nodes: Node[];
  path: Node[];
  onNodeClick: (nodeID: string) => void;
  onClick: (x: number) => void;
}

function Map(props: mapProps) {
  const map = getFloorMap(props.activeFloor);
  const nodes: Node[] = filterNodes(props.nodes, props.activeFloor);
  const polylines = getPolylines(props.path, props.activeFloor);

  const lastIndex = props.path.length - 1;

  const startNode = {
    nodeID: props.path[0].nodeID,
    xcoord: props.path[0].xcoord,
    ycoord: props.path[0].ycoord,
    floor: props.path[0].floor,
  };

  const endNode = {
    nodeID: props.path[lastIndex].nodeID,
    xcoord: props.path[lastIndex].xcoord,
    ycoord: props.path[lastIndex].ycoord,
    floor: props.path[lastIndex].floor,
  };

  const polylineElements = polylines.map((polyline) => (
    <DashedPolyline points={polyline} />
  ));

  const nodeElements = nodes.map((node) => (
    <ClickableCircle
      x={node.xcoord}
      y={node.ycoord}
      id={node.nodeID}
      onClick={() => props.onNodeClick(node.nodeID)}
    />
  ));

  const startMarkerElement = (() => {
    return getFloorNumber(props.path[0].floor) === props.activeFloor ? (
      <LocationMarker
        x={parseInt(props.path[0].xcoord)}
        y={parseInt(props.path[0].ycoord)}
        color="green"
      />
    ) : (
      <></>
    );
  })();

  const endMarkerElement = (() => {
    return getFloorNumber(props.path[lastIndex].floor) === props.activeFloor ? (
      <LocationMarker
        x={parseInt(props.path[lastIndex].xcoord)}
        y={parseInt(props.path[lastIndex].ycoord)}
        color="red"
      />
    ) : (
      <></>
    );
  })();

  const segments: Node[][] = getSegments(props.path, props.activeFloor);
  const allTransitionMarkers = segments.map((segment) => {
    const elements: JSX.Element[] = [];
    let xcoord: number = 0;
    let ycoord: number = 0;
    if (segment[0].nodeID != startNode.nodeID) {
      xcoord = parseInt(segment[0].xcoord);
      ycoord = parseInt(segment[0].ycoord);
      const indexSegmentStart: number = props.path.indexOf(segment[0]);
      const nextFloor: string = props.path[indexSegmentStart - 1].floor;
      elements.push(
        <FloorMarkers
          x={xcoord}
          y={ycoord}
          floor={nextFloor}
          onClick={props.onClick}
        />,
      );
    }
    if (segment[segment.length - 1].nodeID != endNode.nodeID) {
      xcoord = parseInt(segment[segment.length - 1].xcoord);
      ycoord = parseInt(segment[segment.length - 1].ycoord);
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
        />,
      );
    }
    return elements;
  });

  return (
    <svg viewBox="0 0 5000 3400" height="100vh">
      <filter id="shadow">
        <feDropShadow dx="20" dy="20" floodOpacity="0.8" />
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
  const segments: Node[][] = getSegments(path, activeFloor);

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
function getSegments(path: Node[], activeFloor: number): Node[][] {
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

  // Filter out sub-arrays with nodes that do not match the active floor.
  const filteredSplitPaths = splitPaths.filter(
    (splitPath: Node[]) => getFloorNumber(splitPath[0].floor) === activeFloor,
  );

  return filteredSplitPaths;
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
