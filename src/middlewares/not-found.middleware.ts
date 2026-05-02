import { Request, Response, NextFunction } from "express";
import { request } from "node:http";

const notFoundMiddlware = (
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export default notFoundMiddlware;
