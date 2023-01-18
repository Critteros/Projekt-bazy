import { Button, Typography, Paper, Stack, Box } from '@mui/material';
import { AdminPanelSettings as AdminPanelIcon } from '@mui/icons-material';

import { IconWrapper } from '@/components/atoms/IconWrapper';

type AdminPanelCardProps = {
  onClick?: () => void;
};

export const AdminPanelCard = ({ onClick }: AdminPanelCardProps) => {
  return (
    <Button onClick={onClick}>
      <Paper>
        <Stack spacing={2} direction="column" alignItems="center" justifyContent={'center'}>
          <Box sx={{ m: 3, fontSize: '2rem' }}>
            <IconWrapper
              sx={{
                mb: '0.5em',
              }}
            >
              <AdminPanelIcon sx={{ fontSize: '1.5em' }} />
            </IconWrapper>
            <Typography sx={{ fontSize: '1em' }}>Go to admin panel</Typography>
          </Box>
        </Stack>
      </Paper>
    </Button>
  );
};
