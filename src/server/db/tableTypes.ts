import type { Gender } from '@/server/db/enums';

export type AccountRoles = {
  role_id: number;
  name: string;
  description: string;
};

export type AccountRoleRelation = {
  id: number;
  role_id: number;
  account_id: number;
};

export type Customer = {
  customer_id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: Gender;
  contact_number: string;
  account_id: number | null;
};

export type Account = {
  account_id: number;
  login: string;
  password: string;
};

export type Staff = {
  staff_id: number;
  firstname: string;
  lastname: string;
  account_id: number;
  job_title: string;
};

export type Transaction = {
  transaction_id: number;
  date: Date;
  payment_id: number;
  customer_id: number;
  crew_id: number;
  reservation_id: number;
};

export type Reservation = {
  reservation_id: number;
  date_in: Date;
  date_out: Date;
  reservation_cost: number;
  room_number: number | null;
};

export type Payments = {
  payment_id: number;
  method: string;
  total_amount: number;
};

export type Rooms = {
  room_number: number;
  name: string;
  description: string;
  price: number;
};

export type ReservationToRoomTypeRelation = {
  id: number;
  room_type_id: number;
  reservation_id: number;
};

export type RoomType = {
  room_type_id: number;
  friendly_name: string;
  description: string;
};

export type RoomToRoomTypeRelation = {
  id: number;
  room_type_id: number;
  room_number: number;
};
