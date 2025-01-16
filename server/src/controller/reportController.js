import { Report } from "../model/reportModel.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";

export const generateReport = asyncHandler(async (req, res, next) => {
    const { userId } = req.user;
    const { report_name, type, date, report_status, generated_details } = req.body;
    if (!report_name || !type || !generated_details) {
        return next(new AppError("Required is missing"));
    }
    const report = Report.create({
        userId,
        report_name,
        type,
        date,
        report_status,
        generated_details
    })
    res.status(201).json({
        status: "success",
        report: (await report).dataValues
    });


})
export const getReportbasedonUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.user;
    const report = await Report.findAll({
        where: {
            userId
        },
    })
    if(!report){
        return next(new AppError("No report found", 404))
    }
    res.status(201).json({
        status: "success",
        report: report
    });
});