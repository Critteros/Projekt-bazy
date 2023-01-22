import { z } from 'zod';
import { RoomTypeSchema } from '@/server/db/tableSchema';

export const RoomGetStandardsResponseSchema = z.array(
  z.object({
    friendlyName: RoomTypeSchema.shape.friendly_name,
    description: RoomTypeSchema.shape.description,
  }),
);
export type RoomGetStandardsResponse = z.infer<typeof RoomGetStandardsResponseSchema>;
