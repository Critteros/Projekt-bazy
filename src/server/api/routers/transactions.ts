import { createTRPCRouter } from '@/server/api/trpc';
import { createTransaction } from '@/server/controllers/transactions.controller';

export const transactionsRouter = createTRPCRouter({
  createTransaction,
});
