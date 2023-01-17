import { type ReactNode } from 'react';
import { Container, AppBar, Typography } from '@mui/material';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth={false}>
      <AppBar>
        <Typography variant={'h6'}>AppBar</Typography>
      </AppBar>
      {children}
    </Container>
  );
};
