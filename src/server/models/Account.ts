import type { Pool } from 'pg';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';

import type { Account as AccountTable } from '@/server/db/tableSchema';
import type { AccountInfo } from '@/server/db/session';
import type { ChangePasswordRequest } from '@/dto/account';
import { ListAccountsResponseSchema } from '@/dto/account';

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
        text: `SELECT 
                    v.login,
                    v.roles,
                    row_to_json(v.customer_profile) AS customer_profile,
                    row_to_json(v.staff_profile) AS staff_profile
                    FROM user_info_view v WHERE login=$1`,
        values: [data],
      });
    } else {
      query = await this.dbPool.query<AccountInfo>({
        name: 'fetch-session',
        text: `WITH cte AS (SELECT login FROM account WHERE account_id=$1)
                SELECT 
                    v.login,
                    v.roles,
                    row_to_json(v.customer_profile) AS customer_profile,
                    row_to_json(v.staff_profile) AS staff_profile
                    FROM user_info_view v,cte WHERE v.login=cte.login;`,
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

  public async changePassword({
    oldPassword,
    newPassword,
    login,
    accountId,
    adminChange,
  }: Omit<ChangePasswordRequest, 'oldPassword'> & {
    login?: AccountTable['login'];
    accountId?: AccountTable['account_id'];
    oldPassword?: ChangePasswordRequest['oldPassword'];
    adminChange?: boolean;
  }) {
    if (oldPassword === undefined && !adminChange) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Attempt to change the password without admin right',
      });
    }

    if (login === undefined && accountId === undefined) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Not target was specified for password change operation',
      });
    }

    if (!adminChange) {
      // 1) Query old password from the database
      type RowType = Pick<AccountTable, 'password'>;

      let queryResult;

      if (accountId) {
        queryResult = await this.dbPool.query<RowType>({
          name: `query-user-password-using-accountId`,
          text: 'SELECT password FROM account WHERE account_id=$1',
          values: [accountId],
        });
      } else {
        queryResult = await this.dbPool.query<RowType>({
          name: `query-user-password-using-login`,
          text: 'SELECT password FROM account WHERE login=$1',
          values: [login],
        });
      }

      const returnedInfo = queryResult.rows[0];
      if (!returnedInfo) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User does not exists in a database',
        });
      }

      // Test if old password matches
      if (!(await bcrypt.compare(oldPassword!, returnedInfo.password))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Old password does not match',
        });
      }
    }

    // Encrypt new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update db
    let result;
    if (accountId) {
      result = await this.dbPool.query({
        name: 'update-password-using-accountId',
        text: 'UPDATE account SET password=$1 WHERE account_id=$2',
        values: [hashedPassword, accountId],
      });
    } else {
      result = await this.dbPool.query({
        name: 'update-password-using-login',
        text: 'UPDATE account SET password=$1 WHERE login=$2',
        values: [hashedPassword, login],
      });
    }

    if (result.rowCount !== 1) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Unsuccessful UPDATE query',
      });
    }
  }

  public async listAccounts() {
    const query = await this.dbPool.query({
      name: 'list-accounts',
      text: ` SELECT 
                    (SELECT account_id FROM account a WHERE a.login=v.login) as account_id,
                    v.login,
                    v.roles,
                    row_to_json(v.customer_profile) AS customer_profile,
                    row_to_json(v.staff_profile) AS staff_profile FROM user_info_view v;`,
    });
    return ListAccountsResponseSchema.parse(query.rows);
  }
}
