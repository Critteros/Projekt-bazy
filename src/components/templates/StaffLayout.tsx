import { type ReactNode } from 'react';
import { Box } from '@mui/material';

import { SessionGuard } from '@/components/atoms/SessionGuard';
import { NavBar } from '@/components/organisms/NavBar';
import { PageWrapper } from '@/components/atoms/PageWrapper';
import { StaffDrawer } from '@/components/organisms/StaffDrawer';

type StaffLayoutProps = {
  children: ReactNode;
};

export const StaffLayout = ({ children }: StaffLayoutProps) => {
  return (
    <PageWrapper>
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
        <StaffDrawer />
        <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>{children}</Box>
      </Box>
    </PageWrapper>
  );
};
