import { Skeleton, Typography } from '@mui/material';

import { useSession } from '@/hooks/useSession';
import { api } from '@/utils/api';

import { Collapsable } from '@/components/molecules/Collapsable';
import { Align } from '@/components/atoms/Align';
import { KeyText } from '@/components/atoms/KeyText';

export const StaffProfile = () => {
  const { hasRole } = useSession();
  const { data, error } = api.staff.profileInfo.useQuery(undefined, {
    enabled: hasRole('staff'),
    retry: false,
  });
  if (!hasRole('staff')) return <></>;

  if (!data && !error) return <Skeleton variant={'rectangular'}></Skeleton>;

  if (error) return <Typography variant={'h5'}>{error.message}</Typography>;

  return (
    <Collapsable title={'Staff Profile'}>
      <Align>
        <KeyText>Firstname:</KeyText>
        <Typography>{data.firstname}</Typography>
        <KeyText>Lastname:</KeyText>
        <Typography>{data.lastname}</Typography>
        <KeyText>Job Title:</KeyText>
        <Typography>{data.job_title}</Typography>
      </Align>
    </Collapsable>
  );
};
