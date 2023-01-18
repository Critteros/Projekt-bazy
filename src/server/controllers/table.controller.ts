import { roleProtectedProcedure } from '@/server/api/trpc';
import { Tables } from '@/server/models/Tables';

export const getTableInfo = roleProtectedProcedure(['admin']).query(async ({ ctx }) => {
  const model = new Tables(ctx.db);
  return model.getTableInfo();
});
