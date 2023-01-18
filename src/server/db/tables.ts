import { z } from 'zod';

export const TableInfoSchema = z.object({
  table_name: z.string(),
  columns: z.array(z.string()),
});

export type TableInfo = z.infer<typeof TableInfoSchema>;
