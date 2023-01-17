import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { LoginButton } from '@/components/atoms/LoginButton';
import { RegisterButton } from '@/components/atoms/RegisterButton';

export const LoginOrSignup = () => {
  const router = useRouter();
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <LoginButton
        onClick={() => {
          void router.push('/login');
        }}
      />
      <RegisterButton
        onClick={() => {
          void router.push('/register');
        }}
      />
    </Box>
  );
};
