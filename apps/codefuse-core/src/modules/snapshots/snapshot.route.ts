import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  getSnapShotController,
  SaveSnapShotController,
} from "./snapshot.controller";
import { internalAuth } from "../../middlewares/internalauth.meddleware";

const snapshotRouter: Router = Router();

snapshotRouter.route("/of/:roomId").get(authMiddleware, getSnapShotController);
snapshotRouter
  .route("/internal/room/:roomId")
  .post(authMiddleware, internalAuth, SaveSnapShotController);

export default snapshotRouter;
