import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  EMAIL: z.string().min(1, "EMAIL is required"),
  EMAIL_PASSWORD: z.string().min(1, "EMAIL_PASSWORD is required"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
  KHALTI_SECRET_KEY: z.string().min(1, "KHALTI_SECRET_KEY is required"),
  KHALTI_GATEWAY_URL: z.string().min(1, "KHALTI_GATEWAY_URL is required"),
  ESEWA_SECRET_KEY: z.string().optional(),
  ESEWA_GATEWAY_URL: z.string().optional(),
  ESEWA_PRODUCT_CODE: z.string().optional(),
  USER_NAME: z.string().optional(),
  DATABASE_NAME: z.string().optional(),
  BACKEND_URI: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
export type Env = typeof env;
