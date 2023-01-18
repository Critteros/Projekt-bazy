import type { GetServerSideProps } from 'next';
import { useSession } from '@/hooks/useSession';
import type { NextPageWithLayout } from './_app';
import { AdminLayout } from '@/components/templates/AdminLayout';
import { withRoleProtection } from '@/middlewares/withRoleProtection';

export const getServerSideProps: GetServerSideProps = withRoleProtection('admin');

const AdminPage: NextPageWithLayout = () => {
  const { session } = useSession();

  if (!session) {
    return <></>;
  }

  return <p>Admin</p>;
};

AdminPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminPage;
