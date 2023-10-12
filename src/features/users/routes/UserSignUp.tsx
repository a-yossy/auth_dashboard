import { FC, useEffect } from 'react';
import { CenterTitle } from 'src/components/elements';
import { UserSignUpForm } from 'src/features/users/components/UserSignUpForm';
import { useAlreadyLoggedIn } from 'src/hooks/useAlreadyLoggedIn';

export const UserSignUp: FC = () => {
  const alreadyLoggedIn = useAlreadyLoggedIn();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      alreadyLoggedIn();
    }

    return () => {
      ignore = true;
    };
  }, [alreadyLoggedIn]);

  return (
    <>
      <CenterTitle>新規登録</CenterTitle>
      <UserSignUpForm />
    </>
  );
};
