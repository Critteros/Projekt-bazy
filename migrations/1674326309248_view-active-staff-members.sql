-- Up Migration
CREATE VIEW active_staff AS
WITH staff_role_cte AS (SELECT role_id FROM account_roles WHERE name = 'staff'),
     accounts_with_staff_role_cte AS (SELECT account_id
                                      FROM staff_role_cte,
                                           account
                                               JOIN account_role_relation USING (account_id)
                                      WHERE account_role_relation.role_id = staff_role_cte.role_id)
SELECT account.account_id, staff_id, firstname, lastname, job_title, login
FROM staff
         JOIN account USING (account_id),
     accounts_with_staff_role_cte
WHERE account.account_id = accounts_with_staff_role_cte.account_id;

-- Down Migration
DROP VIEW active_staff;