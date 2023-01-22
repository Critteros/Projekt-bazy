import { AdminTables } from '@/components/organisms/AdminTables';
import { DrawerContent } from '@/components/atoms/DrawerContent';
import { AdminAccounts } from '@/components/organisms/AdminAccounts';
import { AdminStaff } from '@/components/organisms/AdminStaff';
import { AppDrawer } from '@/components/atoms/AppDrawer';
import { DrawerNav } from '@/components/atoms/DrawerNav';

export const AdminDrawer = () => {
  return (
    <AppDrawer>
      <DrawerContent>
        <DrawerNav title={'Admin actions'}>
          <AdminAccounts />
          <AdminStaff />
          <AdminTables />
        </DrawerNav>
      </DrawerContent>
    </AppDrawer>
  );
};
