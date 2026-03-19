import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategorySlice {
  id: number | null;
  userId: number | null;
  name: string | null;
  color: string;
}

export const initialState: CategorySlice = {
  id: null,
  userId: null,
  name: null,
  color: "#FF6B6B",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategorySlice>) => {
      ((state.id = action.payload.id),
        (state.userId = action.payload.userId),
        (state.name = action.payload.name),
        (state.color = action.payload.color));
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
