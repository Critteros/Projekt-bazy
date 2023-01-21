import { useEffect } from 'react';
import { useSession } from '@/hooks/useSession';

export type SessionGuardProps = {
  fallbackUrl?: string;
};

export const SessionGuard = ({ fallbackUrl }: SessionGuardProps) => {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !session) {
      window.location.replace(fallbackUrl ?? '/');
    }
  }, [session, fallbackUrl, isLoading]);

  return <></>;
};
