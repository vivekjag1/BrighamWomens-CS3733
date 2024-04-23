export function getNumFromFloor(floor: string): number {
  switch (floor) {
    case "L1":
      return -1;
    case "L2":
      return -2;
    default:
      return parseInt(floor);
  }
}
