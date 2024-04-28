import { Path } from "./Path.ts";
import { Graph } from "./Graph.ts";
import type { Node } from "database";
import { ComplexPath } from "./ComplexPath.ts";

export class DijkstraPath extends ComplexPath implements Path {
  startNodeID: string;
  endNodeID: string;
  parentGraph: Graph;
  path: Node[];

  constructor(startNodeID: string, endNodeID: string, parentGraph: Graph) {
    super(startNodeID, endNodeID, parentGraph);
    this.startNodeID = startNodeID;
    this.endNodeID = endNodeID;
    this.parentGraph = parentGraph;
    this.path = this.createPath(startNodeID, endNodeID);
  }

  public createPath(startNodeID: string, endNodeID: string): Node[] {
    const visited: string[] = [];
    const distanceMap: Map<string, number> = new Map<string, number>();
    distanceMap.set(startNodeID, 0);
    const parentsMap: Map<string, Node> = new Map<string, Node>();
    let toVisit: Node[] = [this.parentGraph.getNodeWithNodeID(startNodeID)];
    let searching = true;
    const path: Node[] = [];
    if (startNodeID == endNodeID) {
      return [
        this.parentGraph.getNodeWithNodeID(startNodeID),
        this.parentGraph.getNodeWithNodeID(startNodeID),
      ];
    }

    while (toVisit.length > 0 && searching) {
      const currentNode: Node = this.getSmallestDistance(toVisit, distanceMap);
      toVisit = toVisit.filter((value) => value != currentNode);
      if (currentNode.nodeID == endNodeID) {
        searching = false;
        let nextNodeInPath = currentNode;
        while (parentsMap.get(nextNodeInPath.nodeID)) {
          path.unshift(nextNodeInPath);
          nextNodeInPath = parentsMap.get(nextNodeInPath.nodeID)!;
        }
        path.unshift(nextNodeInPath);
      } else {
        const currentNodeDistance = distanceMap.get(currentNode.nodeID);

        const currentNodeNeighbors = this.parentGraph.getNeighborsIDs(
          currentNode.nodeID,
        );
        const currentNodeNeighborsNotVisited = currentNodeNeighbors.filter(
          (value) => visited.indexOf(value) == -1,
        );

        for (let i = 0; i < currentNodeNeighborsNotVisited.length; i++) {
          const neighborNode = currentNodeNeighborsNotVisited[i];
          const neighborDistance =
            currentNodeDistance! +
            this.distanceBetweenNodes(currentNode.nodeID, neighborNode);
          if (
            !distanceMap.has(neighborNode) ||
            neighborDistance < distanceMap.get(neighborNode)!
          ) {
            toVisit.push(this.parentGraph.getNodeWithNodeID(neighborNode));
            parentsMap.set(neighborNode, currentNode);
            distanceMap.set(neighborNode, neighborDistance);
          }
        }

        visited.push(currentNode.nodeID);
      }
    }

    return path;
  }

  public getSmallestDistance(
    input: Node[],
    distanceInput: Map<string, number>,
  ): Node {
    let smallestNode: Node | null = null;
    let smallestDistance: number = Math.max();

    for (let i = 0; i < input.length; i++) {
      if (smallestNode == null) {
        smallestNode = input[i];
        smallestDistance = distanceInput.get(smallestNode.nodeID)!;
      }
      const next = input[i];
      const nextDistance = distanceInput.get(next.nodeID)!;
      if (nextDistance < smallestDistance) {
        smallestDistance = nextDistance;
        smallestNode = next;
      }
    }

    return smallestNode!;
  }
}
