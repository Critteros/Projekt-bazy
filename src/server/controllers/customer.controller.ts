import { roleProtectedProcedure, protectedProcedure } from '@/server/api/trpc';
import {
  CustomerProfileInfoResponseSchema,
  CustomerUpdateProfileRequestSchema,
} from '@/dto/customer';
import { Customer } from '@/server/models/Customer';
import { TRPCError } from '@trpc/server';

export const getCustomerProfileInfo = roleProtectedProcedure(['customer']).query(({ ctx }) => {
  const { customer_profile } = ctx.session!;
  if (!customer_profile) return null;

  return CustomerProfileInfoResponseSchema.parse(customer_profile);
});

export const updateCustomerProfileInfo = roleProtectedProcedure(['customer'])
  .input(CustomerUpdateProfileRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const customerProfileId = ctx.session!.customer_profile?.customer_id;
    if (customerProfileId == undefined) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Customer profile does not exists for user ${ctx.session!.login}`,
      });
    }
    const model = new Customer(ctx.db);
    await model.updateProfile(customerProfileId, input);
  });

export const createCustomerProfile = protectedProcedure
  .input(CustomerUpdateProfileRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const customerProfileId = ctx.session!.customer_profile?.customer_id;
    if (customerProfileId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Customer profile already exists for user ${ctx.session!.login}`,
      });
    }
    const model = new Customer(ctx.db);
    await model.createProfile(ctx.session!.login, input);
  });

export const listCustomers = roleProtectedProcedure(['staff', 'admin']).query(async ({ ctx }) => {
  const model = new Customer(ctx.db);
  return await model.listCustomers();
});
