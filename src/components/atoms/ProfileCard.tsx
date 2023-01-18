import { AccountCircle as Icon } from '@mui/icons-material';
import { CardItem } from '@/components/molecules/CardItem';

type ProfileCardProps = {
  onClick?: () => void;
};

export const ProfileCard = ({ onClick }: ProfileCardProps) => {
  return (
    <CardItem title={'Profile'} onClick={onClick} href={'/profile'} xs={12} role={null}>
      <Icon sx={{ fontSize: '1.5em' }} />
    </CardItem>
  );
};
