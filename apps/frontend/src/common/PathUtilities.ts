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

// Gets the floors involved in a path
export function getFloorsInPath(path: Node[]): number[] {
  const relevantFloors: number[] = [];
  for (let i = 0, length = path.length; i < length; i++) {
    const currentFloorNumber: number = getFloorNumber(path[i].floor);
    if (!relevantFloors.includes(currentFloorNumber))
      relevantFloors.push(currentFloorNumber);
  }
  return relevantFloors;
}
