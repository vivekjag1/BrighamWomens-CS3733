import type { Node, Edge } from "database";
import { BFSPath } from "./BFSPath.ts";
import { DFSPath } from "./DFSPath.ts";
import { AStarPath } from "./AStarPath.ts";
import { DijkstraPath } from "./DijkstraPath.ts";
import { PathAlgorithm } from "common/src/Path.ts";

export class Graph {
  private nodeArray: Node[];
  private edgeArray: Edge[];
  private path: Node[];

  constructor(nodeInput: Node[], edgeInput: Edge[]) {
    this.nodeArray = nodeInput;
    this.edgeArray = edgeInput;
    this.path = [];
  }

  //Finds the Node object with the corresponding nodeID value
  public getNodeWithNodeID(nodeID: string): Node {
    return this.nodeArray.filter((value) => value.nodeID == nodeID)[0];
  }

  //Finds all neighbors of the given node
  public getNeighborsIDs(nodeID: string): string[] {
    const neighborIDs: string[] = [];
    for (const edge of this.edgeArray) {
      if (edge.startNodeID == nodeID) {
        neighborIDs.push(edge.endNodeID);
      } else if (edge.endNodeID == nodeID) {
        neighborIDs.push(edge.startNodeID);
      }
    }
    return neighborIDs;
  }

  //Returns the shortest path between startNode and endNode using the pathfinding algorithm given
  //Returns a blank array if there is no path or if the pathfinding algorithm given doesn't exist
  public getPath(
    startNodeID: string,
    endNodeID: string,
    pathAlgorithm: PathAlgorithm,
  ): Node[] {
    switch (pathAlgorithm) {
      case "BFS":
        this.path = new BFSPath(startNodeID, endNodeID, this).getPath();
        break;
      case "DFS":
        this.path = new DFSPath(startNodeID, endNodeID, this).getPath();
        break;
      case "Dijkstra":
        this.path = new DijkstraPath(startNodeID, endNodeID, this).getPath();
        break;
      default:
        this.path = new AStarPath(startNodeID, endNodeID, this).getPath();
        break;
    }
    return this.path;
  }

  static getNumFromFloor(floor: string): number {
    switch (floor) {
      case "L1":
        return -1;
      case "L2":
        return -2;
      default:
        return parseInt(floor);
    }
  }
}
