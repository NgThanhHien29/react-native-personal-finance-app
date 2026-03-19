import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreUser<T> {
  id: number | null;
  username: T | null;
  email: T | null;
}

export interface authState {
  token: string | null;
  isAuthenticated: boolean;
  storeUser: StoreUser<string>;
}

export const initialState: authState = {
  token: null,
  isAuthenticated: false,
  storeUser: {
    id: null,
    username: null,
    email: null,
  },
};
interface AuthPayload {
  token: string;
  id: number;
  username: string;
  emailUser: string;
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthPayload>) => {
      state.token = action.payload.token;
      state.storeUser.id = action.payload.id;
      state.storeUser.username = action.payload.username;
      state.storeUser.email = action.payload.emailUser;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.storeUser.username = null;
      state.storeUser.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
