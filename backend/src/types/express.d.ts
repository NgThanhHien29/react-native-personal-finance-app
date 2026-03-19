import { JwtUser } from "./user.type";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
export {};
