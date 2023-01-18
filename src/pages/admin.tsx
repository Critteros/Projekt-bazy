import type { GetServerSideProps } from 'next';

import { PageWrapper } from '@/components/atoms/PageWrapper';
import { useSession } from '@/hooks/useSession';

import { checkSessionRole } from '@/server/services/session.service';
import { SessionGuard } from '@/components/atoms/SessionGuard';

import type { NextPageWithLayout } from './_app';
import { NavBar } from '@/components/organisms/NavBar';
import Admin from './admin';
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
