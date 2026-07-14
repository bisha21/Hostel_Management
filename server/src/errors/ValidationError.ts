import { AppError } from "./AppError.js";

export interface ValidationErrorDetail {
  path: string;
  message: string;
}

export class ValidationError extends AppError {
  readonly details: ValidationErrorDetail[];

  constructor(message = "Validation failed", details: ValidationErrorDetail[] = []) {
    super(message, 400);
    this.details = details;
  }
}
