import { type ReactNode } from 'react';
import { Avatar, Container, Typography, Box } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

type AuthFormBaseProps = {
  children: ReactNode;
  title: string;
};

export const AuthFormBase = ({ children, title }: AuthFormBaseProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
      }}
    >
      <Container maxWidth={'xs'} component={'main'}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
            <LockOutlined />
          </Avatar>
          <Typography component={'h1'} variant={'h5'} sx={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>
          {children}
        </Box>
      </Container>
    </Container>
  );
};
