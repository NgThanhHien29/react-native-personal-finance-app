import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

/// Luu y khi dung req.user?
import { JwtUser } from "../types/user.type";
interface AuthRequest extends Request {
  user?: JwtUser;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const headers = req.headers.authorization;
  if (!headers) {
    return res.status(401).json({
      message: "No token",
    });
  }
  const token: string = headers.split(" ")[1];
  console.log("Token:", token);
  try {
    const decoded = jwt.verify(token, SECRET) as JwtUser;
    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
