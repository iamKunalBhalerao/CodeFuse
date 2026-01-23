import { NextFunction, Request, Response } from "express";
import { CoreError } from "@repo/errors";

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

  // Debug line - baad mein remove kar dena
  console.log("Error type:", err.constructor.name);
  console.log("Is CoreError:", err instanceof CoreError);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error! ",
  });
};
