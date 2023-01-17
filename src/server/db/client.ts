/**
 * File used to export database client
 * global is used to prevent issues when hot-reloading
 * @see https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */
import { Pool } from 'pg';

import { env } from '$env/server.mjs';

const globalContext = global as unknown as { dbClient: Pool };

export const client =
  globalContext.dbClient ||
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production')
  globalContext.dbClient = new Pool({
    connectionString: env.DATABASE_URL,
  });
