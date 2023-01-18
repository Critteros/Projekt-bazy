-- Up Migration
BEGIN;
CREATE TABLE "disallowed_tables"
(
    id         SERIAL PRIMARY KEY,
    table_name TEXT NOT NULL UNIQUE
);
INSERT INTO "disallowed_tables" (table_name)
VALUES ('migrations'),
       ('migrations_lock'),
       ('pgmigrations');

CREATE VIEW table_info AS
WITH table_data AS (SELECT table_name, array_agg(column_name) as columns
                    FROM information_schema.tables
                             JOIN information_schema.columns c USING (table_name)
                    WHERE tables.table_schema = (SELECT current_schema())
                    GROUP BY table_name)
SELECT table_name, (columns).* AS columns
FROM table_data
         LEFT OUTER JOIN disallowed_tables USING (table_name)
WHERE disallowed_tables.table_name IS NULL;

COMMIT;


-- Down Migration
BEGIN;
DROP TABLE "disallowed_tables" CASCADE;
COMMIT;