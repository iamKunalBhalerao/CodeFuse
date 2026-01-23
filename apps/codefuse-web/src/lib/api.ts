import { ClientEnv } from "@repo/env";
import axios from "axios";

export const fetchSnapShot = async (roomId: string) => {
  const { data } = await axios.get(
    `${ClientEnv.NEXT_PUBLIC_CORE_API_URL}/v1/snapshot/of/${roomId}`,
    { responseType: "arraybuffer" },
  );
  if (!data.success) throw new Error("Failed to load SnapShot!");
  return new Uint8Array(await data.arrayBuffer());
};
