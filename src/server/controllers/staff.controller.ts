import { roleProtectedProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import {
  StaffProfileAddRequestSchema,
  StaffProfileDeleteRequestSchema,
  StaffProfileInfoResponseSchema,
  StaffProfileUpdateRequestSchema,
} from '@/dto/staff';
import { Staff } from '@/server/models/Staff';

export const getStaffProfileInfo = roleProtectedProcedure(['staff']).query(({ ctx }) => {
  const staffProfile = ctx.session!.staff_profile;
  if (!staffProfile) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Staff profile does not exists for user ${ctx.session!.login}`,
    });
  }
  return StaffProfileInfoResponseSchema.parse(staffProfile);
});

export const listStaff = roleProtectedProcedure(['admin']).query(({ ctx }) => {
  const model = new Staff(ctx.db);
  return model.getStaffMembers();
});

export const updateStaffProfile = roleProtectedProcedure(['admin'])
  .input(StaffProfileUpdateRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const model = new Staff(ctx.db);
    await model.updateStaffProfile(input);
  });

export const removeStaffMember = roleProtectedProcedure(['admin'])
  .input(StaffProfileDeleteRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const model = new Staff(ctx.db);
    await model.removeStaffMember(input);
  });

export const addStaffMember = roleProtectedProcedure(['admin'])
  .input(StaffProfileAddRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const model = new Staff(ctx.db);
    await model.createStaffProfile(input);
  });
