import type { GetServerSideProps } from 'next';
import { useSession } from '@/hooks/useSession';
import { checkSessionRole } from '@/server/services/session.service';
import type { NextPageWithLayout } from './_app';
import { AdminLayout } from '@/components/templates/AdminLayout';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const hasRole = await checkSessionRole({
    req,
    res,
    role: 'admin',
  });
  if (hasRole) {
    return {
      props: {},
    };
  }

  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

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
