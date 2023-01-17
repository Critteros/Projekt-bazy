import { Typography } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

import { IconWrapper } from '@/components/atoms/IconWrapper';
import { AppButton } from '@/components/atoms/AppButton';

export type LoginButtonProps = {
  onClick?: () => void;
};

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <AppButton onClick={onClick}>
      <IconWrapper>
        <LoginIcon />
      </IconWrapper>
      <Typography>Login</Typography>
    </AppButton>
  );
};
