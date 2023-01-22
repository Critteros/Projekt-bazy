import { Badge as BadgeIcon } from '@mui/icons-material';
import { CardItem } from '@/components/molecules/CardItem';

type CreateReservationCardProps = {
  onClick?: () => void;
};

export const StaffDashboardCard = ({ onClick }: CreateReservationCardProps) => {
  return (
    <CardItem title={'Staff Dashboard'} onClick={onClick} role={'staff'} href={'/staff'}>
      <BadgeIcon sx={{ fontSize: '1.5em' }} />
    </CardItem>
  );
};
