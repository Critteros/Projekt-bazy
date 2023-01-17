import Head from 'next/head';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Home } from '@mui/icons-material';

import { AuthFormBase } from '@/components/atoms/AuthFormBase';
import { LoginForm, type LoginFormRef } from '@/components/molecules/LoginForm';
import { CornerButton } from '@/components/atoms/CornerButton';
import { api } from '@/utils/api';
import { ErrorNotification } from '@/components/atoms/ErrorNotification';

const Login: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<LoginFormRef>();
  const [error, setError] = useState<string | null>(null);

  const loginMutation = api.auth.login.useMutation({
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
        <title>Login</title>
      </Head>
      <CornerButton
        onClick={() => {
          void router.push('/');
        }}
      >
        <Home fontSize={'large'} />
      </CornerButton>
      <AuthFormBase title={'login'}>
        <LoginForm
          onSubmit={(values) => {
            loginMutation.mutate(values);
          }}
          ref={formRef}
        />
      </AuthFormBase>
      <ErrorNotification error={error} onClose={() => setError(null)} />
    </>
  );
};

export default Login;
