import type { GetServerSideProps } from 'next';
import { Stack, Skeleton, Typography, Chip } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import { withRoleProtection } from '@/middlewares/withRoleProtection';
import { StaffLayout } from '@/components/templates/StaffLayout';
import type { NextPageWithLayout } from '../_app';
import { CornerButton } from '@/components/atoms/CornerButton';
import { IconWrapper } from '@/components/atoms/IconWrapper';
import { AppLink } from '@/components/atoms/AppLink';
import Head from 'next/head';
import { api } from '@/utils/api';
import type { GridColDef } from '@mui/x-data-grid';
import type { ArrayElement } from '@/utils/types';
import type { ReservationsWithoutRoomResponse } from '@/dto/reservations';
import { DataGrid } from '@mui/x-data-grid';
import { AssignRoomAction } from '@/components/organisms/AssignRoomAction';

export const getServerSideProps: GetServerSideProps = withRoleProtection('staff');

const columns = [
  {
    field: 'reservationId',
    headerName: 'Reservation Id',
    flex: 1,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
    type: 'number',
  },
  {
    field: 'dateIn',
    headerName: 'Date In',
    flex: 2,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
    type: 'date',
  },
  {
    field: 'dateOut',
    headerName: 'Date Out',
    flex: 2,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
    type: 'date',
  },
  {
    field: 'reservationCost',
    headerName: 'Cost',
    flex: 1,
    sortable: true,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => {
      return (
        <Stack direction={'row'} spacing={1}>
          <Typography>{row.reservationCost}</Typography>
        </Stack>
      );
    },
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
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { reservationId } }) => <AssignRoomAction reservationId={reservationId} />,
  },
] satisfies GridColDef<ArrayElement<ReservationsWithoutRoomResponse>>[];

const AssignRoomsPage: NextPageWithLayout = () => {
  const { data } = api.reservations.getReservationsWithoutRoom.useQuery();

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
        getRowId={(row) => row.reservationId}
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

AssignRoomsPage.getLayout = (page) => {
  return (
    <StaffLayout>
      <Head>
        <title>Assign Rooms</title>
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

export default AssignRoomsPage;
