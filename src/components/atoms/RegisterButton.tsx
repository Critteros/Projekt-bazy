import { Typography } from '@mui/material';
import { VpnKey as RegisterIcon } from '@mui/icons-material';

import { IconWrapper } from '@/components/atoms/IconWrapper';
import { AppButton } from '@/components/atoms/AppButton';

export type RegisterButtonProps = {
  onClick?: () => void;
};
export const RegisterButton = ({ onClick }: RegisterButtonProps) => {
  return (
    <AppButton onClick={onClick}>
      <IconWrapper>
        <RegisterIcon />
      </IconWrapper>
      <Typography>Register</Typography>
    </AppButton>
  );
};
