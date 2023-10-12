import { useEffect } from 'react';
import { auth } from 'src/libs/firebase';
import { CURRENT_USER_STATES } from 'src/const';
import { CurrentUserState } from 'src/types/currentUserState';

export const useAuthStateListener = (
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserState>>,
) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          state: CURRENT_USER_STATES.LOG_IN,
          data: {
            name: user.displayName ?? '',
            email: user.email ?? '',
          },
        });
      } else {
        setCurrentUser({ state: CURRENT_USER_STATES.LOG_OUT });
      }
    });

    return () => {
      unsubscribe();
      setCurrentUser({ state: CURRENT_USER_STATES.LOADING });
    };
  }, [setCurrentUser]);
};
