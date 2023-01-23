import * as s from './tableSchema';

export const schemaMap = {
  account: s.AccountSchema,
  account_role_relation: s.AccountRoleRelationSchema,
  account_roles: s.AccountRolesSchema,
  customer: s.CustomerSchema,
  disallowed_tables: s.DisallowedTablesSchema,
  payments: s.PaymentsSchema,
  reservation: s.ReservationSchema,
  reservation_room_type_relation: s.ReservationToRoomTypeRelationSchema,
  room_to_type_relation: s.RoomToRoomTypeRelationSchema,
  room_type: s.RoomTypeSchema,
  rooms: s.RoomsSchema,
  staff: s.StaffSchema,
  transaction: s.TransactionSchema,
  table_info: s.TableInfoSchema,
  user_info_view: s.UserInfoViewSchema,
  active_staff: s.StaffSchema,
  hotel_rooms_view: s.HotelRoomViewSchema,
  reservation_info_view: s.ReservationInfoViewSchema,
  transaction_details_view: s.TransactionDetailsViewSchema,
} as const;
