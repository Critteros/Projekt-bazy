import type { GetServerSideProps } from 'next';
import { Stack, Typography } from '@mui/material';

import { useSession } from '@/hooks/useSession';
import type { NextPageWithLayout } from '../_app';
import { AdminLayout } from '@/components/templates/AdminLayout';
import { withRoleProtection } from '@/middlewares/withRoleProtection';

export const getServerSideProps: GetServerSideProps = withRoleProtection('admin');

const AdminPage: NextPageWithLayout = () => {
  const { session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      justifySelf={'center'}
      alignSelf={'center'}
      flexGrow={1}
      gap={3}
    >
      <Typography variant={'h2'}>Admin Panel Dashboard</Typography>
      <Typography variant={'h4'}>No interactive widgets are available at this moment</Typography>
    </Stack>
  );
};

AdminPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminPage;
