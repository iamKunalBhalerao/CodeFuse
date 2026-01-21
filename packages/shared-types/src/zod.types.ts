import { z } from "zod";

export const signUpZodSchema = z.object({
  fullName: z.string().min(3, "Full Name must be bigger than 3 letters!"),
  email: z.string().min(5, "Email must be bigger than 3 letters!"),
  password: z.string().min(3, "Password must be bigger than 3 letters!"),
});

export const signInZodSchema = z.object({
  email: z.string().min(5, "Email must be bigger than 5 letters!"),
  password: z.string().min(3, "Password must be bigger than 3 letters!"),
});

export const CRUDRoomZodSchema = z.object({
  name: z.string().min(3, "Name must be bigger than 3 letters!"),
});

export const updateRoomZodSchema = z.object({
  name: z.string().min(3, "Name must be bigger than 3 letters!"),
  newName: z.string().min(3, "Name must be bigger than 3 letters!"),
});
