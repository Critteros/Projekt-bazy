import { createTRPCRouter } from '@/server/api/trpc';
import { changePassword } from '@/server/controllers/account.controller';

export const accountRouter = createTRPCRouter({
  changePassword,
});
