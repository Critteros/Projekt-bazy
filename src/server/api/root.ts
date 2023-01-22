import { createTRPCRouter } from './trpc';
import { exampleRouter } from './routers/example';
import { authRouter } from './routers/auth';
import { sessionRouter } from './routers/session';
import { tablesRouter } from './routers/tables';
import { accountRouter } from './routers/account';
import { customerRouter } from './routers/customer';
import { staffRouter } from './routers/staff';
import { transactionsRouter } from './routers/transactions';
import { reservationsRouter } from './routers/reservations';
import { roomsRouter } from './routers/rooms';

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
  customer: customerRouter,
  staff: staffRouter,
  transactions: transactionsRouter,
  reservations: reservationsRouter,
  rooms: roomsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
