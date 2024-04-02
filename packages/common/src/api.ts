export class APIEndpoints {
  static readonly mapUpload: string = "/api/map/upload";
  static readonly mapDownload: string = "/api/map/download";
  static readonly mapGetNodes: string = "/api/map/getNodes";
  static readonly mapGetEdges: string = "/api/map/getEdges";
  static readonly mapExport: string = "/api/map/exportMap";
}

export class mapAttributes {
  static readonly nodeMulterKey: string = "nodes";
  static readonly edgeMulterKey: string = "edges";
}
