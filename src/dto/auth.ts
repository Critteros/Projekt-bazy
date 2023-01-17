import { z } from 'zod';

export const LoginRequestSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  message: z.literal('success'),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RegisterRequestSchema = z.object({
  login: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[ A-Za-z0-9_]*$/),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(/[a-zA-Z]/),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = LoginResponseSchema;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type LogoutResponse = { message: 'success' };
