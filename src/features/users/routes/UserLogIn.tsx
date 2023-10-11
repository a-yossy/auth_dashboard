import { FC, useEffect } from 'react';
import { CenterTitle } from 'src/components/elements';
import { UserLogInForm } from 'src/features/users/components/UserLogInForm';
import { useAlreadyLoggedIn } from 'src/hooks/useAlreadyLoggedIn';

export const UserLogIn: FC = () => {
  const alreadyLoggedIn = useAlreadyLoggedIn();

  useEffect(() => {
    alreadyLoggedIn();
  }, [alreadyLoggedIn]);

  return (
    <>
      <CenterTitle>ログイン</CenterTitle>
      <UserLogInForm />
    </>
  );
};
