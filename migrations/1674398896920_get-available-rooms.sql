-- Up Migration
CREATE FUNCTION get_available_rooms(param_date_in DATE)
    RETURNS SETOF hotel_rooms_view
AS
$$
DECLARE
    occupied_rooms_ids integer[];
BEGIN
    BEGIN
        SELECT array_agg(room_number)
        INTO STRICT occupied_rooms_ids
        FROM reservation
        WHERE (date_out >= param_date_in)
          AND reservation.room_number IS NOT NULL;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            occupied_rooms_ids = '{}';
    END;
    RETURN QUERY
        SELECT *
        FROM hotel_rooms_view
        WHERE room_number NOT IN (SELECT * FROM unnest(occupied_rooms_ids));

END;
$$ LANGUAGE plpgsql;

-- Down Migration
DROP FUNCTION get_available_rooms(param_date_in DATE);