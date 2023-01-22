-- Up Migration
CREATE VIEW hotel_rooms_view AS
(
SELECT r.room_number,
       r.name,
       r.description,
       r.price,
       array_agg(friendly_name) AS room_standards
FROM room_to_type_relation
         JOIN rooms r USING (room_number)
         JOIN room_type t USING (room_type_id)
GROUP BY r.room_number, r.name, r.description, r.price
ORDER BY room_number);

-- Down Migration
DROP VIEW hotel_rooms_view;


