import Head from 'next/head';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Home } from '@mui/icons-material';

import { AuthFormBase } from '@/components/atoms/AuthFormBase';
import { RegisterForm, type RegisterFormRef } from '@/components/molecules/RegisterForm';
import { CornerButton } from '@/components/atoms/CornerButton';
import { api } from '@/utils/api';
import { ErrorNotification } from '@/components/atoms/ErrorNotification';

const Register: NextPage = () => {
  const formRef = useRef<RegisterFormRef>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const registerMutation = api.auth.register.useMutation({
    onSuccess: async () => {
      await router.push('/');
    },
    onError: (error) => {
      formRef.current?.resetForm();
      setError(error.message);
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <CornerButton
        onClick={() => {
          void router.push('/');
        }}
      >
        <Home fontSize={'large'} />
      </CornerButton>
      <AuthFormBase title={'register'}>
        <RegisterForm
          onSubmit={(data) => {
            registerMutation.mutate(data);
          }}
          ref={formRef}
        ></RegisterForm>
      </AuthFormBase>
      <ErrorNotification error={error} onClose={() => setError(null)} />
    </>
  );
};

export default Register;
