import { Node } from "database";

// Holds functions that may be necessary in the manipulation of Node[]
// Gets the floor number corresponding to the string representation of the floor
export function getFloorNumber(floor: string): number {
  switch (floor) {
    case "L2":
      return -2;
    case "L1":
      return -1;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    default:
      return -100;
  }
}

// Gets the floor string corresponding to the numerical representation of the floor
export function getFloorString(floor: number): string {
  switch (floor) {
    case -2:
      return "L2";
    case -1:
      return "L1";
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3";
    default:
      return "N/A";
  }
}

// Groups nodes along the same segment
export function getSegments(path: Node[]): Node[][] {
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
