export interface Path {
  getPath(): string[];
  createPath(startNodeID: string, endNodeID: string): string[];
}
