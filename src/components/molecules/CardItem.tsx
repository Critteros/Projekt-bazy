import type { AuthRoles } from '@/server/db/enums';
import type { ReactNode } from 'react';
import { Grid } from '@mui/material';

import { CardBase } from '@/components/atoms/CardBase';

import { useSession } from '@/hooks/useSession';
import { AppLink } from '@/components/atoms/AppLink';

export type CardItemProps = {
  href?: string;
  role?: AuthRoles | null;
  children: ReactNode;
  title: string;
  onClick?: () => void;
  xs?: number;
};

export const CardItem = ({ children, onClick, title, role, href, xs }: CardItemProps) => {
  const { hasRole, session } = useSession();

  if (role === null && !session) return <> </>;

  if (role && !hasRole(role)) return <> </>;

  if (!href)
    return (
      <Grid item>
        <CardBase title={title} onClick={onClick}>
          {children}
        </CardBase>
      </Grid>
    );

  return (
    <Grid
      item
      xs={xs}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AppLink href={href}>
        <CardBase title={title} onClick={onClick}>
          {children}
        </CardBase>
      </AppLink>
    </Grid>
  );
};
