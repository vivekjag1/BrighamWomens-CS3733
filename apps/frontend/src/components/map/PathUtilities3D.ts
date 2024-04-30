import { Node } from "database";

// Holds types and functions for drawing an elevator onto 3D map (which is a benched feature)

export type Point = {
  xcoord: number;
  ycoord: number;
};

// Gets the instructions to draw polylines across multiple floors
export function get3DPolylines(segments: Node[][]): string[] {
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

export function get2DPolylines(segments: Node[][]): string[] {
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

// Groups nodes along the same segment in the context of the 3D map.
export function getSegments(path: Node[]): Node[][] {
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
export function isFloorTransition(from: Node, to: Node) {
  return (
    (from.nodeType == "ELEV" && to.nodeType == "ELEV") ||
    (from.nodeType == "STAI" && to.nodeType == "STAI")
  );
}

// Given a node, calculates its position on the 3D map
export function getPoint(node: Node): Point {
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

export const secondFloorXOffset = 1250;
export const secondFloorYOffset = 2000;
export const firstFloorXOffset = 2500;
export const firstFloorYOffset = 4000;
export const lowerLevel1XOffset = 3750;
export const lowerLevel1YOffset = 6000;
export const lowerLevel2XOffset = 5000;
export const lowerLevel2YOffset = 8000;
