import {z} from 'zod';

export const createCourseSchema = z.object({
  title: z.string().trim().min(1, 'Tieu de khong duoc de trong'),
  price: z.number().min(0, 'Gia ca khong duoc de trong'),
  category: z.enum(['IT', 'Design', 'Business'], {message: 'Danh muc khong ton tai'}),
  isPublished: z.boolean().default(true),
})