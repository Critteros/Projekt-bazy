import { CreditCard as CreditCardIcon } from '@mui/icons-material';
import {
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Divider,
} from '@mui/material';

import { CardItem } from '@/components/molecules/CardItem';
import { useState } from 'react';
import { AppDialog } from '@/components/atoms/AppDialog';
import { DialogCloseButton } from '@/components/atoms/DialogCloseButton';
import { useSession } from '@/hooks/useSession';
import { api } from '@/utils/api';
import { useFormik } from 'formik';
import { type NewTransactionRequest, NewTransactionRequestSchema } from '@/dto/transaction';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ReservationCardPicker } from '@/components/organisms/ReservationCardPicker';
import { ReservationContextProvider } from '@/context/ReservationContext';

// type NewReservationCardProps = {};

export const NewReservationCard = () => {
  const [open, setOpen] = useState(false);
  const { session, hasRole } = useSession();
  const { data: customerLogins } = api.customer.listCustomers.useQuery(undefined, {
    enabled: hasRole('staff'),
  });

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(NewTransactionRequestSchema),
    initialValues: {
      customer: '',
      reservations: [],
      paymentMethod: '',
    } satisfies NewTransactionRequest,
    onSubmit: () => alert('submitted!'),
  });

  console.log(customerLogins);

  return (
    <>
      <CardItem title={'New transaction'} onClick={() => setOpen(true)} role={'staff'}>
        <CreditCardIcon sx={{ fontSize: '1.5em' }} />
      </CardItem>
      <AppDialog open={open} onClose={() => setOpen(false)} fullScreen>
        <ReservationContextProvider>
          <DialogTitle>
            <Typography>New Transaction</Typography>
            <DialogCloseButton onClose={() => setOpen(false)} />
          </DialogTitle>
          <DialogContent>
            <Divider orientation={'horizontal'} />
            <Box
              component={'form'}
              sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}
              onSubmit={formik.handleSubmit}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  maxWidth: 300,
                }}
              >
                <Autocomplete
                  disablePortal
                  options={customerLogins ?? []}
                  onChange={(e, value) => {
                    void formik.setFieldValue('login', value);
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
            </Box>
          </DialogContent>
        </ReservationContextProvider>
      </AppDialog>
    </>
  );
};
