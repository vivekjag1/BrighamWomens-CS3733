import { GraphNode } from "common/src/GraphNode.ts";
import { getFloorNumber } from "../../common/PathUtilities.ts";
import DashedPolyline from "./DashedPolyline.tsx";
import ClickableCircle from "./ClickableCircle.tsx";
import lowerLevel2 from "../../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../../assets/maps/03_thethirdfloor.png";
import LocationMarker from "./LocationMarker.tsx";

interface mapProps {
  activeFloor: number;
  nodes: GraphNode[];
  path: GraphNode[];
  setFields: (nodeID: string) => void;
}

function Map(props: mapProps) {
  const map = getFloorMap(props.activeFloor);
  const nodes: GraphNode[] = filterNodes(props.nodes, props.activeFloor);
  const polylines = getPolylines(props.path, props.activeFloor);

  const polylineElements = polylines.map((polyline) => (
    <DashedPolyline points={polyline} />
  ));
  const nodeElements = nodes.map((node) => (
    <ClickableCircle
      x={node.xcoord}
      y={node.ycoord}
      id={node.nodeID}
      onClick={() => props.setFields(node.nodeID)}
    />
  ));

  const startMarkerElement = (() => {
    return parseInt(props.path[0].floor) === props.activeFloor ? (
      <LocationMarker
        x={parseInt(props.path[0].xcoord)}
        y={parseInt(props.path[0].ycoord)}
        color="green"
      />
    ) : (
      <></>
    );
  })();

  const length = props.path.length;
  const endMarkerElement = (() => {
    return parseInt(props.path[length - 1].floor) === props.activeFloor ? (
      <LocationMarker
        x={parseInt(props.path[length - 1].xcoord)}
        y={parseInt(props.path[length - 1].ycoord)}
        color="red"
      />
    ) : (
      <></>
    );
  })();

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
    </svg>
  );
}

// Filters out nodes that do not apply to the current floor
function filterNodes(nodes: GraphNode[], activeFloor: number): GraphNode[] {
  return nodes.filter((node) => getFloorNumber(node.floor) === activeFloor);
}

// Return an array of strings, where each string represents the list of points needed to draw one segment of a path
function getPolylines(path: GraphNode[], activeFloor: number): string[] {
  // Split the array into sub-arrays, where each sub-array holds nodes of the same floor
  const splitPaths: GraphNode[][] = [];
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
    (splitPath: GraphNode[]) =>
      getFloorNumber(splitPath[0].floor) === activeFloor,
  );

  // Generate instructions to draw polyline(s) corresponding to the active floor
  const polylineInstructions: string[] = [];
  for (let i = 0, length1 = filteredSplitPaths.length; i < length1; i++) {
    let polylineInstruction = "";
    for (let j = 0, length2 = filteredSplitPaths[i].length; j < length2; j++) {
      polylineInstruction +=
        filteredSplitPaths[i][j].xcoord +
        "," +
        filteredSplitPaths[i][j].ycoord +
        " ";
    }
    polylineInstructions.push(polylineInstruction);
  }

  return polylineInstructions;
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
