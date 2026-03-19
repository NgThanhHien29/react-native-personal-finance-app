import pool from "../config/db";
import { ResultSetHeader } from "mysql2";
import { AppError } from "../utils/AppError";

interface CategoriesReq {
  userId: number;
  name: string;
  color: string;
}
interface SetCategoryService {
  id: number;
  userId: number;
  name: string;
  color: string;
}
export const setCategoryService = async ({
  userId,
  name,
  color,
}: CategoriesReq): Promise<SetCategoryService> => {
  const [existing]: any = await pool.query(
    "SELECT id FROM categories WHERE user_id = ? AND category_name = ?",
    [userId, name],
  );

  if (existing.length > 0) {
    return {
      id: existing[0].id,
      userId,
      name,
      color,
    };
  }

  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO categories(user_id, category_name, color) VALUES (?,?,?)",
    [userId, name, color],
  );
  if (!result.affectedRows) throw new AppError("Set Category wrong", 500);
  return {
    id: result.insertId,
    userId,
    name,
    color,
  };
};
