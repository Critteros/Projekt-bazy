import type { GetServerSideProps } from 'next';

import { withRoleProtection } from '@/middlewares/withRoleProtection';
import { AdminLayout } from '@/components/templates/AdminLayout';
import type { NextPageWithLayout } from '../_app';

export const getServerSideProps: GetServerSideProps = withRoleProtection('admin');

const AdminManageStaff: NextPageWithLayout = () => {
  return <p>Here will be table</p>;
};

AdminManageStaff.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminManageStaff;
