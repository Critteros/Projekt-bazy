import { publicProcedure, createTRPCRouter } from '@/server/api/trpc';
import { queryInfo } from '@/server/controllers/session.controller';

export const sessionRouter = createTRPCRouter({
  info: queryInfo,
});
