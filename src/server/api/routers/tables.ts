import { createTRPCRouter } from '@/server/api/trpc';

import { getTableData, getTableInfo } from '@/server/controllers/table.controller';

export const tablesRouter = createTRPCRouter({
  tableInfo: getTableInfo,
  tableData: getTableData,
});
