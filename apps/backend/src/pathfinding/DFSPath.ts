import { Path } from "./Path.ts";
import { Graph } from "./Graph.ts";
import { GraphNode } from "common/src/GraphNode.ts";

export class DFSPath implements Path {
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

  getPath(): GraphNode[] {
    return this.path;
  }

  //Returns the shortest path between startNode and endNode using a Breadth First Search
  public createPath(startNodeID: string, endNodeID: string): GraphNode[] {
    //the queue of nodes that still need to be searched
    const searchStack: string[] = [startNodeID];
    //nodes already searched
    const visitedNodes: string[] = [];
    //organized as (node, parent node)
    const parentNodes: Map<string, string> = new Map();
    let searching: boolean = true;
    const path: GraphNode[] = [];

    //As long as there are nodes left to search and we haven't found the end node continue searching
    while (searchStack.length > 0 && searching) {
      let nextNode = searchStack.pop();
      //check if is final state
      if (nextNode == endNodeID) {
        //follow nodes from end to start using parents
        while (nextNode != startNodeID) {
          //add to front
          if (
            this.parentGraph.getNodeWithNodeID(nextNode!).nodeType == "ELEV"
          ) {
            path.unshift(this.parentGraph.getNodeWithNodeID(nextNode!));
            nextNode = this.getEndOfElevators(nextNode!, parentNodes);
          }
          path.unshift(this.parentGraph.getNodeWithNodeID(nextNode!));
          nextNode = parentNodes.get(<string>nextNode);
        }
        //add starting node to path
        path.unshift(this.parentGraph.getNodeWithNodeID(startNodeID!));
        console.log("DFS Path (" + startNodeID + " -> " + endNodeID + "):");
        console.log(path);
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
            searchStack.push(nodesToAdd[i]);
            parentNodes.set(nodesToAdd[i], <string>nextNode);
          }
        }
      }
    }

    //If no path found
    if (searching) {
      console.log("No DFS path found");
    }

    return path;
  }

  public getEndOfElevators(
    nextNode: string,
    parentsMap: Map<string, string>,
  ): string {
    const nextNodeParent = parentsMap.get(nextNode)!;
    if (this.parentGraph.getNodeWithNodeID(nextNodeParent).nodeType != "ELEV") {
      return nextNode;
    }
    return this.getEndOfElevators(nextNodeParent, parentsMap);
  }
}
