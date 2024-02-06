import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { sendEmail } from "../utils/sendEmail";
import MyError from "../utils/myerror";

export const signup = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const user = await User.create({ ...newUser });
    const verifyToken = jwt.sign(
      { email: user.email },
      process.env.JWT_PRIVATE_KEY as string,
      {
        expiresIn: "5m",
      }
    );
    sendEmail({ email: user.email, token: verifyToken });
    res.status(201).json({
      message:
        "Шинэ хэрэглэгч амжилттай бүртгэгдлээ таны бүртгэлтэй имэйл хаяг руу баталгаажуулах email илгээсэн.",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Шинэ хэрэглэгч бүртгэх үед алдаа гарлаа.", error });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new MyError(`${email}-тэй хэрэглэгч бүртгэлгүй байна.`, 400);
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new MyError(`Имэйл эсвэл нууц үг буруу байна.`, 400);
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_PRIVATE_KEY as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: "Хэрэглэгч амжилттай нэвтэрлээ", token });
  } catch (error) {
    next(error);
  }
};
