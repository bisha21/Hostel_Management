import type { AuthUser } from "./common.js";
import "express-session";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    email?: string;
    otp?: string;
  }
}

export {};
