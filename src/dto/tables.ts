import { z } from 'zod';

import { TableInfoSchema } from '@/server/db/tableSchema';
import { schemaMap } from '@/server/db/tableMap';

export const GetTablesRequestSchema = z
  .object({
    tableNames: z.array(z.string().min(1)).optional(),
  })
  .optional();
export type GetTablesRequest = z.infer<typeof GetTablesRequestSchema>;

export const GetTablesResponseSchema = z.array(TableInfoSchema);
export type GetTablesResponse = z.infer<typeof GetTablesResponseSchema>;

const SchemaMapZod = z.object(schemaMap);
export const GetTableDataRequestSchema = z.object({
  tableName: SchemaMapZod.keyof(),
});
export type GetTableDataRequest = z.infer<typeof GetTableDataRequestSchema>;
export type GetTableDataResponse = z.infer<typeof SchemaMapZod>[keyof typeof schemaMap][];
