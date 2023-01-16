import { createTheme, type SxProps } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export type ThemeType = typeof theme;
export type SxStyles = SxProps<ThemeType>;
