import { roleProtectedProcedure } from '@/server/api/trpc';
import { Reservation } from '@/server/models/Reservation';
import {
  ReservationAssignRoomRequestSchema,
  ReservationAvailableRoomsRequestSchema,
} from '@/dto/reservations';

export const getReservationsWithoutRoom = roleProtectedProcedure(['staff', 'admin']).query(
  async ({ ctx }) => {
    return await new Reservation(ctx.db).getReservationsWithoutRoom();
  },
);

export const getAvailableRoomsForReservation = roleProtectedProcedure(['staff', 'admin'])
  .input(ReservationAvailableRoomsRequestSchema)
  .query(async ({ ctx, input: { reservationId } }) => {
    return await new Reservation(ctx.db).getAvailableRoomsForReservation({
      reservationId,
    });
  });

export const assignRoomToReservation = roleProtectedProcedure(['staff', 'admin'])
  .input(ReservationAssignRoomRequestSchema)
  .mutation(async ({ input, ctx }) => {
    await new Reservation(ctx.db).assignRoomToReservation(input);
  });
