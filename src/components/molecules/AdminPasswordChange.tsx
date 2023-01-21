import * as yup from 'yup';
import { useState } from 'react';
import {
  type AlertProps,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';

import { AppButton } from '@/components/atoms/AppButton';
import { api } from '@/utils/api';
import { Close as CloseIcon } from '@mui/icons-material';
import { Notification } from '@/components/atoms/Notification';
import type { AccountInfo } from '@/server/db/session';

export type AdminPasswordChangeProps = {
  accountId: number;
  login: AccountInfo['login'];
};

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords does not match')
    .required(),
});

export const AdminPasswordChange = ({ accountId, login }: AdminPasswordChangeProps) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<{
    severity: AlertProps['severity'];
    message: string;
  } | null>(null);
  const { mutate } = api.account.adminPasswordChange.useMutation({
    onSuccess: () => {
      setNotification({
        severity: 'success',
        message: 'Password changed',
      });
      resetForm();
    },
    onError: (error) => {
      setNotification({
        severity: 'error',
        message: error.message,
      });
      resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: ({ password }) => {
      mutate({
        newPassword: password,
        accountId,
      });
    },
  });

  function resetForm() {
    formik.resetForm();
  }
  return (
    <>
      <AppButton variant={'outlined'} onClick={() => setOpen(true)}>
        Change
      </AppButton>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        PaperProps={{
          variant: 'outlined',
        }}
      >
        <DialogTitle>
          <Typography>{`Change password for ${login}`}</Typography>
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
          <Box component={'form'} onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              color={'secondary'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Confirm password"
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              color={'secondary'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color={'secondary'}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Change Password</Typography>
            </Button>
          </Box>
          <Notification
            message={notification?.message}
            severity={notification?.severity}
            onClose={() => setNotification(null)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
