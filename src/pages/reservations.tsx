import type { GetServerSideProps } from 'next';
import { Grid, Skeleton, Stack, Typography, Divider } from '@mui/material';

import type { NextPageWithLayout } from './_app';
import { withRoleProtection } from '@/middlewares/withRoleProtection';
import { SimpleLayout } from '@/components/templates/SimpleLayout';
import { SessionGuard } from '@/components/atoms/SessionGuard';
import { api } from '@/utils/api';
import Head from 'next/head';
import { AppLink } from '@/components/atoms/AppLink';
import { CornerButton } from '@/components/atoms/CornerButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ReservationSummary } from '@/components/organisms/ReservationSummary';

export const getServerSideProps: GetServerSideProps = withRoleProtection('customer');

const ReservationsPage: NextPageWithLayout = () => {
  const { data } = api.reservations.currentReservations.useQuery();

  if (!data) {
    return (
      <Grid
        sx={{
          marginY: 10,
          marginX: 'auto',
        }}
        container
        flexGrow={1}
        justifySelf={'center'}
        spacing={2}
      >
        {Array.from({ length: 9 }, (_, index) => (
          <Grid key={index} xs={4} item>
            <Skeleton variant={'rectangular'} height={'100%'} />
          </Grid>
        ))}
      </Grid>
    );
  }

  const hasOngoingReservations = !!data.find((el) => el.ongoing);
  const hasPastReservations = !!data.find((el) => !el.ongoing);

  return (
    <Stack
      component={'main'}
      direction={'column'}
      sx={{
        overflowY: 'auto',
        marginY: 10,
      }}
    >
      {hasOngoingReservations && (
        <>
          <Typography variant={'h4'}>Ongoing Reservations</Typography>
          <Divider orientation={'horizontal'} />
          <Grid
            container
            spacing={2}
            sx={{
              minWidth: '60vw',
            }}
            wrap={'wrap'}
          >
            {data
              .filter((el) => el.ongoing)
              .map((el) => (
                <Grid
                  item
                  key={`${el.dateIn.getTime()}-${el.dateOut.getTime()}-${el.roomNumber ?? ''}`}
                >
                  <ReservationSummary reservationData={el} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {hasPastReservations && (
        <>
          <Typography variant={'h4'}>Past Reservations</Typography>
          <Divider orientation={'horizontal'} />
          <Grid
            container
            spacing={2}
            sx={{
              minWidth: '60vw',
            }}
            wrap={'wrap'}
          >
            {data
              .filter((el) => !el.ongoing)
              .map((el) => (
                <Grid
                  item
                  key={`${el.dateIn.getTime()}-${el.dateOut.getTime()}-${el.roomNumber ?? ''}`}
                >
                  <ReservationSummary reservationData={el} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

ReservationsPage.getLayout = (page) => {
  return (
    <SimpleLayout>
      <SessionGuard />
      <Head>
        <title>Reservations</title>
      </Head>
      <AppLink href={'/'}>
        <CornerButton>
          <ArrowBackIcon fontSize={'large'} />
        </CornerButton>
      </AppLink>
      {page}
    </SimpleLayout>
  );
};

export default ReservationsPage;
