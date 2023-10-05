import { FC } from 'react';
import { CenterTitle } from 'src/components/elements';
import { UserSignUpForm } from 'src/features/users/components/UserSignUpForm';

export const UserSignUp: FC = () => {
  return (
    <>
      <CenterTitle>新規登録</CenterTitle>
      <UserSignUpForm />
    </>
  );
};
