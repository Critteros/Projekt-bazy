import { useCallback } from 'react';

import { api } from '@/utils/api';
import { hasRole, type RoleType } from '@/utils/roles';

export const useSession = () => {
  const { isLoading, data } = api.session.info.useQuery(undefined, {
    retry: false,
  });

  const canView = useCallback(
    (role: RoleType | RoleType[]) => {
      if (!data) return false;
      return hasRole(data.roles, role);
    },
    [data],
  );

  return {
    isLoading,
    session: data?.login,
    roles: data?.roles,
    hasRole: canView,
    isAuthenticated: !!data,
  };
};
