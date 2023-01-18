import type { AuthRoles } from '@/server/db/enums';
import type { ReactNode } from 'react';

import { CardBase } from '@/components/atoms/CardBase';

import { useSession } from '@/hooks/useSession';
import { AppLink } from '@/components/atoms/AppLink';

export type CardItemProps = {
  href: string;
  role?: AuthRoles;
  children: ReactNode;
  title: string;
  onClick?: () => void;
};

export const CardItem = ({ children, onClick, title, role, href }: CardItemProps) => {
  const { hasRole } = useSession();

  if (role && !hasRole(role)) return <> </>;

  return (
    <AppLink href={href}>
      <CardBase title={title} onClick={onClick}>
        {children}
      </CardBase>
    </AppLink>
  );
};
