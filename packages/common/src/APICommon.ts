export class APIEndpoints {
  static readonly mapUpload: string = "/api/map/upload";
  static readonly mapDownload: string = "/api/map/download";
  static readonly mapGetNodes: string = "/api/map/getNodes";
  static readonly mapGetEdges: string = "/api/map/getEdges";
  static readonly serviceGetRequests: string = "/api/service/getRequests";
  static readonly servicePostRequests: string = "/api/service/postRequests";
  static readonly servicePutRequests: string = "/api/service/putRequests";
  static readonly servicePostSecurityRequest: string =
    "/api/service/post/security";
  static readonly navigationRequest: string = "/api/navigation/get";
  static readonly roomReservation: string = "/api/service/room-reservation";
  static readonly medicalDeviceDelivery: string =
    "/api/service/postMedicalDevice";
}

export class FileAttributes {
  static readonly nodeKey: string = "nodes";
  static readonly edgeKey: string = "edges";
}

export class NavigateAttributes {
  static readonly startLocationKey: string = "currentLocation";
  static readonly endLocationKey: string = "destination";
  static readonly floorKey: string = "floor";
}
