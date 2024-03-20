import { NextFunction, Request, Response } from "express";
import Category from "../model/category";
import MyError from "../utils/myerror";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = req.body;
    await Category.create(newCategory);
    res.status(201).json({ message: "category amjilttai uuslee." });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const findCategory = await Category.findById(categoryId);
    if (!findCategory) {
      throw new MyError(`${categoryId} category oldsongui`, 400);
    }
    res
      .status(200)
      .json({ message: `${categoryId} catergory oldloo.`, findCategory });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    console.log(categories, "categories");
    res.status(200).json({ message: `buh catergory oldloo.`, categories });
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
    const category = await Category.findByIdAndUpdate(
      categoryId,
      updateCategory
    );
    if (!category) {
      throw new MyError(`${categoryId} category oldsongui`, 400);
    }
    res
      .status(200)
      .json({ message: `${categoryId} catergory oldloo.`, category });
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
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      throw new MyError(`${categoryId} category oldsongui`, 400);
    }
    res
      .status(200)
      .json({ message: `${categoryId} catergory ustgagdlaa.`, category });
  } catch (error) {
    next(error);
  }
};
