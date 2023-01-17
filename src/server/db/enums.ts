import { z } from 'zod';

export const GenderSchema = z.enum(['male', 'female']);
export type Gender = z.infer<typeof GenderSchema>;

export const AuthRolesSchema = z.enum(['admin', 'customer', 'staff']);
export type AuthRoles = z.infer<typeof AuthRolesSchema>;
