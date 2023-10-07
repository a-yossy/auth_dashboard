import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { auth } from 'src/libs/firebase';
import { CURRENT_USER_STATES } from 'src/const';

type CurrentUserState =
  | {
      state: typeof CURRENT_USER_STATES.LOADING;
    }
  | {
      state: typeof CURRENT_USER_STATES.LOG_IN;
      data: {
        name: string;
        email: string;
      };
    }
  | {
      state: typeof CURRENT_USER_STATES.LOG_OUT;
    };

type AuthContextProps = {
  currentUser: CurrentUserState;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserState>>;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: { state: CURRENT_USER_STATES.LOADING },
  setCurrentUser: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserState>({
    state: CURRENT_USER_STATES.LOADING,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};