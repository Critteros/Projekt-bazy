import { createTRPCRouter } from './trpc';
import { exampleRouter } from './routers/example';
import { authRouter } from './routers/auth';
import { sessionRouter } from './routers/session';
import { tablesRouter } from './routers/tables';
import { accountRouter } from './routers/account';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  session: sessionRouter,
  tables: tablesRouter,
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
