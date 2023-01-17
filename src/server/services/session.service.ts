import type { Pool } from 'pg';

import { getJWTCookie, type NextAPIBase } from '@/server/services/auth.service';
import { Account } from '@/server/models/Account';
import { hasRole, type RoleType } from '@/utils/roles';

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

export const checkSessionRole = async ({
  req,
  res,
  db,
  role,
}: NextAPIBase & { db?: Pool; role: RoleType | RoleType[] }) => {
  const session = await getUserSession({ req, res, db });
  if (!session) {
    return false;
  }

  return hasRole(session.roles, role);
};
