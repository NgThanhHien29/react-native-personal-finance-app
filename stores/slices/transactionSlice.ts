import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransactionSlice {
  id: number | null;
  userId: number | null;
  categoryId: number | null;
  amount: number | null;
  description: string | null;
  date: string | null;
  type: string;
}

export const initialState: TransactionSlice = {
  id: null,
  userId: null,
  categoryId: null,
  amount: null,
  description: null,
  date: null,
  type: "expense",
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<TransactionSlice>) => {
      ((state.id = action.payload.id),
        (state.userId = action.payload.userId),
        (state.categoryId = action.payload.categoryId),
        (state.amount = action.payload.amount),
        (state.description = action.payload.description),
        (state.date = action.payload.date),
        (state.type = action.payload.type));
    },
  },
});

export const { setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
