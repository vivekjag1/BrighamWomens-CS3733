import { GraphNode } from "./GraphNode.ts";
import { GraphEdge } from "./GraphEdge.ts";

export class Graph {
  private nodeArray: GraphNode[];
  private edgeArray: GraphEdge[];

  constructor(nodeArray: GraphNode[], edgeArray: GraphEdge[]) {
    this.nodeArray = nodeArray;
    this.edgeArray = edgeArray;
  }

  public getNodeWithNodeID(nodeID: string): GraphNode {
    return this.nodeArray.filter((value) => value.nodeID == nodeID)[0];
  }

  public getNeighborsIDs(nodeID: string): string[] {
    const neighborIDs: string[] = [];
    for (const edge of this.edgeArray) {
      if (edge.startNodeID == nodeID) {
        neighborIDs.push(edge.endNodeID);
      } else if (edge.endNodeID == nodeID) {
        neighborIDs.push(edge.startNodeID);
      }
    }
    return neighborIDs;
  }

  public getPathAsCoords(startNodeID: string, endNodeID: string): number[][] {
    //nodes to search
    const searchQueue: string[] = [startNodeID];
    //nodes already searched
    const visitedNodes: string[] = [];
    //organized as (node, parent node)
    const parentNodes: Map<string, string> = new Map();
    let searching: boolean = true;
    const pathAsCoords: number[][] = [];

    while (searchQueue.length > 0 && searching) {
      let nextNode = searchQueue.shift();
      //check if is final state
      if (nextNode == endNodeID) {
        const path: string[] = [];
        //follow nodes from end to start using parents
        while (nextNode != startNodeID) {
          //add to front
          path.unshift(<string>nextNode);
          nextNode = parentNodes.get(<string>nextNode);
        }
        //add starting node to path
        path.unshift(startNodeID);
        console.log("Path (" + startNodeID + " -> " + endNodeID + "):");
        for (let i = 0; i < path.length; i++) {
          console.log(path[i]);
          const currentPathNode: GraphNode = this.getNodeWithNodeID(path[i]);
          pathAsCoords.push([
            parseInt(currentPathNode.xcoord),
            parseInt(currentPathNode.ycoord),
          ]);
        }
        //exit loop
        searching = false;
      } else {
        //add this node to visited
        visitedNodes.push(<string>nextNode);
        //get all new nodes to add
        // @ts-except-error
        const nodesToAdd: string[] = this.getNeighborsIDs(<string>nextNode);
        for (let i = 0; i < nodesToAdd.length; i++) {
          if (!visitedNodes.includes(nodesToAdd[i])) {
            searchQueue.push(nodesToAdd[i]);
            parentNodes.set(nodesToAdd[i], <string>nextNode);
          }
        }
      }
    }

    if (searching) {
      console.log("No path found");
      pathAsCoords.push([-1, -1]);
    }

    return pathAsCoords;
  }
}
