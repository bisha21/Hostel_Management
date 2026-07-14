import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthUser } from "../types/common.js";

export type TokenPayload = Omit<AuthUser, "iat" | "exp">;

export const createToken = async (data: TokenPayload): Promise<string> => {
  try {
    return jwt.sign(data, env.JWT_SECRET, { expiresIn: "1h" });
  } catch {
    throw new Error("Failed to create auth token");
  }
};
