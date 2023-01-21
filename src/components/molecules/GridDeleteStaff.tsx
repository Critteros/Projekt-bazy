import { IconButton, type AlertProps } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';

import type { Account, Staff } from '@/server/db/tableSchema';
import { api } from '@/utils/api';

import { ConfirmationDialog } from '@/components/molecules/ConfirmationDialog';
import { Notification } from '@/components/atoms/Notification';

type GridDeleteStaffProps = {
  staffId: Staff['staff_id'];
  login: Account['login'];
};

export const GridDeleteStaff = ({ staffId, login }: GridDeleteStaffProps) => {
  const [notification, setNotification] = useState<{
    message: string;
    severity: AlertProps['severity'];
  } | null>(null);
  const [open, setOpen] = useState(false);

  const context = api.useContext();
  const { mutate } = api.staff.deleteStaffMember.useMutation({
    onSuccess: async () => {
      setNotification({
        severity: 'success',
        message: `Successfully removed ${login} from staff members `,
      });

      await context.staff.adminListStaff.invalidate();
      await context.staff.profileInfo.invalidate();
    },
    onError: (error) => {
      setNotification({
        severity: 'error',
        message: error.message,
      });
    },
  });

  return (
    <>
      <IconButton
        sx={{
          color: 'red',
        }}
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        onConfirm={() =>
          mutate({
            staffId,
          })
        }
        title={'Are you sure?'}
        message={`Proceeding will remove ${login} from staff members`}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Notification
        message={notification?.message}
        severity={notification?.severity}
        onClose={() => setNotification(null)}
      />
    </>
  );
};
