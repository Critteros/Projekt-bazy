import type { NextPage } from 'next';
import { Grid, Container, Box } from '@mui/material';

import { api } from '@/utils/api';
import { useSession } from '@/hooks/useSession';
import { NavBar } from '@/components/organisms/NavBar';
import { AdminPanelCard } from '@/components/atoms/AdminPanelCard';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });
  const { hasRole } = useSession();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'block',
      }}
    >
      <NavBar />
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
              <AdminPanelCard onClick={() => console.log()} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
