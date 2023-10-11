import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { CURRENT_USER_STATES } from 'src/const';

export const useAlreadyLoggedIn = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const alreadyLoggedIn = useCallback(() => {
    if (currentUser.state === CURRENT_USER_STATES.LOG_IN) {
      void router.push('/dashboard');
    }
  }, [currentUser.state, router]);

  return alreadyLoggedIn;
};
