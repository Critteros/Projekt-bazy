import { createTRPCRouter } from '@/server/api/trpc';
import { getRoomStandards } from '@/server/controllers/rooms.controller';

export const roomsRouter = createTRPCRouter({
  standards: getRoomStandards,
});
