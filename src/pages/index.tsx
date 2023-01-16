import { type NextPage } from 'next';

import { api } from '@/utils/api';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <main>Hello</main>
    </>
  );
};

export default Home;
