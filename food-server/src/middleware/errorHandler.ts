import { Response, Request, NextFunction } from "express";
import "colors";

interface IMyError extends Error {
  statusCode: number;
}

const errorHandler = (
  err: IMyError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ERR MESSAGE =====>", err.message.cyan);
  console.log("ERR STACK =====>", err.stack?.red.underline);

  if (err.message === "jwt expired")
    err.message = "Token-ний хугацаа дууссан байна дахин нэвтэрнэ үү";
  else if (err.message === "invalid signature")
    err.message = "Token буруу байна дахин нэвтэрнэ үү";
  else err.message = err.message;

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
