import type { Pool } from 'pg';

import type { CustomerUpdateProfileRequest } from '@/dto/customer';
import { TRPCError } from '@trpc/server';
import { ListCustomersResponseSchema } from '@/dto/customer';

export class Customer {
  constructor(private dbPool: Pool) {}

  public async updateProfile(
    id: number,
    { firstname, lastname, age, gender, contactNumber }: CustomerUpdateProfileRequest,
  ) {
    const query = await this.dbPool.query({
      name: 'update-customer-profile',
      text: `UPDATE customer SET 
                    firstname=$1,
                    lastname=$2,
                    age=$3,
                    gender=$4,
                    contact_number=$5
                    WHERE customer_id=$6;
                    `,
      values: [firstname, lastname, age, gender, contactNumber, id],
    });
    if (query.rowCount !== 1) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not find record to update in the database',
      });
    }
  }

  public async createProfile(
    login: string,
    { firstname, lastname, age, gender, contactNumber }: CustomerUpdateProfileRequest,
  ) {
    const insertQuery = await this.dbPool.query({
      name: 'create-customer-profile',
      text: `INSERT INTO customer (firstname, lastname, age, gender, contact_number, account_id) VALUES
      ($1,$2,$3,$4,$5, (SELECT account_id FROM account WHERE login=$6))`,
      values: [firstname, lastname, age, gender, contactNumber, login],
    });

    if (insertQuery.rowCount !== 1) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not create customer profile',
      });
    }
  }

  public async listCustomers() {
    const query = await this.dbPool.query<{ login: string }>({
      name: 'customer-query-customers',
      text: `SELECT login FROM user_info_view v WHERE customer_profile IS NOT NULL`,
    });
    return await ListCustomersResponseSchema.parseAsync(query.rows.map((el) => el.login));
  }
}
