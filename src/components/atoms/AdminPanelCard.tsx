import { AdminPanelSettings as AdminPanelIcon } from '@mui/icons-material';
import { CardItem } from '@/components/molecules/CardItem';

type AdminPanelCardProps = {
  onClick?: () => void;
};

export const AdminPanelCard = ({ onClick }: AdminPanelCardProps) => {
  return (
    <CardItem title={'Go to admin panel'} onClick={onClick} href={'/admin'} role={'admin'}>
      <AdminPanelIcon sx={{ fontSize: '1.5em' }} />
    </CardItem>
  );
};
