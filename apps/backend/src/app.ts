import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mapUpload from "./routes/map/mapUpload.ts";
import mapDownload from "./routes/map/mapDownload.ts";
import pathfindingAPI from "./routes/navigation/navigate.ts";
import deleteUser from "./routes/accounts/deleteUser.ts";
import createUser from "./routes/accounts/createUser.ts";

import handleServiceRequests from "./routes/handleServiceRequest.ts";
import handleSanitationRequests from "./routes/handleSanitationRequest.ts";
import handleEdges from "./routes/handleEdges.ts";

import { APIEndpoints } from "common/src/APICommon.ts";
import handleNodes from "./routes/handleNodes.ts";
import roomReservationAPI from "./routes/RoomReservationAPI.ts";
import handleMedicalDeviceDelivery from "./routes/handleMedicalDeviceDelivery.ts";
import securityRequest from "./routes/securityRequest.ts";
import { auth } from "express-oauth2-jwt-bearer";
import handleGiftDeliveryRequest from "./routes/handleGiftDeliveryRequest.ts";
import updateNodes from "./routes/map/updateNodes.ts";
import handleEmployees from "./routes/handleEmployees.ts";
import employeeDownload from "./routes/employeeDownload.ts";
import makeNodes from "./routes/map/makeNodes.ts";
import deleteNodes from "./routes/map/deleteNodes.ts";
import countNodes from "./routes/map/CountNodes.ts";
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
app.use(APIEndpoints.navigationRequest, pathfindingAPI);
app.use(APIEndpoints.createNode, makeNodes);
app.use(APIEndpoints.deleteNode, deleteNodes);
app.use(APIEndpoints.serviceDeleteRequests, handleServiceRequests);

app.use(
  auth({
    audience: "/api",
    issuerBaseURL: "https://dev-7eoh0ojk0tkfhypo.us.auth0.com",
    tokenSigningAlg: "RS256",
  }),
);
app.use(APIEndpoints.mapUpload, mapUpload);
app.use(APIEndpoints.mapDownload, mapDownload);
app.use(APIEndpoints.serviceGetRequests, handleServiceRequests);
app.use(APIEndpoints.servicePostRequests, handleServiceRequests);
app.use(APIEndpoints.servicePutRequests, handleServiceRequests);
app.use(APIEndpoints.sanitationPostRequests, handleSanitationRequests);
app.use(APIEndpoints.servicePostSecurityRequest, securityRequest);
app.use(APIEndpoints.roomReservation, roomReservationAPI);
app.use(APIEndpoints.medicalDeviceDelivery, handleMedicalDeviceDelivery);
app.use(APIEndpoints.giftPostRequests, handleGiftDeliveryRequest);
app.use(APIEndpoints.updateNodes, updateNodes);
app.use(APIEndpoints.employeePostRequest, handleEmployees);
app.use(APIEndpoints.employeeGetRequest, handleEmployees);
app.use(APIEndpoints.employeeDownload, employeeDownload);
app.use(APIEndpoints.deleteEmployee, deleteUser);
app.use(APIEndpoints.makeEmployee, createUser);
app.use(APIEndpoints.countNodes, countNodes);
// app.use(APIEndpoints.createNode, createNode);
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
