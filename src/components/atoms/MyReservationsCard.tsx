import { EventSeat as Icon } from '@mui/icons-material';
import { CardItem } from '@/components/molecules/CardItem';

type MyReservationsCardProps = {
  onClick?: () => void;
};

export const MyReservationsCard = ({ onClick }: MyReservationsCardProps) => {
  return (
    <CardItem title={'My Reservations'} onClick={onClick} href={'/reservations'} role={'customer'}>
      <Icon sx={{ fontSize: '1.5em' }} />
    </CardItem>
  );
};
