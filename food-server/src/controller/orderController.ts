import { NextFunction, Response } from "express";
import { IReq } from "../utils/interface";

export const createOrder = async(req: IReq, res: Response, next: NextFunction) => {
  try {
    const newOrder = {
        const  = req.body
        
    }
  } catch (error) {
    next(error);
  }
};
