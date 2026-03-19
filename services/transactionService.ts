import api from "./api";

interface SetTransactionPar {
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  type: string;
}
interface SetTransactionResponse {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  type: string;
}
export const setTransaction = async ({
  userId,
  categoryId,
  amount,
  description,
  date,
  type,
}: SetTransactionPar) => {
  const response = await api.post<SetTransactionResponse>("/transactions", {
    userId,
    categoryId,
    amount,
    description,
    date,
    type,
  });
  return response.data;
};

interface TotalIncomeAndExpenseResponse {
  totalIncome: number;
  totalExpense: number;
}
export const getTotalIncomeAndExpense = async (userId: number) => {
  try {
    const response = await api.get<TotalIncomeAndExpenseResponse>(
      "/transactions/twototal",
    );
    return response.data;
  } catch (error) {
    console.error("getTotalIncomeAndExpense: Loi goi api");
  }
};

export const getTotalBalance = async (userId: number) => {
  try {
    const response = await api.get<number>("/transactions/totalbalance");
    return response.data; // number
  } catch (error) {
    console.error("getTotalBanxe: Loi goi api");
  }
};
interface TransactionsListResponse {
  id: number;
  amount: number;
  type: string;
  created_at: string;
  category_name: string;
  color: string;
}
export const getAllTransactions = async (userId: number) => {
  try {
    const response =
      await api.get<TransactionsListResponse>("/transactions/all");
    return response.data;
  } catch (error) {
    console.error("GetAllTransaction=> List :: Loi goi api");
  }
};
