import api from "./api";

// Signup
interface CreateUser {
  username: string;
  email: string;
  password: string;
}
interface NewUser {
  id: number;
  username: string;
  email: string;
}
export const createUser = async ({
  username,
  email,
  password,
}: CreateUser): Promise<NewUser> => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

// Login
interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};
