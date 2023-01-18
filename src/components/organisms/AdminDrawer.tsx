import { Box, Drawer, List, ListSubheader, Toolbar } from '@mui/material';
import { AdminTables } from '@/components/organisms/AdminTables';

const drawerWidth = 240;

export const AdminDrawer = () => {
  return (
    <Drawer
      variant={'permanent'}
      anchor={'left'}
      sx={{
        flexShrink: 0,
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box overflow={'auto'}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Admin Actions
            </ListSubheader>
          }
        >
          <AdminTables />
        </List>
      </Box>
    </Drawer>
  );
};
