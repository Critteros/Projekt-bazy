import Head from 'next/head';
import { Paper, Container, Stack, Avatar, Typography, Divider } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import { SimpleLayout } from '@/components/templates/SimpleLayout';
import { SessionGuard } from '@/components/atoms/SessionGuard';
import { withSessionProtection } from '@/middlewares/withSessionProtection';
import type { AccountInfo } from '@/server/db/session';

import { AppLink } from '@/components/atoms/AppLink';
import { CornerButton } from '@/components/atoms/CornerButton';
import { CustomerProfile } from '@/components/molecules/CustomerProfile';
import { AccountDetails } from '@/components/molecules/AccountDetails';

import type { NextPageWithLayout } from './_app';

export const getServerSideProps = withSessionProtection();

const ProfilePage: NextPageWithLayout<{ session: AccountInfo }> = ({ session }) => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Container component={'main'}>
        <AppLink href={'/'}>
          <CornerButton>
            <ArrowBackIcon fontSize={'large'} />
          </CornerButton>
        </AppLink>
        <Paper
          variant={'outlined'}
          sx={{
            maxWidth: 500,
            marginX: 'auto',
            padding: 2,
          }}
        >
          <Stack direction={'column'} alignItems={'center'}>
            <Avatar sx={{ bgcolor: (theme) => theme.palette.secondary.dark }}>
              {session.login[0]}
            </Avatar>
            <Typography variant={'h6'}>{session.login}</Typography>
          </Stack>
          <Divider orientation={'horizontal'} sx={{ marginY: 2 }} />
          <AccountDetails />
          <CustomerProfile />
        </Paper>
      </Container>
    </>
  );
};

ProfilePage.getLayout = (page) => {
  return (
    <SimpleLayout>
      <SessionGuard />
      {page}
    </SimpleLayout>
  );
};

export default ProfilePage;
