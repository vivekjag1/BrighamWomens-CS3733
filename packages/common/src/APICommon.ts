export class APIEndpoints {
  static readonly mapUpload: string = "/api/map/upload";
  static readonly mapDownload: string = "/api/map/download";
  static readonly mapGetNodes: string = "/api/map/getNodes";
  static readonly mapGetEdges: string = "/api/map/getEdges";
  static readonly mobileDirections: string = "api/map/mobile";
  static readonly serviceGetRequests: string = "/api/service/getRequests";
  static readonly servicePostRequests: string = "/api/service/postRequests";
  static readonly servicePutRequests: string = "/api/service/putRequests";
  static readonly serviceDeleteRequests: string = "api/service/deleteRequests";
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
  static readonly employeePostRequest: string = "/api/employee/postRequests";
  static readonly employeeGetRequest: string = "/api/employee/getRequests";
  static readonly employeeDownload: string = "/api/employee/download";
  static readonly deleteEmployee: string = "/api/employee/delete";
  static readonly makeEmployee: string = "/api/employee/create";
  static readonly createNode: string = "/api/map/createnode";
  static readonly deleteNode: string = "/api/map/deletenode";
  static readonly fetchManagementToken: string = "/api/employee/getToken";
  static readonly countNodes: string = "/api/map/countNodes";
  static readonly createEdge: string = "/api/map/createEdges";
  static readonly createManyNodes: string = "/api/map/createManyNodes";
  static readonly deleteManyNodes: string = "api/map/deleteManyNodes";
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
