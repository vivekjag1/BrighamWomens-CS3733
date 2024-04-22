// Holds functions that may be necessary in the manipulation of GraphNode[]s

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
