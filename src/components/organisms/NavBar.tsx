import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Hotel as HotelIcon } from '@mui/icons-material';

import { IconWrapper } from '@/components/atoms/IconWrapper';
import { useSession } from '@/hooks/useSession';
import { LoginOrSignup } from '@/components/molecules/LoginOrSignup';
import { LogoutButton } from '@/components/molecules/LogoutButton';
import { Spacer } from '@/components/atoms/Spacer';
import { AppLink } from '@/components/atoms/AppLink';

export const NavBar = () => {
  const { session } = useSession();
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, flexGrow: 0, position: 'relative' }}>
      <Container>
        <Toolbar disableGutters>
          <AppLink
            href={'/'}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mr: 3,
              color: 'inherit',
              textTransform: 'none',
            }}
          >
            <IconWrapper>
              <HotelIcon />
            </IconWrapper>
            <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
              Hotel Alabama
            </Typography>
          </AppLink>
          <Spacer />
          {session ? <LogoutButton /> : <LoginOrSignup />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
