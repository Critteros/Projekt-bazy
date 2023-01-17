import { z } from 'zod';

export const GenderSchema = z.enum(['male', 'female'] as const);
export type Gender = z.infer<typeof GenderSchema>;

export const AuthRolesSchema = z.union([
  z.literal('admin'),
  z.literal('customer'),
  z.literal('staff'),
]);
export type AuthRoles = z.infer<typeof AuthRolesSchema>;
