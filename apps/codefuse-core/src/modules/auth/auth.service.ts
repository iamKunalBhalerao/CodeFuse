import bcrypt from "bcrypt";
import { BadRequestError, UnauthorizedError } from "@repo/errors";
import { signInZodSchema, signUpZodSchema } from "@repo/shared-types/zod.types";
import {
  createUser,
  findUserByDecodedId,
  findUserByEmail,
  removeRefreshToken,
  updateRefreshToken,
  updateUserByEmail,
} from "./auth.dao";
import { generateTokens, verifyRefreshToken } from "@repo/auth";
import { SignIn, SignUp } from "@repo/shared-types/core.types";

export const signUpService = async (data: SignUp) => {
  const parsedData = signUpZodSchema.safeParse(data);
  if (!parsedData.success) {
    throw new BadRequestError("Invalid Credentials!");
  }
  const { fullName, email, password } = parsedData.data;

  const isUserExists = await findUserByEmail(email);
  if (isUserExists) {
    throw new BadRequestError("User with this email is already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ fullName, email, hashedPassword });
  const tokens = await generateTokens({ id: user.id, email: user.email });

  await updateUserByEmail({ user, tokens });
  return { tokens, user };
};

export const signInService = async (data: SignIn) => {
  const parsedData = signInZodSchema.safeParse(data);
  if (!parsedData.success) {
    throw new BadRequestError("Invalid Email or Password!");
  }
  const { email, password } = parsedData.data;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new BadRequestError("User with this email dosent exists!");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new BadRequestError("Invalid Email or Password!");
  }

  const tokens = await generateTokens({ id: user.id, email: user.email });

  await updateUserByEmail({ user, tokens });
  return { tokens, user };
};

export const logoutService = async (userId: string) => {
  await removeRefreshToken(userId);
};

export const refreshTokenService = async (refreshToken: string) => {
  const decoded = await verifyRefreshToken(refreshToken);
  const user = await findUserByDecodedId(decoded);
  if (!user || user.refreshToken !== refreshToken) {
    throw new UnauthorizedError("Invalid refresh token!");
  }

  const tokens = await generateTokens({ id: user.id, email: user.email });
  await updateRefreshToken(user.id, tokens.refreshToken);
  return {
    tokens,
    user,
  };
};
