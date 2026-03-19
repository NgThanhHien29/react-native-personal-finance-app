import api from "./api";

interface SetCategoryResponse {
  id: number;
  userId: number;
  name: string;
  color: string;
}
interface SetCategoryPar {
  userId: number;
  name: string;
  color: string;
}
export const setCategory = async ({ userId, name, color }: SetCategoryPar) => {
  const response = await api.post<SetCategoryResponse>("/categories", {
    userId,
    name,
    color,
  });
  return response.data;
};
