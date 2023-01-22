import { Stack, Typography, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { ReservationCardContainer } from '@/components/atoms/ReservationCardContainer';
import { useState } from 'react';
import { NewReservationDialog } from '@/components/organisms/NewReservationDialog';

export const AddNewReservationCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ReservationCardContainer
        variant={'outlined'}
        sx={{
          borderColor: 'grey',

          '&:hover': {
            borderColor: 'white',
          },
          position: 'relative',
        }}
        onClick={() => setOpen(true)}
      >
        <Stack direction={'column'} gap={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '4rem',
            }}
          >
            <AddIcon fontSize={'inherit'} />
          </Box>
          <Typography variant={'h4'}>Add new Reservation</Typography>
        </Stack>
      </ReservationCardContainer>
      <NewReservationDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};
