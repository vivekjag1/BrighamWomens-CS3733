import { Graph } from "./Graph.ts";
import { GraphNode } from "common/src/GraphNode.ts";

export interface Path {
  startNodeID: string;
  endNodeID: string;
  parentGraph: Graph;
  path: GraphNode[];
  getPath(): GraphNode[];
  createPath(startNodeID: string, endNodeID: string): GraphNode[];
}
