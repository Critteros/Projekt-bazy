import type { ReactNode } from 'react';
import { List, type ListProps, ListSubheader } from '@mui/material';

export type DrawerNavProps = {
  children: ReactNode;
  title: string;
} & ListProps;

export const DrawerNav = ({ children, title, ...listProps }: DrawerNavProps) => {
  return (
    <List
      sx={{ flexGrow: 1, maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
      {...listProps}
    >
      {children}
    </List>
  );
};
