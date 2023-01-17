import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(async ({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),
});
