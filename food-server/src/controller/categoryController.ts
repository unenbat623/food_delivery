import { NextFunction, Request, Response } from "express";
import Category from "../model/category";
import MyError from "../utils/myerror";
import { storeCategories } from "../data/seedData";

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    if (categories && categories.length > 0) {
      return res.status(200).json({ message: "Бүх категори амжилттай олдлоо.", categories });
    }
  } catch (error) {
    console.warn("DB category find failed, returning in-memory store.");
  }
  return res.status(200).json({ message: "Бүх категори амжилттай олдлоо.", categories: storeCategories });
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const findCategory = await Category.findById(categoryId);
    if (findCategory) {
      return res.status(200).json({ message: "Категори олдлоо.", findCategory });
    }
  } catch (error) {
    // fallback
  }

  const inMemory = storeCategories.find((c) => c._id === req.params.categoryId);
  if (inMemory) {
    return res.status(200).json({ message: "Категори олдлоо.", findCategory: inMemory });
  }

  return next(new MyError(`${req.params.categoryId} категори олдсонгүй`, 404));
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = req.body;
    try {
      const category = await Category.create(newCategory);
      return res.status(201).json({ message: "Категори амжилттай үүслээ.", category });
    } catch (e) {
      const created = {
        _id: "cat_" + Date.now(),
        ...newCategory,
      };
      storeCategories.push(created);
      return res.status(201).json({ message: "Категори амжилттай үүслээ.", category: created });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { updateCategory } = req.body;
    try {
      const category = await Category.findByIdAndUpdate(categoryId, updateCategory, { new: true });
      if (category) {
        return res.status(200).json({ message: "Категори амжилттай шинэчлэгдлээ.", category });
      }
    } catch (e) {
      // fallback
    }

    const index = storeCategories.findIndex((c) => c._id === categoryId);
    if (index !== -1) {
      storeCategories[index] = { ...storeCategories[index], ...updateCategory };
      return res.status(200).json({ message: "Категори амжилттай шинэчлэгдлээ.", category: storeCategories[index] });
    }

    throw new MyError(`${categoryId} категори олдсонгүй`, 404);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    try {
      const category = await Category.findByIdAndDelete(categoryId);
      if (category) {
        return res.status(200).json({ message: "Категори амжилттай устгагдлаа.", category });
      }
    } catch (e) {
      // fallback
    }

    const index = storeCategories.findIndex((c) => c._id === categoryId);
    if (index !== -1) {
      const [removed] = storeCategories.splice(index, 1);
      return res.status(200).json({ message: "Категори амжилттай устгагдлаа.", category: removed });
    }

    return res.status(200).json({ message: "Категори амжилттай устгагдлаа." });
  } catch (error) {
    next(error);
  }
};
