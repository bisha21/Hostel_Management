import { createToken } from '../helper/createToken.js';
import User from "../model/userModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import bcrypt from 'bcryptjs';

export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role, confirmPassword } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !role || !confirmPassword) {
        return next(new AppError('All fields are required', 400));
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return next(new AppError('Password and confirm password must match', 400));
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return next(new AppError('User already exists', 400));
    }
    


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    // Generate authentication token
    const authToken = await createToken({ userId: newUser.id });
    console.log(authToken);
    res.cookie("authToken",authToken);
    // Respond with the created user and token
    res.status(200).json({
        status: 'success',
        data: {
            ...newUser.dataValues,
            authToken,
        },
    });
});

export const login= asyncHandler(async (req, res,next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if(!user)
    {
       return next(new AppError('Invalid email or password', 400));
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword)
    {
        return next(new AppError('Invalid email or password', 400));
    }
    const authToken = await createToken({ userId: user.id });
    res.cookie("authToken",authToken);
    res.status(200).json({
        status: 'success',
        data: {
            ...user.dataValues,
            authToken,
            },
            });

})

export const logOut = asyncHandler(async (req, res) => {
    res.cookie("authToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  });





