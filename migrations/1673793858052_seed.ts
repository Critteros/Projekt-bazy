/* eslint-disable @typescript-eslint/naming-convention */
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { sample, sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
import type { MigrationBuilder } from 'node-pg-migrate';

import { sqlUnsafe as sql } from '@/utils/sql';

const getHash = (password: string) => {
  return bcrypt.hash(password, 10);
};

const getExamplePersonInfo = () => {
  const gender = faker.name.sex() as 'male' | 'female';
  const lastname = faker.name.lastName(gender).replace(`'`, '');
  const firstname = faker.name.firstName(gender).replace(`'`, '');
  const phoneNumber = faker.phone.number('+48 91 ### ## ##');
  const age = randomInt(16, 70);
  const jobTitle = faker.name.jobType().replace(`'`, '');

  return {
    firstname,
    lastname,
    gender,
    phoneNumber,
    age,
    jobTitle,
  };
};

export async function up(pgm: MigrationBuilder) {
  // Account roles
  pgm.sql(sql`INSERT INTO account_roles (name, description)
              VALUES ('admin', 'Portal Administrator'),
                     ('customer', 'Portal Customer'),
                     ('staff', 'Employees');
  `);

  // Basic Accounts
  pgm.sql(sql`INSERT INTO account (login, password)
              VALUES ('admin', ${await getHash('admin')}),
                     ('customer', ${await getHash('admin')}),
                     ('staff', ${await getHash('staff')});`);
  pgm.sql(sql`INSERT INTO account_role_relation (account_id, role_id)
              VALUES ((SELECT account_id FROM account WHERE login = 'admin'),
                      (SELECT role_id FROM account_roles WHERE name = 'admin')),
                     ((SELECT account_id FROM account WHERE login = 'admin'),
                      (SELECT role_id FROM account_roles WHERE name = 'customer')),
                     ((SELECT account_id FROM account WHERE login = 'admin'),
                      (SELECT role_id FROM account_roles WHERE name = 'staff')),
                     ((SELECT account_id FROM account WHERE login = 'customer'),
                      (SELECT role_id FROM account_roles WHERE name = 'customer')),
                     ((SELECT account_id FROM account WHERE login = 'staff'),
                      (SELECT role_id FROM account_roles WHERE name = 'staff'));
  `);

  const extraAccounts = Array.from(
    { length: 5 },
    (_, index) => [`cuser${index}`, `suser${index}`] as const,
  );
  // Some more customer accounts and for staff

  for (const [user, staff] of extraAccounts) {
    // Accounts
    pgm.sql(sql`INSERT INTO account (login, password)
                VALUES (${user}, ${await getHash('user')}),
                       (${staff}, ${await getHash('staff')});
    `);
    // Account roles
    pgm.sql(sql`INSERT INTO account_role_relation (account_id, role_id)
                VALUES ((SELECT account_id FROM account WHERE login = ${user}),
                        (SELECT role_id FROM account_roles WHERE name = 'customer')),
                       ((SELECT account_id FROM account WHERE login = ${staff}),
                        (SELECT role_id FROM account_roles WHERE name = 'staff'))
    `);
    // Customer entries
    const customerData = getExamplePersonInfo();
    pgm.sql(sql`INSERT INTO customer (firstname, lastname, age, gender, contact_number, account_id)
                VALUES (${customerData.firstname}, ${customerData.lastname}, ${customerData.age},
                        ${customerData.gender}, ${customerData.phoneNumber},
                        (SELECT account_id from account WHERE login = ${user}))`);
    // Staff entries
    const staffData = getExamplePersonInfo();
    pgm.sql(sql`INSERT INTO staff (firstname, lastname, account_id, job_title)
                VALUES (${staffData.firstname}, ${staffData.lastname},
                        (SELECT account_id from account WHERE login = ${staff}), ${staffData.jobTitle});`);
  }

  // Room types
  const roomTypes = ['premium+', 'premium', 'standard+', 'standard', 'basic'] as const;
  pgm.sql(sql`INSERT INTO room_type (friendly_name, description)
              VALUES (${roomTypes[0]}, 'maximum comfort'),
                     (${roomTypes[1]}, 'premium room, maximum comfort'),
                     (${roomTypes[2]}, 'a little bit more then a standard room'),
                     (${roomTypes[3]}, 'standard room'),
                     (${roomTypes[4]}, 'basic room');
  `);

  // Creating rooms
  const roomNumbers = [] as number[];
  for (let i = 10; i <= 50; i++) {
    const standard = sample(roomTypes);
    if (standard === undefined) {
      throw new Error('Sample is undefined!');
    }
    const roomNumber = parseInt(`1${i}`);
    roomNumbers.push(roomNumber);

    pgm.sql(sql`INSERT INTO rooms (room_number, name, description, price)
                VALUES (${roomNumber}, 'Room ${roomNumber}', 'Room ${roomNumber} description',
                        ${randomInt(10, 100) * 100})`);

    pgm.sql(sql`INSERT INTO room_to_type_relation (room_number, room_type_id)
                VALUES (${roomNumber}, (SELECT room_type_id FROM room_type WHERE friendly_name = ${standard}));`);
  }

  // Create payments
  type Payment = { payment_id: number; method: string; total_amount: number };
  let payments: Payment[];
  await pgm.db.query('BEGIN');
  try {
    const data = Array.from({ length: 3 }, () => {
      return pgm.db.select(
        'INSERT INTO payments (method, total_amount) VALUES ($1, $2) RETURNING *',
        [sample(['cash', 'card']), randomInt(5, 100) * 100],
      );
    });
    await pgm.db.query('COMMIT');
    payments = (await Promise.all(data)).flat() as Payment[];
  } catch (e) {
    await pgm.db.query('ROLLBACK');
    throw e;
  }

  // Create reservations with transactions
  const transactionUsers = sampleSize(extraAccounts, 3);
  transactionUsers.forEach(([customerName, staffName], i) => {
    const payment = payments[i]!;
    const transactionDate = faker.date.soon(120);
    const reservationData = dayjs(transactionDate).add(randomInt(0, 10), 'days').toDate();
    const outTime = dayjs(reservationData).add(randomInt(2, 21), 'days').toDate();
    // First create a reservation
    pgm.sql(sql`INSERT INTO reservation (reservation_id, date_in, date_out, reservation_cost, room_number)
                VALUES (${i}, ${reservationData}, ${outTime}, ${payment.total_amount}, NULL)
    `);
    // Add a transaction
    pgm.sql(sql`INSERT INTO transaction (date, payment_id, customer_id, crew_id, reservation_id)
                VALUES (${transactionDate}, ${payment.payment_id},
                        (SELECT customer_id
                         FROM customer
                                  JOIN account USING (account_id)
                         WHERE login = ${customerName}),
                        (SELECT staff_id
                         FROM staff
                                  JOIN account USING (account_id)
                         WHERE login = ${staffName}),
                        ${i});
    `);

    // For the reservation add which room type the user is interested in
    pgm.sql(sql`INSERT INTO reservation_room_type_relation (reservation_id, room_type_id)
                VALUES (${i},
                        (SELECT room_type_id FROM room_type WHERE friendly_name = ${sample(
                          roomTypes,
                        )}))`);
  });
}

export function down(pgm: MigrationBuilder) {
  pgm.sql(sql`TRUNCATE TABLE
      "room_type",
      "rooms",
      "room_to_type_relation",
      "customer", "account",
      "account_roles",
      "account_role_relation",
      "staff",
      "transaction",
      "payments",
      "reservation",
      "reservation_room_type_relation"
      RESTART IDENTITY CASCADE;
  `);
}
