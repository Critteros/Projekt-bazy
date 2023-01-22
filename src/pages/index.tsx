import { Container } from '@mui/material';

import { AdminPanelCard } from '@/components/atoms/AdminPanelCard';
import { api } from '@/utils/api';

import type { NextPageWithLayout } from './_app';
import { CardContainer } from '@/components/atoms/CardContainer';
import { MyReservationsCard } from '@/components/atoms/MyReservationsCard';
import { StaffDashboardCard } from '@/components/atoms/StaffDashboardCard';
import { ProfileCard } from '@/components/atoms/ProfileCard';
import { SimpleLayout } from '@/components/templates/SimpleLayout';

const Home: NextPageWithLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

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
