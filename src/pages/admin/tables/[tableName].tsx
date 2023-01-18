import type { GetServerSideProps } from 'next';
import { Box, CircularProgress } from '@mui/material';

import type { NextPageWithLayout } from '../../_app';
import { AdminLayout } from '@/components/templates/AdminLayout';
import { withRoleProtection } from '@/middlewares/withRoleProtection';

import { api } from '@/utils/api';
import type { schemaMap } from '@/server/db/tableMap';

type TableEditorProps = {
  tableName: keyof typeof schemaMap;
};

export const getServerSideProps: GetServerSideProps = withRoleProtection(
  'admin',
  async ({ params }) => {
    if (!params) {
      return {
        notFound: true,
      };
    }

    const results = await (
      await import('@/server/db/client')
    ).client.query({
      name: 'search-for-table',
      text: 'SELECT table_name FROM table_info WHERE table_name=$1',
      values: [params.tableName],
    });

    if (results.rows.length == 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        tableName: params.tableName,
      },
    };
  },
);

const TableEditor: NextPageWithLayout<TableEditorProps> = ({ tableName }) => {
  const { data: tableData, isLoading } = api.tables.tableData.useQuery({
    tableName,
  });

  if (isLoading) {
    return (
      <Box
        component={'main'}
        sx={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component={'main'}
      sx={{
        margin: 'auto',
      }}
    >
      <pre>
        <code>{JSON.stringify(tableData, null, 2)}</code>
      </pre>
    </Box>
  );
};

TableEditor.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default TableEditor;
