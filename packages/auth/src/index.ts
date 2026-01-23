import { env } from "@repo/env/server";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@repo/shared-types/core.types";
import { BadRequestError, UnauthorizedError } from "@repo/errors";

export const generateAccessToken = ({ id, email }: TokenPayload) => {
  try {
    return jwt.sign(
      {
        id,
        email,
      },
      env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );
  } catch (error) {
    throw new BadRequestError("Error while generating AccessToken!");
  }
};

export const generateRefreshToken = ({ id, email }: TokenPayload) => {
  try {
    return jwt.sign(
      {
        id,
        email,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
  } catch (error) {
    throw new BadRequestError("Error while generating AccessToken!");
  }
};

export const generateTokens = (payload: TokenPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, env.JWT_SECRET) as TokenPayload;
};
