import { prisma } from "@infra/db";
import { createUserInterface } from "@repo/shared-types/core.types";

export const createUser = async ({
  fullName,
  email,
  hashedPassword,
}: createUserInterface) => {
  return await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const updateUserByEmail = async ({
  user,
  tokens,
}: {
  user: { email: string };
  tokens: { refreshToken: string };
}) => {
  return await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      refreshToken: tokens.refreshToken,
    },
  });
};

export const removeRefreshToken = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: "" },
  });
};

export const findUserByDecodedId = async (decoded: { id: string }) => {
  return await prisma.user.findUnique({
    where: { id: decoded.id },
  });
};

export const updateRefreshToken = async (id: string, refreshToken: string) => {
  await prisma.user.update({
    where: { id: id },
    data: { refreshToken: refreshToken },
  });
};
