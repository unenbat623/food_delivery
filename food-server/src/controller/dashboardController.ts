
import { NextFunction, Response } from "express";
import { IReq } from "../utils/interface";
import User from "../model/user";

export const getDashboardStats = async (
    req: IReq,
    res: Response,
    next: NextFunction
) => {
    try {
        // 1. Total Users
        const totalUsers = await User.countDocuments();

        // 2. Aggregate Orders (Revenue and Count)
        // Since orders are embedded in users, we need to aggregate them
        const orderStats = await User.aggregate([
            { $unwind: "$orders" },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$orders.payment.paymentAmount" },
                    totalOrders: { $count: {} },
                },
            },
        ]);

        const stats = {
            totalUsers,
            totalRevenue: orderStats[0]?.totalRevenue || 0,
            totalOrders: orderStats[0]?.totalOrders || 0,
        };

        res.status(200).json({ message: "Dashboard stats fetched", stats });
    } catch (error) {
        next(error);
    }
};
