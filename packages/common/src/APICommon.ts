export class APIEndpoints {
  static readonly mapUpload: string = "/api/map/upload";
  static readonly mapDownload: string = "/api/map/download";
  static readonly mapGetNodes: string = "/api/map/getNodes";
  static readonly mapGetEdges: string = "/api/map/getEdges";

  static readonly serviceGetRequests: string = "/api/service/getRequests";
  static readonly servicePostRequests: string = "/api/service/postRequests";
  static readonly servicePutRequests: string = "/api/service/putRequests";
  static readonly serviceDeleteRequests: string = "api/service/deleteRequests";
  static readonly servicePostSecurityRequest: string =
    "/api/service/post/security";
  static readonly navigationRequest: string = "/api/navigation/get";
  static readonly sanitationPostRequests: string =
    "/api/service/sanitationPostRequests";
  static readonly foodDeliveryservicePostRequests: string =
    "/api/service/foodDeliveryservicePostRequests";
  static readonly giftPostRequests: string = "/api/service/giftPostRequests";
  static readonly roomReservation: string = "/api/service/room-reservation";
  static readonly medicalDeviceDelivery: string =
    "/api/service/postMedicalDevice";
  static readonly updateNodes: string = "/api/map/updateNodes";
  static readonly employeePostRequest: string = "/api/employee/postRequests";
  static readonly employeeGetRequest: string = "/api/employee/getRequests";

  static readonly getMapOnFloor: string = "/api/map/get";
  static readonly updateMapOnFloor: string = "/api/map/update";
  static readonly getNumberNodes: string = "/api/map/getNumNodes";

  static readonly navigation: string = "/api/navigation/get";

  static readonly getServiceRequest: string = "/api/service/get";
  static readonly postServiceRequest: string = "/api/service/post";
  static readonly ITPostRequests: string = "/api/service/ITPostRequests";
  static readonly putServiceRequest: string = "/api/service/put";
  static readonly deleteServiceRequest: string = "api/service/delete";
  static readonly securityRequest: string = "/api/service/post/security";
  static readonly sanitationRequest: string = "/api/service/sanitation";
  static readonly giftRequest: string = "/api/service/gift";
  static readonly roomRequest: string = "/api/service/room";
  static readonly deviceRequest: string = "/api/service/device";

  static readonly employeeDownload: string = "/api/employee/download";
  static readonly deleteEmployee: string = "/api/employee/delete";
  static readonly makeEmployee: string = "/api/employee/create";
  static readonly fetchManagementToken: string = "/api/employee/getToken";
  static readonly fetchUser: string = "/api/employee/getUser";
  static readonly changePassword: string = "/api/employee/changePassword";
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
