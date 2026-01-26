import { ClientEnv } from "@repo/env";
import axios from "axios";

export const fetchSnapShot = async (roomId: string) => {
  const response = await axios.get(
    `${ClientEnv.NEXT_PUBLIC_CORE_API_URL}/v1/snapshot/of/${roomId}`,
    {
      responseType: "arraybuffer",
      withCredentials: true,
    },
  );
  return new Uint8Array(response.data);
};
