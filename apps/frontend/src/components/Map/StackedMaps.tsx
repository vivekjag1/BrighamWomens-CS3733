import lowerLevel2 from "../../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../../assets/maps/03_thethirdfloor.png";
import { Node } from "database";
import DashedPolyline from "./DashedPolyline.tsx";
import ElevatorPolyline from "./ElevatorPolyline.tsx";

interface StackedMapsProps {
  path: Node[];
}

type Point = {
  xcoord: number;
  ycoord: number;
};

function StackedMaps(props: StackedMapsProps) {
  const polyline = getAPolyline(props.path);
  const segments: Node[][] = getSegments(props.path);
  const polylines2D = get2DPolylines(segments);
  const polylines3D = get3DPolylines(segments);
  console.log("single polyline", polyline);
  console.log("floor transitions", polylines3D);
  console.log("floor paths", polylines2D);

  const polylines2DElements = polylines2D.map((polyline2D) => (
    <DashedPolyline points={polyline2D} width={10} />
  ));
  const polylines3DElements = polylines3D.map((polyline3D) => (
    <ElevatorPolyline points={polyline3D} />
  ));

  const startMarkerElement = (() => {
    const startNode: Point = getStartNodeCoords(props.path);
    return (
      <circle cx={startNode.xcoord} cy={startNode.ycoord} fill="green" r="30" />
    );
  })();

  const endMarkerElement = (() => {
    const endNode: Point = getEndNodeCoords(props.path);
    return <circle cx={endNode.xcoord} cy={endNode.ycoord} fill="red" r="30" />;
  })();

  return (
    <svg
      viewBox="0 0 10000 11400"
      height="100vh"
      transform="scale(2.125) translate(0, 12)"
    >
      <filter id="shadow">
        <feDropShadow dx="90" dy="90" floodOpacity="0.9" />
      </filter>
      <image href={thirdFloor} x={0} y={0} filter="url(#shadow)" />
      <image
        href={secondFloor}
        x={secondFloorXOffset}
        y={secondFloorYOffset}
        filter="url(#shadow)"
      />
      <image
        href={firstFloor}
        x={firstFloorXOffset}
        y={firstFloorYOffset}
        filter="url(#shadow)"
      />
      <image
        href={lowerLevel1}
        x={lowerLevel1XOffset}
        y={lowerLevel1YOffset}
        filter="url(#shadow)"
      />
      <image
        href={lowerLevel2}
        x={lowerLevel2XOffset}
        y={lowerLevel2YOffset}
        filter="url(#shadow)"
      />
      {polylines2DElements}
      {polylines3DElements}
      {startMarkerElement}
      {endMarkerElement}
    </svg>
  );
}

function get2DPolylines(segments: Node[][]): string[] {
  const polylineInstructions: string[] = [];
  for (let i = 0, length = segments.length; i < length; i++) {
    if (!isFloorTransition(segments[i][0], segments[i][1])) {
      let polylineInstruction: string = "";
      for (let j = 0, length2 = segments[i].length; j < length2; j++) {
        const point: Point = getPoint(segments[i][j]);
        polylineInstruction =
          polylineInstruction + point.xcoord + "," + point.ycoord + " ";
      }
      polylineInstructions.push(polylineInstruction);
    }
  }
  return polylineInstructions;
}

// Gets the instructions to draw polylines across multiple floors
function get3DPolylines(segments: Node[][]): string[] {
  const polylineInstructions: string[] = [];
  for (let i = 0, length = segments.length; i < length; i++) {
    if (segments[i].length == 2) {
      if (isFloorTransition(segments[i][0], segments[i][1])) {
        let polylineInstruction = "";
        for (let j = 0; j < 2; j++) {
          const point = getPoint(segments[i][j]);
          polylineInstruction =
            polylineInstruction + point.xcoord + "," + point.ycoord + " ";
        }
        polylineInstructions.push(polylineInstruction);
      }
    }
  }
  return polylineInstructions;
}

// Groups nodes along the same segment in the context of the 3D map.
function getSegments(path: Node[]): Node[][] {
  // Split the array into sub-arrays, where each sub-array holds nodes of the same floor
  const splitPaths: Node[][] = [];
  let startIndex: number = 0,
    endIndex: number = 0;
  for (let i = 0, length = path.length; i < length - 1; i++) {
    if (path[i].floor != path[i + 1].floor) {
      endIndex = i + 1;
      splitPaths.push(path.slice(startIndex, endIndex));
      splitPaths.push(path.slice(i, endIndex + 1));
      startIndex = i + 1;
    }
  }
  splitPaths.push(path.slice(startIndex));
  return splitPaths;
}

// Given two nodes, determines whether the nodes represent a floor transition
function isFloorTransition(from: Node, to: Node) {
  return (
    (from.nodeType == "ELEV" && to.nodeType == "ELEV") ||
    (from.nodeType == "STAI" && to.nodeType == "STAI")
  );
}

// Given a node, calculates its position on the 3D map
function getPoint(node: Node): Point {
  const point: Point = {
    xcoord: 0,
    ycoord: 0,
  };
  if (node.floor == "2" && node.nodeID != "") {
    point.xcoord = node.xcoord + secondFloorXOffset;
    point.ycoord = node.ycoord + secondFloorYOffset;
  } else if (node.floor == "1" && node.nodeID != "") {
    point.xcoord = node.xcoord + firstFloorXOffset;
    point.ycoord = node.ycoord + firstFloorYOffset;
  } else if (node.floor == "L1" && node.nodeID != "") {
    point.xcoord = node.xcoord + lowerLevel1XOffset;
    point.ycoord = node.ycoord + lowerLevel1YOffset;
  } else if (node.floor == "L2" && node.nodeID != "") {
    point.xcoord = node.xcoord + lowerLevel2XOffset;
    point.ycoord = node.ycoord + lowerLevel2YOffset;
  } else {
    point.xcoord = node.xcoord;
    point.ycoord = node.ycoord;
  }
  return point;
}

function getStartNodeCoords(path: Node[]) {
  return getPoint(path[0]);
}

function getEndNodeCoords(path: Node[]) {
  return getPoint(path[path.length - 1]);
}

// Gets ONE polyline for a path
function getAPolyline(path: Node[]): string {
  let polylineInstructions = "";
  for (let i = 0, length = path.length; i < length; i++) {
    const currentNode: Node = path[i];
    let xcoord: number = 0;
    let ycoord: number = 0;
    if (currentNode.floor == "2" && currentNode.nodeID != "") {
      xcoord = currentNode.xcoord + secondFloorXOffset;
      ycoord = currentNode.ycoord + secondFloorYOffset;
    } else if (currentNode.floor == "1" && currentNode.nodeID != "") {
      xcoord = currentNode.xcoord + firstFloorXOffset;
      ycoord = currentNode.ycoord + firstFloorYOffset;
    } else if (currentNode.floor == "L1" && currentNode.nodeID != "") {
      xcoord = currentNode.xcoord + lowerLevel1XOffset;
      ycoord = currentNode.ycoord + lowerLevel1YOffset;
    } else if (currentNode.floor == "L2" && currentNode.nodeID != "") {
      xcoord = currentNode.xcoord + lowerLevel2XOffset;
      ycoord = currentNode.ycoord + lowerLevel2YOffset;
    } else {
      xcoord = currentNode.xcoord;
      ycoord = currentNode.ycoord;
    }
    polylineInstructions = polylineInstructions + xcoord + "," + ycoord + " ";
  }
  return polylineInstructions;
}

const secondFloorXOffset = 1250;
const secondFloorYOffset = 2000;
const firstFloorXOffset = 2500;
const firstFloorYOffset = 4000;
const lowerLevel1XOffset = 3750;
const lowerLevel1YOffset = 6000;
const lowerLevel2XOffset = 5000;
const lowerLevel2YOffset = 8000;

export default StackedMaps;
