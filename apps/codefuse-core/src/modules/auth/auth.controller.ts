import { Request, Response, NextFunction } from "express";
import { SignInRequest, SignUpRequest } from "@repo/shared-types/core.types";
import {
  logoutService,
  refreshTokenService,
  signInService,
  signUpService,
} from "./auth.service";
import { CookieOptions } from "@repo/shared-types/index";

export const signUpController = async (
  req: SignUpRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tokens, user } = await signUpService(req.body);
    res
      .cookie("accessToken", tokens.accessToken, await CookieOptions)
      .cookie("refreshToken", tokens.refreshToken, await CookieOptions)
      .status(201)
      .json({
        success: true,
        message: "Signed Up Successfully",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const signInController = async (
  req: SignInRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { tokens, user } = await signInService(data);

    res
      .cookie("accessToken", tokens.accessToken, await CookieOptions)
      .cookie("refreshToken", tokens.refreshToken, await CookieOptions)
      .status(201)
      .json({
        success: true,
        message: "Signed In Successfully",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id as string;
    if (userId) {
      await logoutService(userId);
    }

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(201)
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const { tokens, user } = await refreshTokenService(refreshToken);

    res
      .cookie("accessToken", tokens.accessToken, await CookieOptions)
      .cookie("refreshToken", tokens.refreshToken, await CookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Tokens refreshed successfully",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      });
  } catch (error) {
    next(error);
  }
};
