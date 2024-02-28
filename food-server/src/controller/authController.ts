import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { sendEmail } from "../utils/sendEmail";
import MyError from "../utils/myerror";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Signup");
  try {
    const newUser = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const user = await User.create({ ...newUser, password: hashedPassword });
    const verifyToken = jwt.sign(
      { email: user.email },
      process.env.JWT_PRIVATE_KEY as string, ////
      {
        expiresIn: "5m",
      }
    );
    console.log("next signup");
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
    console.log("LOGIN", req.body);
    const { userEmail, userPassword } = req.body;
    console.log("LOGIN", userEmail);
    console.log("Password", userPassword);

    const user = await User.findOne({ email: userEmail }).select("+password");

    if (!user) {
      throw new MyError(`${userEmail}-тэй хэрэглэгч бүртгэлгүй байна.`, 400);
    }
    console.log("success", user);
    const isValid = await bcrypt.compare(userPassword, user.password);
    console.log("bcrypted", isValid);
    if (!isValid) {
      console.log("error");
      throw new MyError(`Имэйл эсвэл нууц үг буруу байна.`, 400);
    }
    console.log("nevterlee");
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_PRIVATE_KEY as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const { password, ...otherParams } = user;
    console.log("OTHER PARAMS", user);
    res.status(201).json({
      message: "Хэрэглэгч амжилттай нэвтэрлээ",
      token,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
