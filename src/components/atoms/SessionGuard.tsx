import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@/hooks/useSession';

export type SessionGuardProps = {
  fallbackUrl?: string;
};

export const SessionGuard = ({ fallbackUrl }: SessionGuardProps) => {
  const router = useRouter();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !session) {
      void router.push(fallbackUrl ?? '/');
    }
  }, [session, router, fallbackUrl, isLoading]);

  return <></>;
};
