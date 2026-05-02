import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { error } from "node:console";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.log("[ERROR]", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

export default errorMiddleware;
