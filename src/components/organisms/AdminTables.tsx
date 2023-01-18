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
import { useRouter } from 'next/router';

import { api } from '@/utils/api';
import { AppLink } from '@/components/atoms/AppLink';

export const AdminTables = () => {
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
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
              <AppLink key={tableName} href={`/admin/tables/${tableName}`}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={tableName}
                  selected={query?.tableName === tableName}
                >
                  <ListItemIcon>
                    <TableViewIcon />
                  </ListItemIcon>
                  <ListItemText primary={tableName} />
                </ListItemButton>
              </AppLink>
            ))
          )}
        </List>
      </Collapse>
    </>
  );
};
