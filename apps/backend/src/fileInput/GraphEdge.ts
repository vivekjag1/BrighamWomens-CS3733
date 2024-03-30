export class GraphEdge {
  readonly edgeID: number;
  readonly startNodeID: string;
  readonly endNodeID: string;

  constructor(edgeID: number, startNode: string, endNode: string) {
    this.edgeID = edgeID;
    this.startNodeID = startNode;
    this.endNodeID = endNode;
  }
}
//
