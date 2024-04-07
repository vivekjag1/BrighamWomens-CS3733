export class GraphEdge {
  readonly edgeID: string;
  readonly startNodeID: string;
  readonly endNodeID: string;

  constructor(edgeID: string, startNode: string, endNode: string) {
    this.edgeID = edgeID;
    this.startNodeID = startNode;
    this.endNodeID = endNode;
  }
}
//
