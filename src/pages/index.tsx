import { Container } from '@mui/material';

import { NavBar } from '@/components/organisms/NavBar';
import { AdminPanelCard } from '@/components/atoms/AdminPanelCard';
import { PageWrapper } from '@/components/atoms/PageWrapper';
import { api } from '@/utils/api';

import type { NextPageWithLayout } from './_app';
import { CardContainer } from '@/components/atoms/CardContainer';

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
      }}
    >
      <CardContainer>
        <AdminPanelCard />
      </CardContainer>
    </Container>
  );
};

Home.getLayout = (page) => {
  return (
    <PageWrapper>
      <NavBar />
      {page}
    </PageWrapper>
  );
};

export default Home;
