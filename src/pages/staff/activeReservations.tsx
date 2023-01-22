import { Chip, Skeleton, Stack } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { GetServerSideProps } from 'next';

import type { NextPageWithLayout } from '../_app';
import { withRoleProtection } from '@/middlewares/withRoleProtection';
import { StaffLayout } from '@/components/templates/StaffLayout';
import Head from 'next/head';
import { AppLink } from '@/components/atoms/AppLink';
import { CornerButton } from '@/components/atoms/CornerButton';
import { IconWrapper } from '@/components/atoms/IconWrapper';
import { api } from '@/utils/api';
import type { ArrayElement } from '@/utils/types';
import type { ReservationCurrentlyActiveResponse } from '@/dto/reservations';

export const getServerSideProps: GetServerSideProps = withRoleProtection('staff');

const columns = [
  {
    field: 'roomNumber',
    headerName: 'Room Number',
    flex: 1,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
    type: 'number',
  },
  {
    field: 'dateIn',
    headerName: 'Date In',
    flex: 1,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
    type: 'date',
  },
  {
    field: 'dateOut',
    headerName: 'Date Out',
    flex: 1,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
    type: 'date',
  },
  {
    field: 'standards',
    headerName: 'Standards',
    flex: 4,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => {
      return (
        <Stack direction={'row'} spacing={1}>
          {row.standards.map((standard) => (
            <Chip variant={'outlined'} key={standard} label={standard} />
          ))}
        </Stack>
      );
    },
  },
] satisfies GridColDef<ArrayElement<ReservationCurrentlyActiveResponse>>[];

const ActiveReservationsPage: NextPageWithLayout = () => {
  const { data } = api.reservations.currentlyActiveReservations.useQuery();

  if (!data)
    return (
      <Stack
        component={'main'}
        justifyContent={'center'}
        alignItems={'center'}
        flexGrow={1}
        marginY={'10vh'}
        marginX={'5vw'}
      >
        <Skeleton variant={'rectangular'} width={'100%'} height={'100%'} />
      </Stack>
    );
  return (
    <Stack
      component={'main'}
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      flexGrow={1}
      marginY={'10vh'}
      marginX={'5vw'}
    >
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.roomNumber}
        disableSelectionOnClick
        sx={{
          flexGrow: 1,
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Stack>
  );
};

ActiveReservationsPage.getLayout = (page) => {
  return (
    <StaffLayout>
      <Head>
        <title>Active Reservations</title>
      </Head>
      <AppLink href={'/staff'}>
        <CornerButton>
          <IconWrapper sx={{ color: 'white', m: 0.5 }}>
            <ArrowBackIcon fontSize={'large'} />
          </IconWrapper>
        </CornerButton>
      </AppLink>
      {page}
    </StaffLayout>
  );
};

export default ActiveReservationsPage;
