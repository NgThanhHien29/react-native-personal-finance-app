import { Request, Response, NextFunction } from "express";

import { setCategoryService } from "../services/category.service";

interface SetCategoryBody {
  userId: number;
  name: string;
  color: string;
}
export const setCategory = async (
  req: Request<{}, {}, SetCategoryBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = req.body;
    if (!category.userId || !category.name || !category.color)
      return res.status(400).json({
        message: "Gui sai dinh dang du lieu",
      });
    const newCategory = await setCategoryService(category);
    return res.status(201).json(newCategory);
  } catch (error: any) {
    next(error);
  }
};
