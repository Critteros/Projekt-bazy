import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Home } from '@mui/icons-material';

import { AuthFormBase } from '@/components/atoms/AuthFormBase';
import { RegisterForm } from '@/components/molecules/RegisterForm';
import { CornerButton } from '@/components/atoms/CornerButton';

const Register: NextPage = () => {
  const router = useRouter();
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
        <RegisterForm onSubmit={(data) => alert(JSON.stringify(data, null, 2))}></RegisterForm>
      </AuthFormBase>
    </>
  );
};

export default Register;
