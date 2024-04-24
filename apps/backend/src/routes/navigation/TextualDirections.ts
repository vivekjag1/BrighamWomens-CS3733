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
const emptyDirectionList: Directions = { directions: [], floor: "" };

export class DirectionCreator {
  nodes: Node[];
  nodesLength: number;
  nodeIndex: number;
  private directionListIndex: number;

  constructor(nodes: Node[]) {
    this.nodes = nodes;
    this.nodesLength = nodes.length;
    this.nodeIndex = 0;
    this.directionListIndex = 0;
  }

  // Returns textual directions given a list of nodes
  public getDirections(): Directions[] {
    // Default starting instructions
    const outputDirections: Directions[] = [emptyDirectionList];
    this.directionListIndex = 0;

    // Set first floor bucket to first node's floor
    outputDirections[this.directionListIndex].floor = this.nodes[0].floor;

    // Initial angle
    let lastAngle = this.absoluteAngleBetweenNodes(
      this.nodes[0],
      this.nodes[1],
    );

    outputDirections[this.directionListIndex].directions.push({
      type: DirectionType.Start,
      msg:
        "Start at " +
        this.nodes[0].longName +
        ", facing " +
        this.cardinalDirectionAfterNode(this.nodes, 0),
    });

    for (let i = 0; i < this.nodesLength - 1; i++) {
      outputDirections[this.directionListIndex].directions.push(
        this.createDirectionMessage(this.nodes, i, lastAngle),
      );
      lastAngle = this.absoluteAngleBetweenNodes(
        this.nodes[i],
        this.nodes[i + 1],
      );

      // If there is a floor transition, advance output to group directions to the next bucket of directions for that floor
      if (this.isFloorTransition(this.nodes[i], this.nodes[i + 1])) {
        outputDirections[++this.directionListIndex] = emptyDirectionList; // create new output direction list
        outputDirections[this.directionListIndex].floor =
          this.nodes[i + 1].floor; // set it's floor
      }
    }

    outputDirections[this.directionListIndex].directions.push({
      type: DirectionType.End,
      msg: "Arrived at " + this.nodes[this.nodesLength - 1].longName,
    });

    outputDirections.forEach((dir) => {
      console.log("FLOOR: " + dir.floor);
      dir.directions.forEach((d, i) => {
        console.log("\t" + i + ". " + d.msg);
      });
    });

    return outputDirections;
  }

  // Return relevant trip stats for a path
  public getTripStats(): TripStat[] {
    let tripDistance = 0;
    for (let i = 0; i < this.nodesLength - 1; i++) {
      tripDistance += this.distanceBetweenNodes(
        this.nodes[i],
        this.nodes[i + 1],
      );
    }

    const tripTime = this.totalTripTimeMins(tripDistance);

    return [
      { stat: tripTime, unit: StatUnit.Mins },
      { stat: "", unit: StatUnit.Arrival }, // populated by frontend based on user time
      { stat: tripDistance.toString(), unit: StatUnit.Distance },
    ];
  }

  // Determine whether a floor transition is needed, given two nodes
  private isFloorTransition(from: Node, to: Node): boolean {
    return (
      (from.nodeType == "ELEV" && to.nodeType == "ELEV") ||
      (from.nodeType == "STAI" && to.nodeType == "STAI")
    );
  }

  // Used for first node to find starting direction
  private cardinalDirectionAfterNode(nodes: Node[], i: number): string {
    const angle = this.absoluteAngleBetweenNodes(nodes[i], nodes[i + 1]);
    const absAngle = Math.abs(angle);

    if (absAngle <= 45) return "east";
    else if (absAngle >= 135 && absAngle <= 180) return "west";
    else if (angle < -45 && angle > -135) return "north";
    else return "south";
  }

  // Generates a direction message for a node using the node after it
  private createDirectionMessage(
    nodes: Node[],
    nodeIndex: number,
    lastAngle: number,
  ): DirectionMessage {
    const direction: DirectionMessage = { type: 0, msg: "" };
    const angle = this.relativeAngleBetweenNodes(
      nodes[nodeIndex],
      nodes[nodeIndex + 1],
      lastAngle,
    );
    const absAngle = Math.abs(angle);
    const straightAngle = 8; // Tolerance for angles that are considered straight

    console.log(
      "angle: " +
        this.absoluteAngleBetweenNodes(nodes[nodeIndex], nodes[nodeIndex + 1]) +
        " anglediff: " +
        angle,
    );

    // Generate message for stairs and elevators
    if (this.isFloorTransition(nodes[nodeIndex], nodes[nodeIndex + 1])) {
      if (nodes[nodeIndex].nodeType == "ELEV") {
        direction.type = DirectionType.Elevator;
      } else {
        direction.type = DirectionType.Stairs;
      }

      direction.msg =
        DirectionMessages.get(direction.type)! +
        " " +
        nodes[nodeIndex].shortName +
        " to floor " +
        nodes[nodeIndex + 1].floor;
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
    if (nodes[nodeIndex].nodeType != "HALL" && nodeIndex != 0) {
      if (direction.type == DirectionType.Straight) {
        direction.msg += " past " + nodes[nodeIndex].longName;
      } else {
        direction.msg += " at " + nodes[nodeIndex].longName;
      }
    }

    // Insert distance into message
    const distance = this.distanceBetweenNodes(
      nodes[nodeIndex],
      nodes[nodeIndex + 1],
    );
    direction.msg += " and proceed for " + distance + "ft.";
    return direction;
  }

  private relativeAngleBetweenNodes(
    from: Node,
    to: Node,
    lastAngle: number,
  ): number {
    const diff = this.absoluteAngleBetweenNodes(from, to) - lastAngle;
    if (diff < 0) return diff % 180;
    return diff % -180;
  }

  // Calculates an edge angle with respect to x-axis
  //              -90
  //               |
  //               |
  //   +-180 ------------- 0
  //               |
  //               |
  //               90
  private absoluteAngleBetweenNodes(from: Node, to: Node): number {
    const xDifference: number = to.xcoord - from.xcoord;
    const yDifference: number = to.ycoord - from.ycoord;

    return (Math.atan2(yDifference, xDifference) * 180) / Math.PI;
  }

  // Calculates the distance between two nodes
  private distanceBetweenNodes(from: Node, to: Node): number {
    const xDifference: number = to.xcoord - from.xcoord;
    const yDifference: number = to.ycoord - from.ycoord;
    const dist = Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2));

    return Math.round(dist * PIXELS_TO_FEET);
  }

  // Calculate total trip time
  private totalTripTimeMins(distance: number): string {
    return Math.ceil(distance / FT_PER_SEC / 60).toString();
  }
}
