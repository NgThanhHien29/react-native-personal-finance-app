import express from "express";
import {
  setTransaction,
  getTotalIncomeAndExpense,
  getTotalBalance,
  getAllTransactions,
} from "../controllers/transaction.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();
router.post("/transactions", auth, setTransaction);
router.get("/transactions/twototal", auth, getTotalIncomeAndExpense);
router.get("/transactions/totalbalance", auth, getTotalBalance);
router.get("/transactions/all", auth, getAllTransactions);
export default router;
