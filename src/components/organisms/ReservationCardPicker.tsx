import { Stack } from '@mui/material';
import { ReservationCardContainer } from '@/components/atoms/ReservationCardContainer';
import { AddNewReservationCard } from '@/components/molecules/AddNewReservationCard';
import type { ArrayElement } from '@/utils/types';
import type { NewTransactionRequest } from '@/dto/transaction';
import { useState } from 'react';
import { useReservationContext } from '@/hooks/useReservationContext';
import { ReservationCard } from '@/components/molecules/ReservationCard';

type Reservation = ArrayElement<NewTransactionRequest['reservations']>;

export type ReservationCardPickerProps = {
  onChange?: (reservations: Reservation[]) => void;
};

export const ReservationCardPicker = ({ onChange }: ReservationCardPickerProps) => {
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
