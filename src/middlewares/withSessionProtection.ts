import type { GetServerSideProps } from 'next';

import { getUserSession } from '@/server/services/session.service';

export const withSessionProtection = (
  next?: GetServerSideProps,
  options?: { redirect?: string },
): GetServerSideProps => {
  return async (ctx) => {
    const { req, res } = ctx;
    const session = await getUserSession({
      req,
      res,
    });

    if (session === null) {
      return {
        redirect: {
          destination: options?.redirect ?? '/',
          permanent: false,
        },
      };
    }

    if (next) {
      return next(ctx);
    }
    return {
      props: {
        session,
      },
    };
  };
};
