import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/", function (req: Request, res: Response) {
  const feedback = req.body;
  res.status(200).json({
    message: "hello world",
    data: feedback,
  });
});

export default router;
