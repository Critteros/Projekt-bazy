import { z } from 'zod';

import { AccountSchema } from '@/server/db/tableSchema';

export const LoginRequestSchema = z.object({
  login: AccountSchema.shape.login,
  password: AccountSchema.shape.password,
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  message: z.literal('success'),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RegisterRequestSchema = z.object({
  login: AccountSchema.shape.login
    .min(3)
    .max(50)
    .regex(/^[ A-Za-z0-9_]*$/),
  password: AccountSchema.shape.password
    .min(8)
    .max(50)
    .regex(/[a-zA-Z]/),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = LoginResponseSchema;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type LogoutResponse = { message: 'success' };
