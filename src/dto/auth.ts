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
