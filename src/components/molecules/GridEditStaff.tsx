import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  TextField,
  type AlertProps,
  Button,
} from '@mui/material';
import type { z } from 'zod';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { type ListStaffResponse, StaffProfileUpdateRequestSchema } from '@/dto/staff';
import type { Staff } from '@/server/db/tableSchema';
import type { ArrayElement } from '@/utils/types';
import { api } from '@/utils/api';
import { Notification } from '@/components/atoms/Notification';

export type GridEditStaffProps = {
  staffId: Staff['staff_id'];
  initialData: Pick<ArrayElement<ListStaffResponse>, 'firstname' | 'lastname' | 'job_title'>;
};

export const GridEditStaff = ({ staffId, initialData }: GridEditStaffProps) => {
  const [notification, setNotification] = useState<{
    severity: AlertProps['severity'];
    message: string;
  } | null>(null);
  const [open, setOpen] = useState(false);

  const context = api.useContext();
  const { mutate } = api.staff.updateStaffProfile.useMutation({
    onSuccess: async () => {
      await context.staff.adminListStaff.invalidate();
      setNotification({
        severity: 'success',
        message: 'Profile updated',
      });
    },
    onError: (error) => {
      setNotification({
        severity: 'error',
        message: error.message,
      });
    },
  });

  const validationSchema = StaffProfileUpdateRequestSchema.omit({
    staffId: true,
  });

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(
      StaffProfileUpdateRequestSchema.omit({
        staffId: true,
      }),
    ),
    initialValues: {
      jobTitle: initialData.job_title,
      firstname: initialData.firstname,
      lastname: initialData.lastname,
    } satisfies z.infer<typeof validationSchema>,
    onSubmit: (data) => {
      mutate({
        staffId,
        lastname: data.lastname,
        firstname: data.firstname,
        jobTitle: data.jobTitle,
      });
    },
  });

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        PaperProps={{
          variant: 'outlined',
          elevation: 0,
        }}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Typography>Editor staff profile</Typography>
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
          <Box component={'form'} onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Firstname"
              name="firstname"
              type="text"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && !!formik.errors.firstname}
              helperText={formik.touched.firstname && formik.errors.firstname}
              color={'secondary'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Lastname"
              name="lastname"
              type="text"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && !!formik.errors.lastname}
              helperText={formik.touched.lastname && formik.errors.lastname}
              color={'secondary'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="jobTitle"
              label="Job Title"
              name="jobTitle"
              type="text"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              error={formik.touched.jobTitle && !!formik.errors.jobTitle}
              helperText={formik.touched.jobTitle && formik.errors.jobTitle}
              color={'secondary'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color={'secondary'}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Update</Typography>
            </Button>
          </Box>
        </DialogContent>
        <Notification
          message={notification?.message}
          severity={notification?.severity}
          onClose={() => setNotification(null)}
        />
      </Dialog>
    </>
  );
};
