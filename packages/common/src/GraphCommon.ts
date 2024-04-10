import { GraphNode } from "./GraphNode.ts";
import type { Node } from "../../database";

//Converts the Node objects given from the prisma database
// into GraphNode objects
export function createNodes(input: Node[]): GraphNode[] {
  const output: GraphNode[] = [];

  for (const value of input) {
    output.push(
      new GraphNode(
        value.nodeID,
        value.xcoord,
        value.ycoord,
        value.floor,
        value.building,
        value.nodeType,
        value.longName,
        value.shortName,
      ),
    );
  }

  return output;
}
