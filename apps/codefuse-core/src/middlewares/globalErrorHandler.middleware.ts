import { NextFunction, Request, Response } from "express";
import { CoreError } from "../libs/errors/core.error";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CoreError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown error
  console.log("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    success: false,
    message: "Iternal Server Error! ",
  });
};
