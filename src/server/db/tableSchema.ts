import { z } from 'zod';

import { GenderSchema, AuthRolesSchema } from '@/server/db/enums';

export const AccountRolesSchema = z.object({
  role_id: z.number(),
  name: z.union([z.string(), AuthRolesSchema]),
  description: z.string(),
});
export type AccountRoles = z.infer<typeof AccountRolesSchema>;

export const AccountRoleRelationSchema = z.object({
  id: z.number(),
  role_id: z.number(),
  account_id: z.number(),
});
export type AccountRoleRelation = z.infer<typeof AccountRoleRelationSchema>;

export const CustomerSchema = z.object({
  customer_id: z.number({
    required_error: 'Customer id must be a number',
  }),
  firstname: z
    .string({
      required_error: 'Firstname must be a string',
    })
    .min(1, 'Firstname cannot be an empty string'),
  lastname: z
    .string({
      required_error: 'Lastname must be a string',
    })
    .min(1)
    .min(1, 'Lastname cannot be an empty string'),
  age: z
    .number({
      required_error: 'Age must be a number',
    })
    .min(1, 'Age cannot be lowe then 1')
    .max(120, 'Age cannot be higher then 20'),
  gender: GenderSchema,
  contact_number: z
    .string({
      required_error: 'Contact number must be a string',
    })
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Invalid phone number!',
    ),
  account_id: z
    .number({
      required_error: 'Account id must be a number',
    })
    .nullable(),
});
export type Customer = z.infer<typeof CustomerSchema>;

export const AccountSchema = z.object({
  account_id: z.number({
    required_error: 'Account id must be a number',
  }),
  login: z.string({
    required_error: 'Login must be a string',
  }),
  password: z.string({
    required_error: 'Password must be a string',
  }),
});
export type Account = z.infer<typeof AccountSchema>;

export const StaffSchema = z.object({
  staff_id: z.number({
    required_error: 'Staff id must be a number',
  }),
  firstname: z
    .string({
      required_error: 'Firstname must be a string',
    })
    .min(1, 'Firstname cannot be an empty string'),
  lastname: z
    .string({
      required_error: 'Lastname must be a string',
    })
    .min(1, 'Lastname cannot be an empty string'),
  account_id: z.number({
    required_error: 'Account id must be a number',
  }),
  job_title: z
    .string({
      required_error: 'Job Title must be a string',
    })
    .min(1, 'Job Title cannot be an empty string'),
});
export type Staff = z.infer<typeof StaffSchema>;

export const TransactionSchema = z.object({
  transaction_id: z.number(),
  date: z.date(),
  payment_id: z.number(),
  customer_id: z.number(),
  crew_id: z.number(),
  reservation_id: z.number(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const ReservationSchema = z.object({
  reservation_id: z.number({
    required_error: 'Reservation id must be a number',
  }),
  date_in: z.date({
    required_error: 'Date In must be a date',
  }),
  date_out: z.date({
    required_error: 'Date out must be a date',
  }),
  reservation_cost: z
    .number({
      required_error: 'Reservation cost must be a number',
    })
    .min(0, 'Reservation cost cannot be negative'),
  room_number: z.number().nullable(),
});
export type Reservation = z.infer<typeof ReservationSchema>;

export const PaymentsSchema = z.object({
  payment_id: z.number({
    required_error: 'Payment id must be a number',
  }),
  method: z
    .string({
      required_error: 'Payment method must be a string',
    })
    .min(1, 'Payment method cannot be empty'),
  total_amount: z.number({
    required_error: 'Total amount must be a number',
  }),
});
export type Payments = z.infer<typeof PaymentsSchema>;

export const RoomsSchema = z.object({
  room_number: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});
export type Rooms = z.infer<typeof RoomsSchema>;

export const ReservationToRoomTypeRelationSchema = z.object({
  id: z.number(),
  room_type_id: z.number(),
  reservation_id: z.number(),
});
export type ReservationToRoomTypeRelation = z.infer<typeof ReservationToRoomTypeRelationSchema>;

export const RoomTypeSchema = z.object({
  room_type_id: z.number(),
  friendly_name: z.string(),
  description: z.string(),
});
export type RoomType = z.infer<typeof RoomTypeSchema>;

export const RoomToRoomTypeRelationSchema = z.object({
  id: z.number(),
  room_type_id: z.number(),
  room_number: z.number(),
});
export type RoomToRoomTypeRelation = z.infer<typeof RoomToRoomTypeRelationSchema>;

export const TableInfoSchema = z.object({
  table_name: z.string(),
  columns: z.array(z.string()),
});
export type TableInfo = z.infer<typeof TableInfoSchema>;

export const DisallowedTablesSchema = z.object({
  id: z.number(),
  table_name: z.string(),
});
export type DisallowedTables = z.infer<typeof DisallowedTablesSchema>;

export const UserInfoViewSchema = z.object({
  login: z.string(),
  roles: z.array(z.string()),
  customer_profile: CustomerSchema.nullable(),
  staff_profile: StaffSchema.nullable(),
});
export type UserInfoView = z.infer<typeof UserInfoViewSchema>;

export const HotelRoomViewSchema = RoomsSchema.extend({
  room_standards: z.array(RoomTypeSchema.shape.friendly_name, {
    required_error: 'Room Standards must be an array',
  }),
});
export type HotelRoomView = z.infer<typeof HotelRoomViewSchema>;

export const ReservationInfoViewSchema = ReservationSchema.extend({
  ongoing: z.boolean(),
  room_standards: z.array(RoomTypeSchema.shape.friendly_name),
});
export type ReservationInfoView = z.infer<typeof ReservationInfoViewSchema>;

export const TransactionDetailsViewSchema = TransactionSchema.pick({
  transaction_id: true,
  payment_id: true,
})
  .extend({
    transaction_date: TransactionSchema.shape.date,
    customer: CustomerSchema,
    staff: StaffSchema,
  })
  .extend(
    PaymentsSchema.omit({
      payment_id: true,
    }).shape,
  );
export type TransactionDetailsView = z.infer<typeof TransactionDetailsViewSchema>;
