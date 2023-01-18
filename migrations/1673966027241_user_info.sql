-- Up Migration
CREATE FUNCTION get_user_info(
    IN OUT login text,
    OUT roles text[],
    OUT customer_profile customer,
    OUT staff_profile staff
)
AS
$$
DECLARE
    account_record account%ROWTYPE;

BEGIN
    BEGIN
        SELECT * INTO STRICT account_record FROM account WHERE account.login = get_user_info.login;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE EXCEPTION 'No account found for login -> %', login;

    END;

    SELECT array_agg(name)
    INTO STRICT roles
    FROM account_role_relation
             JOIN account_roles USING (role_id)
    WHERE account_id = account_record.account_id;

    RAISE WARNING 'Roles -> %', roles;

    IF roles IS NULL THEN
        roles := array []::text[];
    END IF;


    BEGIN
        SELECT * INTO STRICT customer_profile FROM customer WHERE customer.account_id = account_record.account_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            customer_profile := NULL;
    END;

    BEGIN
        SELECT * INTO STRICT staff_profile FROM staff WHERE staff.account_id = account_record.account_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            staff_profile := NULL;
    END;

END;
$$ LANGUAGE 'plpgsql';


-- Down Migration
DROP FUNCTION get_user_info(login text);