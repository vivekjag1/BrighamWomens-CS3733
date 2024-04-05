export class GraphNode {
  get _ycoord(): number {
    return parseInt(this.ycoord);
  }
  get _xcoord(): number {
    return parseInt(this.xcoord);
  }
  readonly nodeID: string;
  readonly xcoord: string;
  readonly ycoord: string;
  readonly floor: string;
  readonly building: string;
  readonly nodeType: string;
  readonly longName: string;
  readonly shortName: string;

  constructor(
    nodeID: string,
    xcoord: string,
    ycoord: string,
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
