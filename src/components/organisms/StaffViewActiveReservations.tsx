import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useRouter } from 'next/router';
import { Hotel as HotelIcon } from '@mui/icons-material';

import { AppLink } from '@/components/atoms/AppLink';

const urlPath = '/staff/activeReservations';

export const StaffViewActiveReservations = () => {
  const { pathname } = useRouter();
  return (
    <AppLink href={urlPath}>
      <ListItemButton selected={pathname === urlPath}>
        <ListItemIcon>
          <HotelIcon />
        </ListItemIcon>
        <ListItemText primary={'Active Reservations'} />
      </ListItemButton>
    </AppLink>
  );
};
