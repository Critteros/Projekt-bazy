import { Grid, Container } from '@mui/material';

import { NavBar } from '@/components/organisms/NavBar';
import { AdminPanelCard } from '@/components/atoms/AdminPanelCard';
import { PageWrapper } from '@/components/atoms/PageWrapper';
import { api } from '@/utils/api';
import { useSession } from '@/hooks/useSession';
import { AppLink } from '@/components/atoms/AppLink';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { hasRole } = useSession();
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
      <Grid container spacing={3} justifyContent={'center'}>
        {hasRole('admin') && (
          <Grid item>
            <AppLink href={'/admin'}>
              <AdminPanelCard />
            </AppLink>
          </Grid>
        )}
      </Grid>
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
