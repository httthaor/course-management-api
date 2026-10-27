import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import errorHandler from './src/middlewares/errorMiddleware.js'; 
import AppError from './src/utils/AppError.js';
dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl} trên server`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Kết nối MongoDB thành công!');
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại cổng ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err);
  });