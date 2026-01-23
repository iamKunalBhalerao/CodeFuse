import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@repo/errors";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@repo/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken || req.cookies?.accessToken;
    if (!token) {
      return next(new UnauthorizedError("Unauthorized: No Token provided!"));
    }

    const decoded = await verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Unauthorized: Token has expierd!"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError("Forbiden: Invalid Token!"));
    }
    return next(error);
  }
};
