import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@/hooks/useSession';

export type SessionGuardProps = {
  fallbackUrl?: string;
};

export const SessionGuard = ({ fallbackUrl }: SessionGuardProps) => {
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      void router.push(fallbackUrl ?? '/login');
    }
  }, [session, router, fallbackUrl]);

  return <></>;
};
