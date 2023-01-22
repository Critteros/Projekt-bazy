import {
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  DialogContent,
  Stack,
  Skeleton,
  Chip,
} from '@mui/material';
import { MeetingRoom, Done as CheckmarkIcon } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { AppDialog } from '@/components/atoms/AppDialog';
import { DialogCloseButton } from '@/components/atoms/DialogCloseButton';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { api } from '@/utils/api';
import type { ArrayElement } from '@/utils/types';
import type { ReservationAvailableRoomsResponse } from '@/dto/reservations';

type AssignRoomActionProps = {
  reservationId: number;
};

export const AssignRoomAction = ({ reservationId }: AssignRoomActionProps) => {
  const [open, setOpen] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [error, setError] = useState('');
  const { data } = api.reservations.getAvailableRoomsForReservation.useQuery(
    {
      reservationId,
    },
    {
      enabled: open,
    },
  );
  const context = api.useContext();
  const { mutate } = api.reservations.assignRoomToReservation.useMutation({
    onError: (error) => {
      setErrorDialog(true);
      setError(error.message);
    },
    onSuccess: async () => {
      setOpen(false);
      await context.reservations.invalidate();
    },
  });

  const columns = useMemo(
    () =>
      [
        {
          field: 'roomNumber',
          headerName: 'Room Number',
          flex: 1,
          sortable: true,
          align: 'center',
          headerAlign: 'center',
          type: 'number',
        },
        {
          field: 'description',
          headerName: 'Description',
          flex: 2,
          sortable: true,
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'price',
          headerName: 'Room Maintenance Cost',
          flex: 2,
          sortable: true,
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'standards',
          headerName: 'Standards',
          flex: 4,
          sortable: false,
          headerAlign: 'center',
          align: 'center',
          renderCell: ({ row }) => {
            return (
              <Stack direction={'row'} spacing={1}>
                {row.standards.map((standard) => (
                  <Chip variant={'outlined'} key={standard} label={standard} />
                ))}
              </Stack>
            );
          },
        },
        {
          field: 'actions',
          headerName: 'Actions',
          flex: 1,
          sortable: false,
          headerAlign: 'center',
          align: 'center',
          renderCell: ({ row: { roomNumber } }) => (
            <IconButton
              onClick={() =>
                mutate({
                  roomNumber,
                  reservationId,
                })
              }
            >
              <CheckmarkIcon />
            </IconButton>
          ),
        },
      ] satisfies GridColDef<ArrayElement<ReservationAvailableRoomsResponse>>[],
    [mutate, reservationId],
  );

  return (
    <>
      <Tooltip title={'Assign Room'}>
        <IconButton onClick={() => setOpen(true)}>
          <MeetingRoom />
        </IconButton>
      </Tooltip>
      <AppDialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            height: '70vh',
            width: '70vw',
            maxWidth: '70vw',
            display: 'flex',
          },
          variant: 'outlined',
          elevation: 0,
        }}
      >
        <DialogTitle>
          <Typography>Select Room for reservation</Typography>
          <DialogCloseButton onClose={() => setOpen(false)} />
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
          }}
        >
          <Stack
            direction={'column'}
            sx={{
              flexGrow: 1,
            }}
          >
            {data ? (
              <DataGrid
                columns={columns}
                rows={data}
                getRowId={(row) => row.roomNumber}
                disableSelectionOnClick
                sx={{
                  flexGrow: 1,
                  '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                }}
              />
            ) : (
              <Skeleton variant={'rectangular'} width={'100%'} height={'100%'} />
            )}
          </Stack>
        </DialogContent>
      </AppDialog>
      <AppDialog open={errorDialog} onClose={() => setErrorDialog(false)}>
        <DialogTitle>
          <Typography sx={{ color: 'red' }}>Error</Typography>
          <DialogCloseButton onClose={() => setErrorDialog(false)} />
        </DialogTitle>
        <DialogContent>{error}</DialogContent>
      </AppDialog>
    </>
  );
};
