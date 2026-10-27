import AppError from '../utils/AppError.js';

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next(); 
    } catch (error) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      
      return next(new AppError(errorMessage, 400));
    }
  };
};