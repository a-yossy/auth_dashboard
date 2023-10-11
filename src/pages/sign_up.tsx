import type { NextPage } from 'next';
import { UserSignUp } from 'src/features/users';
import { useAlreadyLoggedIn } from 'src/hooks/useAlreadyLoggedIn';

const SignUpPage: NextPage = () => {
  const alreadyLoggedIn = useAlreadyLoggedIn();
  alreadyLoggedIn();

  return <UserSignUp />;
};

export default SignUpPage;
