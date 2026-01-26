import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createRoomController,
  getRoomInfoController,
  joinRoomController,
} from "./room.controller";

const roomsRouter: Router = Router();

roomsRouter.route("/:name").get(authMiddleware, getRoomInfoController);
roomsRouter.route("/create").post(authMiddleware, createRoomController);
roomsRouter.route("/join/:name").post(authMiddleware, joinRoomController);

export default roomsRouter;
