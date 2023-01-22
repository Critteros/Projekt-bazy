import { createTRPCRouter } from '@/server/api/trpc';
import {
  getReservationsWithoutRoom,
  getAvailableRoomsForReservation,
  assignRoomToReservation,
} from '@/server/controllers/reservations.controller';

export const reservationsRouter = createTRPCRouter({
  getReservationsWithoutRoom,
  getAvailableRoomsForReservation,
  assignRoomToReservation,
});
