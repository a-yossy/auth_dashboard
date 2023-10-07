import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from 'src/hooks/useToast';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { CURRENT_USER_STATES } from 'src/const';

export const useRequireLogIn = () => {
  const router = useRouter();
  const toast = useToast();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (currentUser.state === CURRENT_USER_STATES.LOG_OUT) {
        router.push('/log_in');
        toast('error', 'ログインが必要です');
      }
    }

    return () => {
      ignore = true;
    };
  }, [currentUser.state, router, toast]);
};
