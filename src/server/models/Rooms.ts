import type { Pool } from 'pg';
import { RoomGetStandardsResponse, RoomGetStandardsResponseSchema } from '@/dto/rooms';
import { RoomType } from '@/server/db/tableSchema';
import { ArrayElement } from '@/utils/types';

export class Rooms {
  constructor(private dbPool: Pool) {}

  public async roomStandards() {
    const query = await this.dbPool.query<Pick<RoomType, 'friendly_name' | 'description'>>({
      name: 'rooms-get-standards',
      text: `SELECT friendly_name, description FROM room_type`,
    });

    return await RoomGetStandardsResponseSchema.parseAsync(
      query.rows.map(
        (entry) =>
          ({
            friendlyName: entry.friendly_name,
            description: entry.description,
          } satisfies ArrayElement<RoomGetStandardsResponse>),
      ),
    );
  }
}
