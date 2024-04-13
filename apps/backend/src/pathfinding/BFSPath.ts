import { Path } from "./Path.ts";
import { Graph } from "./Graph.ts";

export class BFSPath implements Path {
  startNodeID: string;
  endNodeID: string;
  parentGraph: Graph;
  path: string[];

  constructor(startNodeID: string, endNodeID: string, parentGraph: Graph) {
    this.startNodeID = startNodeID;
    this.endNodeID = endNodeID;
    this.parentGraph = parentGraph;
    this.path = this.createPath(startNodeID, endNodeID);
  }

  getPath(): string[] {
    return this.path;
  }

  //Returns the shortest path between startNode and endNode using a Breadth First Search
  public createPath(startNodeID: string, endNodeID: string): string[] {
    //the queue of nodes that still need to be searched
    const searchQueue: string[] = [startNodeID];
    //nodes already searched
    const visitedNodes: string[] = [];
    //organized as (node, parent node)
    const parentNodes: Map<string, string> = new Map();
    let searching: boolean = true;
    const path: string[] = [];

    //As long as there are nodes left to search and we haven't found the end node continue searching
    while (searchQueue.length > 0 && searching) {
      let nextNode = searchQueue.shift();
      //check if is final state
      if (nextNode == endNodeID) {
        //follow nodes from end to start using parents
        while (nextNode != startNodeID) {
          //add to front
          path.unshift(<string>nextNode);
          nextNode = parentNodes.get(<string>nextNode);
        }
        //add starting node to path
        path.unshift(startNodeID);
        console.log("BFS Path (" + startNodeID + " -> " + endNodeID + "):");
        searching = false;
      } else {
        //add this node to visited
        visitedNodes.push(<string>nextNode);
        //get all new nodes to add
        // @ts-except-error
        const nodesToAdd: string[] = this.parentGraph.getNeighborsIDs(
          <string>nextNode,
        );
        for (let i = 0; i < nodesToAdd.length; i++) {
          //if we haven't already visited the neighbor node, enqueue it into the search queue
          //and store the parent path in parentNodes
          if (!visitedNodes.includes(nodesToAdd[i])) {
            searchQueue.push(nodesToAdd[i]);
            parentNodes.set(nodesToAdd[i], <string>nextNode);
          }
        }
      }
    }

    //If no path found
    if (searching) {
      console.log("No BFS path found");
    }

    return path;
  }
}
