import type { Pool, PoolClient } from 'pg';

import type { Transaction as TransactionType, Account } from '@/server/db/tableSchema';
import { TRPCError } from '@trpc/server';

export class Transaction {
  constructor(private dbPool: Pool) {}

  public async createNew(
    {
      date,
      paymentId,
      customer,
      staffId,
    }: {
      date: TransactionType['date'];
      paymentId: TransactionType['payment_id'];
      customer: Account['login'];
      staffId: TransactionType['crew_id'];
    },
    client?: PoolClient,
  ) {
    console.log('inseting transaction');
    const query = await (client ?? this.dbPool).query<Pick<TransactionType, 'transaction_id'>>({
      name: 'transaction-new-transaction',
      text: `INSERT INTO transaction (date, payment_id, customer_id, crew_id) VALUES 
                                    ($1, $2, (SELECT customer_id FROM account JOIN customer USING(account_id) WHERE login=$3), $4) RETURNING transaction_id`,
      values: [date, paymentId, customer, staffId],
    });
    console.log('done inserting transaction');
    if (!query.rows[0]) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not insert new transaction',
      });
    }

    return {
      transactionId: query.rows[0].transaction_id,
    };
  }
}
