import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import ms from 'ms';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import { z } from 'zod';
import type { IncomingMessage, ServerResponse } from 'http';

import { env } from '$env/server.mjs';

export const JWTContentSchema = z.object({
  accountId: z.number(),
});

export type JWTContent = z.infer<typeof JWTContentSchema>;

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

export type NextAPIBase = {
  req: IncomingMessage;
  res: ServerResponse;
};

export const setJWTCookie = (content: JWTContent, { req, res }: NextAPIBase) => {
  const { token, settings: tokenSettings } = createJWT(content);

  setCookie('jwt', token, {
    maxAge: tokenSettings.tokenLifetime / 1000,
    httpOnly: true,
    secure: false,
    req,
    res,
  });
};

export const removeJWTCookie = ({ req, res }: NextAPIBase) => {
  deleteCookie('jwt', {
    req,
    res,
  });
};

export const getJWTCookie = ({ req, res }: NextAPIBase) => {
  const jwtCookieRaw = getCookie('jwt', {
    req,
    res,
  });

  const parsedCookie = z.string().safeParse(jwtCookieRaw);
  if (!parsedCookie.success) {
    return null;
  }
  const jwtCookie = parsedCookie.data;

  try {
    const tokenRaw = jwt.verify(jwtCookie, env.JWT_SECRET);

    const validation = JWTContentSchema.safeParse(tokenRaw);
    return validation.success ? validation.data : null;
  } catch (e) {
    return null;
  }
};
