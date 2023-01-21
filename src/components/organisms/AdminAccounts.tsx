import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useRouter } from 'next/router';
import { Group as AccountIcon } from '@mui/icons-material';
import { AppLink } from '@/components/atoms/AppLink';

const urlPath = '/admin/accounts';

export const AdminAccounts = () => {
  const { pathname } = useRouter();
  return (
    <AppLink href={urlPath}>
      <ListItemButton selected={pathname === urlPath}>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary={'Accounts'} />
      </ListItemButton>
    </AppLink>
  );
};
