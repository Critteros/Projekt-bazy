import type { GetServerSideProps } from 'next';
import type { RoleType } from '@/utils/roles';
import { checkSessionRole } from '@/server/services/session.service';

export const withRoleProtection = (
  role: RoleType | RoleType[],
  next?: GetServerSideProps,
  options?: { redirect?: string },
): GetServerSideProps => {
  return async (ctx) => {
    const { req, res } = ctx;
    const hasRole = await checkSessionRole({
      req,
      res,
      role,
    });
    if (!hasRole) {
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
      props: {},
    };
  };
};
