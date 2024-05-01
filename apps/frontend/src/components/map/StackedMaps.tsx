import lowerLevel2 from "../../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../../assets/maps/03_thethirdfloor.png";
import { Node } from "database";
import DashedPolyline from "./DashedPolyline.tsx";
import StartEndMarker from "./StartEndMarker.tsx";
import {
  Point,
  getPoint,
  secondFloorXOffset,
  secondFloorYOffset,
  firstFloorXOffset,
  firstFloorYOffset,
  lowerLevel1XOffset,
  lowerLevel1YOffset,
  lowerLevel2XOffset,
  lowerLevel2YOffset,
} from "./PathUtilities3D.ts";

interface StackedMapsProps {
  path: Node[];
}

function StackedMaps(props: StackedMapsProps) {
  const polyline = getAPolyline(props.path);
  const polylineElement = <DashedPolyline points={polyline} width={13} />;

  const startMarkerElement = (() => {
    const startNode: Point = getStartNodeCoords(props.path);
    return (
      <StartEndMarker x={startNode.xcoord} y={startNode.ycoord} color="green" />
    );
  })();

  const endMarkerElement = (() => {
    const endNode: Point = getEndNodeCoords(props.path);
    return <StartEndMarker x={endNode.xcoord} y={endNode.ycoord} color="red" />;
  })();

  /*const endMarkerElement = (() => {
    const endNode: Point = getEndNodeCoords(props.path);
    return <circle cx={endNode.xcoord} cy={endNode.ycoord} fill="red" r={5} />;
  })();*/

  return (
    <svg
      viewBox="0 0 10000 11400"
      height="100vh"
      transform="scale(2.125) translate(0, 12)"
    >
      <filter id="shadow">
        <feDropShadow dx="90" dy="90" floodOpacity="0.2" />
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
      {polylineElement}
      {startMarkerElement}
      {endMarkerElement}
    </svg>
  );
}

// Gets polyline instructions for 3D path
function getAPolyline(path: Node[]): string {
  let polylineInstructions = "";
  for (let i = 0, length = path.length; i < length; i++) {
    const point: Point = getPoint(path[i]);
    polylineInstructions =
      polylineInstructions + point.xcoord + "," + point.ycoord + " ";
  }
  return polylineInstructions;
}

// Gets the coordinates of the starting node
function getStartNodeCoords(path: Node[]) {
  return getPoint(path[0]);
}

// Gets the coordinates of end node
function getEndNodeCoords(path: Node[]) {
  return getPoint(path[path.length - 1]);
}

export default StackedMaps;
