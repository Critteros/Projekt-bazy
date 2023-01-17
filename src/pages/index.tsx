import { type NextPage } from 'next';

import { api } from '@/utils/api';
import { LogoutButton } from '@/components/molecules/LogoutButton';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <main>Hello</main>
      <LogoutButton
        variant={'contained'}
        onLogout={() => {
          alert('Logged out!');
        }}
      />
    </>
  );
};

export default Home;
