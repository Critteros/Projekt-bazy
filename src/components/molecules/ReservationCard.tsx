import dayjs from 'dayjs';
import { IconButton, Typography, Stack, Chip } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import type { ReservationType } from '@/context/ReservationContext';
import { ReservationCardContainer } from '@/components/atoms/ReservationCardContainer';
import { Align } from '@/components/atoms/Align';
import { KeyText } from '@/components/atoms/KeyText';
import { useReservationContext } from '@/hooks/useReservationContext';

export type ReservationCardProps = {
  reservation: ReservationType;
};

export const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const { remove } = useReservationContext();
  return (
    <ReservationCardContainer>
      <IconButton
        aria-label="close"
        onClick={() => remove(reservation)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'red',
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Align>
        <KeyText>From:</KeyText>
        <Typography>{dayjs(reservation.dateIn).format('DD/MM/YYYY')}</Typography>
        <KeyText>To:</KeyText>
        <Typography>{dayjs(reservation.dateOut).format('DD/MM/YYYY')}</Typography>
        <KeyText>Cost: </KeyText>
        <Typography>{`${reservation.cost} PLN`}</Typography>
        <KeyText>Standards:</KeyText>
        <Stack direction={'row'} gap={1}>
          {reservation.standards.map((standard) => (
            <Chip key={standard} variant={'outlined'} label={standard} />
          ))}
        </Stack>
      </Align>
    </ReservationCardContainer>
  );
};
