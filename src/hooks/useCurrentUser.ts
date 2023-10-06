import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';

export const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  return { currentUser, setCurrentUser };
};
