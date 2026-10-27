import express from 'express';
import { getCourses, createCourse, deleteCourse } from '../controllers/courseController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { createCourseSchema } from '../validations/courseValidation.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, restrictTo('admin'), validate(createCourseSchema), createCourse);

router.route('/:id')
  .delete(protect, restrictTo('admin'), deleteCourse);

export default router;