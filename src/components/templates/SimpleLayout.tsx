import type { ReactNode } from 'react';
import { Container } from '@mui/material';

import { NavBar } from '@/components/organisms/NavBar';
import { PageWrapper } from '@/components/atoms/PageWrapper';

export type SimpleLayoutProps = {
  children: ReactNode;
};

export const SimpleLayout = ({ children }: SimpleLayoutProps) => {
  return (
    <PageWrapper>
      <NavBar />
      <Container
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {children}
      </Container>
    </PageWrapper>
  );
};
