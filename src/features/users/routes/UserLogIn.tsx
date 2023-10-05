import { FC } from 'react';
import { CenterTitle } from 'src/components/elements';
import { UserLogInForm } from 'src/features/users/components/UserLogInForm';

export const UserLogIn: FC = () => {
  return (
    <>
      <CenterTitle>ログイン</CenterTitle>
      <UserLogInForm />
    </>
  );
};
