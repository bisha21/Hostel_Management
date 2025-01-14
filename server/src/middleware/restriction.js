import AppError from "../utlis/appError.js";

export const restrictTo = (role) => (req, res, next) => {
    if (role===req.user.user_type) {
        return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
};