import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { createUserService, loginService } from "../services/user.service";

const SECRET = process.env.JWT_SECRET as string;
const expires = process.env
  .JWT_EXPIRES as string as jwt.SignOptions["expiresIn"];

interface CreateUserBody {
  username: string;
  email: string;
  password: string;
}
export const createUser = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body;
    if (!user.username || !user.email || !user.password) {
      return res.status(400).json({
        message: "Vui long nhap dung thong tin",
      });
    }
    const newUser = await createUserService(user);
    return res.status(201).json(newUser);
  } catch (error: any) {
    next(error);
  }
};

// login
interface LoginUserBody {
  email: string;
  password: string;
}

export const loginUser = async (
  req: Request<{}, {}, LoginUserBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Sai thong tin dang nhap",
      });
    }
    const user = await loginService({ email, password });
    if (!user) {
      return res.status(401).json({
        message: "Email hoặc mật khẩu không đúng",
      });
    }
    const token: string = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      SECRET,
      {
        expiresIn: expires,
      },
    );
    return res.status(201).json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    next(error);
  }
};
