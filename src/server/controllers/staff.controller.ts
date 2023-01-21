import { roleProtectedProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { StaffProfileInfoResponseSchema } from '@/dto/staff';

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
