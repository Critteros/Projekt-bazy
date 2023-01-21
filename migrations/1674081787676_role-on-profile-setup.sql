-- Up Migration
BEGIN;

CREATE FUNCTION assign_customer_role() RETURNS TRIGGER AS
$$
DECLARE
    customer_role_id integer;
BEGIN

    -- If customer record is being inserted with null account id then do nothing
    IF NEW.account_id IS NULL THEN
        RETURN NEW;
    END IF;

    -- Get the id for the customer role
    BEGIN
        SELECT role_id INTO STRICT customer_role_id FROM account_roles WHERE name = 'customer';
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE EXCEPTION 'role customer could not be found, fatal error';
    END;

    -- Check if the user have already the customer role
    IF
        EXISTS(SELECT 1
               FROM account_role_relation
               WHERE account_id = NEW.account_id
                 AND role_id = customer_role_id) THEN
        RETURN NEW;
    END IF;

    -- Insert a customer role for the user
    INSERT INTO account_role_relation (account_id, role_id) VALUES (NEW.account_id, customer_role_id);


    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_customer_role
    AFTER INSERT OR UPDATE
    ON customer
    FOR EACH ROW
EXECUTE PROCEDURE assign_customer_role();

COMMIT;


-- Down Migration
DROP FUNCTION assign_customer_role() CASCADE;