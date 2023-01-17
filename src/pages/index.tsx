import type { NextPage } from 'next';

import { api } from '@/utils/api';
import { LogoutButton } from '@/components/molecules/LogoutButton';
import { useSession } from '@/hooks/useSession';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });
  const sessionData = useSession();

  return (
    <>
      <main>Hello</main>
      <div>{JSON.stringify(sessionData, null, 2)}</div>
      <LogoutButton variant={'contained'} />
    </>
  );
};

export default Home;
