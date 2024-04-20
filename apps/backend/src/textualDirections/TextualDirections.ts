import { GraphNode } from "common/src/GraphNode.ts";
import { Direction } from "./Direction.ts";
import { TextualDirection } from "./TextualDirection.ts";

const PIXELS_TO_FEET: number = 0.347;

// Utility class used for the purposes of generating textual directions given a collection of nodes representing a path
export class TextualDirections {
  static getTextualDirections(nodes: GraphNode[]): TextualDirection[] {
    // Default starting instructions
    const textualDirections: TextualDirection[] = [];
    let newInstruction = "Starting at " + nodes[0].longName + ", face north.";
    textualDirections.push({
      instruction: newInstruction,
      distance: 0,
      floor: nodes[0].floor,
    });

    // Generate instructions to navigate each segment of the path
    let currentOrientation: Direction = Direction.North;
    const clusters: GraphNode[][] = TextualDirections.cluster(nodes);
    for (let i = 0, length = clusters.length; i < length; i++) {
      const currentManeuver = TextualDirections.determineManeuver(
        clusters[i][0],
        clusters[i][1],
        currentOrientation,
      );
      if (clusters[i].length > 2) {
        newInstruction =
          currentManeuver === "Proceed straight"
            ? currentManeuver + " down the corridor."
            : currentManeuver + " proceed down the corridor.";
        textualDirections.push({
          instruction: newInstruction,
          distance: TextualDirections.calculateDistance(
            clusters[i][0],
            clusters[i][clusters[i].length - 1],
          ),
          floor: clusters[i][0].floor,
        });
      } else {
        if (
          TextualDirections.needFloorTransition(clusters[i][0], clusters[i][1])
        ) {
          textualDirections.push({
            instruction:
              "Take " +
              clusters[i][0].longName +
              " to " +
              clusters[i][1].floor +
              ".",
            distance: 0,
            floor: clusters[i][0].floor,
          });
          textualDirections.push({
            instruction: "Exit " + clusters[i][1].longName + ", facing north.",
            distance: 0,
            floor: clusters[i][1].floor,
          });
          currentOrientation = Direction.North;
          continue;
        }
        newInstruction =
          currentManeuver === "Proceed straight"
            ? currentManeuver + " down the corridor."
            : currentManeuver + " and continue straight.";
        textualDirections.push({
          instruction: newInstruction,
          distance: TextualDirections.calculateDistance(
            clusters[i][0],
            clusters[i][1],
          ),
          floor: clusters[i][0].floor,
        });
      }
      currentOrientation = TextualDirections.updateOrientation(
        currentOrientation,
        currentManeuver,
      );
    }
    newInstruction = "Arrived at " + nodes[nodes.length - 1].longName;
    textualDirections.push({
      instruction: newInstruction,
      distance: 0,
      floor: nodes[nodes.length - 1].floor,
    });
    return textualDirections;
  }

  // Organizes array of nodes into clusters, whereby each cluster represent nodes along the same segment
  static cluster(nodes: GraphNode[]): GraphNode[][] {
    const clusters: GraphNode[][] = [];
    let previousEdgeDirection: string = "";
    for (let i = 0, length = nodes.length; i < length - 1; i++) {
      const currentNode = nodes[i],
        nextNode = nodes[i + 1];
      const currentEdgeDirection: string = TextualDirections.determineDirection(
        currentNode,
        nextNode,
      );
      if (
        (currentNode.nodeType == "ELEV" && nextNode.nodeType == "ELEV") ||
        (currentNode.nodeType == "STAI" && currentNode.nodeType == "STAI")
      ) {
        clusters.push([currentNode, nextNode]);
      } else if (previousEdgeDirection === currentEdgeDirection) {
        clusters[clusters.length - 1].push(nextNode);
      } else {
        clusters.push([currentNode, nextNode]);
      }
      previousEdgeDirection = currentEdgeDirection;
    }
    return clusters;
  }

  // Determine whether a floor transition is needed, given two nodes
  static needFloorTransition(from: GraphNode, to: GraphNode): boolean {
    return (
      (from.nodeType == "ELEV" && to.nodeType == "ELEV") ||
      (from.nodeType == "STAI" && to.nodeType == "STAI")
    );
  }

  // Updates the orientation of a person after a person performs a maneuver
  static updateOrientation(
    orientation: Direction,
    maneuver: string,
  ): Direction {
    switch (orientation) {
      case "north":
        if (maneuver === "Turn right") {
          return Direction.East;
        } else if (maneuver === "Turn left") {
          return Direction.West;
        } else if (maneuver === "Turn around and head straight") {
          return Direction.South;
        } else return Direction.North;
      case "east":
        if (maneuver === "Turn right") {
          return Direction.South;
        } else if (maneuver === "Turn left") {
          return Direction.North;
        } else if (maneuver === "Turn around and head straight") {
          return Direction.West;
        } else return Direction.East;
      case "south":
        if (maneuver === "Turn right") {
          return Direction.West;
        } else if (maneuver === "Turn left") {
          return Direction.East;
        } else if (maneuver === "Turn around and head straight") {
          return Direction.North;
        } else return Direction.South;
      case "west":
        if (maneuver === "Turn right") {
          return Direction.North;
        } else if (maneuver === "Turn left") {
          return Direction.South;
        } else if (maneuver === "Turn around and head straight") {
          return Direction.East;
        } else return Direction.West;
      default:
        return Direction.North;
    }
  }

  // Determines what type of turn a person would need to make to navigate from one node to another
  static determineManeuver(
    from: GraphNode,
    to: GraphNode,
    orientation: Direction,
  ): string {
    const angle = TextualDirections.calculateAngleDegrees(from, to);
    switch (orientation) {
      case "north":
        if (angle > -90 && angle < 90) return "Turn right";
        else if ((angle < -90 && angle >= -180) || (angle > 90 && angle <= 180))
          return "Turn left";
        else if (angle === -90) return "Proceed straight";
        else return "Turn around and head straight";
      case "east":
        if (angle > 0 && angle < 180) return "Turn right";
        else if (angle < 0 && angle > -180) return "Turn left";
        else if (angle === 0) return "Proceed straight";
        else return "Turn around and head straight";
      case "south":
        if ((angle < -90 && angle >= -180) || (angle > 90 && angle <= 180))
          return "Turn right";
        else if (angle < 90 && angle > -90) return "Turn left";
        else if (angle === 90) return "Proceed straight";
        else return "Turn around and head straight";
      case "west":
        if (angle < 0 && angle > -180) return "Turn right";
        else if (angle > 0 && angle < 180) return "Turn left";
        else if (angle === 180 || angle === -180) return "Proceed straight";
        else return "Turn around and head straight";
      default:
        return "-1";
    }
  }

  // Determines the direction of a node relative to another
  static determineDirection(from: GraphNode, to: GraphNode): string {
    const angle = TextualDirections.calculateAngleDegrees(from, to);
    if (angle > -45 && angle < 45) return "Right";
    else if ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))
      return "Left";
    else if (angle < -45 && angle > -135) return "Up";
    else return "Down";
  }

  // Calculates the angle between an edge and the x-axis
  static calculateAngleDegrees(from: GraphNode, to: GraphNode): number {
    const xDifference: number = parseInt(to.xcoord) - parseInt(from.xcoord);
    const yDifference: number = parseInt(to.ycoord) - parseInt(from.ycoord);
    return (Math.atan2(yDifference, xDifference) * 180) / Math.PI;
  }

  // Calculates the distance between two nodes
  static calculateDistance(from: GraphNode, to: GraphNode): number {
    const xDifference: number = parseInt(to.xcoord) - parseInt(from.xcoord);
    const yDifference: number = parseInt(to.ycoord) - parseInt(from.ycoord);
    const euclideanDistance = Math.sqrt(
      Math.pow(xDifference, 2) + Math.pow(yDifference, 2),
    );
    return Math.round(euclideanDistance * PIXELS_TO_FEET);
  }
}
