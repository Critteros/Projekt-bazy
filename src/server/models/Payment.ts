import type { Pool, PoolClient } from 'pg';

import { type Payments } from '@/server/db/tableSchema';
import { TRPCError } from '@trpc/server';

export class Payment {
  constructor(private dbPool: Pool) {}

  public async createPayment(
    {
      method,
      totalAmount,
    }: {
      method: Payments['method'];
      totalAmount: Payments['total_amount'];
    },
    client?: PoolClient,
  ) {
    const insertion = await (client ?? this.dbPool).query<Pick<Payments, 'payment_id'>>({
      name: 'payment-insert-new',
      text: `INSERT INTO payments (method, total_amount) VALUES ($1, $2) RETURNING payment_id`,
      values: [method, totalAmount],
    });
    if (!insertion.rows[0]) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not insert a new payment',
      });
    }

    return {
      paymentId: insertion.rows[0].payment_id,
    };
  }
}
