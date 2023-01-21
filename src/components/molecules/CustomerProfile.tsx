import { useState } from 'react';
import { Stack, Typography, Skeleton } from '@mui/material';

import { useSession } from '@/hooks/useSession';
import { api } from '@/utils/api';

import { KeyText } from '@/components/atoms/KeyText';
import { AppButton } from '@/components/atoms/AppButton';
import { UpdateCustomerDataDialog } from '@/components/molecules/UpdateCustomerDataDialog';
import { Collapsable } from '@/components/molecules/Collapsable';
import { Align } from '@/components/atoms/Align';

export const CustomerProfile = () => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const { hasRole } = useSession();
  const { data: profileData } = api.customer.profileInfo.useQuery(undefined, {
    enabled: hasRole('customer'),
  });

  const isClient = hasRole('customer');
  const isModerator = hasRole('admin') || hasRole('staff');

  if (!isClient || profileData === null) {
    return (
      <>
        <Stack direction={'row'} gap={2}>
          <Typography variant={'h5'}>Profile</Typography>
          <AppButton variant={'outlined'} onClick={() => setUpdateDialogOpen(true)}>
            Click to create
          </AppButton>
        </Stack>
        <UpdateCustomerDataDialog
          open={updateDialogOpen}
          initialData={{
            age: 17,
            contactNumber: '+48 XXX XXX XXX',
            lastname: '',
            firstname: '',
            gender: 'male',
          }}
          create
          onClose={() => setUpdateDialogOpen(false)}
        />
      </>
    );
  }

  if (profileData === undefined) {
    return <Skeleton variant={'rectangular'}></Skeleton>;
  }

  const InnerProfileData = () => {
    return (
      <>
        <Align>
          <KeyText>Firstname:</KeyText>
          <Typography>{profileData.firstname}</Typography>
          <KeyText>Lastname:</KeyText>
          <Typography>{profileData.lastname}</Typography>
          <KeyText>Age:</KeyText>
          <Typography>{profileData.age}</Typography>
          <KeyText>Gender:</KeyText>
          <Typography>{profileData.gender}</Typography>
          <KeyText>Contact Number:</KeyText>
          <Typography>{profileData.contact_number}</Typography>
        </Align>
        <AppButton variant={'outlined'} onClick={() => setUpdateDialogOpen(true)}>
          Update Information
        </AppButton>
      </>
    );
  };

  if (isClient && !isModerator) {
    return (
      <>
        <Stack direction={'column'}>
          <Typography variant={'h5'}>Profile data</Typography>
          <InnerProfileData />
        </Stack>
        <UpdateCustomerDataDialog
          open={updateDialogOpen}
          initialData={{
            ...profileData,
            contactNumber: profileData.contact_number,
          }}
          onClose={() => setUpdateDialogOpen(false)}
        />
      </>
    );
  }

  return (
    <Collapsable title={'Customer Profile'}>
      <InnerProfileData />
    </Collapsable>
  );
};
