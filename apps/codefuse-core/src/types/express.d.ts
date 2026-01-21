import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      // Make it Optional because not every request have a user
      user?: UserPayload;
    }
  }
}