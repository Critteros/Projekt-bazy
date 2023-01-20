import { styled, Typography } from '@mui/material';

export const KeyText = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[400]};
  text-transform: uppercase;
`;
