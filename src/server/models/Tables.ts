import { z } from 'zod';
import type { Pool } from 'pg';

import { TableInfoSchema } from '@/server/db/tableSchema';
import type { TableInfo } from '@/server/db/tableSchema';
import { schemaMap } from '@/server/db/tableMap';

export class Tables {
  constructor(private dbPool: Pool) {}

  public async getTableInfo(tableNames?: string[]) {
    const query = await this.dbPool.query<TableInfo>({
      name: `get-table-info-${tableNames?.join('-') ?? 'all'}`,
      text: `SELECT table_name, columns::text[] FROM table_info ${
        tableNames ? 'WHERE table_name = ANY($1::text[])' : ''
      }`,
      values: tableNames ? [tableNames] : undefined,
    });
    return z.array(TableInfoSchema).parseAsync(query.rows);
  }

  public async getTableData(tableName: keyof typeof schemaMap) {
    let stmt;

    switch (tableName) {
      case 'table_info':
        stmt = 'SELECT table_name, columns::text[] FROM table_info';
        break;
      case 'account_role_relation':
        stmt = 'SELECT id, account_id, role_id::int FROM account_role_relation';
        break;
      case 'user_info_view':
        stmt = `SELECT 
            login,
            roles,
            row_to_json(staff_profile) AS staff_profile,
            row_to_json(customer_profile) AS customer_profile,
            roles::text[] FROM user_info_view`;
        break;
      default:
        stmt = `SELECT * FROM ${tableName}`;
        break;
    }

    const query = await this.dbPool.query({
      name: `get-table-data-${tableName}`,
      text: stmt,
    });

    const validator = schemaMap[tableName];
    return z.array(validator).parseAsync(query.rows);
  }
}
