import { Box } from '@mui/material';
import { LoginButton } from '@/components/atoms/LoginButton';
import { RegisterButton } from '@/components/atoms/RegisterButton';
import { AppLink } from '@/components/atoms/AppLink';

export const LoginOrSignup = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <AppLink href={'/login'}>
        <LoginButton />
      </AppLink>
      <AppLink href={'/register'}>
        <RegisterButton />
      </AppLink>
    </Box>
  );
};
