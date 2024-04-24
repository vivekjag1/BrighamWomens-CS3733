export type PathType = {
  startNode: string;
  endNode: string;
};

export type PathAlgorithm = "A-Star" | "BFS" | "DFS" | "Dijkstra";

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
  [DirectionType.Straight, "Go straight for"],
  [DirectionType.Left, "Turn left"],
  [DirectionType.SlightLeft, "Turn slight left"],
  [DirectionType.HairpinLeft, "Turn hairpin left"],
  [DirectionType.Right, "Turn right"],
  [DirectionType.SlightRight, "Turn slight right"],
  [DirectionType.HairpinRight, "Turn hairpin right"],
  [DirectionType.Elevator, "Take the elevator to floor"],
  [DirectionType.Stairs, "Take the stairs to floor"],
]);

export type DirectionMessage = {
  type: DirectionType;
  msg: string;
};

enum StatUnit {
  Mins,
  Distance,
}

export type TripStat = {
  stat: string;
  unit: StatUnit;
};

export type Directions = {
  directions: DirectionMessage[];
  floor: string;
};
