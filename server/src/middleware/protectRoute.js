import User from "../model/userModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import jwt from 'jsonwebtoken';

export const protectedRoutes = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    let authToken;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      authToken = authHeader.split(" ")[1];
      console.log("Bearer token:", authToken);
    } else if (req.headers.cookie) {
      const cookie = req.headers.cookie;
      authToken = cookie.split("=")[1];
      console.log("Cookie token:", authToken);
    }

    if (!authToken) {
      return res.status(401).send("Unauthorized: No token provided.");
    }

    // Verify the token
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      // if (err) {
      //   console.error("JWT Verification Error:", err.message);
      //   return next(new AppError("Invalid token.", 401));
      // }

      req.user = decoded; // Attach the decoded payload (user information) to req.user

      next();
    });
  } catch (error) {
    return next(new AppError("An error occurred during token verification.", 401));
  }
});
