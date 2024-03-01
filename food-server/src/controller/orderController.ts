import { NextFunction, Response } from "express";
import { IReq } from "../utils/interface";
import MyError from "../utils/myerror";
import User from "../model/user";

export const createOrder = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOrder = {
      orderNo: "#" + Math.floor(Math.random() * 1000000),
      payment: {
        paymentAmount: 90000,
      },
      address: {
        khoroo: "10 khoroo",
        duureg: "BZD",
        buildingNo: "1009",
        info: "near to school",
      },
    };
    const findUser = await User.findById(req.user._id);

    if (!findUser) {
      throw new MyError(`Бүртгэлгүй хэрэглэгч байна.`, 400);
    }
    findUser.orders.push(newOrder);
    await findUser.save();

    res.status(200).json({ message: "Захиалга амжилттай үүслээ." });
  } catch (error) {
    next(error);
  }
};
