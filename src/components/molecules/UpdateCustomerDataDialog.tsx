import {
  Dialog,
  DialogContent,
  type DialogProps,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  type AlertProps,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import {
  type CustomerUpdateProfileRequest,
  CustomerUpdateProfileRequestSchema,
} from '@/dto/customer';
import { Close as CloseIcon } from '@mui/icons-material';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useState } from 'react';

import { api } from '@/utils/api';
import { Notification } from '@/components/atoms/Notification';

export type UpdateCustomerDataDialog = DialogProps & {
  onClose?: () => void;
  create?: boolean;
  initialData: CustomerUpdateProfileRequest;
};

export const UpdateCustomerDataDialog = ({
  initialData,
  create,
  ...props
}: UpdateCustomerDataDialog) => {
  const [notification, setNotification] = useState<{
    message: string;
    severity: AlertProps['severity'];
  } | null>(null);

  const context = api.useContext();

  const handlers = {
    onSuccess: async () => {
      setNotification({
        message: 'Updated profile information',
        severity: 'success',
      });
      await context.customer.profileInfo.invalidate();
    },
    onError: (error: { message: string }) => {
      setNotification({
        severity: 'error',
        message: error.message,
      });
    },
  };

  const { mutate } = api.customer.updateProfile.useMutation(handlers);
  const { mutate: createProfile } = api.customer.createProfile.useMutation(handlers);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: toFormikValidationSchema(CustomerUpdateProfileRequestSchema),
    onSubmit: (data) => {
      create ? createProfile(data) : mutate(data);
      create && context.session.invalidate();
    },
  });

  const { onClose } = props;
  return (
    <Dialog {...props} PaperProps={{ variant: 'outlined' }}>
      <DialogTitle>
        <Typography>{create ? 'Create profile data' : 'Update profile data'}</Typography>
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
        <Box
          component={'form'}
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 2,
            rowGap: 3,
          }}
        >
          <TextField
            margin={'normal'}
            required
            fullWidth
            id={'firstname'}
            label={'Firstname'}
            name={'firstname'}
            type={'text'}
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && !!formik.errors.firstname}
            helperText={formik.touched.firstname && formik.errors.firstname}
            color={'secondary'}
            sx={{
              gridColumn: 'span 1',
            }}
          />
          <TextField
            margin={'normal'}
            required
            fullWidth
            id={'lastname'}
            label={'Lastname'}
            name={'lastname'}
            type={'text'}
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && !!formik.errors.lastname}
            helperText={formik.touched.lastname && formik.errors.lastname}
            color={'secondary'}
            sx={{
              gridColumn: 'span 1',
            }}
          />
          <TextField
            margin={'normal'}
            required
            fullWidth
            id={'age'}
            label={'Age'}
            name={'age'}
            type={'number'}
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && !!formik.errors.age}
            helperText={formik.touched.age && formik.errors.age}
            color={'secondary'}
            InputProps={{
              inputProps: {
                min: 1,
                max: 120,
              },
            }}
            sx={{
              gridColumn: 'span 1',
            }}
          />
          <TextField
            margin={'normal'}
            required
            fullWidth
            id={'gender'}
            label={'Gender'}
            name={'gender'}
            select
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && !!formik.errors.gender}
            helperText={formik.touched.gender && formik.errors.gender}
            color={'secondary'}
            sx={{
              gridColumn: 'span 1',
            }}
          >
            <MenuItem value={'male'}>male</MenuItem>
            <MenuItem value={'female'}>female</MenuItem>
          </TextField>
          <TextField
            margin={'normal'}
            required
            fullWidth
            id={'contact_number'}
            label={'Contact Number'}
            name={'contactNumber'}
            type={'text'}
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            error={formik.touched.contactNumber && !!formik.errors.contactNumber}
            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            color={'secondary'}
            sx={{
              gridColumn: 'span 2',
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, gridColumn: 'span 2' }}
            color={'secondary'}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              {create ? 'Create Profile' : 'Save changes'}
            </Typography>
          </Button>
        </Box>
        <Notification
          message={notification?.message}
          severity={notification?.severity}
          onClose={() => setNotification(null)}
        />
      </DialogContent>
    </Dialog>
  );
};
