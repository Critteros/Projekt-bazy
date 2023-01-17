import { publicProcedure } from '@/server/api/trpc';

export const queryInfo = publicProcedure.query(({ ctx }) => {
  if (!ctx.session) {
    return ctx.session;
  }

  console.log(ctx.session);
  const { login, roles } = ctx.session;

  return {
    login,
    roles,
  };
});
