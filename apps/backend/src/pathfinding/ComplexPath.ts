import { Path } from "./Path.ts";
import { Graph } from "./Graph.ts";
import { Node } from "database";

export abstract class ComplexPath implements Path {
  startNodeID: string;
  endNodeID: string;
  parentGraph: Graph;
  path: Node[];

  constructor(startNodeID: string, endNodeID: string, parentGraph: Graph) {
    this.startNodeID = startNodeID;
    this.endNodeID = endNodeID;
    this.parentGraph = parentGraph;
    this.path = this.createPath(startNodeID, endNodeID);
  }

  getPath(): Node[] {
    return this.path;
  }

  createPath(startNodeID: string, endNodeID: string): Node[] {
    return [
      this.parentGraph.getNodeWithNodeID(startNodeID),
      this.parentGraph.getNodeWithNodeID(endNodeID),
    ];
  }

  distanceBetweenNodes(a: string, b: string): number {
    const nodeA: Node = this.parentGraph.getNodeWithNodeID(a);
    const nodeB: Node = this.parentGraph.getNodeWithNodeID(b);
    if (nodeA.nodeType == "ELEV" && nodeB.nodeType == "ELEV") {
      return 1000;
    }
    if (nodeA.nodeType == "STAI" && nodeB.nodeType == "STAI") {
      return 2000;
    }
    return Math.sqrt(
      Math.pow(+nodeB.xcoord - +nodeA.xcoord, 2) +
        Math.pow(+nodeB.ycoord - +nodeA.ycoord, 2),
    );
  }
}
