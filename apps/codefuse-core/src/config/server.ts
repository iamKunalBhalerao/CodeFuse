import { env } from "@repo/env/server";

const PORT = env.CORE_PORT || 5000;
const NODE_ENV = env.NODE_ENV;
const JWT_SECRET = env.JWT_SECRET;

export { PORT, NODE_ENV, JWT_SECRET };
