import { CreditCard as CreditCardIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { CardItem } from '@/components/molecules/CardItem';
import { AppDialog } from '@/components/atoms/AppDialog';
import { DialogCloseButton } from '@/components/atoms/DialogCloseButton';
import { useSession } from '@/hooks/useSession';
import { api } from '@/utils/api';
import { type NewTransactionRequest, NewTransactionRequestSchema } from '@/dto/transaction';
import { ReservationCardPicker } from '@/components/organisms/ReservationCardPicker';
import { useReservationContext } from '@/hooks/useReservationContext';

export const NewReservationCard = () => {
  const [open, setOpen] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { hasRole } = useSession();
  const { reservations, reset } = useReservationContext();
  const { data: customerLogins } = api.customer.listCustomers.useQuery(undefined, {
    enabled: hasRole('staff'),
  });

  const { mutate } = api.transactions.createTransaction.useMutation({
    onSuccess: () => {
      formik.resetForm();
      reset();
      setOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setErrorDialog(true);
    },
  });

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(NewTransactionRequestSchema),
    initialValues: {
      customer: '',
      reservations,
      paymentMethod: '',
    } satisfies NewTransactionRequest,
    onSubmit: ({ reservations, paymentMethod, customer }) => {
      mutate({
        customer,
        paymentMethod,
        reservations,
      });
    },
  });

  useEffect(() => {
    void formik.setFieldValue('reservations', reservations);
    // eslint-disable-next-line
  }, [formik.setFieldValue, reservations]);

  return (
    <>
      <CardItem title={'New transaction'} onClick={() => setOpen(true)} role={'staff'}>
        <CreditCardIcon sx={{ fontSize: '1.5em' }} />
      </CardItem>
      <AppDialog open={open} onClose={() => setOpen(false)} fullScreen>
        <DialogTitle>
          <Typography>New Transaction</Typography>
          <DialogCloseButton onClose={() => setOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Divider orientation={'horizontal'} />
          <Box
            component={'form'}
            sx={{ display: 'flex', flexDirection: 'column', mt: 2, flexGrow: 1 }}
            onSubmit={formik.handleSubmit}
          >
            <Stack direction={'row'} gap={5}>
              <Box
                sx={{
                  flexGrow: 0,
                  flexShrink: 0,
                  minWidth: 300,
                }}
              >
                <Autocomplete
                  disablePortal
                  options={customerLogins ?? []}
                  onChange={(e, value) => {
                    void formik.setFieldValue('customer', value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer"
                      name="customer"
                      error={formik.touched.customer && !!formik.errors.customer}
                      helperText={formik.touched.customer && formik.errors.customer}
                      color={'secondary'}
                    />
                  )}
                />
              </Box>
              <TextField
                label={'Payment Method'}
                name={'paymentMethod'}
                error={formik.touched.paymentMethod && !!formik.errors.paymentMethod}
                helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
                value={formik.values.paymentMethod}
                onChange={formik.handleChange}
                color={'secondary'}
                sx={{
                  minWidth: 300,
                }}
              />
            </Stack>
            <Box
              sx={{
                flexGrow: 1,
                mt: 5,
              }}
            >
              <Typography variant={'h5'}>Reservations</Typography>
              <Divider orientation={'horizontal'} />
              <ReservationCardPicker />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, justifySelf: 'flex-end' }}
              color={'secondary'}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Submit</Typography>
            </Button>
          </Box>
        </DialogContent>
        <AppDialog open={errorDialog} onClose={() => setErrorDialog(false)}>
          <DialogTitle>
            <Typography sx={{ color: 'red' }}>Error</Typography>
            <DialogCloseButton onClose={() => setErrorDialog(false)} />
          </DialogTitle>
          <DialogContent>{errorMessage}</DialogContent>
        </AppDialog>
      </AppDialog>
    </>
  );
};
