import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import MyError from "../utils/myerror";
import User from "../model/user";
import { IReq } from "../utils/interface";

export const authenticate = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new MyError("token error", 400);
    }
    const token = req.headers.authorization.split("")[1];
    if (!token) {
      throw new MyError("ene uildeliig hiihiin tuld nevtreh ystoi", 400);
    }
    const { id } = jwt.verify(token!, process.env.JWT_PRIVATE_KEY!) as {
      id: string;
    };
    const findUser = await User.findById(id);
    req.user = findUser;
    next();
  } catch (error) {
    next(error);
  }
};
