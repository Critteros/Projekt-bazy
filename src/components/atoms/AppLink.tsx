import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { styled, Box, type BoxProps } from '@mui/material';

const BaseLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

type AppLinkProps = BoxProps & {
  children: ReactNode;
  href: ComponentProps<typeof Link>['href'];
  makeBox?: boolean;
  passHref?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

export const AppLink = ({
  children,
  href,
  passHref,
  replace,
  scroll,
  makeBox,
  ...boxProps
}: AppLinkProps) => {
  if (makeBox || boxProps.sx) {
    return (
      <BaseLink href={href} passHref={passHref} replace={replace} scroll={scroll}>
        <Box {...boxProps}>{children}</Box>
      </BaseLink>
    );
  }
  return (
    <BaseLink href={href} passHref={passHref} replace={replace} scroll={scroll}>
      {children}
    </BaseLink>
  );
};
