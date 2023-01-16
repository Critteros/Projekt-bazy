import type { NextPage } from 'next';
import { Typography, Container, Box, Avatar, TextField, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  login: yup.string().min(1).required('Login is required'),
  password: yup.string().min(1).required('Password is required'),
});

const Login: NextPage = () => {
  const formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
          <Typography component={'h1'} variant={'h5'}>
            Login
          </Typography>
          <Box component={'form'} sx={{ mt: 1 }} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="login"
              label="Login"
              name="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && !!formik.errors.login}
              helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Login;
