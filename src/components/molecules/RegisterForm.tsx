import { forwardRef, useImperativeHandle } from 'react';
import { Box, Grid, Button, TextField, Link, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  login: yup
    .string()
    .min(3, 'Login is too short - should be 3 chars minimum')
    .max(50, 'Login is too long - max 50 chars')
    .matches(/^[ A-Za-z0-9_]*$/, 'Login can only contain alpha numerical characters and "_" symbol')
    .required('Login is required'),

  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(50, 'Password is too long - max 50 chars')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords does not match')
    .required(),
});

type SchemaType = yup.InferType<typeof validationSchema>;

export type RegisterFormProps = {
  onSubmit: (values: SchemaType) => void;
};

export type RegisterFormRef = {
  resetForm: () => void;
};

export const RegisterForm = forwardRef<RegisterFormRef | undefined, RegisterFormProps>(
  ({ onSubmit }, ref) => {
    const formik = useFormik<SchemaType>({
      initialValues: {
        login: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          resetForm: formik.resetForm,
        };
      },
      [formik],
    );

    return (
      <Box component={'form'} noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirm-password"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="current-password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Register</Typography>
        </Button>
      </Box>
    );
  },
);
