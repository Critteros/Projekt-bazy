import { type NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Home } from '@mui/icons-material';

import { AuthFormBase } from '@/components/atoms/AuthFormBase';
import { LoginForm } from '@/components/molecules/LoginForm';
import { CornerButton } from '@/components/atoms/CornerButton';

const Login: NextPage = () => {
  const router = useRouter();
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
            alert(JSON.stringify(values, null, 2));
          }}
        />
      </AuthFormBase>
    </>
  );
};

export default Login;
