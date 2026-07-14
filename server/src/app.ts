import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import type { Request, Response } from "express";

import { env } from "./config/env.js";
import { sequelize } from "./config/database.js";
import "./models/associations.js";
import "./models/index.js";

import userRoute from "./routes/userRoutes.js";
import roomRoute from "./routes/roomRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import bookingRoute from "./routes/bookingRoutes.js";
import notificationRoute from "./routes/notificationRoutes.js";
import attendanceRoute from "./routes/attendanceRoutes.js";
import paymentRoute from "./routes/paymentRoutes.js";
import reportRoute from "./routes/reportRoutes.js";
import studentRoute from "./routes/studentRoute.js";
import diningRoute from "./routes/diningRoutes.js";
import complaintRoute from "./routes/complaintRoutes.js";
import { NotFoundError } from "./errors/index.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";

void sequelize; // ensures the shared connection module is initialized before routes are mounted

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "qwertyuiop", // use a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 60 * 1000, // Optional: expires in 10 minutes
    },
  }),
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS", "PUT"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
    name: "hostel management system",
  });
});

app.use("/api/auth", userRoute);
app.use("/api/students", studentRoute);
app.use("/api/room", roomRoute);
app.use("/api/maintainance", maintenanceRoutes);
app.use("/api/booking", bookingRoute);
app.use("/api/complaint", complaintRoute);
app.use("/api/sendnotification", notificationRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/report", reportRoute);
app.use("/api/dining", diningRoute);

app.use((req: Request, _res: Response) => {
  throw new NotFoundError(`Cannot find ${req.method} ${req.originalUrl} on this server`);
});
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log(`Server is running on port 3000 (${env.NODE_ENV})`);
});

export default app;
