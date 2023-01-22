import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useRouter } from 'next/router';
import { Badge as BadgeIcon } from '@mui/icons-material';
import { AppLink } from '@/components/atoms/AppLink';

const urlPath = '/staff';

export const StaffDashboard = () => {
  const { pathname } = useRouter();
  return (
    <AppLink href={urlPath}>
      <ListItemButton selected={pathname === urlPath}>
        <ListItemIcon>
          <BadgeIcon />
        </ListItemIcon>
        <ListItemText primary={'Staff Dashboard'} />
      </ListItemButton>
    </AppLink>
  );
};
