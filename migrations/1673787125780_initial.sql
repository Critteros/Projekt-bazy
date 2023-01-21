-- Up Migration
BEGIN;
CREATE TABLE "room_type"
(
    "room_type_id"  SERIAL PRIMARY KEY,
    "friendly_name" VARCHAR(255) UNIQUE NOT NULL,
    "description"   TEXT                NOT NULL
);

CREATE TABLE "rooms"
(
    "room_number" SERIAL PRIMARY KEY,
    "name"        VARCHAR(255) NOT NULL,
    "description" TEXT         NULL,
    "price"       INTEGER      NOT NULL
);

CREATE TABLE "room_to_type_relation"
(
    "id"           SERIAL PRIMARY KEY,
    "room_number"  INTEGER NOT NULL,
    "room_type_id" INTEGER NOT NULL
);

CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TABLE "customer"
(
    "customer_id"    SERIAL PRIMARY KEY,
    "firstname"      VARCHAR(255) NOT NULL,
    "lastname"       VARCHAR(255) NOT NULL,
    "age"            INTEGER      NOT NULL,
    "gender"         gender,
    "contact_number" VARCHAR(255) NOT NULL,
    "account_id"     INTEGER      NULL UNIQUE
);
CREATE INDEX "customer_lastname_index" ON
    "customer" USING hash ("lastname");
CREATE INDEX "customer_firstname_index" ON "customer" USING hash ("firstname");

CREATE TABLE "account"
(
    "account_id" SERIAL PRIMARY KEY,
    "login"      VARCHAR(255) UNIQUE NOT NULL,
    "password"   VARCHAR(255)        NOT NULL
);
CREATE INDEX "account_email_index" ON
    "account" USING hash ("login");

CREATE TABLE "account_roles"
(
    "role_id"     SERIAL PRIMARY KEY,
    "name"        VARCHAR(255) UNIQUE NOT NULL,
    "description" TEXT                NOT NULL
);

CREATE TABLE "account_role_relation"
(
    "id"         SERIAL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "role_id"    INTEGER NOT NULL
);

CREATE TABLE "staff"
(
    "staff_id"   SERIAL PRIMARY KEY,
    "firstname"  VARCHAR(255) NOT NULL,
    "lastname"   VARCHAR(255) NOT NULL,
    "account_id" INTEGER      NOT NULL UNIQUE,
    "job_title"  VARCHAR(255) NOT NULL
);
CREATE INDEX "staff_firstname_index" ON
    "staff" USING hash ("firstname");
CREATE INDEX "staff_lastname_index" ON
    "staff" USING hash ("lastname");

CREATE TABLE "transaction"
(
    "transaction_id" SERIAL PRIMARY KEY,
    "date"           DATE    NOT NULL,
    "payment_id"     INTEGER NOT NULL,
    "customer_id"    INTEGER NOT NULL,
    "crew_id"        INTEGER NOT NULL
);
CREATE INDEX "transaction_date_index" ON
    "transaction" USING btree ("date");

CREATE TABLE "payments"
(
    "payment_id"   SERIAL PRIMARY KEY,
    "method"       VARCHAR(255) NOT NULL,
    "total_amount" INTEGER      NOT NULL
);

CREATE TABLE "reservation"
(
    "reservation_id"   SERIAL PRIMARY KEY,
    "date_in"          DATE    NOT NULL,
    "date_out"         DATE    NOT NULL,
    "reservation_cost" INTEGER NOT NULL,
    "room_number"      INTEGER NULL,
    "transaction_id"   INTEGER NOT NULL
);

CREATE TABLE "reservation_room_type_relation"
(
    "id"             SERIAL PRIMARY KEY,
    "reservation_id" INTEGER NOT NULL,
    "room_type_id"   INTEGER NOT NULL
);

-- Relations

ALTER TABLE
    "reservation"
    ADD CONSTRAINT "reservation_room_number_foreign" FOREIGN KEY ("room_number") REFERENCES "rooms" ("room_number"),
    ADD CONSTRAINT "reservation_transaction_id_foreign" FOREIGN KEY ("transaction_id") REFERENCES "transaction" ("transaction_id");

ALTER TABLE
    "transaction"
    ADD CONSTRAINT "transaction_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id"),
    ADD CONSTRAINT "transaction_payment_id_foreign" FOREIGN KEY ("payment_id") REFERENCES "payments" ("payment_id"),
    ADD CONSTRAINT "transaction_crew_id_foreign" FOREIGN KEY ("crew_id") REFERENCES "staff" ("staff_id");

ALTER TABLE
    "customer"
    ADD CONSTRAINT "customer_account_id_foreign" FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE
    "staff"
    ADD CONSTRAINT "staff_account_id_foreign" FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE
    "room_to_type_relation"
    ADD CONSTRAINT "room_to_type_relation_room_number_foreign" FOREIGN KEY ("room_number") REFERENCES "rooms" ("room_number"),
    ADD CONSTRAINT "room_to_type_relation_room_type_id_foreign" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("room_type_id");

ALTER TABLE
    "reservation_room_type_relation"
    ADD CONSTRAINT "reservation_room_type_relation_reservation_id_foreign" FOREIGN KEY ("reservation_id") REFERENCES "reservation" ("reservation_id"),
    ADD CONSTRAINT "reservation_room_type_relation_room_type_id_foreign" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("room_type_id");

ALTER TABLE
    "account_role_relation"
    ADD CONSTRAINT "account_role_relation_account_id_foreign" FOREIGN KEY ("account_id") REFERENCES "account" ("account_id"),
    ADD CONSTRAINT "account_role_relation_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "account_roles" ("role_id");

COMMIT;

-- Down Migration
BEGIN;
DROP TABLE
    "room_type",
    "rooms",
    "room_to_type_relation",
    "customer",
    "account",
    "account_roles",
    "account_role_relation",
    "staff",
    "transaction",
    "payments",
    "reservation",
    "reservation_room_type_relation"
    CASCADE;
DROP type gender;
COMMIT;
