import { createTRPCRouter } from '@/server/api/trpc';

import { loginController } from '@/server/controllers/auth.controller';

export const authRouter = createTRPCRouter({
  login: loginController,
});
