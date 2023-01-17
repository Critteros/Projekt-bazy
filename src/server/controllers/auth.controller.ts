import { setCookie } from 'cookies-next';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';

import { publicProcedure } from '@/server/api/trpc';
import { LoginRequestSchema, type LoginResponse } from '@/dto/auth';
import { Account } from '@/server/models/Account';
import { createJWT } from '@/server/services/auth';

export const loginController = publicProcedure
  .input(LoginRequestSchema)
  .mutation<LoginResponse>(async ({ input, ctx }) => {
    // 1) Find user in the database
    const { login, password } = input;
    const accounts = new Account(ctx.db);
    const user = await accounts.getByLogin(login);
    if (user === null) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User does not exists',
      });
    }

    // 2) Check passwords securely
    if (await bcrypt.compare(password, user.password)) {
      // User is authorised, save session
      const {
        token,
        settings: { tokenLifetime },
      } = createJWT({
        accountId: user.account_id,
      });
      const { req, res } = ctx;
      setCookie('jwt', token, {
        maxAge: tokenLifetime / 1000,
        httpOnly: true,
        secure: false,
        req,
        res,
      });

      return {
        message: 'success',
      };
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid credentials',
      });
    }
  });
