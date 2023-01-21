import { DialogContent, DialogTitle, Divider, IconButton, Typography, Dialog } from '@mui/material';

import { AppButton } from '@/components/atoms/AppButton';
import type { AccountInfo } from '@/server/db/session';
import { useState } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { Align } from '@/components/atoms/Align';
import { KeyText } from '@/components/atoms/KeyText';

export type GridStaffProfileProps = {
  data: AccountInfo['staff_profile'];
};

export const GridStaffProfile = ({ data }: GridStaffProfileProps) => {
  const [open, setOpen] = useState(false);

  if (!data) {
    return <Typography>No profile</Typography>;
  }

  return (
    <>
      <AppButton variant={'outlined'} onClick={() => setOpen(true)}>
        Click to see
      </AppButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          variant: 'outlined',
        }}
      >
        <DialogTitle>
          <Typography>Staff Profile Info</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Divider orientation={'horizontal'} />
          <Align>
            <KeyText>Staff Id:</KeyText>
            <Typography>{data.staff_id}</Typography>
            <KeyText>Firstname:</KeyText>
            <Typography>{data.firstname}</Typography>
            <KeyText>Lastname:</KeyText>
            <Typography>{data.lastname}</Typography>
            <KeyText>Job Title:</KeyText>
            <Typography>{data.job_title}</Typography>
          </Align>
        </DialogContent>
      </Dialog>
    </>
  );
};
