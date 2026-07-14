import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AuthenticationError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import type { AuthUser } from "../types/common.js";

export const protectedRoutes = asyncHandler((req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers?.authorization;
    let authToken: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      authToken = authHeader.split(" ")[1];
    } else if (req.headers.cookie) {
      const tokenCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("authToken="));
      if (tokenCookie) {
        authToken = tokenCookie.split("=")[1];
      }
    }

    if (!authToken) {
      res.status(401).send("Unauthorized: No token provided.");
      return;
    }

    const decoded = jwt.verify(authToken, env.JWT_SECRET) as AuthUser;
    req.user = decoded;
    console.log("✅ req.user", req.user);

    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("JWT Error:", message);
    next(new AuthenticationError("An error occurred during token verification."));
  }
});
