import { Typography, type ButtonProps, type TypographyProps } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useState } from 'react';

import { api } from '@/utils/api';
import { Notification } from '@/components/atoms/Notification';
import { IconWrapper } from '@/components/atoms/IconWrapper';
import { AppButton } from '@/components/atoms/AppButton';

type LogoutButtonProps = {
  typographyProps?: TypographyProps;
} & Omit<ButtonProps, 'onClick'>;

export const LogoutButton = ({ typographyProps, ...props }: LogoutButtonProps) => {
  const [error, setError] = useState<string | null>(null);
  const trpcContext = api.useContext();
  const logoutMutation = api.auth.logout.useMutation({
    onSuccess: async () => {
      await trpcContext.session.info.invalidate();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <AppButton onClick={() => logoutMutation.mutate()} {...props}>
        <IconWrapper>
          <LogoutIcon />
        </IconWrapper>
        <Typography {...typographyProps}>Logout</Typography>
      </AppButton>
      <Notification error={error} onClose={() => setError(null)} />
    </>
  );
};
