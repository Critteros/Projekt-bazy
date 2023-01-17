import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import ms from 'ms';

import { env } from '$env/server.mjs';

type JWTContent = {
  accountId: number;
};
export const createJWT = (content: JWTContent) => {
  const tokenLifetime = ms('6h');
  const tokenExpiresAt = dayjs().add(tokenLifetime, 'ms');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const token = jwt.sign(content, env.JWT_SECRET, {
    expiresIn: tokenLifetime,
  });
  return {
    token,
    settings: {
      tokenLifetime,
      tokenExpiresAt,
    },
  };
};
