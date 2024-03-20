import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { sendEmail } from "../utils/sendEmail";
import MyError from "../utils/myerror";
import { generateHash, otp } from "../utils/functions";

export const signup = async (req: Request, res: Response) => {
  console.log("Signup");
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
    const { userEmail, userPassword } = req.body;
    console.log("LOGIN", userEmail, userPassword);

    const user = await User.findOne({ email: userEmail })
      .select("+password")
      .lean();

    if (!user) {
      throw new MyError(`${userEmail}-тэй хэрэглэгч бүртгэлгүй байна.`, 400);
    }
    console.log("USER", user);

    const isValid = await bcrypt.compare(userPassword, user.password);

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

    const { password, ...otherParams } = user;

    res.status(201).json({
      message: "Хэрэглэгч амжилттай нэвтэрлээ",
      token,
      user: otherParams,
    });
  } catch (error) {
    next(error);
  }
};

export const sendEmailToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("SEND_EMAIL");
  try {
    const { email } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      throw new MyError(`${email}-тэй хэрэглэгч олдсонгүй`, 400);
    }
    const otpCode = otp(4);
    findUser.otp = await generateHash(otpCode);

    await findUser.save();
    await sendEmail({ email, otp: otpCode });

    res.status(201).json({ message: "Email амжилттай илгээгдлээ." });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Verify");
    const { token } = req.query;

    const { email } = jwt.verify(
      token as string,
      process.env.JWT_PRIVATE_KEY as string
    ) as { email: string };

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      res.status(500).send("Not verified");
    } else {
    }
    findUser?.isVerified && true;
    await findUser?.save();

    res.status(200).send(`<h1 style="color: green">Valid Link </h1>`);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail, userPassword } = req.body;
    console.log("email", userEmail);
    console.log("pass", userPassword);
    const user = await User.findOne({ email: userEmail }).select("+password");
    console.log("USER", user);
    user!.password = userPassword;
    await user?.save();
    res.status(200).json({ message: "Нууц үг амжилттай солигдлоо." });
  } catch (error) {
    next(error);
  }
};
