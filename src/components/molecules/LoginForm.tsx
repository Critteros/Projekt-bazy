import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  login: yup.string().min(1).required('Login is required'),
  password: yup.string().min(1).required('Password is required'),
});

type SchemaType = yup.InferType<typeof validationSchema>;

type LoginFormProps = {
  onSubmit: (values: SchemaType) => void;
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formik = useFormik<SchemaType>({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
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
        <Typography>Login</Typography>
      </Button>
    </Box>
  );
};
