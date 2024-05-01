import {
  DirectionMessage,
  DirectionMessages,
  Directions,
  DirectionType,
  TripStat,
  StatUnit,
} from "common/src/Path.ts";
import type { Node } from "database";

const PIXELS_TO_FEET: number = 0.347;
const FT_PER_SEC: number = 4.4; // 3 mph
// const emptyDirectionList: Directions = { directions: [], floor: "" };

// Returns textual directions given a list of nodes
export function getDirections(nodes: Node[]): Directions[] {
  // Default starting instructions
  const outputDirections: Directions[] = [];
  if (nodes.length === 0) {
    return [];
  }
  // Initial angle from start to second node
  let lastAngle = absoluteAngleBetweenNodes(nodes[0], nodes[1]);

  // Add start direction message
  outputDirections.push({
    directions: [
      {
        type: DirectionType.Start,
        msg:
          "Start at " +
          nodes[0].longName +
          ", facing " +
          cardinalDirectionAfterNode(nodes[0], nodes[1]),
      },
    ],
    floor: nodes[0].floor,
  });

  let directionsIndex = 0;

  // Iterate over all nodes
  for (let nodeIndex = 0; nodeIndex < nodes.length - 1; nodeIndex++) {
    outputDirections[directionsIndex].directions.push(
      createDirectionMessage(
        nodes[nodeIndex],
        nodes[nodeIndex + 1],
        nodeIndex,
        lastAngle,
      ),
    );

    lastAngle = absoluteAngleBetweenNodes(
      nodes[nodeIndex],
      nodes[nodeIndex + 1],
    );

    // If there is a floor transition, advance output to group directions to the next array of directions for that floor
    if (isFloorTransition(nodes[nodeIndex], nodes[nodeIndex + 1])) {
      outputDirections.push({
        directions: [],
        floor: nodes[nodeIndex + 1].floor,
      });

      directionsIndex++;
    }
  }

  outputDirections[directionsIndex].directions.push({
    type: DirectionType.End,
    msg: "Arrived at " + nodes[nodes.length - 1].longName,
  });

  return outputDirections;
}

// Return relevant trip stats for a path
export function getTripStats(nodes: Node[]): TripStat[] {
  let tripDistance = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
    tripDistance += distanceBetweenNodes(nodes[i], nodes[i + 1]);
  }

  const tripTime = totalTripTimeMins(tripDistance);

  return [
    { value: tripTime, unit: StatUnit.Mins },
    { value: "", unit: StatUnit.Arrival }, // populated by frontend based on user time
    { value: tripDistance.toString(), unit: StatUnit.Distance },
  ];
}

// Determine whether a floor transition is needed, given two nodes
export function isFloorTransition(from: Node, to: Node): boolean {
  return (
    (from.nodeType == "ELEV" && to.nodeType == "ELEV") ||
    (from.nodeType == "STAI" && to.nodeType == "STAI")
  );
}

// Used for first node to find starting direction
function cardinalDirectionAfterNode(fromNode: Node, toNode: Node): string {
  const angle = absoluteAngleBetweenNodes(fromNode, toNode);
  const absAngle = Math.abs(angle);

  if (absAngle <= 45) return "east";
  else if (absAngle >= 135 && absAngle <= 180) return "west";
  else if (angle < -45 && angle > -135) return "north";
  else return "south";
}

// Generates a direction message for a node using the node after it
function createDirectionMessage(
  fromNode: Node,
  toNode: Node,
  nodeIndex: number,
  lastAngle: number,
): DirectionMessage {
  const direction: DirectionMessage = { type: 0, msg: "" };
  const angle = relativeAngleBetweenNodes(fromNode, toNode, lastAngle);
  const absAngle = Math.abs(angle);
  const straightAngle = 10; // Tolerance for angles that are considered straight

  // Generate message for stairs and elevators
  if (isFloorTransition(fromNode, toNode)) {
    if (fromNode.nodeType == "ELEV") {
      direction.type = DirectionType.Elevator;
    } else {
      direction.type = DirectionType.Stairs;
    }

    direction.msg =
      DirectionMessages.get(direction.type)! +
      " " +
      fromNode.shortName +
      " to floor " +
      toNode.floor;
    return direction;
  }

  // Determine direction type
  if (absAngle < straightAngle) {
    direction.type = DirectionType.Straight;
  } else {
    if (angle < 0) direction.type = DirectionType.Left;
    else direction.type = DirectionType.Right;

    if (absAngle <= 45)
      direction.type += 1; // slight angle
    else if (absAngle > 135) direction.type += 2; // hairpin angle
  }

  direction.msg = DirectionMessages.get(direction.type)!;

  // Generates directions with 'past' and 'at' keywords
  if (fromNode.nodeType != "HALL" && nodeIndex != 0) {
    if (direction.type == DirectionType.Straight) {
      direction.msg += " past " + fromNode.longName;
    } else {
      direction.msg += " at " + fromNode.longName;
    }
  }

  // Insert distance into message
  const distance = distanceBetweenNodes(fromNode, toNode);
  direction.msg += " and proceed for " + distance + "ft";
  return direction;
}

function relativeAngleBetweenNodes(
  from: Node,
  to: Node,
  lastAngle: number,
): number {
  const diff = absoluteAngleBetweenNodes(from, to) - lastAngle;
  if (diff < 0) return diff % -180;
  return diff % 180;
}

// Calculates an edge angle with respect to x-axis
//              -90
//               |
//               |
//   +-180 ------------- 0
//               |
//               |
//               90
function absoluteAngleBetweenNodes(from: Node, to: Node): number {
  const xDifference: number = to.xcoord - from.xcoord;
  const yDifference: number = to.ycoord - from.ycoord;

  return (Math.atan2(yDifference, xDifference) * 180) / Math.PI;
}

// Calculates the distance between two nodes
function distanceBetweenNodes(from: Node, to: Node): number {
  const xDifference: number = to.xcoord - from.xcoord;
  const yDifference: number = to.ycoord - from.ycoord;
  const dist = Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2));

  return Math.round(dist * PIXELS_TO_FEET);
}

// Calculate total trip time
function totalTripTimeMins(distance: number): string {
  return Math.ceil(distance / FT_PER_SEC / 60).toString();
}
