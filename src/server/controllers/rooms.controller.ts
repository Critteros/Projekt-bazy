import { publicProcedure } from '@/server/api/trpc';
import { Rooms } from '@/server/models/Rooms';

export const getRoomStandards = publicProcedure.query(async ({ ctx }) => {
  const model = new Rooms(ctx.db);
  return await model.roomStandards();
});
