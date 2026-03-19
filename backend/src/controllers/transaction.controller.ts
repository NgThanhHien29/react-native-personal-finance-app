import { Request, Response, NextFunction } from "express";

import {
  setTransactionService,
  getTotalIncomeAndExpenseService,
  getTotalBalanceService,
  getAllTransactionsService,
} from "../services/transaction.service";

import { JwtUser } from "../types/user.type";
interface AuthRequest extends Request {
  user?: JwtUser;
}

interface TransactionBody {
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  type: string;
}
export const setTransaction = async (
  req: Request<{}, {}, TransactionBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transaction = req.body;
    if (
      !transaction.userId ||
      !transaction.categoryId ||
      !transaction.amount ||
      !transaction.description ||
      !transaction.date ||
      !transaction.type
    ) {
      return res.status(400).json({
        message: "Gui sai dinh dang du lieu",
      });
    }
    const newTransaction = await setTransactionService(transaction);
    return res.status(201).json(newTransaction);
  } catch (error: any) {
    next(error);
  }
};

// Get total income and expense

export const getTotalIncomeAndExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({
        message: "Unauthoried",
      });
    const totalIncomeExpense = await getTotalIncomeAndExpenseService(userId);
    return res.status(200).json(totalIncomeExpense);
  } catch (error: any) {
    next(error);
  }
};

export const getTotalBalance = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({
        message: "Unauthoried",
      });
    const totalBalance = await getTotalBalanceService(userId);
    return res.status(200).json(totalBalance);
  } catch (error: any) {
    next(error);
  }
};

export const getAllTransactions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({
        message: "Unauthoried",
      });
    const transactionsList = await getAllTransactionsService(userId);
    return res.status(200).json(transactionsList);
  } catch (error: any) {
    next(error);
  }
};
