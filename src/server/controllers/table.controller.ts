import { roleProtectedProcedure } from '@/server/api/trpc';
import { Tables } from '@/server/models/Tables';

import {
  GetTableDataRequestSchema,
  type GetTableDataResponse,
  GetTablesRequestSchema,
  type GetTablesResponse,
} from '@/dto/tables';

export const getTableInfo = roleProtectedProcedure(['admin'])
  .input(GetTablesRequestSchema)
  .query<GetTablesResponse>(async ({ input, ctx }) => {
    const model = new Tables(ctx.db);
    return model.getTableInfo(input?.tableNames);
  });

export const getTableData = roleProtectedProcedure(['admin'])
  .input(GetTableDataRequestSchema)
  .query<GetTableDataResponse>(async ({ input, ctx }) => {
    const model = new Tables(ctx.db);
    return model.getTableData(input.tableName);
  });
