import { z } from 'zod';

export const GenderSchema = z.enum(['male', 'female'] as const, {
  required_error: 'Gender is either male or female',
});
export type Gender = z.infer<typeof GenderSchema>;

export const AuthRolesSchema = z.union(
  [z.literal('admin'), z.literal('customer'), z.literal('staff')],
  {
    required_error: 'Auth role can must be either "admin", "customer" or "staff',
  },
);
export type AuthRoles = z.infer<typeof AuthRolesSchema>;
