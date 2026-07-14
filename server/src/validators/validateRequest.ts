import type { NextFunction, Request, Response } from "express";
import { type ZodError, type ZodType } from "zod";
import { ValidationError, type ValidationErrorDetail } from "../errors/index.js";

function formatZodError(error: ZodError): ValidationErrorDetail[] {
  return error.issues.map((issue) => ({
    path: issue.path.join(".") || "(root)",
    message: issue.message,
  }));
}

/** Validates req.body against `schema` and replaces it with the parsed (and coerced) value. */
export const validateBody =
  <T>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(new ValidationError("Invalid request body", formatZodError(result.error)));
      return;
    }
    req.body = result.data;
    next();
  };

/** Validates req.params against `schema`. Coerced values (e.g. numeric ids) are merged back in. */
export const validateParams =
  <T extends Record<string, unknown>>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      next(new ValidationError("Invalid request parameters", formatZodError(result.error)));
      return;
    }
    Object.assign(req.params, result.data);
    next();
  };

/** Validates req.query against `schema`. Coerced values are merged back in. */
export const validateQuery =
  <T extends Record<string, unknown>>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      next(new ValidationError("Invalid query parameters", formatZodError(result.error)));
      return;
    }
    Object.assign(req.query, result.data);
    next();
  };
