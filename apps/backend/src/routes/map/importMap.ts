import express, { Router, Request, Response } from "express";
import multer from "multer";
import { mapAttributes } from "common/src/api.ts";
import {
  readCSVFile,
  populateNodeDB,
  populateEdgeDB,
} from "../../fileInput/file.ts";
//
// const router: Router = express.Router();
//
// // const storage = multer.diskStorage({
// //   destination: function (req, file, callback) {
// //     callback(null, "uploads/");
// //   },
// //   filename: function (req, file, callback) {
// //     callback(null, file.originalname);
// //   },
// // });
//
// const upload = multer();
//
// // Explicitly define types for files
// interface UploadedFiles {
//   [fileKey: string]: Express.Multer.File[];
// }
//
// // Handles incoming map data files
// router.post(
//   "/",
//   upload.fields([
//     { name: mapAttributes.nodeMulterKey, maxCount: 1 },
//     { name: mapAttributes.edgeMulterKey, maxCount: 1 },
//   ]),
//   (req: Request, res: Response) => {
//     const files = req.files as UploadedFiles | undefined;
//     if (files) {
//       const nodeFile: Express.Multer.File[] =
//         files[mapAttributes.nodeMulterKey];
//       const edgeFile: Express.Multer.File[] =
//         files[mapAttributes.edgeMulterKey];
//       if (validateInput(nodeFile[0], 8) && validateInput(edgeFile[0], 2)) {
//         populateNodeDB(readCSVFile(nodeFile[0].buffer.toString()));
//         populateEdgeDB(readCSVFile(edgeFile[0].buffer.toString()));
//
//         // console.log(readCSVFile(nodeFile[0].buffer.toString()));
//       } else {
//         res.status(400);
//       }
//       // vivek take it away
//       res.status(200).send("Files uploaded"); // resolves axios promise in frontend
//     } else {
//       res.status(404).send("Files missing from upload");
//     }
//   },
// );
// export function validateInput(
//   aFile: Express.Multer.File,
//   numExpected: number,
// ): boolean {
//   // const data = fs.readFileSync(filePath, { encoding: "utf8" });
//   const data = aFile.buffer.toString();
//   const rows = data.split("\r\n").map((row) => row.split(","));
//   if (rows[0].length != numExpected) {
//     return false;
//   } else {
//     return true;
//   }
// }
//
// export default router;

// import express, { Router, Request, Response } from "express";
// import multer from "multer";
// import { mapAttributes } from "common/src/api.ts";

const router: Router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads/");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

const upload = multer();

// Explicitly define types for files
interface UploadedFiles {
  [fileKey: string]: Express.Multer.File[];
}

// Handles incoming map data files
router.post(
  "/",
  upload.fields([
    { name: mapAttributes.nodeMulterKey, maxCount: 1 },
    { name: mapAttributes.edgeMulterKey, maxCount: 1 },
  ]),
  (req: Request, res: Response) => {
    const files = req.files as UploadedFiles | undefined;
    if (files) {
      const nodeFile: Express.Multer.File[] =
        files[mapAttributes.nodeMulterKey];
      const edgeFile: Express.Multer.File[] =
        files[mapAttributes.edgeMulterKey];
      if (validateInput(nodeFile[0], 8) && validateInput(edgeFile[0], 2)) {
        populateDatabases(nodeFile[0], edgeFile[0]);
      }
      //
      //         // console.log(readCSVFile(nodeFile[0].buffer.toString()));
      // vivek take it away
      res.status(200).send("Files uploaded"); // resolves axios promise in frontend
    } else {
      res.status(404).send("Files missing from upload");
    }
  },
);
export function validateInput(
  aFile: Express.Multer.File,
  numExpected: number,
): boolean {
  // const data = fs.readFileSync(filePath, { encoding: "utf8" });
  const data = aFile.buffer.toString();
  const rows = data.split("\r\n").map((row) => row.split(","));
  if (rows[0].length != numExpected) {
    return false;
  } else {
    return true;
  }
}

async function populateDatabases(
  nodeFile: Express.Multer.File,
  edgeFile: Express.Multer.File,
) {
  await populateNodeDB(readCSVFile(nodeFile.buffer.toString()));
  populateEdgeDB(readCSVFile(edgeFile.buffer.toString()));
}

export default router;
