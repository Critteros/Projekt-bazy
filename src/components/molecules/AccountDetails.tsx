import { Box, Chip, Stack, Typography } from '@mui/material';

import type { AccountInfo } from '@/server/db/session';
import { KeyText } from '@/components/atoms/KeyText';
import { AppButton } from '@/components/atoms/AppButton';
import { PasswordChangeDialog } from '@/components/molecules/PasswordChangeDialog';
import { useState } from 'react';

export type AccountDetailsProps = {
  session: AccountInfo;
};
export const AccountDetails = ({ session }: AccountDetailsProps) => {
  const [open, setOpen] = useState(false);
  const onPasswordChange = () => {
    setOpen(true);
  };

  const onDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant={'h5'}>Account Info</Typography>
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
        <KeyText>Password:</KeyText>
        <AppButton
          onClick={onPasswordChange}
          variant={'outlined'}
          sx={{
            marginRight: 'auto',
          }}
        >
          Change
        </AppButton>
        <PasswordChangeDialog open={open} onClose={onDialogClose} />
      </Box>
    </>
  );
};
