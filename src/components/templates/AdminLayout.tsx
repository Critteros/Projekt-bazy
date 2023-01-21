import { type ReactNode } from 'react';
import { Box } from '@mui/material';

import { SessionGuard } from '@/components/atoms/SessionGuard';
import { NavBar } from '@/components/organisms/NavBar';
import { AdminDrawer } from '@/components/organisms/AdminDrawer';
import { PageWrapper } from '@/components/atoms/PageWrapper';
import { CornerButton } from '@/components/atoms/CornerButton';
import { IconWrapper } from '@/components/atoms/IconWrapper';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { AppLink } from '@/components/atoms/AppLink';

type AdminLayoutProps = {
  children: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
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
        <AdminDrawer />
        <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>{children}</Box>
      </Box>
    </PageWrapper>
  );
};
