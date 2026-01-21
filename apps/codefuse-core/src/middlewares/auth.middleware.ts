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
    const token = req.cookies?.token || req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedError("Unauthorized: No Token provided!");
    }

    const decoded = await verifyToken(token);

    req.user = decoded;

    next();
  } catch (error: any) {
    // Error catch: Expired Token
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Unauthorized: Token has expierd!");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError("Forbiden: Invalid Token!");
    }

    console.error("Auth Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
    return;
  }
};
