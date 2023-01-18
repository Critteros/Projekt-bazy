import {
  ListItemButton,
  Collapse,
  ListItemText,
  ListItemIcon,
  List,
  CircularProgress,
  ListItem,
} from '@mui/material';
import { useState } from 'react';
import {
  TableView as TableViewIcon,
  Storage as StorageIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

import { api } from '@/utils/api';

export const AdminTables = () => {
  const [open, setOpen] = useState(false);
  const { data: tableInfo, isLoading } = api.tables.tableInfo.useQuery(undefined, {
    enabled: open,
  });

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="View Tables" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component={'div'} disablePadding>
          {isLoading ? (
            <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLoading && <CircularProgress />}
            </ListItem>
          ) : (
            tableInfo?.map(({ table_name: tableName }) => (
              <ListItemButton sx={{ pl: 4 }} key={tableName}>
                <ListItemIcon>
                  <TableViewIcon />
                </ListItemIcon>
                <ListItemText primary={tableName} />
              </ListItemButton>
            ))
          )}
        </List>
      </Collapse>
    </>
  );
};
