import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/common.js";

export const restrictTo =
  (role: UserRole) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (role === req.user?.user_type) {
      res.status(403).json({
        status: "403 Forbidden",
        message: "you have not access to perform this action",
      });
      return;
    }
    next();
  };
