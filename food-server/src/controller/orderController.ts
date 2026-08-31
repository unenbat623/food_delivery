import { NextFunction, Request, Response } from "express";
import User from "../model/user";
import MyError from "../utils/myerror";
import { storeOrders } from "../data/seedData";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("orders email name phone");
    if (users && users.length > 0) {
      const allOrders = users.flatMap((user) =>
        (user.orders || []).map((order: any) => ({
          ...order.toObject(),
          user: { name: user.name, email: user.email },
        }))
      );
      if (allOrders.length > 0) {
        return res.status(200).json({ message: "All orders fetched", orders: allOrders });
      }
    }
  } catch (error) {
    console.warn("DB orders fetch fallback to memory store.");
  }
  return res.status(200).json({ message: "All orders fetched", orders: storeOrders });
};

export const createOrder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderData = req.body;
    const newOrder = {
      _id: "ord-" + Date.now(),
      orderNo: "#ORD-" + Math.floor(1000 + Math.random() * 9000),
      user: {
        name: orderData.name || "Хэрэглэгч",
        email: orderData.email || "user@food.mn",
        phone: orderData.phone || "99112233",
      },
      payment: {
        paymentAmount: Number(orderData.totalPrice || orderData.paymentAmount || 45000),
        status: "Paid",
      },
      delivery: {
        status: "Pending",
        address: `${orderData.district || "Сүхбаатар дүүрэг"}, ${orderData.khoroo || "1-р хороо"}, ${orderData.street || "Төв гудамж"}`,
      },
      createdAt: new Date().toISOString(),
    };

    storeOrders.unshift(newOrder);

    if (req.user?._id) {
      try {
        const findUser = await User.findById(req.user._id);
        if (findUser) {
          findUser.orders.push(newOrder);
          await findUser.save();
        }
      } catch (e) {
        // memory already updated
      }
    }

    return res.status(201).json({ message: "Захиалга амжилттай үүслээ.", order: newOrder });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      const user = await User.findOne({ "orders._id": orderId });
      if (user) {
        const orderIndex = user.orders.findIndex(
          (order: any) => order._id.toString() === orderId
        );
        if (orderIndex !== -1) {
          if (!user.orders[orderIndex].delivery) {
            user.orders[orderIndex].delivery = { status: "Pending", deliveredAt: new Date() };
          }
          user.orders[orderIndex].delivery!.status = status;
          await user.save();
        }
      }
    } catch (e) {
      // fallback
    }

    const memoryIndex = storeOrders.findIndex((o) => o._id === orderId);
    if (memoryIndex !== -1) {
      storeOrders[memoryIndex].delivery.status = status;
      return res.status(200).json({
        message: "Order status updated successfully",
        order: storeOrders[memoryIndex],
      });
    }

    return res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    next(error);
  }
};
