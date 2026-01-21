import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createRoomController,
  getRoomInfoController,
  joinRoomController,
} from "./room.controller";

const roomsRouter: Router = Router();

roomsRouter.route("/:roomId").get(authMiddleware, getRoomInfoController);
roomsRouter.route("/create").post(authMiddleware, createRoomController);
roomsRouter.route("/join/:roomId").post(authMiddleware, joinRoomController);

export default roomsRouter;
