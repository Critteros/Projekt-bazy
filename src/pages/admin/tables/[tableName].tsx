import type { GetServerSideProps } from 'next';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { startCase } from 'lodash';

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
  const { data: tableInfoData } = api.tables.tableInfo.useQuery({
    tableNames: [tableName],
  });
  const { data: tableData } = api.tables.tableData.useQuery({
    tableName,
  });

  const isLoading = !tableInfoData || !tableData;

  const columns = tableInfoData?.[0]?.columns.map((column) => ({
    field: column,
    headerName: startCase(column),
    sortable: true,
    flex: 1,
  }));

  return (
    <Box
      component={'main'}
      sx={{
        margin: 'auto',
        height: '80%',
        width: '80%',
        padding: 10,
      }}
    >
      <DataGrid
        columns={columns ?? []}
        rows={
          tableData?.map((topObject) => {
            let row = {};
            for (const [key, value] of Object.entries(topObject)) {
              row = {
                ...row,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                [key]: typeof value === 'object' ? JSON.stringify(value) : value,
              };
            }
            return row;
          }) ?? []
        }
        getRowId={(row) => Object.values(row).join('_')}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        loading={isLoading}
      />
    </Box>
  );
};

TableEditor.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default TableEditor;
