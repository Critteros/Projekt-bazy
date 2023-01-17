import { z } from 'zod';

import { CustomerSchema, StaffSchema, AccountSchema, AccountRolesSchema } from './tableSchema';

export const AccountInfoSchema = AccountSchema.pick({
  login: true,
}).extend({
  roles: z.array(AccountRolesSchema.shape.name),
  customer_profile: CustomerSchema.nullable(),
  staff_profile: StaffSchema.nullable(),
});
export type AccountInfo = z.infer<typeof AccountInfoSchema>;
