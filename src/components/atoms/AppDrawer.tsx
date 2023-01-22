import { Drawer, type DrawerProps } from '@mui/material';

export type AppDrawerProps = DrawerProps;

export const AppDrawer = ({ sx, children, variant, ...props }: AppDrawerProps) => {
  return (
    <Drawer
      variant={variant ?? 'permanent'}
      sx={{
        position: 'relative',
        overflowY: 'auto',
        width: 360,
        display: 'flex',
        flexDirection: 'column',
        [`& .MuiDrawer-paper`]: {
          width: 360,
          boxSizing: 'border-box',
          position: 'relative',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
};
