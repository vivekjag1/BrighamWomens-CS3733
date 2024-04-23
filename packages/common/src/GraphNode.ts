export class GraphNode {
  get _ycoord(): number {
    return this.ycoord;
  }
  get _xcoord(): number {
    return this.xcoord;
  }
  readonly nodeID: string;
  readonly xcoord: number;
  readonly ycoord: number;
  readonly floor: string;
  readonly building: string;
  readonly nodeType: string;
  readonly longName: string;
  readonly shortName: string;

  constructor(
    nodeID: string,
    xcoord: number,
    ycoord: number,
    floor: string,
    building: string,
    nodeType: string,
    longName: string,
    shortName: string,
  ) {
    this.nodeID = nodeID;
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.floor = floor;
    this.shortName = shortName;
    this.longName = longName;
    this.nodeType = nodeType;
    this.building = building;
  }
}

//
