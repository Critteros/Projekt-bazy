import { z } from 'zod';
import {
  GetAccountReservationsSchema,
  HotelRoomViewSchema,
  ReservationInfoViewSchema,
  ReservationSchema,
} from '@/server/db/tableSchema';

export const ReservationsWithoutRoomResponseSchema = z.array(
  z.object({
    dateIn: ReservationInfoViewSchema.shape.date_in,
    dateOut: ReservationInfoViewSchema.shape.date_out,
    standards: ReservationInfoViewSchema.shape.room_standards,
    reservationCost: ReservationInfoViewSchema.shape.reservation_cost,
    reservationId: ReservationInfoViewSchema.shape.reservation_id,
  }),
);
export type ReservationsWithoutRoomResponse = z.infer<typeof ReservationsWithoutRoomResponseSchema>;

export const ReservationAvailableRoomsRequestSchema = z.object({
  reservationId: ReservationSchema.shape.reservation_id,
});
export type ReservationAvailableRoomsRequest = z.infer<
  typeof ReservationAvailableRoomsRequestSchema
>;

export const ReservationAvailableRoomsResponseSchema = z.array(
  z.object({
    roomNumber: HotelRoomViewSchema.shape.room_number,
    description: HotelRoomViewSchema.shape.description,
    price: HotelRoomViewSchema.shape.price,
    standards: HotelRoomViewSchema.shape.room_standards,
  }),
);
export type ReservationAvailableRoomsResponse = z.infer<
  typeof ReservationAvailableRoomsResponseSchema
>;

export const ReservationAssignRoomRequestSchema = z.object({
  reservationId: ReservationSchema.shape.reservation_id,
  roomNumber: ReservationSchema.shape.room_number,
});
export type ReservationAssignRoomRequest = z.infer<typeof ReservationAssignRoomRequestSchema>;

export const ReservationCurrentlyActiveResponseSchema = z.array(
  z.object({
    dateIn: ReservationInfoViewSchema.shape.date_in,
    dateOut: ReservationInfoViewSchema.shape.date_out,
    roomNumber: z.number(),
    standards: ReservationInfoViewSchema.shape.room_standards,
  }),
);
export type ReservationCurrentlyActiveResponse = z.infer<
  typeof ReservationCurrentlyActiveResponseSchema
>;

export const ReservationsCurrentAccountReservationsResponseSchema = z.array(
  z.object({
    ongoing: GetAccountReservationsSchema.shape.ongoing,
    dateIn: GetAccountReservationsSchema.shape.date_in,
    dateOut: GetAccountReservationsSchema.shape.date_out,
    cost: GetAccountReservationsSchema.shape.cost,
    roomNumber: GetAccountReservationsSchema.shape.room_number,
    reservationStandards: GetAccountReservationsSchema.shape.reservation_standards,
    roomStandards: GetAccountReservationsSchema.shape.room_standards,
  }),
);
export type ReservationsCurrentAccountReservationsResponse = z.infer<
  typeof ReservationsCurrentAccountReservationsResponseSchema
>;
