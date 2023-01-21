-- Up Migration
BEGIN;

CREATE FUNCTION assign_staff_role() RETURNS TRIGGER AS
$$
DECLARE
    staff_role_id integer;
BEGIN
    -- Get the id for the customer role
    BEGIN
        SELECT role_id INTO STRICT staff_role_id FROM account_roles WHERE name = 'staff';
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE EXCEPTION 'role staff could not be found, fatal error';
    END;

    -- Check if the user have already the staff role
    IF
        EXISTS(SELECT 1
               FROM account_role_relation
               WHERE account_id = NEW.account_id
                 AND role_id = staff_role_id) THEN
        RETURN NEW;
    END IF;

    -- Insert a staff role for the user
    INSERT INTO account_role_relation (account_id, role_id) VALUES (NEW.account_id, staff_role_id);


    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_customer_role
    AFTER INSERT OR UPDATE
    ON staff
    FOR EACH ROW
EXECUTE PROCEDURE assign_staff_role();

COMMIT;

-- Down Migration
DROP FUNCTION assign_staff_role() CASCADE;