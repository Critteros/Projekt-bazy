import { type AppType } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import { api } from '@/utils/api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
