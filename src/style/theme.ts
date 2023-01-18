import { createTheme, type SxProps } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '0.4em',
          },
          '*::-webkit-scrollbar-track': {
            WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: 'inherit',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'white',
            outline: '1px solid slategrey',
            borderRadius: '10px',
          },
        },
      },
    },
  },
});

export type ThemeType = typeof theme;
export type SxStyles = SxProps<ThemeType>;
