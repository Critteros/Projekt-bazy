import { z } from 'zod';
import { CustomerSchema, UserInfoViewSchema } from '@/server/db/tableSchema';

export const CustomerProfileInfoResponseSchema = CustomerSchema.omit({
  customer_id: true,
  account_id: true,
});
export type CustomerProfileInfoResponse = z.infer<typeof CustomerProfileInfoResponseSchema>;

export const CustomerUpdateProfileRequestSchema = z.object({
  ...CustomerSchema.omit({
    customer_id: true,
    account_id: true,
    contact_number: true,
  }).shape,
  contactNumber: CustomerSchema.shape.contact_number,
});
export type CustomerUpdateProfileRequest = z.infer<typeof CustomerUpdateProfileRequestSchema>;

export const ListCustomersResponseSchema = z.array(UserInfoViewSchema.shape.login);
export type ListCustomersResponse = z.infer<typeof ListCustomersResponseSchema>;
