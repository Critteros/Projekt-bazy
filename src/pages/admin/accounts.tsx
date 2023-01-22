import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { Login as LoginIcon } from '@mui/icons-material';

import { withRoleProtection } from '@/middlewares/withRoleProtection';
import type { NextPageWithLayout } from '../_app';

import { api } from '@/utils/api';
import type { ArrayElement } from '@/utils/types';
import type { ListAccountsResponse } from '@/dto/account';
import type { AccountInfo } from '@/server/db/session';

import { AdminLayout } from '@/components/templates/AdminLayout';
import { ColorAvatar } from '@/components/atoms/ColorAvatar';
import { AdminPasswordChange } from '@/components/molecules/AdminPasswordChange';
import { GridCustomerProfile } from '@/components/molecules/GridCustomerProfile';
import { GridStaffProfile } from '@/components/molecules/GridStaffProfile';
import { CornerButton } from '@/components/atoms/CornerButton';
import { IconWrapper } from '@/components/atoms/IconWrapper';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { AppLink } from '@/components/atoms/AppLink';
import { AppButton } from '@/components/atoms/AppButton';
import { useRouter } from 'next/router';
import { Notification } from '@/components/atoms/Notification';

export const getServerSideProps: GetServerSideProps = withRoleProtection('admin');

const AdminAccounts: NextPageWithLayout = () => {
  const { data } = api.account.adminListAccounts.useQuery();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const context = api.useContext();
  const { mutate } = api.auth.adminLogin.useMutation({
    onSuccess: async () => {
      await context.invalidate();
      await router.replace('/');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const columns = useMemo(
    () =>
      [
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
          type: 'number',
          field: 'account_id',
          headerName: 'Account Id',
          flex: 1,
          align: 'center',
          headerAlign: 'center',
        },
        {
          type: 'string',
          field: 'login',
          headerName: 'Login',
          flex: 2,
          align: 'center',
          headerAlign: 'center',
        },
        {
          headerName: 'Password',
          valueGetter: ({ row }) => {
            return row.account_id;
          },
          flex: 1,
          field: 'passwordChange',
          align: 'center',
          headerAlign: 'center',
          sortable: false,
          renderCell: ({ row }) => (
            <AdminPasswordChange accountId={row.account_id} login={row.login} />
          ),
        },
        {
          headerName: 'Roles',
          field: 'roles',
          align: 'center',
          headerAlign: 'center',
          flex: 3,
          sortable: false,
          renderCell: ({ value }) => {
            const pretty = (value as string[]).join(', ');
            return <Typography>{pretty}</Typography>;
          },
        },
        {
          headerName: 'Customer Profile',
          field: 'customer_profile',
          align: 'center',
          headerAlign: 'center',
          flex: 2,
          sortable: false,
          renderCell: ({ value }) => {
            return <GridCustomerProfile data={value as AccountInfo['customer_profile']} />;
          },
        },
        {
          headerName: 'Staff Profile',
          field: 'staff_profile',
          align: 'center',
          headerAlign: 'center',
          flex: 2,
          sortable: false,
          renderCell: ({ value }) => {
            return <GridStaffProfile data={value as AccountInfo['staff_profile']} />;
          },
        },
        {
          headerName: 'Actions',
          field: 'actions',
          align: 'center',
          headerAlign: 'center',
          flex: 2,
          sortable: false,
          renderCell: ({ row: { login } }) => {
            return (
              <Stack direction={'row'}>
                <Tooltip title={'Login as user'}>
                  <IconButton
                    onClick={() =>
                      mutate({
                        login,
                      })
                    }
                  >
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        },
      ] satisfies GridColDef<ArrayElement<ListAccountsResponse>>[],
    [mutate],
  );

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
    <>
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
            Toolbar: GridToolbar,
            BaseButton: AppButton,
          }}
        />
      </Stack>
      <Notification severity={'error'} message={error} onClose={() => setError(null)} />
    </>
  );
};

AdminAccounts.getLayout = (page) => {
  return (
    <AdminLayout>
      <Head>
        <title>Accounts</title>
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

export default AdminAccounts;
