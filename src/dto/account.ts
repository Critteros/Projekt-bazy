import { z } from 'zod';

import { RegisterRequestSchema } from '@/dto/auth';

export const ChangePasswordRequestSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: RegisterRequestSchema.shape.password,
});
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;
