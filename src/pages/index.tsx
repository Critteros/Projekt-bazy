import { Container, IconButton, Stack, Typography } from '@mui/material';
import { Login as LoginIcon, VpnKey as RegisterIcon } from '@mui/icons-material';

import { AdminPanelCard } from '@/components/atoms/AdminPanelCard';

import type { NextPageWithLayout } from './_app';
import { CardContainer } from '@/components/atoms/CardContainer';
import { MyReservationsCard } from '@/components/atoms/MyReservationsCard';
import { StaffDashboardCard } from '@/components/atoms/StaffDashboardCard';
import { ProfileCard } from '@/components/atoms/ProfileCard';
import { SimpleLayout } from '@/components/templates/SimpleLayout';
import { useSession } from '@/hooks/useSession';
import { AppButton } from '@/components/atoms/AppButton';
import { AppLink } from '@/components/atoms/AppLink';

const Home: NextPageWithLayout = () => {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated)
    return (
      <Stack direction={'column'} alignItems={'center'}>
        <Typography variant={'h2'}>Welcome to hotel AGH</Typography>
        <Typography variant={'h5'}>To proceed, please login or register</Typography>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={5}
          sx={{
            mt: 5,
          }}
        >
          <AppLink href={'/login'}>
            <AppButton
              variant={'outlined'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 1,
                gap: 2,
              }}
            >
              <LoginIcon />
              <Typography>Login</Typography>
            </AppButton>
          </AppLink>
          <AppLink href={'/register'}>
            <AppButton
              variant={'outlined'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 1,
                gap: 2,
              }}
            >
              <RegisterIcon />
              <Typography>Register</Typography>
            </AppButton>
          </AppLink>
        </Stack>
      </Stack>
    );

  return (
    <Container
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <CardContainer>
        <ProfileCard />
        <AdminPanelCard />
        <MyReservationsCard />
        <StaffDashboardCard />
      </CardContainer>
    </Container>
  );
};

Home.getLayout = (page) => {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
