import { NextFunction, Request, Response } from "express";
import { getSnapShotService, saveSnapShotService } from "./snapshot.service";

export const getSnapShotController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;
    const roomId = req.params.roomId as string;

    const snapshot = await getSnapShotService({ roomId, userId });

    res.status(201).json({
      success: true,
      message: "SnapShot fetched Successfully.",
      snapshot,
    });
  } catch (error) {
    next(error);
  }
};

export const SaveSnapShotController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = req.params.roomId as string;
    const { version, data } = req.body;

    await saveSnapShotService({
      roomId,
      version: Number(version),
      data,
    });

    res.status(201).json({
      success: true,
      message: "SnapShot fetched Successfully.",
    });
  } catch (error) {
    next(error);
  }
};
