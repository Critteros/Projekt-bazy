import { Button, styled } from '@mui/material';

export const AppButton = styled(Button)`
  color: white;
  background-color: transparent;
  :hover {
    background-color: ${({ theme }) => theme.palette.secondary.dark};
    border-color: white;
  }
  border-color: white;
`;
