import type { NextFunction, Request, Response } from "express";
import { Report } from "../models/index.js";
import { AuthenticationError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import type { CreateReportInput } from "../schemas/report.schema.js";

export const generateReport = asyncHandler(
  async (req: Request<object, unknown, CreateReportInput>, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AuthenticationError("Authentication required"));
      return;
    }
    const { userId } = req.user;
    const { report_name, type, report_status, generated_details } = req.body;

    const report = await Report.create({
      userId,
      report_name,
      type,
      report_status,
      generated_details,
    });

    res.status(201).json({
      status: "success",
      report: report.dataValues,
    });
  },
);

export const getReportbasedonUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AuthenticationError("Authentication required"));
      return;
    }
    const { userId } = req.user;

    const report = await Report.findAll({ where: { userId } });

    res.status(201).json({
      status: "success",
      report,
    });
  },
);
