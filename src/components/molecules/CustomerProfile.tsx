import { useState } from 'react';

import { Stack, Typography, Collapse, Box, Chip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import type { AccountInfo } from '@/server/db/session';
import { KeyText } from '@/components/atoms/KeyText';

type CustomerProfileProps = {
  session: AccountInfo;
};

export const CustomerProfile = ({ session }: CustomerProfileProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Stack justifyContent={'space-between'} direction={'row'} onClick={handleClick}>
        <Typography variant={'h5'}>Profile</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Stack>
      <Collapse in={open}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: 5,
            rowGap: 2,
            alignItems: 'center',
            marginY: 2,
          }}
        >
          <KeyText>Login:</KeyText>
          <Typography>{session.login}</Typography>
          <KeyText>Roles:</KeyText>
          <Stack direction={'row'} gap={2}>
            {session.roles.map((role) => (
              <Chip key={role} label={role} variant={'outlined'} />
            ))}
          </Stack>
        </Box>
      </Collapse>
    </>
  );
};
