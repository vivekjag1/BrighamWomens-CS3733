export class APIEndpoints {
  static readonly mapUpload: string = "/api/map/upload";
  static readonly mapDownload: string = "/api/map/download";
  static readonly mapGetNodes: string = "/api/map/getNodes";
  static readonly mapGetEdges: string = "/api/map/getEdges";
  static readonly serviceGetRequests: string = "/api/service/getRequests";
  static readonly servicePostRequests: string = "/api/service/postRequests";
  static readonly navigationRequest: string = "/api/navigation/get";
}

export class FileAttributes {
  static readonly nodeMulterKey: string = "nodes";
  static readonly edgeMulterKey: string = "edges";
}
