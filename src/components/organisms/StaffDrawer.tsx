import { DrawerContent } from '@/components/atoms/DrawerContent';
import { DrawerNav } from '@/components/atoms/DrawerNav';

import { AppDrawer } from '@/components/atoms/AppDrawer';
import { StaffDashboard } from '@/components/organisms/StaffDashboard';
import { StaffAssignRooms } from '@/components/organisms/StaffAssignRooms';
import { StaffViewActiveReservations } from '@/components/organisms/StaffViewActiveReservations';

export const StaffDrawer = () => {
  return (
    <AppDrawer>
      <DrawerContent>
        <DrawerNav title={'Staff actions'}>
          <StaffDashboard />
          <StaffAssignRooms />
          <StaffViewActiveReservations />
        </DrawerNav>
      </DrawerContent>
    </AppDrawer>
  );
};
