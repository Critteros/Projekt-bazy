import { type ReactNode } from 'react';

import { PageWrapper } from '@/components/atoms/PageWrapper';
import { SessionGuard } from '@/components/atoms/SessionGuard';
import { NavBar } from '@/components/organisms/NavBar';

type AdminLayoutProps = {
  children: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <PageWrapper>
      <SessionGuard />
      <NavBar />
      {children}
    </PageWrapper>
  );
};
