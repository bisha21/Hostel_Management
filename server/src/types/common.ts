export type UserRole = "student" | "admin";

export interface AuthUser {
  userId: number;
  email: string;
  user_type: UserRole;
  username: string;
  iat?: number;
  exp?: number;
}

export interface ApiSuccessResponse<T = unknown> {
  status: "success";
  data?: T;
  message?: string;
  results?: number;
}

export interface ApiErrorResponse {
  status: "fail" | "error";
  message: string;
  errors?: { path: string; message: string }[];
}
