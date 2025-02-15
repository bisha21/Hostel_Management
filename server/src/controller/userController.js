import { createToken } from '../helper/createToken.js';
import User from "../model/userModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import bcrypt from 'bcryptjs';

export const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email,address,profile, password, user_type, confirmPassword,phoneNumber } = req.body;

    // Check for missing fields
    if (!username || !email || !password || !user_type || !confirmPassword||!address | !phoneNumber) {
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
        username,
        email,
        password: hashedPassword,
        user_type,
        address,
        phone_number:phoneNumber,
        profile
    });

    // Generate authentication token
    const authToken = await createToken({ userId: newUser.id ,email: newUser.email,user_type:newUser.user_type });
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
    const authToken = await createToken({ userId: user.id,email: user.email,user_type:user.user_type});
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

  export const getStudent= asyncHandler(async (req, res) => {
    const student = await User.findAll({ where: { user_type: 'student' } });
    res.status(200).json({
        status: 'success',
        data: student
    });
  });





