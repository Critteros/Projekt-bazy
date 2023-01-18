import { z } from 'zod';
import type { Pool } from 'pg';

import { TableInfoSchema } from '@/server/db/tables';
import type { TableInfo } from '@/server/db/tables';

export class Tables {
  constructor(private dbPool: Pool) {}

  public async getTableInfo() {
    const query = await this.dbPool.query<TableInfo>({
      name: 'get-table-info',
      text: 'SELECT table_name, columns::text[] FROM table_info',
    });
    return z.array(TableInfoSchema).parse(query.rows);
  }
}
