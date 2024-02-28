import { NextFunction, Response } from "express";
import Basket from "../model/basket";
import { IReq } from "../utils/interface";
import MyError from "../utils/myerror";

export const addToBasketByUserId = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  console.log("User", req.user);
  console.log("Body", req.body);
  try {
    const findBasket = await Basket.findOne({ user: req.user._id });

    if (!findBasket) {
      const basket = await (
        await Basket.create({
          user: req.user._id,
          foods: [
            {
              food: req.body.foodId,
              qty: req.body.quantity,
            },
          ],
          totalPrice: req.body.totalPrice,
        })
      ).populate("foods.food");
      res.status(200).json({ message: "Хоол амжилттай нэмлээ-1", basket });
    } else {
      console.log("BFOODS", findBasket);
      const findIndex = findBasket.foods.findIndex(
        (el) => el.food.toString() === req.body.foodId
      );
      console.log("Find", findIndex);

      if (findIndex !== -1) {
        findBasket.foods[findIndex].qty = Number(req.body.quantity);
        findBasket.totalPrice = Number(req.body.totalPrice);
      } else {
        findBasket.foods.push(req.body.foodId);
        findBasket.totalPrice = Number(req.body.totalPrice);
      }

      const savedBasket = await (
        await findBasket.save()
      ).populate("foods.food");

      // const savedBasket = await (
      //   await findBasket.save()
      // ).populate("foods.food");

      console.log("ChangedFoods", savedBasket);

      res.status(200).json({
        message: "Хоол амжилттай нэмлээ-2",
        basket: { foods: savedBasket.foods, totalPrice: findBasket.totalPrice },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getFromBasketByUser = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  console.log("User", req.user);
  try {
    const findBasket = await Basket.findOne({ user: req.user._id }).populate(
      "foods.food"
    );

    if (!findBasket) {
      throw new MyError("Сагсны мэдээлэл олдсонгүй", 400);
    }

    res.status(200).json({
      message: "Хоолны мэдээлэл",
      basket: { foods: findBasket.foods, totalPrice: findBasket.totalPrice },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFromBasketByUser = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  const { foodId } = req.params;
  const { user } = req;

  console.log("User", user);
  console.log("FoodId", foodId);
  try {
    const findBasket = await Basket.findOne({ user: user._id }).populate(
      "foods.food"
    );
    if (!findBasket) {
      throw new MyError("Сагсны мэдээлэл олдсонгүй", 400);
    }
    const findIndex = findBasket.foods.findIndex(
      (el) => el.food.toString() === foodId
    );
    console.log("Find IDX: ", findIndex);
    if (findIndex !== -1) {
      findBasket.foods.splice(findIndex, 1);
    }
    const savedBasket = await (await findBasket.save()).populate("foods.food");
    res.status(200).json({
      message: "Хоолыг сагснаас хаслаа.",
      basket: { foods: savedBasket.foods, totalPrice: savedBasket.totalPrice },
    });
  } catch (error) {
    next(error);
  }
};
