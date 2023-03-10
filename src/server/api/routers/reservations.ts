import { createTRPCRouter } from '@/server/api/trpc';
import {
  getReservationsWithoutRoom,
  getAvailableRoomsForReservation,
  assignRoomToReservation,
  currentlyActiveReservations,
  currentReservations,
} from '@/server/controllers/reservations.controller';

export const reservationsRouter = createTRPCRouter({
  getReservationsWithoutRoom,
  getAvailableRoomsForReservation,
  assignRoomToReservation,
  currentlyActiveReservations,
  currentReservations,
});
