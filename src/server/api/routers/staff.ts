import { createTRPCRouter } from '@/server/api/trpc';
import {
  getStaffProfileInfo,
  listStaff,
  removeStaffMember,
  updateStaffProfile,
  addStaffMember,
} from '@/server/controllers/staff.controller';

export const staffRouter = createTRPCRouter({
  profileInfo: getStaffProfileInfo,
  adminListStaff: listStaff,
  updateStaffProfile: updateStaffProfile,
  deleteStaffMember: removeStaffMember,
  addStaffMember,
});
