import { Request, Response, NextFunction } from "express";

export const errorHander = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("ERROR:", err);
  const statusCode = err.statusCode | 500;
  return res.status(statusCode).json({
    message: err.message || "Server Error",
  });
};
