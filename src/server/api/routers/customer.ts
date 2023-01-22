import { createTRPCRouter } from '@/server/api/trpc';
import {
  createCustomerProfile,
  getCustomerProfileInfo,
  listCustomers,
  updateCustomerProfileInfo,
} from '@/server/controllers/customer.controller';

export const customerRouter = createTRPCRouter({
  profileInfo: getCustomerProfileInfo,
  updateProfile: updateCustomerProfileInfo,
  createProfile: createCustomerProfile,
  listCustomers,
});
