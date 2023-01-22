-- Up Migration
CREATE FUNCTION get_account_reservations(param_login TEXT)
    RETURNS TABLE
            (
                ongoing               bool,
                date_in               date,
                date_out              date,
                cost                  int,
                room_number           int,
                reservation_standards TEXT[],
                room_standards        TEXT[]
            )
AS
$$
DECLARE
    target_customer_id           int;
    transaction_cursor CURSOR (input_customer_id int) FOR SELECT *
                                                          FROM transaction
                                                                   JOIN payments USING (payment_id)
                                                          WHERE customer_id = input_customer_id;
    transaction_data_record      RECORD;
    operating_transaction_id     int;
    reservations_ids             int[];
    current_reservation_id       int;
    operating_reservation_record reservation_info_view;
BEGIN
    BEGIN
        SELECT customer_id
        INTO STRICT target_customer_id
        FROM account
                 JOIN customer c USING (account_id)
        WHERE login = param_login;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE WARNING 'No customer_id found for account "%s"', param_login;
            RETURN;
    END;

    OPEN transaction_cursor(input_customer_id := target_customer_id);
    LOOP
        FETCH transaction_cursor INTO transaction_data_record;
        EXIT WHEN NOT FOUND;
        operating_transaction_id := transaction_data_record.transaction_id;

        SELECT array_agg(reservation_id)
        INTO STRICT reservations_ids
        FROM reservation
                 JOIN transaction USING (transaction_id)
        WHERE transaction_id = operating_transaction_id;
        FOREACH current_reservation_id IN ARRAY reservations_ids
            LOOP
                SELECT *
                INTO STRICT operating_reservation_record
                FROM reservation_info_view
                WHERE reservation_id = current_reservation_id;

                ongoing := operating_reservation_record.ongoing;
                date_in := operating_reservation_record.date_in;
                date_out := operating_reservation_record.date_out;
                cost := operating_reservation_record.reservation_cost;
                room_number := operating_reservation_record.room_number;
                reservation_standards := operating_reservation_record.room_standards;

                BEGIN
                    SELECT v.room_standards
                    INTO STRICT get_account_reservations.room_standards
                    FROM hotel_rooms_view v
                    WHERE v.room_number = operating_reservation_record.room_number;
                EXCEPTION
                    WHEN NO_DATA_FOUND THEN
                        get_account_reservations.room_standards := array []::text[];

                END;

                RETURN NEXT;

            END LOOP;
    END LOOP;
    CLOSE transaction_cursor;

END;
$$
    LANGUAGE plpgsql;


-- Down Migration
DROP FUNCTION get_account_reservations(param_login TEXT);