import { Path } from "./Path.ts";
import { Graph } from "./Graph.ts";
import { Node } from "database";
import { ComplexPath } from "./ComplexPath.ts";

export class AStarPath extends ComplexPath implements Path {
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

  //Returns the shortest path between startNode and endNode using the A* algorithm
  public createPath(startNodeID: string, endNodeID: string): Node[] {
    const path: Node[] = [];
    const searchList: AStarNode[] = [new AStarNode(startNodeID, null, 0, 0)];
    let numOfOpenNodes: number = 1;
    let searching: boolean = true;

    if (startNodeID == endNodeID) {
      return [
        this.parentGraph.getNodeWithNodeID(startNodeID),
        this.parentGraph.getNodeWithNodeID(startNodeID),
      ];
    }

    while (searching && numOfOpenNodes > 0) {
      //Pop next node with the smallest F value
      let currentNode = this.getSmallestF(searchList);

      //get children of currentNode
      const currentNodeNeighbors: string[] = this.parentGraph.getNeighborsIDs(
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
          path.unshift(this.parentGraph.getNodeWithNodeID(nextToCheck));
          //Create loop to move back to start of path
          let steppingPath = true;
          while (steppingPath) {
            path.unshift(
              this.parentGraph.getNodeWithNodeID(currentNode.nodeID),
            );
            //if parentNode == null then we have returned to the start node so break out of the loop
            if (currentNode.parentNode == null) {
              steppingPath = false;
            } else {
              currentNode = currentNode.parentNode;
            }
          }
        } else {
          //get G, H, and F values of the child node
          const g: number =
            currentNode.g +
            this.distanceBetweenNodes(nextToCheck, currentNode.nodeID);
          const h: number = this.distanceBetweenNodes(nextToCheck, endNodeID);
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

    return path;
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
