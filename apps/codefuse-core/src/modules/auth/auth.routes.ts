import { Router } from "express";
import {
  logoutController,
  refreshTokenController,
  signInController,
  signUpController,
} from "./auth.controller";

const authRouter: Router = Router();

authRouter.post("/signup", signUpController);
authRouter.post("/signin", signInController);
authRouter.post("/logout", logoutController);
authRouter.post("/refresh", refreshTokenController);

export default authRouter;
