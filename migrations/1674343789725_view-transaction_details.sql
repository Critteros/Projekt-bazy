-- Up Migration
CREATE FUNCTION get_transaction_details(query_transaction_id integer)
    RETURNS TABLE
            (
                transaction_id   integer,
                transaction_date date,
                customer         customer,
                staff            staff,
                payment_id       integer,
                method           text,
                total_amount     numeric,
                reservations     reservation_info_view[]
            )
AS
$$
DECLARE
    transaction_data transaction;
    reservations_cursor CURSOR (id int) FOR SELECT *
                                            FROM reservation_info_view
                                            WHERE reservation_id = id;
    reservation_data reservation_info_view;
BEGIN
    transaction_id := query_transaction_id;

    SELECT * INTO transaction_data FROM transaction t WHERE t.transaction_id = query_transaction_id;

    SELECT t.date, t.payment_id
    INTO STRICT transaction_date, payment_id
    FROM transaction t
    WHERE t.transaction_id = query_transaction_id;

    SELECT p.method, p.total_amount
    INTO STRICT method, total_amount
    FROM payments p
    WHERE p.payment_id = transaction_data.payment_id;

    SELECT * INTO customer FROM customer c WHERE c.customer_id = transaction_data.customer_id;
    SELECT * INTO staff FROM staff s WHERE s.staff_id = transaction_data.crew_id;

    reservations := array []::reservation_info_view[];

    OPEN reservations_cursor(id := query_transaction_id);
    LOOP
        FETCH reservations_cursor INTO reservation_data;
        EXIT WHEN NOT FOUND;
        reservations := array_append(reservations, reservation_data);
    END LOOP;
    CLOSE reservations_cursor;

    RETURN NEXT;

END;
$$ LANGUAGE plpgsql;


CREATE VIEW transaction_details_view AS
(
WITH transactions_ids_cte AS (SELECT transaction_id FROM transaction)
SELECT (get_transaction_details(query_transaction_id := transaction_id)).*
FROM transactions_ids_cte);

-- Down Migration
DROP FUNCTION get_transaction_details(integer) CASCADE;
