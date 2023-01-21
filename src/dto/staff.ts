import { z } from 'zod';

import { AccountSchema, StaffSchema } from '@/server/db/tableSchema';

export const StaffProfileInfoResponseSchema = StaffSchema.omit({
  staff_id: true,
  account_id: true,
});
export type StaffProfileInfoResponse = z.infer<typeof StaffProfileInfoResponseSchema>;

export const ListStaffResponseSchema = z.array(
  StaffSchema.extend(AccountSchema.shape).omit({
    password: true,
  }),
);
export type ListStaffResponse = z.infer<typeof ListStaffResponseSchema>;

export const StaffProfileUpdateRequestSchema = z.object({
  ...StaffSchema.omit({
    staff_id: true,
    job_title: true,
    account_id: true,
  }).shape,
  jobTitle: StaffSchema.shape.job_title,
  staffId: StaffSchema.shape.staff_id,
});
export type StaffProfileUpdateRequest = z.infer<typeof StaffProfileUpdateRequestSchema>;

export const StaffProfileDeleteRequestSchema = StaffProfileUpdateRequestSchema.pick({
  staffId: true,
});
export type StaffProfileDeleteRequest = z.infer<typeof StaffProfileDeleteRequestSchema>;

export const StaffProfileAddRequestSchema = z.object({
  ...StaffSchema.omit({
    staff_id: true,
    account_id: true,
    job_title: true,
  }).shape,
  lastname: StaffSchema.shape.lastname,
  firstname: StaffSchema.shape.firstname,
  accountId: StaffSchema.shape.account_id,
  jobTitle: StaffSchema.shape.job_title,
});
export type StaffProfileAddRequest = z.infer<typeof StaffProfileAddRequestSchema>;
