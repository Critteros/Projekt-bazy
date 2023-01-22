import { z } from 'zod';
import {
  AccountSchema,
  HotelRoomViewSchema,
  PaymentsSchema,
  ReservationSchema,
} from '@/server/db/tableSchema';

export const NewTransactionRequestSchema = z.object({
  customer: AccountSchema.shape.login,
  paymentMethod: PaymentsSchema.shape.method,
  reservations: z
    .array(
      z.object({
        dateIn: ReservationSchema.shape.date_in,
        dateOut: ReservationSchema.shape.date_out,
        cost: ReservationSchema.shape.reservation_cost,
        standards: HotelRoomViewSchema.shape.room_standards,
      }),
    )
    .min(1, 'At least one reservation is required'),
});
export type NewTransactionRequest = z.infer<typeof NewTransactionRequestSchema>;
