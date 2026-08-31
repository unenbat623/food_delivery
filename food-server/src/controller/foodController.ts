import { NextFunction, Request, Response } from "express";
import Food from "../model/food";
import MyError from "../utils/myerror";

export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newFood = req.body;
    const food = await Food.create(newFood);
    res.status(201).json({ message: "Хоол амжилттай үүслээ.", food });
  } catch (error) {
    next(error);
  }
};

export const getFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { FoodId } = req.params;
    const findFood = await Food.findById(FoodId).populate("category", "_id name");
    if (!findFood) {
      throw new MyError(`${FoodId} хоол олдсонгүй`, 404);
    }
    res.status(200).json({ message: "Хоол олдлоо.", findFood });
  } catch (error) {
    next(error);
  }
};

export const getAllFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await Food.find().populate("category", "_id name");
    res.status(200).json({ message: "Бүх хоол амжилттай олдлоо.", foods });
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    const updateData = req.body.updateFood || req.body;
    const food = await Food.findByIdAndUpdate(foodId, updateData, { new: true });
    if (!food) {
      throw new MyError(`${foodId} хоол олдсонгүй`, 404);
    }
    res.status(200).json({ message: "Хоол амжилттай шинэчлэгдлээ.", food });
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findByIdAndDelete(foodId);
    if (!food) {
      throw new MyError(`${foodId} хоол олдсонгүй`, 404);
    }
    res.status(200).json({ message: "Хоол амжилттай устгагдлаа.", food });
  } catch (error) {
    next(error);
  }
};
