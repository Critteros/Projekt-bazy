import { Badge as BadgeIcon } from '@mui/icons-material';
import { CardItem } from '@/components/molecules/CardItem';

type CreateReservationCardProps = {
  onClick?: () => void;
};

export const CreateReservationCard = ({ onClick }: CreateReservationCardProps) => {
  return (
    <CardItem title={'Create Reservation'} onClick={onClick} role={'staff'}>
      <BadgeIcon sx={{ fontSize: '1.5em' }} />
    </CardItem>
  );
};
