import type { GetServerSideProps } from 'next';
import { Box } from '@mui/material';

import { useSession } from '@/hooks/useSession';
import type { NextPageWithLayout } from '../_app';
import { withRoleProtection } from '@/middlewares/withRoleProtection';
import { StaffLayout } from '@/components/templates/StaffLayout';
import { CardContainer } from '@/components/atoms/CardContainer';
import { NewReservationCard } from '@/components/organisms/NewReservationCard';

export const getServerSideProps: GetServerSideProps = withRoleProtection('staff');

const StaffPage: NextPageWithLayout = () => {
  const { session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        position: 'relative',
        flexGrow: 1,
        gridTemplateColumns: '',
      }}
    >
      <CardContainer>
        <NewReservationCard />
      </CardContainer>
    </Box>
  );
};

StaffPage.getLayout = (page) => {
  return <StaffLayout>{page}</StaffLayout>;
};

export default StaffPage;
