import type { Pool } from 'pg';
import { z } from 'zod';
import {
  ListStaffResponseSchema,
  type StaffProfileAddRequest,
  type StaffProfileDeleteRequest,
  type StaffProfileUpdateRequest,
} from '@/dto/staff';
import { TRPCError } from '@trpc/server';
import { StaffSchema } from '@/server/db/tableSchema';

export class Staff {
  constructor(private dbPool: Pool) {}

  public async getStaffMembers() {
    const query = await this.dbPool.query({
      name: 'list-staff-members',
      text: `SELECT * FROM active_staff`,
    });

    return ListStaffResponseSchema.parseAsync(query.rows);
  }

  public async updateStaffProfile({
    staffId,
    firstname,
    lastname,
    jobTitle,
  }: StaffProfileUpdateRequest) {
    const query = await this.dbPool.query({
      name: 'update-staff-profile',
      text: `UPDATE staff SET 
                 firstname=$1,
                 lastname=$2,
                 job_title=$3
                WHERE staff_id=$4`,
      values: [firstname, lastname, jobTitle, staffId],
    });

    if (query.rowCount === 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Staff member with the id ${staffId} does not exists`,
      });
    }
  }

  public async removeStaffMember({ staffId }: StaffProfileDeleteRequest) {
    // This will not actually delete a staff profile, but instead only remove te role to keep data integrity
    const query = await this.dbPool.query({
      name: 'remove-staff-role-from-staff-member',
      text: `WITH account_id_cte AS (SELECT account_id
                        FROM staff
                                 JOIN account USING (account_id)
                        WHERE staff_id = $1),
     staff_role_cte AS (SELECT role_id FROM account_roles WHERE name = 'staff')
    DELETE
        FROM account_role_relation
        WHERE role_id = (SELECT role_id FROM staff_role_cte)
        AND account_id = (SELECT account_id FROM account_id_cte)`,
      values: [staffId],
    });

    if (query.rowCount === 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Could not delete staff role for staffId=${staffId} as it is non existent`,
      });
    }
  }

  public async createStaffProfile(params: StaffProfileAddRequest) {
    const client = await this.dbPool.connect();
    try {
      await client.query('BEGIN');
      // 1) Check if profile already exists
      const profileSearch = await client.query({
        name: 'create-profile-check-profile-exists',
        text: `SELECT * FROM staff WHERE account_id=$1 FOR UPDATE`,
        values: [params.accountId],
      });
      if (profileSearch.rowCount === 0) {
        // Create a new profile
        await client.query({
          name: 'create-profile-insert-profile',
          text: `INSERT INTO staff (firstname, lastname, account_id, job_title) VALUES ($1,$2,$3,$4)`,
          values: [params.firstname, params.lastname, params.accountId, params.jobTitle],
        });
      } else {
        // Update a current profile
        const data = await z.array(StaffSchema).parseAsync(profileSearch.rows);
        const recordId = data[0]!.staff_id;
        await client.query({
          name: 'create-profile-update-profile',
          text: `UPDATE staff SET firstname=$1, lastname=$2, account_id=$3, job_title=$4 WHERE staff_id=$5`,
          values: [params.firstname, params.lastname, params.accountId, params.jobTitle, recordId],
        });
      }

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}
