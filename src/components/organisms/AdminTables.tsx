import { ListItemButton, Collapse, ListItemText, ListItemIcon, List } from '@mui/material';
import { useState } from 'react';
import {
  TableView as TableViewIcon,
  Storage as StorageIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

export const AdminTables = () => {
  const [open, setOpen] = useState(false);

  const tables = ['table1', 'table2', 'table3'];

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
          {tables.map((tableName) => (
            <ListItemButton sx={{ pl: 4 }} key={tableName}>
              <ListItemIcon>
                <TableViewIcon />
              </ListItemIcon>
              <ListItemText primary={tableName} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
