import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { Skeleton, Stack } from '@mui/material';
import { Add as AddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
  DataGrid,
  type GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  type GridToolbarProps,
  useGridRootProps,
} from '@mui/x-data-grid';

import { withRoleProtection } from '@/middlewares/withRoleProtection';
import { AdminLayout } from '@/components/templates/AdminLayout';
import type { NextPageWithLayout } from '../_app';

import { api } from '@/utils/api';
import type { ArrayElement } from '@/utils/types';
import type { ListStaffResponse } from '@/dto/staff';
import { ColorAvatar } from '@/components/atoms/ColorAvatar';
import { GridEditStaff } from '@/components/molecules/GridEditStaff';
import { GridDeleteStaff } from '@/components/molecules/GridDeleteStaff';
import { AppButton } from '@/components/atoms/AppButton';
import { useState } from 'react';
import { AddStaffDialog } from '@/components/organisms/AddStaffDialog';
import { AppLink } from '@/components/atoms/AppLink';
import { CornerButton } from '@/components/atoms/CornerButton';
import { IconWrapper } from '@/components/atoms/IconWrapper';

export const getServerSideProps: GetServerSideProps = withRoleProtection('admin');

const columns = [
  {
    field: 'loginAvatar',
    headerName: 'Avatar',
    flex: 1,
    sortable: false,
    valueGetter: ({ row: { login } }) => {
      return login;
    },
    renderCell: ({ value }) => {
      return <ColorAvatar value={value as string} />;
    },
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'staff_id',
    headerName: 'Staff Id',
    flex: 1,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'login',
    headerName: 'Login',
    flex: 2,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'firstname',
    headerName: 'Firstname',
    flex: 2,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'lastname',
    headerName: 'Lastname',
    flex: 2,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'job_title',
    headerName: 'Job Title',
    flex: 2,
    sortable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => {
      return (
        <Stack direction={'row'} spacing={1}>
          <GridEditStaff staffId={row.staff_id} initialData={row} />
          <GridDeleteStaff staffId={row.staff_id} login={row.login} />
        </Stack>
      );
    },
  },
] satisfies GridColDef<ArrayElement<ListStaffResponse>>[];

const TableToolbar = ({}: GridToolbarProps) => {
  const [open, setOpen] = useState(false);

  const rootProps = useGridRootProps();
  return (
    <>
      <GridToolbarContainer>
        <rootProps.components.BaseButton
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          {...rootProps.componentsProps?.baseButton}
        >
          Add Staff Member
        </rootProps.components.BaseButton>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
      <AddStaffDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const AdminManageStaff: NextPageWithLayout = () => {
  const { data } = api.staff.adminListStaff.useQuery();

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
        getRowId={(row) => row.account_id}
        disableSelectionOnClick
        sx={{
          flexGrow: 1,
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
        components={{
          Toolbar: TableToolbar,
          BaseButton: AppButton,
        }}
      />
    </Stack>
  );
};

AdminManageStaff.getLayout = (page) => {
  return (
    <AdminLayout>
      <Head>
        <title>Manage Staff</title>
      </Head>
      <AppLink href={'/admin'}>
        <CornerButton>
          <IconWrapper sx={{ color: 'white', m: 0.5 }}>
            <ArrowBackIcon fontSize={'large'} />
          </IconWrapper>
        </CornerButton>
      </AppLink>
      {page}
    </AdminLayout>
  );
};

export default AdminManageStaff;
