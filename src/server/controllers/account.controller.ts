import { protectedProcedure, roleProtectedProcedure } from '@/server/api/trpc';
import { ChangePasswordRequestSchema } from '@/dto/account';
import { Account } from '@/server/models/Account';

export const changePassword = protectedProcedure
  .input(ChangePasswordRequestSchema)
  .mutation(async ({ input: { newPassword, oldPassword }, ctx }) => {
    const model = new Account(ctx.db);
    await model.changePassword({
      newPassword: newPassword,
      oldPassword: oldPassword,
      login: ctx.session!.login,
    });
  });

export const listAccounts = roleProtectedProcedure(['admin']).query(async ({ ctx }) => {
  const model = new Account(ctx.db);
  return model.listAccounts();
});
