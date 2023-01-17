import type { Pool } from 'pg';

import { getJWTCookie, type NextAPIBase } from '@/server/services/auth.service';
import { Account } from '@/server/models/Account';

export const getUserSession = async ({ req, res, db }: NextAPIBase & { db?: Pool }) => {
  const jwt = getJWTCookie({ req, res });
  if (!jwt) {
    return null;
  }

  const client = db ?? (await import('../db/client')).client;
  const model = new Account(client);

  const accountInfo = await model.getAccountInfo(jwt.accountId);

  if (!accountInfo) {
    return null;
  }

  return accountInfo;
};
