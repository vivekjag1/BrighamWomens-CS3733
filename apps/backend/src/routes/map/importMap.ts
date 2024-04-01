import express, { Router, Request, Response } from "express";
import multer from "multer";
import { mapAttributes } from "common/src/api.ts";

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
      // const nodeFile: Express.Multer.File[] = files[mapAttributes.nodeMulterKey];
      // const edgeFile: Express.Multer.File[] = files[mapAttributes.edgeMulterKey];
      // vivek take it away
      res.status(200).send("Files uploaded"); // resolves axios promise in frontend
    } else {
      res.status(404).send("Files missing from upload");
    }
  },
);

export default router;
