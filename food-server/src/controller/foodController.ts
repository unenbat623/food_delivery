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
    await Food.create(newFood);
    res.status(201).json({ message: "hool amjilttai uuslee." });
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
    const findFood = await Food.findById(FoodId);
    if (!findFood) {
      throw new MyError(`${FoodId} Food oldsongui`, 400);
    }
    res.status(200).json({ message: `${FoodId} catergory oldloo.`, findFood });
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
    res.status(200).json({ message: `buh catergory oldloo.`, foods });
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
    const { updateFood } = req.body;
    const food = await Food.findByIdAndUpdate(foodId, updateFood);
    if (!Food) {
      throw new MyError(`${foodId} Food oldsongui`, 400);
    }
    res.status(200).json({ message: `${foodId} hool oldloo.`, Food });
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
    const Foods = await Food.findByIdAndDelete(foodId);
    res.status(200).json({ message: `${foodId} hool ustgagdlaa.`, Food });
  } catch (error) {
    next(error);
  }
};
