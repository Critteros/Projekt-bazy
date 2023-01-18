import { createTRPCRouter } from '@/server/api/trpc';

import { getTableInfo } from '@/server/controllers/table.controller';

export const tablesRouter = createTRPCRouter({
  tableInfo: getTableInfo,
});
