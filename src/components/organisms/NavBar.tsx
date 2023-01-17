import { AppBar, Container, Toolbar, Button, Typography, Box } from '@mui/material';
import { Hotel as HotelIcon, Login as LoginIcon } from '@mui/icons-material';

import { IconWrapper } from '@/components/atoms/IconWrapper';
import { useSession } from '@/hooks/useSession';
import { LoginOrSignup } from '@/components/molecules/LoginOrSignup';
import { LogoutButton } from '@/components/molecules/LogoutButton';

export const NavBar = () => {
  const { session } = useSession();
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <IconWrapper>
            <HotelIcon />
          </IconWrapper>
          <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
            Hotel Alabama
          </Typography>
          {session ? <LogoutButton /> : <LoginOrSignup />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
