import { Request, Response } from "express";
import User from "../model/user";
import { storeUsers } from "../data/seedData";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (users && users.length > 0) {
      return res.status(200).json({ message: "Бүх хэрэглэгч олдлоо", users });
    }
  } catch (error) {
    console.warn("DB users fetch fallback to seed store");
  }
  return res.status(200).json({ message: "Бүх хэрэглэгч олдлоо", users: storeUsers });
};
