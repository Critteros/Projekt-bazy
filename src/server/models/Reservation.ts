import type { Pool, PoolClient } from 'pg';

import type {
  HotelRoomView,
  Reservation as ReservationType,
  ReservationInfoView,
  RoomType,
} from '@/server/db/tableSchema';
import { TRPCError } from '@trpc/server';
import {
  type ReservationAssignRoomRequest,
  type ReservationAvailableRoomsResponse,
  type ReservationCurrentlyActiveResponse,
  ReservationAvailableRoomsResponseSchema,
  ReservationCurrentlyActiveResponseSchema,
  ReservationsWithoutRoomResponseSchema,
} from '@/dto/reservations';
import type { ArrayElement } from '@/utils/types';

export class Reservation {
  constructor(private dbPool: Pool) {}

  public async createNew(
    {
      dateIn,
      dateOut,
      cost,
      transactionId,
      roomNumber,
    }: {
      dateIn: ReservationType['date_in'];
      dateOut: ReservationType['date_out'];
      cost: ReservationType['reservation_cost'];
      roomNumber?: number;
      transactionId: ReservationType['reservation_id'];
    },
    client?: PoolClient,
  ) {
    const query = await (client ?? this.dbPool).query<Pick<ReservationType, 'reservation_id'>>({
      name: 'reservation-insert-new',
      text: `INSERT INTO reservation (date_in, date_out, reservation_cost, room_number, transaction_id) VALUES 
                ($1, $2, $3, $4, $5) RETURNING reservation_id`,
      values: [dateIn, dateOut, cost, roomNumber ?? null, transactionId],
    });
    if (!query.rows[0]) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not insert new reservation',
      });
    }
    return {
      reservationId: query.rows[0].reservation_id,
    };
  }

  public async assignStandardsToReservation(
    {
      reservationId,
      standards,
    }: {
      reservationId: ReservationType['reservation_id'];
      standards: RoomType['friendly_name'][];
    },
    client?: PoolClient,
  ) {
    const queryClient = client ?? (await this.dbPool.connect());
    try {
      !client && (await queryClient.query('BEGIN'));

      await Promise.all(
        standards.map((standardName) => {
          return (async () => {
            const insertion = await queryClient.query({
              name: 'reservation-insert-standard',
              text: `INSERT INTO reservation_room_type_relation (reservation_id, room_type_id) VALUES 
                    ($1, (SELECT room_type_id FROM room_type WHERE friendly_name=$2))`,
              values: [reservationId, standardName],
            });
            if (insertion.rowCount === 0) {
              throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Could not insert room standard',
              });
            }
          })();
        }),
      );

      !client && (await queryClient.query('COMMIT'));
    } catch (e) {
      !client && (await queryClient.query('ROLLBACK'));
      throw e;
    } finally {
      !client && queryClient.release();
    }
  }

  public async getReservationsWithoutRoom(client?: PoolClient) {
    const query = await (client ?? this.dbPool).query<
      Omit<ReservationInfoView, 'ongoing' | 'room_number'>
    >({
      name: 'reservation-query-without-rooms',
      text: `SELECT reservation_id,date_in, date_out, reservation_cost,room_standards, reservation_id
            FROM reservation_info_view WHERE room_number IS NULL AND ongoing IS TRUE`,
    });

    return await ReservationsWithoutRoomResponseSchema.parseAsync(
      query.rows.map(({ reservation_cost, date_in, date_out, room_standards, reservation_id }) => ({
        dateIn: date_in,
        dateOut: date_out,
        standards: room_standards,
        reservationCost: reservation_cost / 100,
        reservationId: reservation_id,
      })),
    );
  }

  public async getAvailableRoomsForReservation({
    reservationId,
  }: {
    reservationId: ReservationType['reservation_id'];
  }) {
    const query = await this.dbPool.query<HotelRoomView>({
      name: 'reservation-query-available-rooms',
      text: `SELECT * FROM get_available_rooms((SELECT date_in FROM reservation WHERE reservation_id=$1))`,
      values: [reservationId],
    });

    return await ReservationAvailableRoomsResponseSchema.parseAsync(
      query.rows.map(
        ({ room_standards, room_number, description, price }) =>
          ({
            roomNumber: room_number,
            price: Math.round(price / 100),
            description: description,
            standards: room_standards,
          } satisfies ArrayElement<ReservationAvailableRoomsResponse>),
      ),
    );
  }

  public async assignRoomToReservation({
    reservationId,
    roomNumber,
  }: ReservationAssignRoomRequest) {
    const query = await this.dbPool.query({
      name: 'reservation-assign-room',
      text: `UPDATE reservation SET room_number=$1 WHERE reservation_id=$2`,
      values: [roomNumber, reservationId],
    });

    if (query.rowCount === 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Could not find reservation for provided reservationId=${reservationId}`,
      });
    }
  }

  public async queryCurrentlyActiveReservations() {
    const query = await this.dbPool.query<
      Pick<
        ArrayElement<ReservationInfoView>,
        'date_in' | 'date_out' | 'room_number' | 'room_standards'
      >
    >({
      name: 'reservation-query-currently-active',
      text: `SELECT date_out, date_in, room_number, room_standards 
            FROM reservation_info_view 
            WHERE ongoing IS TRUE AND room_number IS NOT NULL`,
    });

    return await ReservationCurrentlyActiveResponseSchema.parseAsync(
      query.rows.map(
        ({ room_standards, room_number, date_in, date_out }) =>
          ({
            standards: room_standards,
            dateOut: date_out,
            dateIn: date_in,
            roomNumber: room_number,
          } satisfies ArrayElement<ReservationCurrentlyActiveResponse>),
      ),
    );
  }
}
