import { NextFunction, Request, Response } from "express";
import Food from "../model/food";
import MyError from "../utils/myerror";
import { storeFoods } from "../data/seedData";

export const getAllFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await Food.find().populate("category", "_id name");
    if (foods && foods.length > 0) {
      return res.status(200).json({ message: "Бүх хоол амжилттай олдлоо.", foods });
    }
  } catch (error) {
    console.warn("DB find failed, returning in-memory foods store.");
  }
  return res.status(200).json({ message: "Бүх хоол амжилттай олдлоо.", foods: storeFoods });
};

export const getFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { FoodId } = req.params;
    const findFood = await Food.findById(FoodId).populate("category", "_id name");
    if (findFood) {
      return res.status(200).json({ message: "Хоол олдлоо.", findFood });
    }
  } catch (error) {
    // fallback
  }

  const inMemory = storeFoods.find((f) => f._id === req.params.FoodId);
  if (inMemory) {
    return res.status(200).json({ message: "Хоол олдлоо.", findFood: inMemory });
  }

  return next(new MyError(`${req.params.FoodId} хоол олдсонгүй`, 404));
};

export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newFood = req.body;
    try {
      const food = await Food.create(newFood);
      return res.status(201).json({ message: "Хоол амжилттай үүслээ.", food });
    } catch (e) {
      // In-memory create
      const created = {
        _id: "food_" + Date.now(),
        ...newFood,
        price: Number(newFood.price || 0),
        discountPrice: newFood.discountPrice ? Number(newFood.discountPrice) : Number(newFood.price || 0),
        isSale: Boolean(newFood.isSale),
        rating: 5.0,
      };
      storeFoods.unshift(created);
      return res.status(201).json({ message: "Хоол амжилттай үүслээ.", food: created });
    }
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
    try {
      const food = await Food.findByIdAndUpdate(foodId, updateData, { new: true });
      if (food) {
        return res.status(200).json({ message: "Хоол амжилттай шинэчлэгдлээ.", food });
      }
    } catch (e) {
      // fallback
    }

    const index = storeFoods.findIndex((f) => f._id === foodId);
    if (index !== -1) {
      storeFoods[index] = { ...storeFoods[index], ...updateData };
      return res.status(200).json({ message: "Хоол амжилттай шинэчлэгдлээ.", food: storeFoods[index] });
    }

    throw new MyError(`${foodId} хоол олдсонгүй`, 404);
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
    try {
      const food = await Food.findByIdAndDelete(foodId);
      if (food) {
        return res.status(200).json({ message: "Хоол амжилттай устгагдлаа.", food });
      }
    } catch (e) {
      // fallback
    }

    const index = storeFoods.findIndex((f) => f._id === foodId);
    if (index !== -1) {
      const [removed] = storeFoods.splice(index, 1);
      return res.status(200).json({ message: "Хоол амжилттай устгагдлаа.", food: removed });
    }

    return res.status(200).json({ message: "Хоол амжилттай устгагдлаа." });
  } catch (error) {
    next(error);
  }
};
