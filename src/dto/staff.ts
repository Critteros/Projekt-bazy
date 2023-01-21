import type { z } from 'zod';

import { StaffSchema } from '@/server/db/tableSchema';

export const StaffProfileInfoResponseSchema = StaffSchema.omit({
  staff_id: true,
  account_id: true,
});
export type StaffProfileInfoResponse = z.infer<typeof StaffProfileInfoResponseSchema>;
