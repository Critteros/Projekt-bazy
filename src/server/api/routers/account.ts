import { createTRPCRouter } from '@/server/api/trpc';
import { changePassword, listAccounts } from '@/server/controllers/account.controller';

export const accountRouter = createTRPCRouter({
  changePassword,
  adminListAccounts: listAccounts,
});
