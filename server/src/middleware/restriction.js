import AppError from "../utlis/appError.js";

export const restrictTo = (role) => (req, res, next) => {
    if (role!==req.user.role) {
        return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
};