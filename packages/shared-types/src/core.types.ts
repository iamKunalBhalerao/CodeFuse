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

export interface YjsUpdatePayload {
  roomId: string;
  state: string; // Base64 encoded Uint8Array
}

export interface SnapShotSave {
  roomId: string;
  state: string; // Array of Base64 strings
}

export type SignUpRequest = Request<{}, {}, SignUp>;
export type SignInRequest = Request<{}, {}, SignIn>;
export type SnapShotSaveRequest = Request<{}, {}, SnapShotSave>;
