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

export const getAllOrders = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("orders email name phone");
    const allOrders = users.flatMap((user) =>
      user.orders.map((order) => ({
        ...order,
        user: { name: user.name, email: user.email },
      }))
    );
    res.status(200).json({ message: "All orders fetched", orders: allOrders });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const user = await User.findOne({ "orders._id": orderId });

    if (!user) {
      throw new MyError("Order not found associated with any user.", 404);
    }

    const orderIndex = user.orders.findIndex(
      (order: any) => order._id.toString() === orderId
    );

    if (orderIndex === -1) {
      throw new MyError("Order not found.", 404);
    }

    const order = user.orders[orderIndex];

    if (!order.delivery) {
      order.delivery = {
        status: "Pending",
        deliveredAt: new Date(),
      };
    }

    // TS might still complain because Mongoose types can be tricky. 
    // We are sure it exists now.
    order.delivery!.status = status;

    // Mongoose tracks changes on subdocuments in arrays when modified directly or via set
    // user.orders.set(orderIndex, order); // Explicit set might be safer but direct mod usually works with mongoose

    await user.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order: user.orders[orderIndex],
    });
  } catch (error) {
    next(error);
  }
};
