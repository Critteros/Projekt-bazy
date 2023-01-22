import {
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Stack,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Chip,
  Button,
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';

import { AppDialog } from '@/components/atoms/AppDialog';
import { DialogCloseButton } from '@/components/atoms/DialogCloseButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { NewTransactionRequestSchema } from '@/dto/transaction';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import type { z } from 'zod';
import { useReservationContext } from '@/hooks/useReservationContext';

const validationSchema = NewTransactionRequestSchema.shape.reservations.element;

export type NewReservationDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const NewReservationDialog = ({ open, onClose }: NewReservationDialogProps) => {
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const { append } = useReservationContext();

  const { data: roomStandardsData } = api.rooms.standards.useQuery();

  const allStandards = roomStandardsData?.map((entry) => entry.friendlyName);

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(validationSchema),
    initialValues: {
      cost: 0,
      standards: [],
      dateIn: new Date(),
      dateOut: new Date(),
    } satisfies z.infer<typeof validationSchema>,
    onSubmit: (data) => {
      append(data);
      onClose();
    },
  });

  useEffect(() => {
    void formik.setFieldValue('standards', selectedStandards);
  }, [selectedStandards]);

  const handleStandardsChange = (event: SelectChangeEvent<typeof selectedStandards>) => {
    const {
      target: { value },
    } = event;
    setSelectedStandards(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDelete = (element: string) => () =>
    setSelectedStandards((prevState) => {
      return [...prevState.filter((el) => el !== element)];
    });

  return (
    <AppDialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>New Reservation</Typography>
        <DialogCloseButton onClose={onClose} />
      </DialogTitle>
      <DialogContent>
        <Box
          component={'form'}
          sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 3 }}
          onSubmit={formik.handleSubmit}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction={'row'} gap={5}>
              <DesktopDatePicker
                label="Date In"
                inputFormat="DD/MM/YYYY"
                value={formik.values.dateIn}
                onChange={(data) => {
                  void formik.setFieldValue('dateIn', data);
                }}
                PaperProps={{
                  variant: 'outlined',
                  elevation: 0,
                }}
                renderInput={(params) => (
                  <TextField {...params} error={formik.touched.dateIn && !!formik.errors.dateIn} />
                )}
              />
              <DesktopDatePicker
                label="Date Out"
                inputFormat="DD/MM/YYYY"
                value={formik.values.dateOut}
                onChange={(data) => {
                  void formik.setFieldValue('dateOut', data);
                }}
                PaperProps={{
                  variant: 'outlined',
                  elevation: 0,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={formik.touched.dateOut && !!formik.errors.dateOut}
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
          <TextField
            label={'Cost'}
            name={'cost'}
            InputProps={{
              endAdornment: <Typography>PLN</Typography>,
            }}
            value={formik.values.cost}
            onChange={formik.handleChange}
            type={'number'}
            error={formik.touched.cost && !!formik.errors.cost}
            helperText={formik.touched.cost && formik.errors.cost}
            sx={{
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                display: 'none',
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
            }}
            color={'secondary'}
          />
          <FormControl>
            <InputLabel>Standards</InputLabel>
            <Select
              MenuProps={{
                PaperProps: {
                  variant: 'outlined',
                  elevation: 0,
                },
              }}
              error={formik.touched.standards && !!formik.errors.standards}
              multiple
              value={formik.values.standards}
              label={'Standards'}
              onChange={handleStandardsChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      variant={'outlined'}
                      onDelete={handleDelete(value)}
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  ))}
                </Box>
              )}
            >
              {allStandards?.map((standardName) => (
                <MenuItem key={standardName} value={standardName}>
                  {standardName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={'secondary'}
            sx={{ mt: 2, mb: 2 }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Done</Typography>
          </Button>
        </Box>
      </DialogContent>
    </AppDialog>
  );
};
