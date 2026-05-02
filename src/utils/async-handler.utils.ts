import { NextFunction, RequestHandler, Request, Response } from "express";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler => {
  return (req, res, next): void => {
    void fn(req, res, next).catch(next);
  };
};
