import express, { Router } from "express";
import multer from "multer";
import { mapAttributes } from "common/src/api.ts";
const router: Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handles incoming map data files
router.post(
  "/",
  upload.array(mapAttributes.fileUploadKey),
  function (req, res) {
    res.status(200).json({
      message: "hello world",
    });

    console.log("received");
    console.log(req.file);
  },
);

export default router;
