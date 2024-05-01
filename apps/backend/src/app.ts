import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mapUpload from "./routes/map/fileUploadMap.ts";
import mapDownload from "./routes/map/fileDownloadMap.ts";
import handleNavigation from "./routes/navigation/navigate.ts";
import deleteUser from "./routes/accounts/deleteUser.ts";
import createUser from "./routes/accounts/createUser.ts";
import changePassword from "./routes/accounts/changePassword.ts";

import handleServiceRequests from "./routes/services/handleServiceRequest.ts";
import handleSanitationRequests from "./routes/services/handleSanitationRequest.ts";
import handleEdges from "./routes/map/getEdges.ts";

import { APIEndpoints } from "common/src/APICommon.ts";
import handleNodes from "./routes/map/getNodes.ts";
import handleRoomRequest from "./routes/services/handleRoomReservation.ts";
import handleDeviceRequest from "./routes/services/handleMedicalDeviceDelivery.ts";
import handleSecurityRequest from "./routes/services/securityRequest.ts";
import { auth } from "express-oauth2-jwt-bearer";
import handleGiftRequest from "./routes/services/handleGiftDeliveryRequest.ts";
import handleEmployees from "./routes/employee/handleEmployees.ts";
import employeeDownload from "./routes/employee/employeeDownload.ts";
import getNumberNodes from "./routes/map/getNumberNodes.ts";
import findEmployee from "./routes/employee/findEmployee.ts";
import getMapOnFloor from "./routes/map/getMapOnFloor.ts";
import updateMapOnFloor from "./routes/map/updateMapOnFloor.ts";
import handleITRequest from "./routes/services/handleITRequest.ts";
import handleFoodDelivery from "./routes/services/handleFoodDelivery.ts";

const app: Express = express(); // Setup the backend

// Setup generic middlewear
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/healthcheck", (req, res) => {
  res.status(200).send();
});

app.use(APIEndpoints.mapGetEdges, handleEdges);
app.use(APIEndpoints.mapGetNodes, handleNodes);
app.use(APIEndpoints.navigation, handleNavigation);
app.use(APIEndpoints.deleteServiceRequest, handleServiceRequests);

app.use(
  auth({
    audience: "/api",
    issuerBaseURL: "https://dev-7eoh0ojk0tkfhypo.us.auth0.com",
    tokenSigningAlg: "RS256",
  }),
);
app.use(APIEndpoints.mapUpload, mapUpload);
app.use(APIEndpoints.mapDownload, mapDownload);
app.use(APIEndpoints.getMapOnFloor, getMapOnFloor);
app.use(APIEndpoints.updateMapOnFloor, updateMapOnFloor);
app.use(APIEndpoints.getNumberNodes, getNumberNodes);

app.use(APIEndpoints.getServiceRequest, handleServiceRequests);
app.use(APIEndpoints.postServiceRequest, handleServiceRequests);
app.use(APIEndpoints.putServiceRequest, handleServiceRequests);
app.use(APIEndpoints.sanitationRequest, handleSanitationRequests);
app.use(APIEndpoints.securityRequest, handleSecurityRequest);
app.use(APIEndpoints.roomRequest, handleRoomRequest);
app.use(APIEndpoints.deviceRequest, handleDeviceRequest);
app.use(APIEndpoints.giftRequest, handleGiftRequest);

app.use(APIEndpoints.employeePostRequest, handleEmployees);
app.use(APIEndpoints.employeeGetRequest, handleEmployees);
app.use(APIEndpoints.employeeDownload, employeeDownload);
app.use(APIEndpoints.deleteEmployee, deleteUser);
app.use(APIEndpoints.makeEmployee, createUser);
app.use(APIEndpoints.fetchUser, findEmployee);

app.use(APIEndpoints.changePassword, changePassword);
app.use(APIEndpoints.ITPostRequests, handleITRequest);
app.use(APIEndpoints.foodDeliveryservicePostRequests, handleFoodDelivery);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});
app.disable("etag");

export default app; // Export the backend, so that www.ts can start it
