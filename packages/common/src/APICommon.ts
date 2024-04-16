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
  static readonly sanitationPostRequests: string =
    "/api/service/sanitationPostRequests";
  static readonly giftPostRequests: string = "/api/service/giftPostRequests";
  static readonly roomReservation: string = "/api/service/room-reservation";
  static readonly medicalDeviceDelivery: string =
    "/api/service/postMedicalDevice";
  static readonly updateNodes: string = "/api/map/updateNodes";
}

export class FileAttributes {
  static readonly nodeKey: string = "nodes";
  static readonly edgeKey: string = "edges";
}

export class NavigateAttributes {
  static readonly startLocationKey: string = "start";
  static readonly endLocationKey: string = "end";
  static readonly floorKey: string = "floor";
  static readonly algorithmKey: string = "algo";
}
