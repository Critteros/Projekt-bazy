import { Stack } from '@mui/material';

import { AddNewReservationCard } from '@/components/molecules/AddNewReservationCard';

import { useReservationContext } from '@/hooks/useReservationContext';
import { ReservationCard } from '@/components/molecules/ReservationCard';

export const ReservationCardPicker = () => {
  const { reservations } = useReservationContext();

  return (
    <Stack
      direction={'row'}
      sx={{
        margin: 5,
      }}
      flexWrap={'wrap'}
      gap={10}
    >
      {reservations.map((reservation, index) => (
        <ReservationCard
          key={`item-${index}-{${reservation.cost}-${reservation.standards.join('-')}`}
          reservation={reservation}
        />
      ))}
      <AddNewReservationCard />
    </Stack>
  );
};
