import { Drawer, List, ListSubheader } from '@mui/material';

import { AdminTables } from '@/components/organisms/AdminTables';
import { DrawerContent } from '@/components/atoms/DrawerContent';
import { AdminAccounts } from '@/components/organisms/AdminAccounts';
import { AdminStaff } from '@/components/organisms/AdminStaff';

export const AdminDrawer = () => {
  return (
    <Drawer
      variant={'permanent'}
      sx={{
        position: 'relative',
        overflowY: 'auto',
        width: 360,
        [`& .MuiDrawer-paper`]: {
          width: 360,
          boxSizing: 'border-box',
          position: 'relative',
        },
      }}
    >
      <DrawerContent>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Admin Actions
            </ListSubheader>
          }
        >
          <AdminAccounts />
          <AdminStaff />
          <AdminTables />
        </List>
      </DrawerContent>
    </Drawer>
  );
};
