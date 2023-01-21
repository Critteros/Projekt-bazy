import { createTRPCRouter } from '@/server/api/trpc';
import { getStaffProfileInfo } from '@/server/controllers/staff.controller';

export const staffRouter = createTRPCRouter({
  profileInfo: getStaffProfileInfo,
});
