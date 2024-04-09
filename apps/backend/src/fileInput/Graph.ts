import { GraphNode } from "./GraphNode.ts";
import { GraphEdge } from "./GraphEdge.ts";
import type { Node, Edge } from "database";
//import {Simulate} from "react-dom/test-utils";
//import close = Simulate.close;

export enum PathAlgorithm {
  AStar,
  BFS,
  DFS,
}

export class Graph {
  private nodeArray: GraphNode[];
  private edgeArray: GraphEdge[];

  constructor(nodeInput: Node[], edgeInput: Edge[]) {
    this.nodeArray = Graph.createNodes(nodeInput);
    this.edgeArray = this.createEdges(edgeInput);
  }

  //Converts the Node objects given from the prisma database
  // into GraphNode objects
  public static createNodes(input: Node[]): GraphNode[] {
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

  //Converts the Edge objects given from the prisma database
  // into GraphEdge objects
  public createEdges(input: Edge[]): GraphEdge[] {
    const output: GraphEdge[] = [];

    for (const value of input) {
      output.push(
        new GraphEdge(value.edgeID, value.startNodeID, value.endNodeID),
      );
    }

    return output;
  }
  //Finds the GraphNode object with the corresponding nodeID value
  public getNodeWithNodeID(nodeID: string): GraphNode {
    return this.nodeArray.filter((value) => value.nodeID == nodeID)[0];
  }

  //Finds all neighbors of the given node
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

  //Returns the shortest path between startNode and endNode using the pathfinding algorithm given
  //Returns a blank array if there is no path or if the pathfinding algorithm given doesn't exist
  public getPath(
    startNodeID: string,
    endNodeID: string,
    pathAlgorithm: PathAlgorithm,
  ): string[] {
    switch (pathAlgorithm) {
      case PathAlgorithm.BFS:
        return this.getPathBFS(startNodeID, endNodeID);

      default:
        return this.getPathAStar(startNodeID, endNodeID);
    }
  }

  //Returns the shortest path between startNode and endNode using a Breadth First Search
  public getPathBFS(startNodeID: string, endNodeID: string): string[] {
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
        const nodesToAdd: string[] = this.getNeighborsIDs(<string>nextNode);
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

  //Returns the shortest path between startNode and endNode using the A* algorithm
  public getPathAStar(startNodeID: string, endNodeID: string): string[] {
    const path: string[] = [];
    const searchList: AStarNode[] = [new AStarNode(startNodeID, null, 0, 0)];
    let numOfOpenNodes: number = 1;
    let searching: boolean = true;

    if (startNodeID == endNodeID) {
      return ["startNodeID", "startNodeID"];
    }

    while (searching && numOfOpenNodes > 0) {
      //Pop next node with the smallest F value
      let currentNode = this.getSmallestF(searchList);

      //get children of currentNode
      const currentNodeNeighbors: string[] = this.getNeighborsIDs(
        currentNode.nodeID,
      );

      //check each child
      for (let i = 0; i < currentNodeNeighbors.length; i++) {
        const nextToCheck = currentNodeNeighbors[i];
        //If this child is the end node
        if (nextToCheck == endNodeID) {
          //exit loop
          searching = false;
          //add this child to path
          path.unshift(nextToCheck);
          //Create loop to move back to start of path
          let steppingPath = true;
          while (steppingPath) {
            path.unshift(currentNode.nodeID);
            //if parentNode == null then we have returned to the start node so break out of the loop
            if (currentNode.parentNode == null) {
              steppingPath = false;
            } else {
              currentNode = currentNode.parentNode;
            }
          }

          console.log("A* Path (" + startNodeID + " -> " + endNodeID + "):");
        } else {
          //get G, H, and F values of the child node
          const g: number =
            currentNode.g +
            this.squaredDistanceBetweenNodes(nextToCheck, currentNode.nodeID);
          const h: number = this.squaredDistanceBetweenNodes(
            nextToCheck,
            endNodeID,
          );
          const f = g + h;

          //check if path should be skipped
          let skipThisPath: boolean = false;
          //if same node is in open list with a smaller f, skip
          for (let i = 0; i < searchList.length; i++) {
            if (searchList[i].nodeID == nextToCheck && searchList[i].f < f) {
              skipThisPath = true;
              i = searchList.length;
            }
          }

          if (!skipThisPath) {
            searchList.push(new AStarNode(nextToCheck, currentNode, g, h));
            numOfOpenNodes += 1;
          }
        }
      }

      searchList[searchList.indexOf(currentNode)].open = false;
      numOfOpenNodes -= 1;
    }

    if (searching) {
      console.log("No A* path found");
    }
    return path;
  }

  public squaredDistanceBetweenNodes(a: string, b: string): number {
    const nodeA: GraphNode = this.getNodeWithNodeID(a);
    const nodeB: GraphNode = this.getNodeWithNodeID(b);
    if (nodeA.nodeType == "ELEV" && nodeB.nodeType == "ELEV") {
      return 10;
    }
    return (
      Math.pow(nodeB._xcoord - nodeA._xcoord, 2) +
      Math.pow(nodeB._ycoord - nodeA._ycoord, 2)
    );
  }

  public getSmallestF(input: AStarNode[]): AStarNode {
    let smallestNode: AStarNode | null = null;
    let smallestF: number = Math.max();

    for (let i = 0; i < input.length; i++) {
      if (input[i].open) {
        if (smallestNode == null) {
          smallestNode = input[i];
          smallestF = smallestNode.f;
        }
        const next = input[i];
        if (next.f < smallestF) {
          smallestF = next.f;
          smallestNode = next;
        }
      }
    }

    return smallestNode!;
  }

  static getNumFromFloor(floor: string): number {
    switch (floor) {
      case "L1":
        return -1;
      case "L2":
        return -2;
      default:
        return parseInt(floor);
    }
  }
}

class AStarNode {
  public g: number;
  public h: number;
  public f: number;
  public nodeID: string;
  public parentNode: AStarNode | null = null;
  public open: boolean;

  constructor(
    nodeID: string,
    parentNode: AStarNode | null,
    g: number,
    h: number,
  ) {
    this.nodeID = nodeID;
    this.parentNode = parentNode;
    this.g = g;
    this.h = h;
    this.f = g + h;
    this.open = true;
  }
}
