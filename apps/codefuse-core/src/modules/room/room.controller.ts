import { NextFunction, Request, Response } from "express";
import {
  createRoomService,
  getRoomService,
  joinRoomService,
} from "./room.service";
import { Room } from "@repo/shared-types/core.types";

export const createRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;
    const data = req.body as Room;

    const room = await createRoomService({ data, userId });

    res.status(201).json({
      success: true,
      message: "Room Created Successfully.",
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const joinRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;
    const name = req.params.name as string;

    const roomData = await joinRoomService({ name, userId });

    res.status(201).json({
      success: true,
      message: "Room Joined Successfully.",
      roomData,
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;
    const roomId = req.params.roomId as string;

    const data = await getRoomService({ roomId, userId });

    res.status(201).json({
      success: true,
      message: "Room Joined Successfully.",
      data: {
        ...data.room,
        memberPermission: data.roomMember.permission,
      },
    });
  } catch (error) {
    next(error);
  }
};
