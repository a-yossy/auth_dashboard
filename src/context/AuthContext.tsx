import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { auth } from 'src/libs/firebase';

type CurrentUser =
  | {
      state: 'loading';
    }
  | {
      state: 'log_in';
      data: {
        name: string;
        email: string;
      };
    }
  | {
      state: 'log_out';
    };

type AuthContextProps = {
  currentUser: CurrentUser;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: { state: 'loading' },
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    state: 'loading',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser({
          state: 'log_in',
          data: {
            name: user.displayName ?? '',
            email: user.email ?? '',
          },
        });
      } else {
        setCurrentUser({ state: 'log_out' });
      }
    });

    return () => {
      unsubscribe();
      setCurrentUser({ state: 'loading' });
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
