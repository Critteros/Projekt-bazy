import type { ReactNode } from 'react';
import { Collapse, Stack, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { useToggle } from '@/hooks/useToggle';

export type CollapsableProps = {
  children: ReactNode;
  title: string;
};

export const Collapsable = ({ children, title }: CollapsableProps) => {
  const [collapse, toggleCollapse] = useToggle();
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} onClick={toggleCollapse}>
        <Typography variant={'h5'}>{title}</Typography>
        {collapse ? <ExpandLess /> : <ExpandMore />}
      </Stack>
      <Collapse in={collapse}>
        <Stack direction={'column'}>{children}</Stack>
      </Collapse>
    </>
  );
};
