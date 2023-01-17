import { createTRPCRouter } from '@/server/api/trpc';

import { loginController, registerController } from '@/server/controllers/auth.controller';

export const authRouter = createTRPCRouter({
  login: loginController,
  register: registerController,
});
