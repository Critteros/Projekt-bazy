import { api } from '@/utils/api';

export const useSession = () => {
  const { isLoading, data } = api.session.info.useQuery(undefined, {
    retry: false,
  });

  return {
    isLoading,
    session: data?.login,
    roles: data?.roles,
  };
};
