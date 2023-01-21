import { Box, Chip, Stack, Typography } from '@mui/material';

import { KeyText } from '@/components/atoms/KeyText';
import { AppButton } from '@/components/atoms/AppButton';
import { PasswordChangeDialog } from '@/components/molecules/PasswordChangeDialog';
import { useState } from 'react';
import { useSession } from '@/hooks/useSession';

export const AccountDetails = () => {
  const [open, setOpen] = useState(false);
  const { session, roles } = useSession();

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
        <Typography>{session}</Typography>
        <KeyText>Roles:</KeyText>
        <Stack direction={'row'} gap={2}>
          {roles?.map((role) => (
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
