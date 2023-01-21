import { z } from 'zod';

import { RegisterRequestSchema } from '@/dto/auth';
import { AccountInfoSchema } from '@/server/db/session';
import { AccountSchema } from '@/server/db/tableSchema';

export const ChangePasswordRequestSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: RegisterRequestSchema.shape.password,
});
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

export const ListAccountsResponseSchema = z.array(
  AccountInfoSchema.extend(
    AccountSchema.pick({
      account_id: true,
    }).shape,
  ),
);
export type ListAccountsResponse = z.infer<typeof ListAccountsResponseSchema>;

export const AdminChangePasswordRequestSchema = z.object({
  accountId: z.number({
    required_error: 'Account id must be a number',
  }),
  newPassword: z
    .string({
      required_error: 'Password must be a string',
    })
    .min(1, 'Empty password is forbidden'),
});
export type AdminChangePasswordRequest = z.infer<typeof AdminChangePasswordRequestSchema>;
