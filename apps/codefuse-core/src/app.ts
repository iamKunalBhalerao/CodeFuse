import cors from "cors";
import { env } from "@repo/env/server";
import CookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to CodeFuse Core API!");
});

app.get("/health", (req: Request, res: Response) => {
  try {
    // Add DB, Redis or queu checks here
    res.status(200).json({
      status: "healthy",
      service: "api",
      uptime: process.uptime(),
      timeStamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "unHealthy",
    });
  }
});

app.get("/config", (req, res) => {
  // All env variables available here with full type safety
  res.json({
    nodeEnv: env.NODE_ENV,
    CORE_PORT: env.CORE_PORT,
    JWT_SECRET: env.JWT_SECRET,
  });
});

// Importing Routes
import authRouter from "./modules/auth/auth.routes";
import roomsRouter from "./modules/room/room.routes";
import snapshotRouter from "./modules/snapshots/snapshot.route";

// Using Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/snapshot", snapshotRouter);

app.use(globalErrorHandler);

export default app;
