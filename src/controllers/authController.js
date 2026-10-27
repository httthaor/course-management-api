import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';


const signToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET, 
    {expiresIn: '7d',}
    );
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email này đã được sử dụng', 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = signToken(newUser._id, newUser.role);

  res.status(201).json({
    success: true,
    token,
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Email hoặc mật khẩu không chính xác', 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError('Email hoặc mật khẩu không chính xác', 401));
  }

  const token = signToken(user._id, user.role);

  res.status(200).json({
    success: true,
    token,
    message: 'Đăng nhập thành công',
  });
});