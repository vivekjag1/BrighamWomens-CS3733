import { Graph } from "./Graph.ts";
import type { Node } from "database";

export interface Path {
  startNodeID: string;
  endNodeID: string;
  parentGraph: Graph;
  path: Node[];
  getPath(): Node[];
  createPath(startNodeID: string, endNodeID: string): Node[];
}
