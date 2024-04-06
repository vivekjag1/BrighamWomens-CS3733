import { GraphNode } from "./GraphNode.ts";
import { GraphEdge } from "./GraphEdge.ts";
import type { Node, Edge } from "database";
//import {Simulate} from "react-dom/test-utils";
//import close = Simulate.close;

export class Graph {
  private nodeArray: GraphNode[];
  private edgeArray: GraphEdge[];

  constructor(nodeInput: Node[], edgeInput: Edge[]) {
    this.nodeArray = this.createNodes(nodeInput);
    this.edgeArray = this.createEdges(edgeInput);
  }

  public createNodes(input: Node[]): GraphNode[] {
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

  public createEdges(input: Edge[]): GraphEdge[] {
    const output: GraphEdge[] = [];

    for (const value of input) {
      output.push(
        new GraphEdge(value.edgeID, value.startNodeID, value.endNodeID),
      );
    }

    return output;
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

  public getPath(
    startNodeID: string,
    endNodeID: string,
    pathfindingType: string,
  ): number[][] {
    switch (pathfindingType) {
      case "BFS":
        console.log(this.getPathAsCoordsBFS(startNodeID, endNodeID));
        return this.getPathAsCoordsBFS(startNodeID, endNodeID);

      case "A*":
        return this.getPathAsCoordsAStar(startNodeID, endNodeID);

      default:
        return [[-1, -1]];
    }
  }

  public getPathAsCoordsBFS(startNodeID: string, endNodeID: string) {
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
            currentPathNode._xcoord,
            currentPathNode._ycoord,
            this.getFloorNum(currentPathNode.floor),
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

  public getPathAsCoordsAStar(startNodeID: string, endNodeID: string) {
    console.log("A* called");
    const pathAsCoords: number[][] = [];
    //<nodeID, [f, g, parentID]>
    const openList: AStarNode[] = [new AStarNode(startNodeID, null, 0, 0)];
    let searching: boolean = true;

    while (searching && openList.length > 0) {
      //Pop next node with the smallest F value
      let currentNode = this.getSmallestF(openList);
      console.log(currentNode);

      //get children of currentNode
      const currentNodeNeighbors: string[] = this.getNeighborsIDs(
        currentNode.nodeID,
      );

      //check each child
      for (let i = 0; i < currentNodeNeighbors.length; i++) {
        const nextToCheck = currentNodeNeighbors[i];
        if (nextToCheck == endNodeID) {
          searching = false;
          pathAsCoords.unshift([
            this.getNodeWithNodeID(nextToCheck)._xcoord,
            this.getNodeWithNodeID(nextToCheck)._ycoord,
            this.getFloorNum(this.getNodeWithNodeID(nextToCheck).floor),
          ]);
          let steppingPath = true;
          while (steppingPath) {
            const nextNodeInPath: GraphNode = this.getNodeWithNodeID(
              currentNode.nodeID,
            );
            pathAsCoords.unshift([
              nextNodeInPath._xcoord,
              nextNodeInPath._ycoord,
              this.getFloorNum(nextNodeInPath.floor),
            ]);
            if (currentNode.parentNode == null) {
              steppingPath = false;
            } else {
              currentNode = currentNode.parentNode;
            }
          }

          console.log("Path (" + startNodeID + " -> " + endNodeID + "):");
        } else {
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
          for (let i = 0; i < openList.length; i++) {
            if (openList[i].nodeID == nextToCheck && openList[i].f < f) {
              skipThisPath = true;
              i = openList.length;
            }
          }

          if (!skipThisPath) {
            openList.push(new AStarNode(nextToCheck, currentNode, g, h));
          }
        }
      }

      openList[openList.indexOf(currentNode)].open = false;
    }

    if (searching) {
      console.log("No path found");
      pathAsCoords.push([-1, -1]);
    }
    return pathAsCoords;
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

  public getFloorNum(fl: string): number {
    switch (fl) {
      case "F3":
        return 3;
      case "F2":
        return 2;
      case "F1":
        return 1;
      case "L1":
        return -1;
      case "L2":
        return -2;
    }
    return 0;
  }

  public getSmallestF(input: AStarNode[]): AStarNode {
    let smallestNode: AStarNode | null = null;
    let smallestF: number = Math.max();

    for (let i = 0; i < input.length; i++) {
      console.log(input[i]);
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

    console.log("smallest F = " + smallestF + " in " + smallestNode);
    return smallestNode!;
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
