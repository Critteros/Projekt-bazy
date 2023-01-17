import type { Pool } from 'pg';
import bcrypt from 'bcrypt';

import type { Account as AccountTable } from '@/server/db/tableSchema';
import type { AccountInfo } from '@/server/db/session';

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

  public async getSafeUser(login: string) {
    type RowType = Pick<AccountTable, 'account_id' | 'login'>;
    const query = await this.dbPool.query<RowType>({
      name: 'fetch-user-safe',
      text: 'SELECT account_id,login FROM account WHERE login=$1 LIMIT 1',
      values: [login],
    });
    if (query.rowCount === 0) return null;
    return query.rows[0];
  }

  public async getAccountInfo(userId: number): Promise<AccountInfo | null>;
  public async getAccountInfo(login: string): Promise<AccountInfo | null>;
  public async getAccountInfo(data: number | string): Promise<AccountInfo | null> {
    let query;
    if (typeof data === 'string') {
      query = await this.dbPool.query<AccountInfo>({
        name: 'fetch-session',
        text: 'SELECT (get_user_info($1)).*',
        values: [data],
      });
    } else {
      query = await this.dbPool.query<AccountInfo>({
        name: 'fetch-session',
        text: 'SELECT (get_user_info(a.login)).* FROM account a WHERE a.account_id=$1',
        values: [data],
      });
    }

    if (query.rowCount === 0) {
      return null;
    }
    return query.rows[0]!;
  }

  public async createNewUser({ login, password }: { login: string; password: string }) {
    const hash = await bcrypt.hash(password, 10);
    type RowType = Pick<AccountTable, 'account_id' | 'login'>;
    const query = await this.dbPool.query<RowType>({
      name: 'create-new-user',
      text: 'INSERT INTO account (login, password) VALUES ($1, $2) RETURNING account_id, login',
      values: [login, hash],
    });

    return query.rows[0];
  }
}
