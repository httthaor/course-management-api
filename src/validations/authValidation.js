import {z} from 'zod';

export const registerSchema = z.object({
    name: z
    .string({required_error: 'Ten nguoi dung khong duoc de trong'})
    .trim()
    .min(1, 'Ten khong duoc de trong'),

    email: z
    .string({required_error: 'Email khong duoc de trong'})
    .trim()
    .email('Email khong dung dinh dang'),

    password: z
    .string({required_error: 'Mat khau khong duoc de trong'})
    .trim()
    .min(6, 'Mat khau phai co it nhat 6 ky tu'),
});

export const loginSchema = z.object({   
    email: z
    .string({required_error: 'Email khong duoc de trong'})
    .trim()
    .email('Email khong dung dinh dang'),

    password: z
    .string({required_error: 'Mat khau khong duoc de trong'})
    .trim()
    .min(1, 'Mat khau khong duoc de trong'),
})

