import type { ArrayElement } from '@/utils/types';
import type { ReservationsCurrentAccountReservationsResponse } from '@/dto/reservations';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import { Align } from '@/components/atoms/Align';
import { KeyText } from '@/components/atoms/KeyText';
import dayjs from 'dayjs';

export type ReservationSummaryProps = {
  reservationData: ArrayElement<ReservationsCurrentAccountReservationsResponse>;
};

export const ReservationSummary = ({ reservationData }: ReservationSummaryProps) => {
  return (
    <Paper
      sx={{
        padding: 2,
        margin: 3,
      }}
      variant={'outlined'}
      elevation={0}
    >
      <Align>
        <KeyText>From</KeyText>
        <Typography>{dayjs(reservationData.dateIn).format('DD/MM/YYYY')}</Typography>
        <KeyText>To</KeyText>
        <Typography>{dayjs(reservationData.dateOut).format('DD/MM/YYYY')}</Typography>
        <KeyText>Room</KeyText>
        <Typography>{reservationData.roomNumber ?? 'Not assigned'}</Typography>
        <KeyText>Cost</KeyText>
        <Stack direction={'row'} gap={1}>
          <Typography>{reservationData.cost}</Typography>
          <Typography sx={{ color: (theme) => theme.palette.grey[400] }}>PLN</Typography>
        </Stack>
        <KeyText>Requested Standards</KeyText>
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
          {reservationData.reservationStandards.map((standard) => (
            <Chip variant={'outlined'} label={standard} key={standard} size={'small'} />
          ))}
        </Stack>
        <KeyText>Room Standards</KeyText>
        {reservationData.roomNumber ? (
          <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            {reservationData.reservationStandards.map((standard) => (
              <Chip variant={'outlined'} label={standard} key={standard} size={'small'} />
            ))}
          </Stack>
        ) : (
          <Typography>Not assigned</Typography>
        )}
      </Align>
    </Paper>
  );
};
