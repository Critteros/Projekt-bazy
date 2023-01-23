import dayjs from 'dayjs';

import { roleProtectedProcedure } from '@/server/api/trpc';
import { NewTransactionRequestSchema } from '@/dto/transaction';
import { TRPCError } from '@trpc/server';
import { Payment } from '@/server/models/Payment';
import { Transaction } from '@/server/models/Transaction';
import { Reservation } from '@/server/models/Reservation';

export const createTransaction = roleProtectedProcedure(['staff'])
  .input(NewTransactionRequestSchema)
  .mutation(async ({ ctx, input }) => {
    // Validate date ranges
    const client = await ctx.db.connect();

    const { staff_profile } = ctx.session!;

    if (!staff_profile) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Staff profile was not found',
      });
    }

    const { staff_id: staffId } = staff_profile;

    try {
      await client.query('BEGIN');
      const { customer, reservations, paymentMethod } = input;

      const totalCost = reservations.reduce((acc, el) => {
        return acc + Math.round(el.cost * 100);
      }, 0);

      const { paymentId } = await new Payment(ctx.db).createPayment(
        {
          method: paymentMethod,
          totalAmount: totalCost,
        },
        client,
      );
      const { transactionId } = await new Transaction(ctx.db).createNew(
        {
          staffId,
          customer,
          date: new Date(),
          paymentId,
        },
        client,
      );
      const reservationModel = new Reservation(ctx.db);

      await Promise.all(
        reservations.map(({ dateIn, dateOut, standards, cost }) => {
          return (async () => {
            if (dayjs(dateIn).isAfter(dayjs(dateOut))) {
              throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Invalid date range',
              });
            }
            const { reservationId } = await reservationModel.createNew(
              {
                dateIn,
                dateOut,
                transactionId,
                cost: Math.round(cost * 100),
              },
              client,
            );
            await reservationModel.assignStandardsToReservation(
              {
                reservationId,
                standards,
              },
              client,
            );
          })();
        }),
      );

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  });
