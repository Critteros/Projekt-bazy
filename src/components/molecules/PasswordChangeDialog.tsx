import * as yup from 'yup';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  type AlertProps,
  type DialogProps,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useFormik } from 'formik';

import { api } from '@/utils/api';
import { useState } from 'react';
import { Notification } from '@/components/atoms/Notification';

const validationSchema = yup.object({
  oldPassword: yup.string().required('Old password is required'),

  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(50, 'Password is too long - max 50 chars')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords does not match')
    .required(),
});

export type PasswordChangeDialogProps = DialogProps & {
  onClose: () => void;
};

export const PasswordChangeDialog = (props: PasswordChangeDialogProps) => {
  const [notification, setNotification] = useState<{
    severity: AlertProps['severity'];
    message: string;
  } | null>(null);
  const { mutate } = api.account.changePassword.useMutation({
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
      oldPassword: '',
    },
    validationSchema,
    onSubmit: ({ password, oldPassword }) => {
      mutate({
        oldPassword,
        newPassword: password,
      });
    },
  });

  function resetForm() {
    formik.resetForm();
  }

  const { onClose } = props;

  return (
    <Dialog
      {...props}
      PaperProps={{
        variant: 'outlined',
      }}
    >
      <DialogTitle>
        <Typography> Change password</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Box component={'form'} onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="old-password"
            label="Old password"
            name="oldPassword"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={formik.touched.oldPassword && !!formik.errors.oldPassword}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            color={'secondary'}
          />
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
      </DialogContent>
      <Notification
        message={notification?.message}
        severity={notification?.severity}
        onClose={() => setNotification(null)}
      />
    </Dialog>
  );
};
