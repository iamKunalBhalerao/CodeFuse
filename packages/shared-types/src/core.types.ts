import { Request } from "express";

export interface SignUp {
  fullName: string;
  email: string;
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface createUserInterface {
  fullName: string;
  email: string;
  hashedPassword: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}

export interface Room {
  name: string;
}

export type SignUpRequest = Request<{}, {}, SignUp>;
export type SignInRequest = Request<{}, {}, SignIn>;
