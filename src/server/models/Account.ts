import type { Pool } from 'pg';
import type { Account as AccountTable } from '@/server/db/tableTypes';

export class Account {
  constructor(private dbPool: Pool) {}

  public async getByLogin(login: string) {
    const query = await this.dbPool.query<AccountTable>({
      name: 'fetch-user',
      text: 'SELECT * FROM account WHERE login=$1 LIMIT 1',
      values: [login],
    });
    if (query.rowCount === 0) return null;
    return query.rows[0]!;
  }
}
