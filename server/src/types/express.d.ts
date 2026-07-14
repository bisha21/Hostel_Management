import type { AuthUser } from "./common.js";

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
