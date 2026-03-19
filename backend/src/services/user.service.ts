import pool from "../config/db";
import bcrypt from "bcrypt";
import { RowDataPacket, ResultSetHeader } from "mysql2";

import { User } from "../types/user.type";
import { AppError } from "../utils/AppError";

interface CreateUser {
  username: string;
  email: string;
  password: string;
}
// Signup
export const createUserService = async ({
  username,
  email,
  password,
}: CreateUser): Promise<User> => {
  const hashpassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
    [username, email, hashpassword],
  );
  if (!result.affectedRows) throw new AppError("Create User is Wrong", 500);
  return {
    id: result.insertId,
    username,
    email,
  };
};

// Login
export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  const user = rows[0];
  if (!user) throw new AppError("User not found", 404);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong Password");
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};
