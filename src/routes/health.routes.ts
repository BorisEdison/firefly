import { Response, Router, Request } from "express";

const router = Router();

router.use("/path", (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

export default router;
