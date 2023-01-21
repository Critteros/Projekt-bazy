import { createTRPCRouter } from '@/server/api/trpc';
import {
  createCustomerProfile,
  getCustomerProfileInfo,
  updateCustomerProfileInfo,
} from '@/server/controllers/customer.controller';

export const customerRouter = createTRPCRouter({
  profileInfo: getCustomerProfileInfo,
  updateProfile: updateCustomerProfileInfo,
  createProfile: createCustomerProfile,
});
