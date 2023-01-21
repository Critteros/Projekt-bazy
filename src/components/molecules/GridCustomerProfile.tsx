import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { AppButton } from '@/components/atoms/AppButton';
import { Align } from '@/components/atoms/Align';
import { KeyText } from '@/components/atoms/KeyText';

import type { AccountInfo } from '@/server/db/session';

export type GridCustomerProfileProps = {
  data: AccountInfo['customer_profile'];
};

export const GridCustomerProfile = ({ data }: GridCustomerProfileProps) => {
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
          <Typography>Customer Profile Info</Typography>
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
            <KeyText>Customer Id:</KeyText>
            <Typography>{data.customer_id}</Typography>
            <KeyText>Firstname:</KeyText>
            <Typography>{data.firstname}</Typography>
            <KeyText>Lastname:</KeyText>
            <Typography>{data.lastname}</Typography>
            <KeyText>Age:</KeyText>
            <Typography>{data.age}</Typography>
            <KeyText>Gender:</KeyText>
            <Typography>{data.gender}</Typography>
            <KeyText>Contact Number:</KeyText>
            <Typography>{data.contact_number}</Typography>
          </Align>
        </DialogContent>
      </Dialog>
    </>
  );
};
