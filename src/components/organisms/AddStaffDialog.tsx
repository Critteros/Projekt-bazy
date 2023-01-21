import { AppDialog } from '@/components/atoms/AppDialog';
import {
  type AlertProps,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Button,
  Autocomplete,
} from '@mui/material';
import { DialogCloseButton } from '@/components/atoms/DialogCloseButton';
import { useFormik } from 'formik';
import { StaffProfileAddRequestSchema } from '@/dto/staff';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { api } from '@/utils/api';
import { useState } from 'react';
import { Notification } from '@/components/atoms/Notification';

export type AddStaffDialogProps = {
  open: boolean;
  onClose: () => void;
};

const validationSchema = StaffProfileAddRequestSchema.omit({
  accountId: true,
}).extend({
  login: z
    .string({
      required_error: 'Login must be a string',
    })
    .min(1, 'Login cannot be empty string'),
});

export const AddStaffDialog = ({ open, onClose }: AddStaffDialogProps) => {
  const [notification, setNotification] = useState<{
    severity: AlertProps['severity'];
    message: string;
  } | null>(null);
  const { data } = api.account.adminListAccounts.useQuery();

  const context = api.useContext();
  const { mutate } = api.staff.addStaffMember.useMutation({
    onSuccess: async () => {
      setNotification({
        severity: 'success',
        message: 'Created profile',
      });
      await context.account.adminListAccounts.invalidate();
      await context.staff.invalidate();
    },
    onError: (error) => {
      setNotification({
        severity: 'error',
        message: error.message,
      });
    },
  });

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(validationSchema),
    initialValues: {
      jobTitle: '',
      lastname: '',
      login: '',
      firstname: '',
    } satisfies z.infer<typeof validationSchema>,
    onSubmit: ({ jobTitle, lastname, login, firstname }) => {
      if (!data) {
        setNotification({
          severity: 'error',
          message: 'Cannot submit, no accountId information',
        });
        return;
      }
      const accountId = data.find((el) => el.login === login)?.account_id;

      if (!accountId) {
        setNotification({
          severity: 'error',
          message: 'Cannot submit, no accountId information',
        });
        return;
      }

      mutate({
        jobTitle,
        lastname,
        firstname,
        accountId,
      });
    },
  });

  if (!data) return <></>;

  const logins = data
    .filter((el) => {
      return !el.staff_profile || !el.roles.includes('staff');
    })
    .map((el) => el.login);

  return (
    <AppDialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>Add new staff member</Typography>
        <DialogCloseButton onClose={onClose} />
      </DialogTitle>
      <DialogContent>
        <Box
          component={'form'}
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 2,
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-login"
            options={logins}
            onChange={(e, value) => {
              void formik.setFieldValue('login', value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="login"
                label="Login"
                name="login"
                error={formik.touched.login && !!formik.errors.login}
                helperText={formik.touched.login && formik.errors.login}
                color={'secondary'}
              />
            )}
          />
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
    </AppDialog>
  );
};
