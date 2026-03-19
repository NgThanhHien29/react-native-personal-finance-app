import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AppError } from "../utils/AppError";

interface TransactionReq {
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  type: string;
}
interface SetTransactionService {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  type: string;
}
export const setTransactionService = async ({
  userId,
  categoryId,
  amount,
  description,
  date,
  type,
}: TransactionReq): Promise<SetTransactionService> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO transactions(user_id, category_id, amount, description, date, type) VALUES (?,?,?,?,?,?)",
    [userId, categoryId, amount, description, date, type],
  );
  if (!result.affectedRows) throw new AppError("Set transaction wrong", 500);
  return {
    id: result.insertId,
    userId,
    categoryId,
    amount,
    description,
    date,
    type,
  };
};

export const getTotalIncomeService = async (
  userId: number,
): Promise<number> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT SUM(amount) as total_income FROM transactions WHERE user_id = ? AND type = 'income' ",
    [userId],
  );

  console.log("Day la rows:    ", rows);
  console.log("Day la rows[0]: ", rows[0]);
  const total = rows[0].total_income;
  return total ? parseFloat(total) : 0;
};
//getTotalIncomeService(1);

interface TypeReturn {
  totalIncome: number;
  totalExpense: number;
}
export const getTotalIncomeAndExpenseService = async (
  userId: number,
): Promise<TypeReturn> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense FROM transactions WHERE user_id = ?",
    [userId],
  );
  console.log("Day la rows:    ", rows);
  console.log("Day la rows[0]: ", rows[0]);
  const totalIncome = parseFloat(rows[0].total_income) || 0;
  const totalExpense = parseFloat(rows[0].total_expense) || 0;
  return {
    totalIncome,
    totalExpense,
  };
};
//getTotalIncomeAndExpenseService(1);

export const getTotalBalanceService = async (
  userId: number,
): Promise<number> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT SUM(IF(type = 'income', amount, -amount)) AS total_balance FROM transactions WHERE user_id = ?",
    [userId],
  );
  const totalBalance = rows[0].total_balance;
  return totalBalance ? parseFloat(totalBalance) : 0;
};

export const getAllTransactionsService = async (userId: number) => {
  const query = `
    SELECT 
        t.id,
        t.amount, 
        t.type, 
        t.description,
        t.created_at,
        c.category_name, 
        c.color
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC
  `;

  const [rows] = await pool.query(query, [userId]);
  return rows;
};
