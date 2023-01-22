import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useRouter } from 'next/router';
import { MeetingRoom as RoomIcon } from '@mui/icons-material';
import { AppLink } from '@/components/atoms/AppLink';

const urlPath = '/staff/assignRooms';

export const StaffAssignRooms = () => {
  const { pathname } = useRouter();
  return (
    <AppLink href={urlPath}>
      <ListItemButton selected={pathname === urlPath}>
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary={'Assign Rooms'} />
      </ListItemButton>
    </AppLink>
  );
};
