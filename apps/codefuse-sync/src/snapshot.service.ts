import { env } from "@repo/env/server";
import axios from "axios";

export const triggerSnapShot = async (
  roomId: string,
  bufferState: Buffer,
  version: number,
) => {
  await axios.post(
    `http://localhost:5000/api/v1/snapshot/internal/snapshot/${roomId}`,
    {
      version,
      data: bufferState,
    },
    {
      withCredentials: true,
      headers: {
        "x-internal-key": env.INTERNAL_KEY || "",
      },
    },
  );
};
