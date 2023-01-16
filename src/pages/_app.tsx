import { type AppType } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { api } from '@/utils/api';
import { theme } from '@/style/theme';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
