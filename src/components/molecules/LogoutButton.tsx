import { Button, Typography, type ButtonProps, type TypographyProps } from '@mui/material';
import { useState } from 'react';

import { api } from '@/utils/api';
import { ErrorNotification } from '@/components/atoms/ErrorNotification';

type LogoutButtonProps = {
  onLogout?: () => void;
  typographyProps?: TypographyProps;
} & Omit<ButtonProps, 'onClick'>;

export const LogoutButton = ({ onLogout, typographyProps, ...props }: LogoutButtonProps) => {
  const [error, setError] = useState<string | null>(null);
  const trpcContext = api.useContext();
  const logoutMutation = api.auth.logout.useMutation({
    onSuccess: async () => {
      await trpcContext.session.info.invalidate();
      onLogout?.();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <Button onClick={() => logoutMutation.mutate()} {...props}>
        <Typography {...typographyProps}>Logout</Typography>
      </Button>
      <ErrorNotification error={error} onClose={() => setError(null)} />
    </>
  );
};
