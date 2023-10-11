import type { NextPage } from 'next';
import { useEffect } from 'react';
import { UserLogIn } from 'src/features/users';
import { useAlreadyLoggedIn } from 'src/hooks/useAlreadyLoggedIn';

const LogInPage: NextPage = () => {
  const alreadyLoggedIn = useAlreadyLoggedIn();

  useEffect(() => {
    alreadyLoggedIn();
  }, [alreadyLoggedIn]);

  return <UserLogIn />;
};

export default LogInPage;
