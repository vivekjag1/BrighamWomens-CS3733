import { Graph } from "./Graph.ts";

export interface Path {
  startNodeID: string;
  endNodeID: string;
  parentGraph: Graph;
  path: string[];
  getPath(): string[];
  createPath(startNodeID: string, endNodeID: string): string[];
}
