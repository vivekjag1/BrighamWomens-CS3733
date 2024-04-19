import { GraphNode } from "common/src/GraphNode.ts";
import { GraphEdge } from "common/src/GraphEdge.ts";
import type { Node, Edge } from "database";
import { createNodes } from "common/src/GraphCommon.ts";
import { BFSPath } from "./BFSPath.ts";
import { DFSPath } from "./DFSPath.ts";
import { AStarPath } from "./AStarPath.ts";
import { DijkstraPath } from "./DijkstraPath.ts";
import { PathAlgorithm } from "common/src/Path.ts";

export class Graph {
  private nodeArray: GraphNode[];
  private edgeArray: GraphEdge[];
  private path: GraphNode[];

  constructor(nodeInput: Node[], edgeInput: Edge[]) {
    this.nodeArray = createNodes(nodeInput);
    this.edgeArray = this.createEdges(edgeInput);
    this.path = [];
  }

  //Converts the Edge objects given from the prisma database
  // into GraphEdge objects
  public createEdges(input: Edge[]): GraphEdge[] {
    const output: GraphEdge[] = [];

    for (const value of input) {
      output.push(
        new GraphEdge(value.edgeID, value.startNodeID, value.endNodeID),
      );
    }

    return output;
  }
  //Finds the GraphNode object with the corresponding nodeID value
  public getNodeWithNodeID(nodeID: string): GraphNode {
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
  ): GraphNode[] {
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

  public getTextualPath() {
    if (this.path.length == 0) {
      return ["No Path Set"];
    }
    const textualPath: string[] = [];

    return textualPath;
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
