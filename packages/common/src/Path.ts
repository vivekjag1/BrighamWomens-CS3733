export type PathType = {
  startNode: string;
  endNode: string;
};

export type PathAlgorithm = "A-Star" | "BFS" | "DFS" | "Dijkstra";

export enum MapType {
  TwoDimensional = "2D",
  ThreeDimensional = "3D",
}

export enum DirectionType {
  Start,
  End,
  Straight,
  Left,
  SlightLeft,
  HairpinLeft,
  Right,
  SlightRight,
  HairpinRight,
  Elevator,
  Stairs,
}

export const DirectionMessages = new Map<DirectionType, string>([
  [DirectionType.Start, "Start at"],
  [DirectionType.End, "Arrived at"],
  [DirectionType.Straight, "Continue"],
  [DirectionType.Left, "Turn left"],
  [DirectionType.SlightLeft, "Turn slight left"],
  [DirectionType.HairpinLeft, "Turn hairpin left"],
  [DirectionType.Right, "Turn right"],
  [DirectionType.SlightRight, "Turn slight right"],
  [DirectionType.HairpinRight, "Turn hairpin right"],
  [DirectionType.Elevator, "Take"],
  [DirectionType.Stairs, "Take"],
]);

export type DirectionMessage = {
  type: DirectionType;
  msg: string;
};

export enum StatUnit {
  Mins = "min",
  Arrival = "arrival",
  Distance = "feet",
}

export type TripStat = {
  value: string;
  unit: StatUnit;
};

export type Directions = {
  directions: DirectionMessage[];
  floor: string;
};
