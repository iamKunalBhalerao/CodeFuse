import { env } from "@repo/env";
import axios from "axios";

export const triggerSnapShotIfNeeded = async (
  roomId: string,
  data: string,
  version: number,
) => {
  await axios.post(
    `http://localhost:5000/api/v1/snapshot/internal/room/${roomId}`,
    {
      data,
      version,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-internal-request": env.INTERNAL_KEY,
      },
    },
  );
};
