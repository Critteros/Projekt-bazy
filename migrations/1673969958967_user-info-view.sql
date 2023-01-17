-- Up Migration
CREATE VIEW user_info_view AS
SELECT (get_user_info(login)).*
FROM account;

-- Down Migration
DROP VIEW user_info_view;