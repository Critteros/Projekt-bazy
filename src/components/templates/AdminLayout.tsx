import { type ReactNode } from 'react';
import { Box } from '@mui/material';

import { SessionGuard } from '@/components/atoms/SessionGuard';
import { NavBar } from '@/components/organisms/NavBar';
import { AdminDrawer } from '@/components/organisms/AdminDrawer';
import { PageWrapper } from '@/components/atoms/PageWrapper';

type AdminLayoutProps = {
  children: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <PageWrapper sx={{ display: 'flex', flexDirection: 'column' }}>
      <SessionGuard />
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <AdminDrawer />
        {children}
      </Box>
    </PageWrapper>
  );
};
