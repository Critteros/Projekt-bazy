import type { Pool, PoolClient } from 'pg';

import type { Reservation as ReservationType, RoomType } from '@/server/db/tableSchema';
import { TRPCError } from '@trpc/server';

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
}
