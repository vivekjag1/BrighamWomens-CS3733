import { Path } from "./Path.ts";
import { Graph } from "./Graph.ts";
import { GraphNode } from "common/src/GraphNode.ts";

export class DijkstraPath implements Path {
  startNodeID: string;
  endNodeID: string;
  parentGraph: Graph;
  path: GraphNode[];

  constructor(startNodeID: string, endNodeID: string, parentGraph: Graph) {
    this.startNodeID = startNodeID;
    this.endNodeID = endNodeID;
    this.parentGraph = parentGraph;
    this.path = this.createPath(startNodeID, endNodeID);
  }

  public getPath() {
    return this.path;
  }

  public createPath(startNodeID: string, endNodeID: string): GraphNode[] {
    const visited: string[] = [];
    const distanceMap: Map<string, number> = new Map<string, number>();
    distanceMap.set(startNodeID, 0);
    const parentsMap: Map<string, GraphNode> = new Map<string, GraphNode>();
    let toVisit: GraphNode[] = [
      this.parentGraph.getNodeWithNodeID(startNodeID),
    ];
    let searching = true;
    const path: GraphNode[] = [];
    if (startNodeID == endNodeID) {
      return [
        this.parentGraph.getNodeWithNodeID(startNodeID),
        this.parentGraph.getNodeWithNodeID(startNodeID),
      ];
    }

    while (toVisit.length > 0 && searching) {
      const currentNode: GraphNode = this.getSmallestDistance(
        toVisit,
        distanceMap,
      );
      toVisit = toVisit.filter((value) => value != currentNode);
      if (currentNode.nodeID == endNodeID) {
        searching = false;
        let nextNodeInPath = currentNode;
        while (parentsMap.get(nextNodeInPath.nodeID)) {
          path.unshift(nextNodeInPath);
          nextNodeInPath = parentsMap.get(nextNodeInPath.nodeID)!;
        }
        console.log("Djikstra (" + startNodeID + " -> " + endNodeID + "):");
        console.log(path);
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
    input: GraphNode[],
    distanceInput: Map<string, number>,
  ): GraphNode {
    let smallestNode: GraphNode | null = null;
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

  public distanceBetweenNodes(a: string, b: string): number {
    const nodeA: GraphNode = this.parentGraph.getNodeWithNodeID(a);
    const nodeB: GraphNode = this.parentGraph.getNodeWithNodeID(b);
    if (nodeA.nodeType == "ELEV" && nodeB.nodeType == "ELEV") {
      return 1000;
    }
    if (nodeA.nodeType == "STAI" && nodeB.nodeType == "STAI") {
      return 2000;
    }
    return Math.sqrt(
      Math.pow(nodeB._xcoord - nodeA._xcoord, 2) +
        Math.pow(nodeB._ycoord - nodeA._ycoord, 2),
    );
  }
}
