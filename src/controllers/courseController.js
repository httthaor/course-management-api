import Course from '../models/Course.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';

export const getCourses = asyncHandler(async (req, res, next) => {
  const { category, search } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const courses = await Course.find(filter).populate('instructor', 'name email');

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

export const createCourse = asyncHandler(async (req, res, next) => {
  const { title, price, category, isPublished } = req.body;

  const newCourse = await Course.create({
    title,
    price,
    category,
    isPublished,
    instructor: req.user._id, 
  });

  res.status(201).json({
    success: true,
    data: newCourse,
  });
});

export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.courseId || req.params.id);

  if (!course) {
    return next(new AppError('Không tìm thấy khóa học này', 404));
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Đã xóa khóa học thành công',
  });
});