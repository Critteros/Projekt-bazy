-- Up Migration
CREATE VIEW reservation_info_view AS
(
SELECT reservation_id,
       date_in,
       date_out,
       (SELECT NOW() <= date_out::date) AS ongoing,
       reservation_cost,
       room_number,
       transaction_id,
       array_agg(friendly_name)         AS room_standards

FROM reservation_room_type_relation
         JOIN room_type USING (room_type_id)
         JOIN reservation USING (reservation_id)
GROUP BY reservation_id, date_in, date_out, reservation_cost, room_number, transaction_id);
-- Down Migration
DROP VIEW reservation_info_view;