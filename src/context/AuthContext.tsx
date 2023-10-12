import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { CURRENT_USER_STATES } from 'src/const';
import { useAuthStateListener } from 'src/hooks/useAuthStateListener';
import { CurrentUserState } from 'src/types/currentUserState';

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
  const contextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );
  useAuthStateListener(setCurrentUser);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
